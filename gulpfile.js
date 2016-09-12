var gulp = require('gulp');
var less = require('gulp-less');
var watchLess = require('gulp-watch-less');
var typescript = require('gulp-tsc');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

var APP_DIR = 'app';
var BUILD_DIR = 'build';
var NODE_MODULES_DIR = 'node_modules';
var INDEX_SRC = 'index.html';
var LESS_OUT = 'styles.css';

var tsCompileOpts = {
  target: 'es5',
  module: 'commonjs',
  moduleResolution: 'node',
  sourceMap: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  emitError: false,
  removeComments: false,
  noImplicitAny: false,
  tscPath: NODE_MODULES_DIR + '/typescript/bin/tsc',
};

gulp.task('default', ['run']);

gulp.task('clean', function () {
  return gulp.src(BUILD_DIR, { read: false })
  .pipe(clean());
});

gulp.task('build', ['static', 'less', 'tsc']);

gulp.task('run', ['browser-sync']);


gulp.task('tsc', function () {
  return gulp.src(APP_DIR + '/**/*.ts')
  .pipe(typescript(tsCompileOpts))
  .pipe(gulp.dest(BUILD_DIR + '/app/'))
})

gulp.task('tsc:w', function () {
  gulp.watch(APP_DIR + '/**/*.ts', ['tsc']);
});

gulp.task('less', function () {
  return gulp.src(APP_DIR + '/**/*.less')
  .pipe(less())
  .pipe(concat(LESS_OUT))
  .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('less:w', function () {
  return gulp.src(APP_DIR + '/**/*.less')
  .pipe(watchLess(APP_DIR + '/**/*.less'))
  .pipe(less())
  .pipe(concat(LESS_OUT))
  .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('static', function () {
  return gulp.src(['index.html', 'systemjs.config.js', 'package.json'])
  .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('browser-sync', ['build', 'tsc:w', 'less:w'], function () {
  browserSync.init({
    server: {
      baseDir: BUILD_DIR,
      routes: {
        '/node_modules': NODE_MODULES_DIR
      }
    }
  });
})
