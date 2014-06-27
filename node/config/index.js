var _ = require('lodash')
var env = process.env.NODE_ENV || 'development'

var baseConfig = {
  port:        process.env.PORT || 3000,
  env:         env,
  development: env === 'development',
  test:        env === 'test',
  staging:     env === 'staging',
  production:  env === 'production',
  workerCount: process.env.WORKER_COUNT || 2,
  assets:      { rev: false },
  secretKey:   process.env.SECRET_KEY || '12345',
  github: {
    redirectUri: process.env.GITHUB_REDIRECT_URI,
    clientId:    process.env.GITHUB_CLIENT_ID,
    secretKey:   process.env.GITHUB_SECRET_KEY
  }
}

var envConfig = require('./' + env)

module.exports = _.merge(baseConfig, envConfig)
