var express = require('express')
var app = express.Router()
var config = require('../config')

var maxAge = config.development ? 0 : 31536000000
app.use(express.static(__dirname + '/../../assets', {maxAge: maxAge}))
app.use(express.static(__dirname + '/../../public'))

module.exports = app
