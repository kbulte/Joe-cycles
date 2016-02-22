var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    
    //Src emits files matching provided glob or an array of globs. Returns a stream of Vinyl files that can be piped to plugins.
    
    return gulp.src(jsFiles) //return the stream so it can be used as a subtask
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    
    //wiredep checks bower.json dependencies and injects bower dependencies where it finds comment <!-- bower:js -->
                                                                                                 //<!-- bower:css -->
                                                                                                 //<!-- endbower -->
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson : require('./bower.json'),
        directory : './public/lib',
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(gulp.dest('./src/views'));
});