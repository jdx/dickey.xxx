var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var favicon = require('static-favicon')
var responseTime = require('response-time')
var api = require('./api')
var config = require('./config')

var app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.use(responseTime())
app.use(favicon())
app.use(morgan())
app.use(bodyParser())
app.use(express.static(__dirname + '/../public'))

app.locals.config = config

app.use('/api', api)

app.get('*', function (req, res) {
  res.render('../layout')
})

var port = process.env.port || 3000
app.listen(port, function () {
  console.log('listening on', port, 'with settings', app.settings)
})
