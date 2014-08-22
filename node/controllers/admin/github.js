var app = require('express').Router()
var url = require('url')
var jwt = require('jsonwebtoken')
var github = require('../../services/github')
var config = require('../../config')

app.get('/auth', function (req, res) {
  res.redirect(url.format({
    host: 'github.com',
    pathname: '/login/oauth/authorize',
    query: {
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: process.env.GITHUB_REDIRECT_URI
    }
  }))
})

app.get('/auth/callback', function (req, res, next) {
  var accessToken
  github.getAccessToken(req.query.code)
  .then(function (token) {
      accessToken = token
      return github.user(token)
  })
  .then(function (user) {
    res.redirect(
      url.format({
      pathname: '/admin',
      query: {
        jwt: jwt.sign({
          github: user.login,
          token: accessToken
        }, config.secretKey)
      }
    }))
  })
  .catch(function (err) { next(err) })
  .done()
})

module.exports = app
