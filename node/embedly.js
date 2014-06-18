var request = require('request')

exports.extract = function (postUrl, cb) {
  request.get({
    url: 'http://api.embed.ly/1/extract',
    json: true,
    qs: { key: '76cdabdefa9c4817a8968f170bebc176', url: postUrl }
  }, function (err, response) {
    if (err) { return cb(err) }
    cb(null, response.body)
  })
}
