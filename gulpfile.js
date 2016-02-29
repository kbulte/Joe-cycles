var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

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
    
    //inject local dependencies via gulp-inject where it finds comment <!-- inject:js -->
                                                                     //<!-- inject:css -->
                                                                     //<!-- endinject -->
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });
    var injectOptions = {
        ignorePath: '/public'
    };
    
    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

 gulp.task('serve', ['style', 'inject'], function(){
     
     var options = {
        script : 'app.js',
        delayTime : '1',
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };
    
    return nodemon(options)
        .on('restart', function(ev){
            console.log('Restarting...');
        });
 });