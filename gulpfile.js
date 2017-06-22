var gulp          = require('gulp');
		less          = require('gulp-less'),
		path          = require('path'),
		minifyCss     = require('gulp-minify-css'),
		browserSync   = require('browser-sync'),
		gutil         = require('gulp-util'),
		autoprefixer  = require('gulp-autoprefixer'),
		svgsprites    = require('gulp-svg-sprite'),
    sourcemaps    = require('gulp-sourcemaps'),
    imagemin      = require('gulp-tinypng'),
    imageResize   = require('gulp-image-resize'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    notify        = require('gulp-notify'),
    sftp          = require('gulp-sftp'),
    ftp           = require('gulp-ftp'),
    spritesmith   = require('gulp.spritesmith'),
    eslint        = require('gulp-eslint');

/*==============================
=           Watcher            =
==============================*/
gulp.task('watch', function() {
  browserSync.init({ 
    proxy: "localhost:8888" 
  });
  gulp.watch("./src/*.html", ['markup']);
  gulp.watch("./src/styles/**/*.less", ['styles']);
  gulp.watch("./src/scripts/**/*.js", ['javascript']);
  // gulp.watch("./img/svg/**/*.svg", ['svgsprites']);
  gulp.watch("./public/*.html").on('change', browserSync.reload);
});

/*============================
=            HTML            =
============================*/
gulp.task('markup', function() {
  return gulp.src('./src/*.html')
  .pipe(gulp.dest('./public/'));
});

/*=============================================
=            LESS and autoprefixer            =
=============================================*/
gulp.task('styles', function () {
  return gulp.src( './src/styles/**/style.less' )
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', notify.onError(function(err) {
      return {
        title: 'Styles',
        message: err.message
      };
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/styles/' ))
    .pipe(browserSync.stream());
});

/*==================================
=            JavaScript            =
==================================*/
gulp.task('javascript', function() {
  return gulp.src( './src/scripts/**/scripts.js')
	  .pipe(gulp.dest( './public/scripts/'))
    .pipe(browserSync.stream());
});


gulp.task('minify', ['less'], function() {
  return gulp.src( './css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest( './css/min/'));
});


gulp.task('gulp-autoprefixer', ['less'], function () {
  return gulp.src( './css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

/*===========================
=            SVG            =
===========================*/
gulp.task('svgsprites', function() {
	gulp.src('./img/svg/**/*.svg')
		.pipe(svgsprites({
      shape: {
        dimension: {
          maxWidth: 32,
          maxHeight: 32,
          precision: 2
          //attributes: false
        }
      },
      mode: {
        symbol: {
          bust: false,
          sprite: 'inline-sprite.svg'
        }
      }
    }))
		.pipe(gulp.dest('./img/sprite'))
    .pipe(notify({
      message: 'SVG-sprite ready'
    }));
});

gulp.task('svgspriteless', function() {
  gulp.src('./img/svg/**/*.svg')
    .pipe(svgsprites({
      shape: {
        spacing: {
          padding: 1
        },
        dimension: {
          maxWidth: 32,
          maxHeight: 32,
          precision: 2
        }
      },
      mode: {
        css: {
          prefix: '.%s',
          dimensions: '%s',
          dest: './',
          sprite: 'sprite/sprite.svg',
          bust: false,
          render: {
            less: {
              dest: './less/sprite.less'
            }
          }
        },
      }
    }))
    .pipe(gulp.dest('./img/'));
});
/*==================================
=            PNG sprite            =
==================================*/
gulp.task('sprite', function generateSpritesheets () {
  // Use all normal and `-2x` (retina) images as `src`
  //   e.g. `github.png`, `github-2x.png`
  var spriteData = gulp.src('./img/png/**/*.png')
    .pipe(spritesmith({
      // Filter out `-2x` (retina) images to separate spritesheet
      //   e.g. `github-2x.png`, `twitter-2x.png`
      retinaSrcFilter: './img/png/**/*-2x.png',
      // Generate a normal and a `-2x` (retina) spritesheet
      imgName: 'sprite.png',
      retinaImgName: 'sprite-retina.png',
      // Optional path to use in CSS referring to image location
      imgPath: '../images/sprite/sprite.png',
      retinaImgPath: 'images/sprite/sprite-retina.png',
      // Generate SCSS variables/mixins for both spritesheets
      cssName: 'sprite.less'
    }));
  // Deliver spritesheets to `dist/` folder as they are completed
  spriteData.img.pipe(gulp.dest('./src/images/sprite/'));
  spriteData.img.pipe(gulp.dest('./public/images/sprite/'));
  // Deliver CSS to `./` to be imported by `index.scss`
  spriteData.css.pipe(gulp.dest('./src/styles/'));
});
//Image optimization

gulp.task('tinypng', function() {
  gulp.src('.img/png/*.{jpg,png}')
    .pipe(imagemin('2dywIYbcYicKNU11BDeWwgwbkWptRk6g'))
    .pipe(gulp.dest('.img/ready/'));
});

gulp.task('resize', function () {
  gulp.src('.img/png/*.png')
    .pipe(imageResize({ 
      format : 'jpg',
      filter: 'Catrom',
      imageMagick: true
    }))
    .pipe(gulp.dest('.img/mini/'))
    .pipe(notify({
      message: 'Finished otimize images'
    }));
});
//Image optimization

gulp.task('tinypng', function() {
  gulp.src('.img/png/*.{jpg,png}')
    .pipe(imagemin('2dywIYbcYicKNU11BDeWwgwbkWptRk6g'))
    .pipe(gulp.dest('.img/ready/'));
});

gulp.task('resize', function () {
  gulp.src('.img/png/*.png')
    .pipe(imageResize({ 
      format : 'jpg',
      filter: 'Catrom',
      imageMagick: true
    }))
    .pipe(gulp.dest('.img/mini/'))
    .pipe(notify({
      message: 'Finished otimize images'
    }));
});

/*==============================================================
=            Concatination and minification sctipts            =
==============================================================*/
gulp.task('scripts', function() {
  return gulp.src(
    [
    
    ])
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
    .pipe(notify({
      title: 'JavaScript',
      message: 'Finished minifying scripts'
    }));
});


gulp.task('default', ['watch']);
