var path = require('path');
var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');
var less = require('gulp-less');
var clip = require('gulp-clip-empty-files');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var handlebars = require('gulp-handlebars');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

var paths = {
    html: 'src/index.html',
    fonts: 'src/fonts/**/*',
    text: 'src/robots.txt',
    scripts: 'src/scripts/**/*.js',
    styles: 'src/**/*.less',
    templates: 'src/scripts/**/*.hbs',
    partials: 'src/scripts/**/*.part.hbs',
    images: 'src/images/**/*'
};

/*
 * Dev Build Tasks
 *
 *
*/

gulp.task('styles-dev', function () {
    return gulp.src(paths.styles)
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/'));
});

gulp.task('templates', function () {
    var header = 'import Handlebars from \'handlebars\';';
    var tmplHeader = header += 'export var template = Handlebars.template(<%= contents %>)';
    var partialHeader = header += ';export var partial = Handlebars' +
        '.registerPartial(<%= pro(file.relative) %>, Handlebars.template(<%= contents %>));'

    gulp.src(paths.partials)
        .pipe(handlebars())
        .pipe(wrap(partialHeader, {}, {
            imports: {
                pro: function (file) {
                    return JSON.stringify(path.dirname(file) + '/' + path.basename(file, '.js'));
                }
            }
        }))
        .pipe(rename(function (path) {
            path.extname = '.hbs.js'
        }))
        .pipe(gulp.dest('./src/scripts/'));

    return gulp.src([paths.templates, '!'+paths.partials])
        .pipe(handlebars())
        .pipe(wrap(tmplHeader))
        .pipe(rename(function (path) {
            path.extname = '.hbs.js'
        }))
        .pipe(gulp.dest('./src/scripts/'));
});

/*
 * Production Build Tasks
 *
 *
*/

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('fonts', ['clean'], function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('html', ['clean'], function () {
    return gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('text', ['clean'], function () {
    return gulp.src(paths.text)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['clean', 'templates'], function () {
    gulp.src(['jspm_packages/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/jspm_packages/'));

    return gulp.src([paths.scripts])
        .pipe(babel())
        .pipe(uglify())
        //.pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('styles-dist', ['clean'], function () {
    return gulp.src(paths.styles)
        .pipe(clip())
        .pipe(less())
        .pipe(uncss({html: ['http://localhost:9912/?_escaped_fragment_=']}))
        .pipe(csso())
        .pipe(gulp.dest('./dist/'));
});

/*
 * Combined Tasks
 *
 *
*/

gulp.task('watch', ['dev'], function () {
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.styles, ['styles-dev']);
});

gulp.task('dev', ['templates', 'styles-dev']);

gulp.task('dist', ['text', 'fonts', 'html', 'styles-dist', 'scripts', 'images']);

gulp.task('default', ['dev']);
