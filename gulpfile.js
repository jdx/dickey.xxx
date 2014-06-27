var gulp = require('gulp')
var fs = require('fs')

fs.readdirSync('gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('test', ['lint'])
gulp.task('build', ['rev'])
gulp.task('dev', ['watch:stylus', 'watch:js', 'watch:templates', 'server'])
