var request = require('request')
var Q = require('q')

if (!process.env.EMBEDLY_KEY) throw 'EMBEDLY_KEY undefined!'

exports.extract = function (postUrl) {
  var deferred = Q.defer()
  request.get({
    url: 'http://api.embed.ly/1/extract',
    json: true,
    qs: { key: process.env.EMBEDLY_KEY, url: postUrl }
  }, function (err, response) {
    if (err) { return deferred.reject(err) }
    deferred.resolve(response.body)
  })
  return deferred.promise
}
