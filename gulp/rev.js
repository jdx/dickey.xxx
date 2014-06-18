var gulp = require('gulp')
var rev = require('gulp-rev')

gulp.task('rev', ['minify:js', 'minify:css'], function () {
  return gulp.src(['assets/xxx.css',
                   'assets/admin.css',
                   'assets/xxx.js',
                   'assets/xxx-templates.js',
                   'assets/admin-templates.js',
                   'assets/admin.js'], {base: 'assets'})
    .pipe(gulp.dest('assets'))
    .pipe(rev())
    .pipe(gulp.dest('assets'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('assets'))
})
