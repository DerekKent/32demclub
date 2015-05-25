var path = require('path');
var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var wrap = require('gulp-wrap');
var less = require('gulp-less');
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
        templates: ['dev/scripts/**/*.hbs', '!dev/scripts/**/*.part.hbs'],
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

function handleError (e) {
    console.log(e.message);
    this.emit('end');
}

function stylesDev (src) {
    return src
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', handleError)
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: './'
        }))
        .pipe(gulp.dest('./dev/'));
}

function templates (src) {
    var header = 'import Handlebars from \'handlebars\';';
    var tmplHeader = header += 'export var template = Handlebars.template(<%= contents %>)';

    return src
        .pipe(handlebars())
        .on('error', handleError)
        .pipe(wrap(tmplHeader))
        .pipe(rename(function (path) {
            path.extname = '.hbs.js'
        }))
        .pipe(gulp.dest('./dev/scripts/'));
}

function partials (src) {
    var header = 'import Handlebars from \'handlebars\';';
    var partialHeader = header += ';export var partial = Handlebars' +
        '.registerPartial(<%= pro(file.relative) %>, Handlebars.template(<%= contents %>));';

    return src
        .pipe(handlebars())
        .on('error', handleError)
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
}

function scriptsDev (src) {
    return src
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', handleError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/scripts/'));
}

/*
 * Watch Build Tasks
 *
 *
*/

gulp.task('templates:changed', function () {
    return templates(gulp.src([paths.src.templates])
        .pipe(changed('./dev/')))
});

gulp.task('partials:changed', function () {
    return partials(gulp.src([paths.src.partials])
        .pipe(changed('./dev/')))
});

gulp.task('styles:changed', function () {
    return stylesDev(gulp.src(paths.src.styles)
        .pipe(changed('./dev/')))
});

gulp.task('scripts:changed', function () {
    return scriptsDev(gulp.src([paths.src.scripts, '!dev/scripts/**/*.hbs'])
        .pipe(changed('./dev/')))
});

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

gulp.task('styles:dev', ['copy:dev'], function () {
    return stylesDev(gulp.src(paths.src.styles));
});

gulp.task('templates:dev', ['copy:dev'], function () {
    return templates(gulp.src([paths.src.templates]));
});

gulp.task('partials:dev', ['copy:dev'], function () {
    return partials(gulp.src([paths.src.partials]));
});

gulp.task('scripts:dev', ['copy:dev'], function () {
    return scriptsDev(gulp.src([paths.src.scripts, '!dev/scripts/**/*.hbs']));
});

/*
 * Production Build Tasks
 *
 *
*/

gulp.task('clean:dist', function (cb) {
    del(['dist'], cb);
});

gulp.task('fonts', ['clean:dist'], function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('html', ['clean:dist'], function () {
    return gulp.src(paths.src.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('text', ['clean:dist'], function () {
    return gulp.src(paths.src.text)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts:dist', ['clean:dist', 'templates:dev', 'partials:dev', 'scripts:dev'], function () {
    // TODO: Separate into multiple tasks, and pipe everything from src
    gulp.src([paths.dev.scripts])
        .pipe(babel())
        .on('error', handleError)
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'));

    return gulp.src([paths.jspm])
        // TODO: only uglify and move files that are needed
        .pipe(uglify())
        .pipe(gulp.dest('./dist/jspm_packages/'));
});

gulp.task('images', ['clean:dist'], function () {
    return gulp.src(paths.src.images)
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('styles:dist', ['clean:dist'], function () {
    return gulp.src(paths.src.styles)
        .pipe(less())
        .on('error', handleError)
        .pipe(csso())
        .pipe(gulp.dest('./dist/'));
});

/*
 * Combined Tasks
 *
 *
*/

gulp.task('watch', ['dev'], function () {
    gulp.watch(paths.src.partials, ['partials:changed']);
    gulp.watch(paths.src.templates, ['templates:changed']);
    gulp.watch(paths.src.styles, ['styles:changed']);
    gulp.watch(paths.src.scripts, ['scripts:changed']);
});

gulp.task('dev', ['partials:dev', 'templates:dev', 'styles:dev', 'scripts:dev']);

gulp.task('dist', ['text', 'fonts', 'html', 'styles:dist', 'scripts:dist', 'images']);
gulp.task('build', ['dist']);

gulp.task('default', ['dev']);
