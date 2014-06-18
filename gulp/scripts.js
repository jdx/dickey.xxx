var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('build:js', ['lint'], function () {
  return gulp.src(['ng/module.js', 'ng/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('watch:js', ['build:js'], function () {
  gulp.watch('ng/**/*.js', ['build:js'])
})
