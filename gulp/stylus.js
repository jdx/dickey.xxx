var gulp = require('gulp')
var stylus = require('gulp-stylus')

gulp.task('build:css', function () {
  return gulp.src('css/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('public'))
})

gulp.task('watch:css', ['build:css'], function () {
  gulp.watch('css/**/*', ['build:css'])
})
