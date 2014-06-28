var request = require('request')
var _ = require('lodash')
var Q = require('q')
var config = require('../config')
var get  = Q.denodeify(request.get)
var post = Q.denodeify(request.post)

var creds = {
  client_id: config.github.clientId,
  client_secret: config.github.clientSecret
}

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

exports.gist = function (url) {
  var gist
  return get({
    url: 'https://api.github.com/gists/' + url.split('/')[4],
    json: true,
    qs: creds,
    headers: { 'User-Agent': 'xxx' }
  })
  .then(function (response) {
    gist = response[1]
    gist.rawUrl = _.values(gist.files)[0].raw_url
    return get(gist.rawUrl)
  })
  .then(function (response) {
    gist.body = response[1]
    return post({
      url: 'https://api.github.com/markdown',
      qs: creds,
      headers: { 'User-Agent': 'xxx' },
      json: { text: gist.body }
    })
  })
  .then(function (response) {
    return response[1]
  })
}
