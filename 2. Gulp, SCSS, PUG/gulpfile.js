const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const pug = require('gulp-pug')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const rigger = require('gulp-rigger')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function pug2html() {
  return src('src/pages/**.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('dist'))
}

function sass2css() {
  return src(['src/sass/**.sass','src/sass/**.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    //.pipe(csso())
    .pipe(dest('dist/css'))
}

function fonts() {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
}

function js() {
  return src('src/js/**.js')
    .pipe(rigger())
    .pipe(dest('dist/js'))
}

function img() {
  return src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/pages/**/**.pug', series(pug2html)).on('change', sync.reload)
  watch('src/sass/**/**.sass', series(sass2css)).on('change', sync.reload)
  watch('src/fonts/**/*', series(fonts)).on('change', sync.reload)
  watch('src/img/**/*', series(img)).on('change', sync.reload)
  watch('src/js/**/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, sass2css, fonts, img, js, pug2html)
exports.serve = series(clear, sass2css, fonts, img, js, pug2html, serve)

exports.clear = clear