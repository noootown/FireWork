
var gulp = require('gulp');
var browserSync=require('browser-sync');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('build', function () {
    gulp.src('js/firework.js')
        .pipe(uglify({
            mangle:true,
            file:'main.min.js',
            preserveComments:'license'
        }))
        .pipe(rename('firework.min.js'))
        .pipe(gulp.dest('dist'));
})

.task('watch', ['build'], function () {
    gulp.watch(['js/*.js','*.html'], ['build',browserSync.reload]);
})


.task('server', function() {
    browserSync.init({
        server: {
            baseDir: '.' 
        }
    });
})

.task('default',['server','watch']);
