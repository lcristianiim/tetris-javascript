const
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify');

gulp.task('bundle-modules', function() {
    return browserify('./app/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('default', function () {
    gulp.watch('lib/*js', ['bundle-modules']);
    gulp.watch('app/main.js', ['bundle-modules']);
});
