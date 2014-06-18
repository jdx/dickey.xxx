var gulp = require('gulp')
var clean = require('gulp-clean')

gulp.task('clean', function () {
  gulp.src('assets/**/*', {read: false})
    .pipe(clean())
    .pipe(gulp.dest('assets'))
})
