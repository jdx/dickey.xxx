var app = require('express').Router()
var github = require('../../../services/github')

app.get('/', function (req, res, next) {
  github.user(req.auth.token, function (err, user) {
    if (err) { return next(err) }
    res.json(user)
  })
})

module.exports = app
