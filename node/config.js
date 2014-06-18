var env = process.env.NODE_ENV || 'development'

module.exports = {
  port:        process.env.PORT || 3000,
  env:         env,
  development: env === 'development',
  staging:     env === 'staging',
  production:  env === 'production'
}
