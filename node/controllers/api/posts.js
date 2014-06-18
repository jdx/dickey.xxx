var express = require('express')
var app = express.Router()
var Post = require('../../models/post')

app.get('/posts', function (req, res, next) {
  Post
  .find({ published: { $lte: new Date() } })
  .sort('-published')
  .exec(function (err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

module.exports = app
