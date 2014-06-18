var embedly = require('../../embedly')
var vasync = require('vasync')
var app = require('express').Router()
var Post = require('../../models/post')

app.get('/posts', function (req, res, next) {
  Post
  .find()
  .sort('-published')
  .exec(function (err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

app.get('/posts/:id', function (req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})

app.post('/posts/:id/unpublish', function (req, res, next) {
  if (!req.authenticated) { return res.send(401) }
  Post.findByIdAndUpdate(req.params.id, { $set: { published: null } }, function(err, post) {
    if (err) { next(err) }
    res.json(post)
  })
})

app.post('/posts/:id/publish', function (req, res, next) {
  if (!req.authenticated) { return res.send(401) }
  Post.findByIdAndUpdate(req.params.id, { $set: { published: new Date() } }, function(err, post) {
    if (err) { next(err) }
    res.json(post)
  })
})

app.post('/posts', function (req, res, next) {
  if (!req.authenticated) { return res.send(401) }
  vasync.waterfall([
    function (callback) {
      Post.findOne({url: req.body.url}, callback)
    },
    function (post, callback) {
      callback(null, post || new Post({url: req.body.url}))
    },
    function (post, callback) {
      embedly.extract(post.url, function (err, embedly) {
        if (err) { return callback(err) }
        post.title            = embedly.title
        post.description      = embedly.description
        post.type             = embedly.type
        post.published        = embedly.published || new Date()
        post.provider.name    = embedly.provider_name
        post.provider.display = embedly.provider_display
        post.provider.url     = embedly.provider_url
        post.entities         = embedly.entities
        post.images           = embedly.images
        callback(null, post)
      })
    },
    function (post, callback) {
      post.save(callback)
    }
  ], function (err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})


module.exports = app