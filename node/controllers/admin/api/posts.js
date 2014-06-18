var embedly = require('../../../embedly')
var vasync = require('vasync')
var app = require('express').Router()
var Post = require('../../../models/post')

app.get('/', function (req, res, next) {
  Post
  .find()
  .sort('-published')
  .exec(function (err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

app.get('/:id', function (req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})

app.post('/:id/unpublish', function (req, res, next) {
  Post.findByIdAndUpdate(req.params.id, { $set: { published: null } }, function(err, post) {
    if (err) { next(err) }
    res.json(post)
  })
})

app.post('/:id/publish', function (req, res, next) {
  Post.findByIdAndUpdate(req.params.id, { $set: { published: new Date() } }, function(err, post) {
    if (err) { next(err) }
    res.json(post)
  })
})

app.put('/:id', function (req, res, next) {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})

app.post('/', function (req, res, next) {
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
        post.entities         = embedly.entities.map(function (e) { return e.name })
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
