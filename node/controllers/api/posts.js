var Q      = require('q')
var router = require('express').Router()
var Post   = require('../../models/post')
var github = require('../../services/github')

router.get('/', function (req, res, next) {
  Post
  .find({ published: { $lte: new Date() } })
  .sort('-published')
  .exec(function (err, posts) {
    if (err) { return next(err) }
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.json(posts)
  })
})

router.get('/:slug', function (req, res, next) {
  var post
  Q.ninvoke(Post, 'findOne', {slug: req.params.slug})
  .then(function (p) {
    if (!p) { return next() }
    post = p
    return github.gist(post.contentUrl)
  })
  .then(function (gist) {
    return res.json({
      title: post.title,
      body: gist
    })
  })
  .catch(function (err) { next(err) })
  .done()
})

module.exports = router
