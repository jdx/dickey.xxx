var gulp = require('gulp')
var stylus = require('gulp-stylus')
var plumber = require('gulp-plumber')

gulp.task('compile:stylus', function () {
  return gulp.src(['css/xxx.styl', 'css/admin.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:stylus', ['compile:stylus'], function () {
  gulp.watch('css/**/*.styl', ['compile:stylus'])
})
