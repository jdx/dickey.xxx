var mongoose = require('mongoose')

var uri = process.env.MONGOHQ_URL || 'mongodb://localhost/xxx-dev'
mongoose.connect(uri, function () {
  console.log('connected to', uri)
})

module.exports = mongoose
