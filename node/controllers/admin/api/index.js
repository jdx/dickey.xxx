var app = require('express').Router()
var authz = require('../../../authz')

app.use(authz('dickeyxxx'))
app.use(authz.requireAdmin())
app.use('/posts', require('./posts'))
app.use('/user', require('./user'))

module.exports = app
