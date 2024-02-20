module.exports = {
  apps: [{
    name: 'tag-injection',
    script: '.',
    instances: 2,
    log_date_format: 'YYYY-MM-DDTHH:mm:ss.SSS',
    wait_ready: true,
    exec_mode: 'cluster',
    env_dev: {
      NODE_ENV: 'production',
      API_URL: 'https://dev.vpop-pro.com',
      APP_URL: 'https://dev-app.vpop-pro.com'
    },
    env_beta: {
      NODE_ENV: 'production',
      API_URL: 'https://dev.vpop-pro.com',
      APP_URL: 'https://beta-app.vpop-pro.com'
    },
    env_production: {
      NODE_ENV: 'production',
      API_URL: 'https://dev.vpop-pro.com',
      APP_URL: 'https://app.vpop-pro.com'
    }
  }],

  deploy: {
    dev: {
      user: 'vpop',
      host: 'dev-app.vpop-pro.com',
      ref: 'origin/referral-workflow',
      repo: 'git@github.com:nickhingston/tag-injection.git',
      path: '/home/vpop/tag-injection',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production --update-env'
    },
    beta: {
      user: 'vpop',
      host: 'beta-app.vpop-pro.com',
      ref: 'origin/referral-workflow',
      repo: 'git@github.com:nickhingston/tag-injection.git',
      path: '/home/vpop/tag-injection',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production --update-env'
    },
    production: {
      user: 'vpop',
      host: 'app.vpop-pro.com',
      ref: 'origin/master',
      repo: 'git@github.com:nickhingston/tag-injection.git',
      path: '/home/vpop/tag-injection',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production --update-env'
    }
  }
}