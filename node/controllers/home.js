var app = require('express').Router()

app.get('/', function (req, res) {
  res.render('home.html.ejs')
})

module.exports = app
