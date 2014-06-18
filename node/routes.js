var app = require('express').Router()
var api = require('./controllers/api')
var github = require('./controllers/github')

app.use('/api', api)
app.use('/github', github)

app.get('*', function (req, res) {
  res.render('../layout')
})

module.exports = app
