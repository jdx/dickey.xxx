var app = require('express').Router()
var api = require('./api')
var admin = require('./admin')
var static = require('./static')
var home = require('./home')

app.use(home)
app.use(static)
app.use('/api', api)
app.use('/admin', admin)
app.use(require('./posts'))

module.exports = app
