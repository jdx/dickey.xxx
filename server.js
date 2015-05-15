'use strict';
var koa    = require('koa');
var morgan = require('koa-morgan');
var app    = koa();

app.use(morgan.middleware('combined'));

app.use(require('koa-static')('./public'));

app.use(function* () {
  this.redirect('https://medium.com/@dickeyxxx');
});

app.listen(process.env.PORT || 8080);
