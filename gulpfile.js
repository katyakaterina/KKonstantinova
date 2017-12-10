'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var webp = require('gulp-webp');
var runSequinces = require('run-sequence');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


gulp.task('sass:watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
})

gulp.task('build', function(done){
    run(
        'style', 'normalize', 'sprite', 'html' 
    );
});

gulp.task('style', function(){
    gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('normalize', function(){
    gulp.src('sass/normalize.scss')
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest('build.css'))
    .pipe(minify())
    .pipe(rename('style/normaliza.min.css'))
    .pipe(gulp('build.css'));
});

gulp.watch('sass/**/*.scss', [style]);
gulp.watch('img/*.svg', [svgUpdate]).on('change', server.reload);
gulp.watch('*.html', ['html']).on('change', server.reload);


gulp.task('sprite', function(){
    return gulp.src('img/*.svg')
    .pipe(svgstore({
        inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(build/img));
});

gulp.task('svgUpdate', function(done){
    run('sprite', 'html', done);
});

gulp.task('html', function(){
    return gulp.src('*.html')
    .pipe(posthtml([
        include()
    ]))
    .pipe(gulp.dest('build'));
});


