var redis = require('redis')
var client;
if (process.env.REDISTOGO_URL) {
  var url = require('url').parse(process.env.REDISTOGO_URL)
  client = redis.createClient(url.port, url.hostname)
  client.auth(url.auth.split(':')[1])
} else {
  client = redis.createClient()
}

client.on('error', function (err) {
  console.log(err)
})

module.exports = client
