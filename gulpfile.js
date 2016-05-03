const gulp = require('gulp'),
    browserify = require('browserify');

gulp.task('bundle-modules', function() {
    return browserify('./app/main.js')
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.'));
})
