var express = require('express')
var app = express.Router()
var request = require('request')

app.get('/tweets', function (req, res) {
  //request.get({
    //url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
    //qs: { screen_name: 'dickeyxxx' },
    //json: true,
    //headers: {
      //'Authorization': 'OAuth oauth_consumer_key="4NFEeFYDJ61NnUn58XYPnlsxa", oauth_nonce="09dc68d395ec193bb2988c68b2a040fe", oauth_signature="%2Bu3675sK5ZnYBzSFkvTk3rK5u5Y%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1403086888", oauth_token="2432-0EDYKlzKyMv1b24juJRYiWk8y8v0J3xSy0oVjxoGQ237X", oauth_version="1.0"'
    //}
  //}, function (err, data) {
    //if (err) { throw err }
    //res.json(data)
  //})
  res.send('NOT WORKING')
})

module.exports = app
