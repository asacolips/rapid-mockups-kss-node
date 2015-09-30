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
gulp.task('styleguide', function() {
  var templateName;

  // Accept argument variables to compile specific styleguides
  // For example, `npm run styleguide --template='segment-landing'
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
      'kss-node --source <%= source %> --destination <%= destination(file.path) %> --template <%= template(file.path) %> --helpers <%= helpers %> --js <%= javascript %>'
    ], {
      templateData: {
        source: 'sass',
        helpers: 'styleguide/helpers',
        // have move up from the styleguide/dist/*/ directory
        javascript: '../../../js/dist/all.js',
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
// Grunticon
//=======================================================

gulp.task('icons', function () {
  var deferred = q.defer(),
      //path to icon folder
      iconDir = 'assets/src/icons',
      options = { enhanceSVG: true };

  var files = fs.readdirSync(iconDir).map(function (fileName) {
    return path.join(iconDir, fileName);
  });

  var grunticon = new Grunticon(files, 'assets/dist/icons', options);

  grunticon.process(function () {
    deferred.resolve();
  });

  return deferred.promise;
});

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
    .pipe(gulp.dest('assets/dist'));
});

gulp.task('compress', ['compress-png', 'compress-jpg']);

//=======================================================
// BrowserSync
//=======================================================
gulp.task('browser-sync', function() {
  sync.init({
    server: {
      baseDir: "./",
      index: "styleguide/dist/basic/index.html"
    }
  });

  //watch for changes and reload
  gulp.watch('sass/{,**/}*.scss', ['sass', 'styleguide', 'basic-kss'], sync.reload);
});

//=======================================================
// Default Task
//=======================================================

// Production gulp task
//gulp.task('default', ['sass', 'styleguide', 'compress', 'icons']);

// HTML Mockups gulp task
gulp.task('default', ['sass', 'javascript']);

