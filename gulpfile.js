var gulp = require('gulp')
var fs = require('fs')

fs.readdirSync('gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('build', ['lint', 'rev'])
gulp.task('default', ['watch:stylus', 'watch:js', 'watch:templates', 'server'])
