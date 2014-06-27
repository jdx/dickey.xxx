var config = require('./config')
var mongoose = require('mongoose')

var uri = config.mongo.uri
mongoose.connect(uri, function () {
  console.log('connected to', uri)
})

module.exports = mongoose
