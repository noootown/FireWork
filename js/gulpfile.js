
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync=require('browser-sync');
gulp.task('build', function () {
    return browserify({entries: 'app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('../dist'))
        .pipe(browserSync.stream());
})

.task('watch', ['build'], function () {
    gulp.watch(['*.jsx','*.js','../css/*.css','../*.html'], ['build',browserSync.reload]);
})


.task('server', function() {
    browserSync.init({
        server: {
            baseDir: '..' 
        }
    });
})

.task('default',['server','watch']);
