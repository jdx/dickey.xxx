var jwt = require('jwt-simple')

module.exports = function () {
  return function (req, res, next) {
    var header = req.headers.authorization
    if (header) {
      header = header.split(' ', 2)
      var token = header[1]
      req.auth = jwt.decode(token, process.env.SECRET_KEY)
      req.authenticated = req.auth.github === 'dickeyxxx'
    }
    return next()
  }
}
