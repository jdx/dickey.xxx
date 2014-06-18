var app = require('express')()
var morgan = require('morgan')
var bodyParser = require('body-parser')
var config = require('./config')

if (config.development) {
  app.use(morgan('dev')) // show colored, concise logs in dev
} else {
  app.use(morgan())
}

app.set('views', __dirname + '/../layouts')

app.locals.assets = require('./assets')
app.locals.config = config

app.use(bodyParser())
app.use(require('./controllers'))

app.listen(config.port, function () {
  console.log('[', config.env, ']', 'listening on', config.port)
})
