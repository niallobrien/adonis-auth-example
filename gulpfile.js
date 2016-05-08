// npm i --save-dev gulp-sass gulp-autoprefixer gulp-cssnano gulp-rename gulp-size gulp-uglify gulp-util browser-sync browserify babelify watchify del vinyl-source-stream vinyl-buffer gulp-notify
var gulp = require('gulp'),
    fs = require('fs'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify')
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    del = require('del')
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    notify = require('gulp-notify');

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 3001,
    xip: true,
    host: 'localhost'
  });
});

gulp.task('watch', ['styles:watch', 'scripts:watch', 'browser-sync'], function() {
      gulp.watch('./resources/scripts/**/*.js').on('change', browserSync.reload);
});

/**
 * Handle errors
 * @see https://gist.github.com/wesbos/52b8fe7e972356e85b43
 * @return {void}
 */
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

/**
 * Build scripts
 * @see https://gist.github.com/wesbos/52b8fe7e972356e85b43
 */
function buildScript(file, watch) {
  var props = {
    entries: ['./resources/scripts/' + file],
    debug : true,
    transform:  [babelify]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle(),
        fileName = file.split('.')[0];

    return stream
      .on('error', handleErrors)
      .pipe(source(fileName + '.js'))
      .pipe(gulp.dest('./public/scripts/'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./public/scripts/'))
      .pipe(notify('JS Compiled.'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

/**
 * Build our main.js file
 * @param  {string} 'scripts'
 * @param  {function} callback
 */
gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

/**
 * Watch and build our main.js file
 * @param  {string} 'scripts:watch'
 * @param  {function} callback
 */
gulp.task('scripts:watch', function() {
  return buildScript('main.js', true);
});

/**
 * Compile styles
 * @param  {string} 'styles'
 * @param  {function} callback for the task
 */
gulp.task('styles', function() {
  return gulp.src('./resources/styles/main.scss')
    .pipe(sass().on('error', handleErrors))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(size())
    .pipe(notify('Sass Compiled.'))
    .pipe(browserSync.stream());
});

gulp.task('copy:jslibs', function() {
   gulp.src('./resources/scripts/lib/**/*.js')
     .pipe(gulp.dest('./public/scripts/lib'))
})

/**
 * Watch styles and run the 'styles' task on change
 * @param  {string} 'styles:watch'
 * @param  {function} callback
 */
gulp.task('styles:watch', function() {
  gulp.watch('./resources/styles/**/*.scss', ['styles']);
});

gulp.task('clean:dev', function() {
  return del([
    'public/scripts/main.js',
    'public/styles/main.css'
  ])
})

gulp.task('build', ['styles', 'scripts', 'clean:dev'])

gulp.task('default', ['styles', 'watch', 'copy:jslibs'])
