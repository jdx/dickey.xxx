var router = require('express').Router()
var Q      = require('q')
var Post   = require('../models/post')

router.get('/:slug', function (req, res, next) {
  Q.ninvoke(Post, 'findOne', {slug: req.params.slug})
  .then(function (post) {
    if (!post) { return next() }
    res.render('post.html.ejs')
  })
  .catch(function (err) { next(err) })
  .done()
})

module.exports = router
