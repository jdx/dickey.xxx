var gulp = require('gulp')
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')
var cssmin = require('gulp-cssmin')

gulp.task('minify:js', ['concat:js', 'templates:admin', 'templates:xxx'], function () {
  return gulp.src(['assets/xxx.js',
                   'assets/xxx-templates.js',
                   'assets/admin.js',
                   'assets/admin-templates.js'])
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('assets'))
})

gulp.task('minify:css', ['compile:stylus'], function () {
  return gulp.src(['assets/admin.css', 'assets/xxx.css'])
    .pipe(cssmin())
    .pipe(gulp.dest('assets'))
})
