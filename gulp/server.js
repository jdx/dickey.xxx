var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('server', function () {
  nodemon({ script: 'node/server.js',
            ext: 'html js',
            ignore: ['ng*', 'gulp*', 'node/public*'] })
    .on('change', ['lint'])
})
