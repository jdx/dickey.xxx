var mongoose = require('mongoose')

var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/xxx-dev'
mongoose.connect(uri, function () {
  console.log('connected to', uri)
})

module.exports = mongoose
