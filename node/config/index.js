var _ = require('lodash')
var env = process.env.NODE_ENV || 'development'

var baseConfig = {
  port:        process.env.PORT || 3000,
  env:         env,
  development: env === 'development',
  staging:     env === 'staging',
  production:  env === 'production',
  workerCount: process.env.WORKER_COUNT || 2,
  assets: { rev: false }
}

var envConfig = require('./' + env)

module.exports = _.merge(baseConfig, envConfig)
