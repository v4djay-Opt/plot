#!/bin/bash
# One-time VPS setup script for Hostinger
# Run as root or with sudo on a fresh Ubuntu 22.04/24.04 VPS

set -e

DOMAIN="plotsgurgaon.in"
APP_DIR="/var/www/plotsgurgaon"
REPO_DIR="/var/repo/plotsgurgaon.git"
LOG_DIR="/var/log/pm2/plotsgurgaon"

echo "============================================"
echo "  Hostinger VPS Setup for Next.js + Sanity"
echo "============================================"

# 1. Update system
echo "[1/12] Updating system packages..."
apt update && apt upgrade -y

# 2. Install Node.js 20 (LTS)
echo "[2/12] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v && npm -v

# 3. Install Nginx
echo "[3/12] Installing Nginx..."
apt install -y nginx
systemctl enable nginx
systemctl start nginx

# 4. Install Certbot for SSL
echo "[4/12] Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# 5. Install PM2 globally
echo "[5/12] Installing PM2..."
npm install -g pm2
pm2 startup systemd -u root --hp /root

# 6. Install Fail2ban
echo "[6/12] Installing Fail2ban..."
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 7. Create directories
echo "[7/12] Creating app directories..."
mkdir -p "$APP_DIR" "$REPO_DIR" "$LOG_DIR" /var/www/certbot
chown -R www-data:www-data "$APP_DIR"
chown -R www-data:www-data "$LOG_DIR"

# 8. Setup bare Git repo
echo "[8/12] Setting up bare Git repository..."
cd "$REPO_DIR"
git init --bare

# 9. Firewall (UFW)
echo "[9/12] Configuring UFW firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# 10. SSH hardening (optional — run manually if you have SSH keys set up)
echo "[10/12] SSH hardening config written to /etc/ssh/sshd_config.d/hardening.conf"
cat > /etc/ssh/sshd_config.d/hardening.conf << 'EOF'
# Disable root login
PermitRootLogin no
# Disable password auth (only SSH keys)
PasswordAuthentication no
PubkeyAuthentication yes
# Limit sessions
MaxAuthTries 3
MaxSessions 2
# Disable empty passwords
PermitEmptyPasswords no
EOF

echo "     NOTE: Restart SSH manually AFTER verifying key-based auth works:"
echo "     systemctl restart sshd"

# 11. Create .env.production template
echo "[11/12] Creating .env.production template..."
cat > "$APP_DIR/.env.production" << 'EOF'
# Next.js
NODE_ENV=production
PORT=3000

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
SANITY_API_READ_TOKEN=your_read_token
SANITY_STUDIO_URL=https://your-studio-url.sanity.studio

# Contact / Email
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=info@plotsgurgaon.in

# WhatsApp
WHATSAPP_NUMBER=919311122787
EOF
chmod 600 "$APP_DIR/.env.production"
chown www-data:www-data "$APP_DIR/.env.production"

echo "[12/12] Setup complete!"
echo ""
echo "=========================================="
echo "  NEXT STEPS:"
echo "=========================================="
echo ""
echo "1. Add your SSH public key to ~/.ssh/authorized_keys"
echo "2. Test SSH key login, then: systemctl restart sshd"
echo "3. Copy ecosystem.config.js to $APP_DIR/"
echo "4. Copy nginx config to /etc/nginx/sites-available/"
echo "5. Edit $APP_DIR/.env.production with real secrets"
echo "6. Add Git remote on local:"
echo "   git remote add production root@YOUR_VPS_IP:/var/repo/plotsgurgaon.git"
echo "7. Push: git push production main"
echo "8. Get SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
