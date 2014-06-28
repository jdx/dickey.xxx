var embedly = require('../../../services/embedly')
var Q = require('q')
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

app.put('/:id', function (req, res, next) {
  delete req.body._id
  Q.ninvoke(Post, 'findById', req.params.id)
  .then(function (post) {
    post.title            = req.body.title
    post.description      = req.body.description
    post.slug             = req.body.slug
    post.date             = req.body.date
    post.provider_name    = req.body.provider_name
    post.provider_display = req.body.provider_display
    post.provider_url     = req.body.provider_url
    return Q.ninvoke(post, 'save')
  })
  .then(function (post) {
    res.json(post[0])
  })
  .catch(function (err) { next(err) })
  .done()
})

app.post('/', function (req, res, next) {
  var post = new Post({contentUrl: req.body.url})
  Q.ninvoke(Post, 'findOne', {contentUrl: req.body.url})
  .then(function (p) {
      if (p) { post = p }
      return embedly.extract(post.contentUrl)
  })
  .then(function (info) {
    post.title            = info.title
    post.description      = info.description
    post.type             = info.type
    post.published        = info.published || new Date()
    post.provider.name    = info.provider_name
    post.provider.display = info.provider_display
    post.provider.url     = info.provider_url
    post.entities         = info.entities
    post.images           = info.images
    post.url              = info.url
    return Q.ninvoke(post, 'save')
  })
  .then(function (post) {
    res.json(post[0])
  })
  .catch(function (err) { next(err) })
  .done()
})


module.exports = app
