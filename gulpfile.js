var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    pack = require('./package.json'),
    nodemon = require('gulp-nodemon'),
    browserSync=require('browser-sync'),
    babelify = require('babelify'),
    //uglify = require('gulp-uglify'),
    //buffer = require('vinyl-buffer'),
    gulpSass = require('gulp-sass');


gulp.task('build', function() {
    return browserify({entries:pack.paths.app, extensions:['.jsx'],debug:true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(pack.dest.app))
        //.pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(pack.dest.dist))
        .pipe(browserSync.stream());
});

gulp.task('watch',['build'], function () {
    gulp.watch(['src/**/*.js', 'src/**/*.jsx','src/**/*.scss'],['build']);
});

gulp.task('browser-sync',['nodemon'] , function() {
    browserSync.init({
        proxy: 'http://localhost:3500',
        browser: ['google-chrome'],
        port: 4000
    });
});
gulp.task('nodemon', function () {
    nodemon({
        script: './bin/www', 
        ext: 'jade js',
        ignore:['public/js/*','src/*'],
        exec: 'node --harmony'
    });
    //.on('restart', function onRestart() {
          //// reload connected browsers after a slight delay
        //setTimeout(function reload() {
            //browserSync.reload({
                //stream: false
            //});
        //}, 500);
    //});
});
gulp.task('styles', function () {
    gulp.src('stylesheets/*.scss')    // 指定要處理的 Scss 檔案目錄
    .pipe(gulpSass())         // 編譯 Scss
    .pipe(gulp.dest('public/css'));  // 指定編譯後的 css 檔案目錄
});


gulp.task('default',['styles','browser-sync','watch']);
