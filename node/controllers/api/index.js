var app = require('express').Router()

app.use('/posts', require('./posts'))
app.use(require('./github'))

module.exports = app
