var app = require('express').Router()
var config = require('../config')

if (!config.development) {
  var rev = require('../../assets/rev-manifest.json')
}

app.get('/', function (req, res) {
  res.render('../layout.html.ejs', {rev: rev, config: config})
})

module.exports = app
