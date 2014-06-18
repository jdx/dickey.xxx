var gulp = require('gulp')
var templateCache = require('gulp-angular-templatecache')

gulp.task('templates:xxx', function () {
  return gulp.src('templates/xxx/**/*.html')
    .pipe(templateCache('xxx-templates.js', {
      standalone: true,
      module: 'xxxTemplates'
    }))
    .pipe(gulp.dest('assets'))
})

gulp.task('templates:admin', function () {
  return gulp.src('templates/admin/**/*.html')
    .pipe(templateCache('admin-templates.js', {
      standalone: true,
      module: 'adminTemplates'
    }))
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:templates', ['templates:xxx', 'templates:admin'], function () {
  gulp.watch('templates/xxx/**/*.html', ['templates:xxx'])
  gulp.watch('templates/admin/**/*.html', ['templates:admin'])
})
