var app = require('express').Router()
var config = require('../config')

if (config.assets.rev) {
  var rev = require('../../assets/rev-manifest.json')
}

var assets = function (base) {
  if (config.assets.rev) { base = rev[base] }
  base = '/' + base
  if (config.assets.host) { return config.assets.host + base }
  else { return base }
}

app.get('/', function (req, res) {
  res.render('../layout.html.ejs', {assets: assets, config: config})
})

module.exports = app
