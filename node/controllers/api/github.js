var app = require('express').Router()
var github = require('../../github')
var redis = require('../../redis')

app.get('/github/events', function (req, res, next) {
  var cachekey = 'github:events'
  res.setHeader('Cache-Control', 'public, max-age=3600')
  redis.get(cachekey, function (err, events) {
    if (err || !events) {
      github.fetchPublicEventsFor('dickeyxxx', function (err, events) {
        if (err) { return next(err) }
        redis.setex(cachekey, 21600, JSON.stringify(events))
        res.json(events)
      })
    } else {
      res.json(JSON.parse(events))
    }
  })
})

module.exports = app
