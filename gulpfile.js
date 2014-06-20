var gulp = require('gulp')
var fs = require('fs')

fs.readdirSync('gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('test', ['lint'])
gulp.task('build', ['rev'])
gulp.task('default', ['watch:stylus', 'watch:js', 'watch:templates', 'server'])
