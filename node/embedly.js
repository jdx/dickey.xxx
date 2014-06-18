var request = require('request')

exports.extract = function (postUrl, cb) {
  request.get({
    url: 'http://api.embed.ly/1/extract',
    json: true,
    qs: { key: process.env.EMBEDLY_KEY, url: postUrl }
  }, function (err, response) {
    if (err) { return cb(err) }
    cb(null, response.body)
  })
}
