var app = require('express').Router()
var github = require('../../../services/github')

app.get('/', function (req, res, next) {
  github.user(req.auth.token)
  .then(function (user) {
    res.json(user)
  })
  .catch(function (err) { next(err) })
  .done()
})

module.exports = app
