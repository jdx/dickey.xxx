var jwt = require('jwt-simple')
var config = require('./config')

module.exports = function (admin) {
  return function (req, res, next) {
    var header = req.headers.authorization
    if (header) {
      header = header.split(' ', 2)
      var token = header[1]
      req.auth = jwt.decode(token, config.secretKey)
      req.admin = req.auth.github === admin
    }
    return next()
  }
}

module.exports.requireAdmin = function() {
  return function (req, res, next) {
    if (!req.admin) { return res.redirect('/admin') }
    next()
  }
}
