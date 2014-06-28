var db = require('../db')
var config = require('../config')

var schema = new db.Schema({
  contentUrl:       { type: String, required: true },
  url:              { type: String, required: true },
  title:            { type: String, required: true },
  description:      { type: String, required: true },
  type:             { type: String, required: true },
  slug:             { type: String },
  published:        { type: Date, default: Date.now, index: true },
  provider:         { type: {}, default: {} },
  images:           { type: [] },
  entities:         { type: [] }
})

schema.pre('save', function (next) {
  var post = this
  if (post.slug) {
    post.url = config.baseUrl + '/' + post.slug
  } else {
    post.url = post.contentUrl
  }
  next()
})

module.exports = db.model('Post', schema)
