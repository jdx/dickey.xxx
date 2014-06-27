var request = require('supertest')
var app = require('../../server')

describe('GET /api/posts', function () {
  it('responds with posts', function (done) {
    request(app)
    .get('/api/posts')
    .expect([])
    .expect(200, done)
  })
})
