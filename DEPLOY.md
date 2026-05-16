# Hostinger VPS Deployment Guide — PlotsGurgaon

> Next.js 14 App Router + Sanity v3 + Hostinger VPS

---

## Table of Contents

1. [VPS One-Time Setup](#1-vps-one-time-setup)
2. [Environment Variables](#2-environment-variables)
3. [Git Deploy Workflow](#3-git-deploy-workflow)
4. [SSL (Let's Encrypt)](#4-ssl-lets-encrypt)
5. [Security Hardening](#5-security-hardening)
6. [Performance Tuning](#6-performance-tuning)
7. [Zero-Downtime Deploy](#7-zero-downtime-deploy)
8. [Pre-Deploy Checklist](#8-pre-deploy-checklist)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. VPS One-Time Setup

### Step 1.1 — SSH into your Hostinger VPS

```bash
ssh root@YOUR_VPS_IP
```

### Step 1.2 — Run the automated setup script

```bash
# Upload .deploy/setup-vps.sh to your VPS, then:
chmod +x setup-vps.sh
./setup-vps.sh
```

This installs: **Node.js 20, Nginx, PM2, Certbot, Fail2ban, UFW**, creates directories, and sets up a bare Git repo.

### Step 1.3 — Add your SSH key (CRITICAL)

On your **local machine**, copy your public key:

```bash
cat ~/.ssh/id_ed25519.pub
# or: cat ~/.ssh/id_rsa.pub
```

On the **VPS**:

```bash
mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo "YOUR_PUBLIC_KEY_HERE" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```

Test key login from local:

```bash
ssh root@YOUR_VPS_IP
```

If it works without password, **disable password login**:

```bash
systemctl restart sshd
```

The setup script already wrote SSH hardening config to `/etc/ssh/sshd_config.d/hardening.conf`.

### Step 1.4 — Copy config files

From your local machine:

```bash
# Nginx config
scp .deploy/nginx/plotsgurgaon.conf root@YOUR_VPS_IP:/etc/nginx/sites-available/plotsgurgaon

# PM2 config
scp .deploy/ecosystem.config.js root@YOUR_VPS_IP:/var/www/plotsgurgaon/

# Post-receive hook
scp .deploy/post-receive root@YOUR_VPS_IP:/var/repo/plotsgurgaon.git/hooks/
```

On VPS:

```bash
# Enable Nginx site
ln -sf /etc/nginx/sites-available/plotsgurgaon /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Make hook executable
chmod +x /var/repo/plotsgurgaon.git/hooks/post-receive

# Create PM2 log dir
mkdir -p /var/log/pm2/plotsgurgaon
```

---

## 2. Environment Variables

### On the VPS

Edit `/var/www/plotsgurgaon/.env.production`:

```bash
nano /var/www/plotsgurgaon/.env.production
```

Example:

```env
# Next.js
NODE_ENV=production
PORT=3000

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=abcdefgh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
SANITY_API_TOKEN=sk-prod-token-here
SANITY_PREVIEW_SECRET=your-preview-secret

# Site
NEXT_PUBLIC_SITE_URL=https://plotsgurgaon.in

# Resend (lead emails)
RESEND_API_KEY=re_xxxxxxxx

# WhatsApp
WHATSAPP_NUMBER=919311122787
```

**Permissions:**

```bash
chmod 600 /var/www/plotsgurgaon/.env.production
chown www-data:www-data /var/www/plotsgurgaon/.env.production
```

### How PM2 reads env

PM2 uses `ecosystem.config.js`. During build, Next.js reads `.env.production` automatically. PM2 process inherits system env. The post-receive hook copies nothing special — Next.js picks up `.env.production` at build time.

---

## 3. Git Deploy Workflow

### Recommended: Bare repo on VPS (push-to-deploy)

**Why bare repo?** Faster, works offline, auto-builds on push via hook.

#### Local machine — add production remote:

```bash
git remote add production root@YOUR_VPS_IP:/var/repo/plotsgurgaon.git
```

#### Deploy (from local):

```bash
git push production main
```

The `post-receive` hook auto-runs:
1. `git checkout -f`
2. `npm ci`
3. `npm run build`
4. `pm2 reload`

### Alternative: Pull from GitHub

If you prefer GitHub as source of truth:

```bash
# On VPS
cd /var/www/plotsgurgaon
git clone https://github.com/v4djay-Opt/plot.git .
# Then manually run: npm ci && npm run build && pm2 start
```

> **Bare repo is better** for Hostinger because it's faster, doesn't need GitHub auth on VPS, and supports push-to-deploy.

---

## 4. SSL (Let's Encrypt)

### Step 4.1 — Get certificate

```bash
certbot --nginx -d plotsgurgaon.in -d www.plotsgurgaon.in
```

Follow prompts. Certbot auto-updates your Nginx config.

### Step 4.2 — Auto-renewal

Certbot installs a systemd timer. Verify:

```bash
systemctl status certbot.timer
certbot renew --dry-run
```

---

## 5. Security Hardening

### 5.1 UFW Firewall

Already configured by setup script. Verify:

```bash
ufw status verbose
```

Expected output:

```
Status: active
To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

### 5.2 Fail2ban

Already installed. Default SSH protection active. Check:

```bash
fail2ban-client status sshd
```

### 5.3 Sanity CORS

In Sanity dashboard → API → CORS Origins, add:

```
https://plotsgurgaon.in
https://www.plotsgurgaon.in
```

Remove `localhost` and `*` from production dataset.

### 5.4 Nginx — hide server version

Already in config: `server_tokens off;`

Verify:

```bash
curl -I https://plotsgurgaon.in | grep Server
# Should show nothing or just "Server: nginx"
```

---

## 6. Performance Tuning

### 6.1 Nginx gzip/brotli

Gzip is enabled in the Nginx config. For Brotli (better compression):

```bash
apt install nginx-extras  # or build from source with brotli module
```

Then add to Nginx config:

```nginx
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

### 6.2 Static asset caching

Already in Nginx config for `/_next/static/` and `/images/`:

```nginx
expires 1y;
add_header Cache-Control "public, immutable";
```

### 6.3 PM2 cluster mode

Already in `ecosystem.config.js`:

```js
instances: 'max',
exec_mode: 'cluster',
```

This uses all CPU cores. For a 2-core VPS = 2 instances.

### 6.4 ISR (Incremental Static Regeneration)

Add to dynamic routes that don't change often:

```tsx
// app/plots/[slug]/page.tsx
export const revalidate = 3600; // 1 hour
```

Add to `next.config.mjs` for static pages:

```js
// Already handled by next build for SSG pages
```

---

## 7. Zero-Downtime Deploy

### The post-receive hook handles this:

```bash
git push production main
```

PM2 `reload` does a zero-downtime rolling restart across cluster instances.

### Manual reload (if needed):

```bash
ssh root@YOUR_VPS_IP "cd /var/www/plotsgurgaon && pm2 reload ecosystem.config.js --env production"
```

### View logs:

```bash
ssh root@YOUR_VPS_IP "pm2 logs plotsgurgaon --lines 100"
```

---

## 8. Pre-Deploy Checklist

Before every production push, verify:

- [ ] **No secrets in Git**: `git log --all --oneline | grep -i token` → should be empty
- [ ] **Build passes locally**: `npm run build` completes with 0 errors
- [ ] **.env.production exists on VPS** with correct values
- [ ] **Sanity dataset = "production"** (not development)
- [ ] **robots.txt** exists in `public/`
- [ ] **All env vars referenced in code** have defaults or exist in `.env.production`
- [ ] **No `console.log` or `debugger`** left in production code

---

## 9. Troubleshooting

### PM2 app won't start

```bash
pm2 logs plotsgurgaon --lines 50
# Check .env.production exists and is readable
cat /var/www/plotsgurgaon/.env.production
```

### Nginx 502 Bad Gateway

```bash
# Check Next.js is running
curl http://localhost:3000
pm2 status

# Check Nginx config
nginx -t
systemctl status nginx
```

### Build fails on VPS

```bash
# Usually out of memory — add swap:
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### SSL certificate expired

```bash
certbot renew --force-renewal
systemctl reload nginx
```

### Git push rejected

```bash
# On VPS, ensure bare repo has correct hook
chmod +x /var/repo/plotsgurgaon.git/hooks/post-receive
```

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Deploy | `git push production main` |
| Check logs | `pm2 logs plotsgurgaon` |
| Restart app | `pm2 reload plotsgurgaon` |
| Check status | `pm2 status` |
| Nginx test | `nginx -t` |
| Nginx reload | `systemctl reload nginx` |
| View env | `cat /var/www/plotsgurgaon/.env.production` |
| SSL renew | `certbot renew --dry-run` |
| Firewall status | `ufw status` |
| Fail2ban status | `fail2ban-client status` |

---

## File Locations Summary

| File | VPS Path |
|------|----------|
| App code | `/var/www/plotsgurgaon/` |
| Nginx config | `/etc/nginx/sites-available/plotsgurgaon` |
| PM2 config | `/var/www/plotsgurgaon/ecosystem.config.js` |
| Env vars | `/var/www/plotsgurgaon/.env.production` |
| Git bare repo | `/var/repo/plotsgurgaon.git/` |
| PM2 logs | `/var/log/pm2/plotsgurgaon/` |
| SSL certs | `/etc/letsencrypt/live/plotsgurgaon.in/` |
| Post-receive hook | `/var/repo/plotsgurgaon.git/hooks/post-receive` |

---

*Last updated: May 2026*
