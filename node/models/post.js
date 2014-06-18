var db = require('../db')

var Post = db.model('Post', {
  url: String,
  date: Date
})

module.exports = Post;
