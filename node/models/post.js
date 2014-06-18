var db = require('../db')

var Post = db.model('Post', {
  url:              { type: String, required: true },
  title:            { type: String, required: true },
  description:      { type: String, required: true },
  type:             { type: String, required: true },
  published:        { type: Date, default: Date.now, index: true },
  provider:         { type: {}, default: {} },
  images:           { type: [] },
  entities:         { type: [] }
})

module.exports = Post
