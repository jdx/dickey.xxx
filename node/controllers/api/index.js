var app = require('express').Router()

app.use(require('./posts'))
app.use(require('./github'))

module.exports = app
