module.exports = {
  apps : [
    {
      script: 'app.cjs',
      watch: true,
      env: {
        NODE_PORT: 3222
      }
    },
    {
      script: 'users-sqlite.cjs',
      max_restarts: 3,
      watch: true,
      env: {
        NODE_PORT: 3001
      }
    }
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': ''
    }
  }
};