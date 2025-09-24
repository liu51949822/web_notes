module.exports = {
  apps: [
    {
      name: 'web_notes',
      script: 'npm',
      args: 'run start',
      instances: max,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        // 添加环境变量来控制Redis连接超时和重连策略
        REDIS_CONNECT_TIMEOUT: 5000,
        REDIS_RETRY_STRATEGY: true
      },
      // 启用详细日志记录以便排查问题
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './pm2-err.log',
      out_file: './pm2-out.log',
      combine_logs: true,
      // 增加启动超时时间
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 5000
    }
  ]
};