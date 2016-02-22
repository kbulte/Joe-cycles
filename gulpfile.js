var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    
    //Emits files matching provided glob or an array of globs. Returns a stream of Vinyl files that can be piped to plugins.
    return gulp.src(jsFiles) //return the stream so it can be used as a subtask
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});