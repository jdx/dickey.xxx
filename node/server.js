var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
var responseTime = require('response-time')
var config = require('./config')
var routes = require('./routes')
var authentication = require('./authentication')

var app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.use(responseTime())
app.use(favicon(__dirname + '/../public/favicon.ico'))
app.use(morgan())
app.use(bodyParser())
app.use(express.static(__dirname + '/../public'))
app.use(authentication())

app.locals.config = config

app.use(routes)

var port = process.env.port || 3000
app.listen(port, function () {
  console.log('listening on', port, 'with settings', app.settings)
})
