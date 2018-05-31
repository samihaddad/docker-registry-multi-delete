var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    return gulp.src('content.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    });
});