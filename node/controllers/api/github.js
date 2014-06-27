var app = require('express').Router()
var Q = require('q')
var github = require('../../services/github')
var redis = require('../../redis')

app.get('/github/events', function (req, res, next) {
  var cachekey = 'github:events'
  var recache = false
  res.setHeader('Cache-Control', 'public, max-age=3600')
  Q.ninvoke(redis, 'get', cachekey)
  .then(function (eventsJson) {
    if (eventsJson) {
      return JSON.parse(eventsJson)
    } else {
      recache = true
      return github.fetchPublicEventsFor('dickeyxxx')
    }
  })
  .then(function (events) {
    res.json(events)
    if (recache) {
      redis.setex(cachekey, 21600, JSON.stringify(events))
    }
  })
  .catch(function (err) { next(err) })
  .done()
})

module.exports = app
