var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

var nodemonOpts = { script: 'node/server.js',
                    ext: 'js',
                    ignore: ['ng*', 'gulp*', 'assets*'] }

gulp.task('server', function () {
  nodemon(nodemonOpts)
})

gulp.task('server:prod', ['rev'], function () {
  process.env.NODE_ENV = 'production'
  nodemonOpts.script = 'node/boot.js'
  nodemon(nodemonOpts)
})
