var gulp = require('gulp');

gulp.task('templates', function () {
  var config = require('../config.js');
  var newer = require('gulp-newer');
  var htmlHint = require('gulp-htmlhint');
  var htmlmin = require('gulp-htmlmin');
  var templateCache = require('gulp-angular-templatecache');
  var uglify = require('gulp-uglify');

	return gulp.src(config.appPath + '/src/**/*.html')
		.pipe(newer(config.buildPath + '/js/templates.js'))
		.pipe(htmlHint('.htmlhintrc'))
		.pipe(htmlHint.reporter())
		.pipe(htmlmin({
			collapseWhitespace: true,
			conservativeCollapse: true,
			removeComments: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeRedundantAttributes: true,
			removeEmptyAttributes: true
		}))
		.pipe(templateCache({
			module: config.appModule
		}))
		.pipe(uglify({ mangle: true }))
		.pipe(gulp.dest(config.buildPath + '/js'));
});
