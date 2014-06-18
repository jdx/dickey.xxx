var express = require('express')
var app = express.Router()
var Post = require('./models/post')

app.get('/posts.json', function (req, res) {
  Post.find(function (err, posts) {
    if (err) { throw err }
    res.json(posts)
  })
})

app.post('/posts.json', function (req, res) {
  var post = new Post({url: req.body.url})
  post.save(function (err) {
    if (err) { throw err }
    res.send(201)
  })
})

module.exports = app
