var app = require('express').Router()
var github = require('./github')
var api = require('./api')

app.use('/github', github)
app.use('/api', api)

app.get('*', function (req, res) {
  res.render('admin.html.ejs')
})

module.exports = app
