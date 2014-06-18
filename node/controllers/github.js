var app = require('express').Router()
var url = require('url')
var config = require('../config')
var jwt = require('jwt-simple')
var github = require('../github')
var vasync = require('vasync')

app.get('/auth', function (req, res) {
  res.redirect(url.format({
    host: 'github.com',
    pathname: '/login/oauth/authorize',
    query: {
      client_id: config.github.clientId,
      redirect_uri: config.github.redirect_uri
    }
  }))
})

app.get('/auth/callback', function (req, res, next) {
  vasync.waterfall([
    function (callback) {
      github.getAccessToken(req.query.code, callback)
    },
    function (accessToken, callback) {
      github.user(accessToken, callback)
    }
  ], function (err, user) {
    if (err) { return next(err) }
    res.redirect(
      url.format({
      pathname: '/admin',
      query: {
        jwt: jwt.encode({
          github: user.login
        }, config.secret)
      }
    }))
  })
})

module.exports = app
