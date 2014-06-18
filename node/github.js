var request = require('request')

exports.getAccessToken = function (code, callback) {
  request.post({
    url: 'https://github.com/login/oauth/access_token',
    json: true,
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }
  }, function(err, _, data) {
    if (err) { return callback(err) }
    callback(null, data.access_token)
  })
}

exports.user = function (accessToken, callback) {
  request.get({
    url: 'https://api.github.com/user',
    json: true,
    headers: { 'User-Agent': 'xxx', 'Authorization': 'token ' + accessToken }
  }, function (err, request, user) {
    callback(err, user)
  })
}

exports.fetchPublicEventsFor = function (username, callback) {
  request.get({
    url: 'https://api.github.com/users/' + username + '/events/public',
    json: true,
    headers: { 'User-Agent': 'xxx' }
  }, function (err, request, events) {
    if (err) { return callback(err) }
    callback(null, events)
  })
}
