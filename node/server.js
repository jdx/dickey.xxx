var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var api = require('./api')

var app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.use(bodyParser())
app.use(morgan())
app.use(express.static(__dirname + '/../public'))

app.use('/api', api)

app.get('/', function (req, res) {
  res.render('app')
})

var port = process.env.port || 3000
app.listen(port, function () { console.log('listening on', port) })
