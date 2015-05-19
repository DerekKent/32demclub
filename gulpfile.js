var path = require('path');
var gulp = require('gulp');
var rename = require("gulp-rename");
var wrap = require('gulp-wrap');
var less = require('gulp-less');
var uncss = require('gulp-uncss');
var handlebars = require('gulp-handlebars');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

var paths = {
    scripts: 'src/scripts/**/*.js',
    styles: 'src/**/*.less',
    templates: 'src/scripts/**/*.hbs',
    partials: 'src/scripts/**/*.part.hbs',
    compiledTemplates: 'src/scripts/**/*.hbs',
    images: 'src/images/**/*'
};

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'));
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
            path.extname = ".hbs.js"
        }))
        .pipe(gulp.dest('./src/scripts/'));
    
    return gulp.src([paths.templates, '!'+paths.partials])
        .pipe(handlebars())
        .pipe(wrap(tmplHeader))
        .pipe(rename(function (path) {
            path.extname = ".hbs.js"
        }))
        .pipe(gulp.dest('./src/scripts/'));
});

// TODO: Add sourcemaps to dev version only and uncss production version only
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        //.pipe(uncss({html: ['src/index.html', paths.compiledTemplates]}))
        .pipe(gulp.dest('./src/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('dev', ['templates', 'styles', 'scripts']);

gulp.task('dist', ['dev', 'images'], function() {
    /*
    builder.reset();
    builder.build('index', {}, 'app/.out/scripts/all.js')
    .then(function () {
        console.log('SystemJS Build complete');
        cb();
    })
    .catch(function (err) {
        console.log('SystemJS Build error');
        console.log(err.stack);
        cb();
    });*/
});


gulp.task('default', ['dev']);
