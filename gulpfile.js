var elixir = require('laravel-elixir')
var standard = require('gulp-standard')
var gulp = require('gulp')
var del = require('del')

gulp.task('standard', function () {
  return gulp.src(
    [
      'resources/assets/js/**/*'
    ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('clean:assets', function () {
  return del([
    'dist/**/*'
  ])
})

elixir(function (mix) {
  mix.task('clean:assets')
  mix.task('standard')
  // mix.webpack('webpack/app.js', './dist/app-webpack.js')
  mix.rollup('rollup/app.js', './dist/app-rollup.js', undefined, require('./rollup.config.js')).scripts([
    './node_modules/vue/dist/vue.js',
    './dist/app-rollup.js'
  ], './dist/app-rollup-bundle.js')
  mix.browserify('app.js', './dist/app-browserify.js')
})
