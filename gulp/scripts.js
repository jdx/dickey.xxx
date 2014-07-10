var gulp       = require('gulp')
var concat     = require('gulp-concat')
var jshint     = require('gulp-jshint')
var uglify     = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var ngAnnotate = require('gulp-ng-annotate')

var lintable = ['**/*.js', '!node_modules/**', '!assets/**']
gulp.task('lint', function () {
  return gulp.src(lintable)
    .pipe(jshint())
})

gulp.task('concat:xxx:js', function () {
  return gulp.src(['ng/xxx/module.js', 'ng/xxx/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('xxx.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets'))
})

gulp.task('concat:admin:js', function () {
  return gulp.src(['ng/admin/module.js', 'ng/admin/**/*.js'])
    .pipe(concat('admin.js'))
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['concat:js', 'lint'], function () {
  gulp.watch('ng/xxx/**/*.js', ['concat:xxx:js'])
  gulp.watch('ng/admin/**/*.js', ['concat:admin:js'])
  gulp.watch(lintable, ['lint'])
})

gulp.task('concat:js', ['concat:admin:js', 'concat:xxx:js'])
