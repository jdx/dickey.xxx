var request = require('request')
var _ = require('lodash')
var Q = require('q')

exports.getAccessToken = function (code) {
  var deferred = Q.defer()
  request.post({
    url: 'https://github.com/login/oauth/access_token',
    json: true,
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }
  }, function(err, _, data) {
    if (err) { return deferred.reject(err) }
    deferred.resolve(data.access_token)
  })
  return deferred.promise
}

exports.user = function (accessToken) {
  var deferred = Q.defer()
  request.get({
    url: 'https://api.github.com/user',
    json: true,
    headers: { 'User-Agent': 'xxx', 'Authorization': 'token ' + accessToken }
  }, function (err, request, user) {
    if (err) { return deferred.reject(err) }
    deferred.resolve(user)
  })
  return deferred.promise
}

function uniqueify (events) {
  return _.uniq(events, function (event) {
    return event.type + event.repo.id
  })
}

exports.fetchPublicEventsFor = function fetchPublicEventsFor(username) {
  var deferred = Q.defer()
  request.get({
    url: 'https://api.github.com/users/' + username + '/events/public',
    json: true,
    headers: { 'User-Agent': 'xxx' }
  }, function (err, _, events) {
    if (err) { return deferred.reject(err) }
    deferred.resolve(uniqueify(events))
  })
  return deferred.promise
}
