var app = require('express').Router()

app.use(require('./github'))
app.use(require('./posts'))

module.exports = app
