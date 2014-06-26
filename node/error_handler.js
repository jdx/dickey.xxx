module.exports = function () {
  return function errorHandler (err, req, res, next) {
    res.send(500, 'Something broke')
  }
}
