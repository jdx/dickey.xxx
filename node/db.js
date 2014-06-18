var mongoose = require('mongoose')

var uri = 'mongodb://localhost/xxx'
mongoose.connect(uri, function () {
  console.log('connected to', uri)
})

module.exports = mongoose
