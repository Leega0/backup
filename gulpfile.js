var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    html2jade = require('gulp-html2jade'),
    sourcemaps = require('gulp-sourcemaps'),
    httpserver = require('http-server'),
    connect = require('gulp-connect');

//jade
gulp.task('jade', function () {
    gulp.src('src/jade/*/*.jade')
        .pipe(jade({
            pretty:'\t'
        }))
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());
    ;
});

//sass
gulp.task('sass', function () {
    gulp.src(['src/assets/css/*/*.scss','src/assets/css/*.scss','src/assets/css/*/*/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/assetsSource/css'))        
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error',sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assetsSource/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(connect.reload());
    ;
});

//js
gulp.task('js', function () {
         // .pipe(rename({
        //     suffix: '.min'
        // }))
   gulp.src(['src/assets/js/*/*.js','src/assets/js/*.js','src/assets/js/*/*/*.js'])
        .pipe(gulp.dest('dist/assetsSource/js/'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(connect.reload());    
    ;
});

//images
gulp.task('images', function () {
   gulp.src(['src/assets/images/*','src/assets/images/*/*','src/assets/images/*/*/*'])
        .pipe(gulp.dest('dist/assets/images/'))
        .pipe(gulp.dest('dist/assetsSource/images/'))
        .pipe(gulp.dest('dist/assets/images/'))
        .pipe(gulp.dest('dist/assetsSource/images/'))
        .pipe(connect.reload());
    ;
});

//clean
gulp.task('clean', function() {
    gulp.src(['dist/css', 'dist/js', 'dist/jade','dist/*.html'], {
                read: false
            })
        .pipe(clean());
    ;
});

//html=>jade
gulp.task('htmltojade', function(){
    gulp.src('src/html/*.html')
        .pipe(html2jade({
            nspaces:4,
            donotencode: 'utf8',
            noemptypipe: ' ',
        }))
        .pipe(gulp.dest('src/jade/'));
});

gulp.task('watch',function(){
    //gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/jade/*/*.jade', ['jade']);
    gulp.watch(['src/assets/css/*/*.scss','src/assets/css/*.scss','src/assets/css/*/*/*.scss'],['sass']);
    gulp.watch(['src/js/*/*.js','src/js/*.js','src/assets/js/*/*/*.js'],['js']);
    gulp.watch(['src/assets/images/*','src/assets/images/*/*','src/assets/images/*/*/*'],['images']);
});

//connect server
gulp.task('httpserver', function() {
    connect.server({
        //livereload: true,
        port: 8081,
        root: 'dist'
    });
});
gulp.task('default', ['sass', 'jade', 'js', 'images', 'httpserver', 'watch']);