var express = require('express')
var app = express.Router()
var vasync = require('vasync')
var embedly = require('../embedly')
var Post = require('../models/post')

app.get('/posts', function (req, res) {
  Post.find({
    published: { $lte: new Date() }
  }).sort('-published')
  .exec(function (err, posts) {
    if (err) { throw err }
    res.json(posts)
  })
})

app.get('/posts/:id', function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) { throw err }
    res.json(post)
  })
})

app.post('/posts/:id/unpublish', function (req, res) {
  Post.findByIdAndUpdate(req.params.id, { $set: { published: null } }, function(err, post) {
    if (err) { throw err }
    res.json(post)
  })
})

app.post('/posts/:id/publish', function (req, res) {
  Post.findByIdAndUpdate(req.params.id, { $set: { published: new Date() } }, function(err, post) {
    if (err) { throw err }
    res.json(post)
  })
})

app.post('/posts', function (req, res) {
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
    if (err) { throw err }
    res.json(post)
  })
})

module.exports = app
