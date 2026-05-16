module.exports = {
  apps: [{
    name: 'plotsgurgaon',
    script: './node_modules/next/dist/bin/next',
    args: 'start',
    instances: 'max',           // Use all CPU cores (cluster mode)
    exec_mode: 'cluster',
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    // Auto-restart on crash
    autorestart: true,
    // Restart max 10 times in 60 seconds, then mark as ERRORED
    max_restarts: 10,
    min_uptime: '10s',
    // Don't restart if crashing too fast
    exp_backoff_restart_delay: 2500,
    // Logs
    log_file: '/var/log/pm2/plotsgurgaon/combined.log',
    out_file: '/var/log/pm2/plotsgurgaon/out.log',
    error_file: '/var/log/pm2/plotsgurgaon/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    // Graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 8000,
    // Zero-downtime reload
    wait_ready: true,
  }],
};
