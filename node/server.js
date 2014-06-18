var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
var responseTime = require('response-time')
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

app.use(routes)

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('listening on', port, 'with settings', app.settings)
})
