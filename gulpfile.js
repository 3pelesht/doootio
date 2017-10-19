'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');

gulp.task('sass', function() {
	return gulp.src('./src/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
});
