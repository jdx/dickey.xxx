var gulp = require('gulp')
var fs = require('fs')

fs.readdirSync('gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('build', ['build:js', 'build:css'])
gulp.task('default', ['watch:js', 'watch:css', 'server'])
