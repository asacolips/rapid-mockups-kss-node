'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');

//=======================================================
// Include Our Plugins
//=======================================================
var sass       = require('gulp-sass');
var prefix     = require('gulp-autoprefixer');
var eol        = require('gulp-eol');
var sourcemaps = require('gulp-sourcemaps');
var sync       = require('browser-sync');
var reload     = sync.reload;
var filter     = require('gulp-filter');
var shell      = require('gulp-shell');
var imagemin   = require('gulp-imagemin');
var pngquant   = require('imagemin-pngquant');
var jpegoptim  = require('imagemin-jpegoptim');
var q          = require('q');
var path       = require('path');
var fs         = require('fs');
var Grunticon  = require('grunticon-lib');
var concat     = require('gulp-concat');
var argv       = require('yargs').argv;

//=======================================================
// Functions
//=======================================================
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

//=======================================================
// Compile Our Sass
//=======================================================

gulp.task('sass', function() {
  gulp.src('./sass/{,**/}*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested'
    }))
    .on('error', handleError)
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(eol('\n', true))
    .pipe(gulp.dest('css'))
    .pipe(filter('*.css'))
    .pipe(sync.reload({
      stream: true
    }));
});

//=======================================================
// Concatenate JS
//=======================================================
gulp.task('javascript', function() {
  return gulp.src('js/src/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(eol('\n', true))
    .pipe(gulp.dest('js/dist'));
});

//=======================================================
// Copy assets to styleguide
//=======================================================
gulp.task('copy', function() {
  return gulp.src([
    './assets/**/*',
    './libraries/**/*',
    './js/**/*',
    './css/**/*'
    ], { base: './' })
    .pipe(gulp.dest('styleguide/dist/theme/'));
});

//=======================================================
// Watch and recompile sass.
//=======================================================

gulp.task('watch', function() {

  // BrowserSync proxy setup
  //sync({
      //proxy: 'http://enterLocalUrlHere'
  //});

  // Watch all my sass files and compile sass if a file changes.
  gulp.watch('sass/{,**/}*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['javascript']);
});

//=======================================================
// Generate all styleguides
//=======================================================
gulp.task('styleguide-all', function() {
  var templateName;

  // Accept argument variables to compile specific styleguides
  // For example, `npm run gulp styleguide-all --template='basic'
  if (argv.template) {
    templateName = 'styleguide/templates/' + argv.template + '/index.html';
  }
  else {
    templateName = 'styleguide/templates/*/index.html';
  }

  return gulp.src(templateName)
    .pipe(shell([
      // This basically runs the below command on the command line:
      // kss-node [source files to parse] [destination folder] --template [location of template files] --css [location of css to include]
      'kss-node --source <%= source %> --destination <%= destination(file.path) %> --template <%= template(file.path) %> --helpers <%= helpers %>'
    ], {
      templateData: {
        source: 'sass',
        helpers: 'styleguide/helpers',
        // move up from the styleguide/dist/*/ directory
        template: function (s) {
          return s.replace('/index.html', '');
        },
        destination: function (s) {
          return s.replace('/styleguide/templates/', '/styleguide/dist/').replace('/index.html', '');
        }
      }
    }))
});

//=======================================================
// Generate main kss styleguide
//=======================================================
gulp.task('styleguide-kss', shell.task([
  // This basically runs the bellow command on the command line:
  // kss-node [source files to parse] [destination folder] --template [location of template files] --css [location of css to include]
    'kss-node --source <%= source %> --destination <%= destination %> --template <%= template %> --helpers <%= helpers %>'
  ], {
    templateData: {
      source: 'sass',
      destination: 'styleguide/dist',
      template: 'styleguide/kss-overview',
      helpers: 'styleguide/helpers'
    }
  }
));

gulp.task('styleguide', ['styleguide-kss', 'styleguide-all', 'copy']);

//=======================================================
// Compress assets (images, pngs, svgs).
//=======================================================

gulp.task('compress-png', function () {
  return gulp.src([
      'assets/src/icons/*',
      'assets/src/images/*'
    ], { base: 'assets/src/' })
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('assets/dist'));
});

gulp.task('compress-jpg', function () {
  return gulp.src([
      'assets/src/images/styleguide/*.jpg'
    ], { base: 'assets/src/' })
    .pipe(jpegoptim({ progressive: true })())
    .pipe(gulp.dest('assets/dist'))
    .pipe(gulp.dest('styleguide/dist/theme/assets/dist'));
});

gulp.task('compress', ['compress-png', 'compress-jpg']);

//=======================================================
// BrowserSync
//=======================================================
gulp.task('browser-sync', function() {
  sync.init({
    server: {
      baseDir: "./styleguide/dist/",
      index: "index.html",
    }
  });

  //watch for changes and reload
  gulp.watch('sass/{,**/}*.scss', ['sass'], sync.reload);
  gulp.watch('js/src/*.js', ['javascript'], sync.reload);
});

//=======================================================
// Default Task
//=======================================================

// Demo gulp task
gulp.task('default', ['sass', 'javascript', 'compress', 'styleguide']);

