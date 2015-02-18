'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var eslint = require('gulp-eslint');

gulp.task('default', ['development']);
gulp.task('development', ['javascript']
);

function runBatchTasks(tasks)
{
	return batch(function (events, done) {
		events
			.on('error', done)
			.on('end', done)
			.on('close', done)
			.on('data', function (){
				gulp.start(tasks);
			});
	});
}

gulp.task('watch', function () {
	gulp.start(['default']);
	watch('lib/**', runBatchTasks('javascript'));
	watch('test/**', runBatchTasks('test:javascript'));
});

gulp.task('javascript', ['lint:javascript', 'test:javascript']);

gulp.task('lint:javascript', function () {
	return gulp.src(['lib/**/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError());
});

gulp.task('test:javascript', function (done) {
	done();
});
