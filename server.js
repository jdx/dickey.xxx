var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(302, {'Location': 'https://medium.com/@dickeyxxx'});
  res.end();
});

server.listen(process.env.PORT || 8080);
