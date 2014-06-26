var app = require('express').Router()
var Q = require('q')
var github = require('../../services/github')
var redis = require('../../redis')

app.get('/github/events', function (req, res, next) {
  var cachekey = 'github:events'
  res.setHeader('Cache-Control', 'public, max-age=3600')
  Q.ninvoke(redis, 'get', cachekey)
  .then(function (events) {
    if (events) {
      res.json(JSON.parse(events))
    } else {
      github.fetchPublicEventsFor('dickeyxxx')
      .then(function (events) {
        redis.setex(cachekey, 21600, JSON.stringify(events))
        res.json(events)
      })
    }
  })
  .catch(function (err) { next(err) })
  .done()
})

module.exports = app
