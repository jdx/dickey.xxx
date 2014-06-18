var express = require('express')
var app = express.Router()

app.use(require('./posts'))
app.use(require('./twitter'))

module.exports = app
