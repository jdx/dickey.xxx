var jwt = require('jsonwebtoken')
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
    next()
  }
}

module.exports.requireAdmin = function() {
  return function (req, res, next) {
    if (!req.admin) { return res.send(401) }
    next()
  }
}
