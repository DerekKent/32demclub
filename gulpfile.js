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
var babel = require('gulp-babel');

var paths = {
    src: {
        html: 'src/index.html',
        fonts: 'src/fonts/**/*',
        text: 'src/robots.txt',
        scripts: 'src/scripts/**/*.js',
        styles: 'src/**/*.less',
        templates: 'src/scripts/**/*.hbs',
        partials: 'src/scripts/**/*.part.hbs',
        images: 'src/images/**/*'
    },

    dev: {
        html: 'dev/index.html',
        fonts: 'dev/fonts/**/*',
        text: 'dev/robots.txt',
        scripts: 'dev/scripts/**/*.js',
        styles: 'dev/**/*.less',
        templates: 'dev/scripts/**/*.hbs',
        partials: 'dev/scripts/**/*.part.hbs',
        images: 'dev/images/**/*'
    },

    jspm: 'jspm_packages/**/*.js'
};

/*
 * Shared Functions
 *
 *
*/

function stylesDev () {
    return gulp.src(paths.src.styles)
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dev/'));
}

function templates () {
    var header = 'import Handlebars from \'handlebars\';';
    var tmplHeader = header += 'export var template = Handlebars.template(<%= contents %>)';
    var partialHeader = header += ';export var partial = Handlebars' +
        '.registerPartial(<%= pro(file.relative) %>, Handlebars.template(<%= contents %>));'

    gulp.src(paths.src.partials)
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
        .pipe(gulp.dest('./dev/scripts/'));

    return gulp.src([paths.src.templates, '!'+paths.src.partials])
        .pipe(handlebars())
        .pipe(wrap(tmplHeader))
        .pipe(rename(function (path) {
            path.extname = '.hbs.js'
        }))
        .pipe(gulp.dest('./dev/scripts/'));
}

/*
 * Watch Build Tasks
 *
 *
*/

gulp.task('styles:watch', stylesDev);
gulp.task('templates:watch', templates);

/*
 * Dev Build Tasks
 *
 *
*/

gulp.task('clean:dev', function (cb) {
    del(['dev'], cb);
});

gulp.task('copy:dev', ['clean:dev'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('./dev/'));
});

gulp.task('styles:dev', ['copy:dev'], stylesDev);
gulp.task('templates:dev', ['copy:dev'], templates);

/*
 * Production Build Tasks
 *
 *
*/

gulp.task('clean:dist', function (cb) {
    del(['dist'], cb);
});

gulp.task('fonts', ['clean:dist', 'copy:dev'], function () {
    return gulp.src(paths.dev.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('html', ['clean:dist', 'copy:dev'], function () {
    return gulp.src(paths.dev.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('text', ['clean:dist', 'copy:dev'], function () {
    return gulp.src(paths.dev.text)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['clean:dist', 'templates:dev'], function () {
    gulp.src([paths.jspm])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/jspm_packages/'));

    return gulp.src([paths.dev.scripts])
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('images', ['clean:dist', 'copy:dev'], function () {
    return gulp.src(paths.dev.images)
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('styles:dist', ['clean:dist', 'styles:dev'], function () {
    return gulp.src(paths.dev.styles)
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
    gulp.watch(paths.src.templates, ['templates:watch']);
    gulp.watch(paths.src.styles, ['styles:watch']);
});

gulp.task('dev', ['templates:dev', 'styles:dev']);

gulp.task('dist', ['text', 'fonts', 'html', 'styles:dist', 'scripts', 'images']);
gulp.task('build', ['dist']);

gulp.task('default', ['dev']);
