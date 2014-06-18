var app = require('express').Router()
var github = require('../github')

app.use(require('./posts'))
app.use(require('./twitter'))
app.use(require('./github'))

module.exports = app
