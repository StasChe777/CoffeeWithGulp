var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    cssnano = require('gulp-cssnano'),
    babel = require("gulp-babel"),
    concat=require("gulp-concat")
gulp.task('hello', function() {
    console.log('hello');
})

/*gulp.task('nano', function() {
    return gulp.src('app/css/style.css')s
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});*/

gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('useref', function() {
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['browserSync', 'sass', 'useref'], function() {
    gulp.watch('app/scss/style.scss', ['sass']);
    gulp.watch('app/index.html', browserSync.reload);
    gulp.watch('app/js/index.js', browserSync.reload); 
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'        
        },
    })
})

gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
    .pipe (babel ({
        presets: ['react']
    }))
.pipe(gulpIf('*.js', uglify()))
.pipe(concat("dist/js/main-min.js"))
.pipe(gulp.dest('dist/js'));

});