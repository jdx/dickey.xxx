var app = require('express').Router()
var url = require('url')
var jwt = require('jwt-simple')
var github = require('../../services/github')
var vasync = require('vasync')
var config = require('../../config')

app.get('/auth', function (req, res) {
  res.redirect(url.format({
    host: 'github.com',
    pathname: '/login/oauth/authorize',
    query: {
      client_id: config.github.clientId,
      redirect_uri: config.github.redirectUri
    }
  }))
})

app.get('/auth/callback', function (req, res, next) {
  var accessToken
  vasync.waterfall([
    function (callback) {
      github.getAccessToken(req.query.code, callback)
    },
    function (token, callback) {
      accessToken = token
      github.user(token, callback)
    }
  ], function (err, user) {
    if (err) { return next(err) }
    res.redirect(
      url.format({
      pathname: '/admin',
      query: {
        jwt: jwt.encode({
          github: user.login,
          token: accessToken
        }, config.secretKey)
      }
    }))
  })
})

module.exports = app
