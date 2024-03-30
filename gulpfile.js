const { src, dest, watch, parallel, series } = require('gulp')

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');

function pages() {
    return src('src/pages/*.html')
        .pipe(include({
            includePaths: 'src/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('src/fonts/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('src/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}

function images() {
    return src(['src/images/*.*'])
        .pipe(newer('app/images'))
        .pipe(avif({ guality: 50 }))

        .pipe(src('src/images/*.*'))
        .pipe(newer('app/images'))
        .pipe(webp())

        .pipe(src('src/images/*.*'))
        .pipe(newer('app/images'))
        .pipe(imagemin())
        .pipe(dest('app/images'))
}

function scripts() {
    return src([
        'node_modules/date-fns/cdn.min.js',
        'node_modules/date-fns/locale/uk/cdn.min.js',
        'src/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        // .pipe(uglify())

        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        },
        ghostMode: {
            scroll: false
        }
    });
    watch(['src/scss/**/*.scss'], styles)
    watch(['src/images'], images)
    watch(['src/js/main.js'], scripts)
    watch(['src/components/*', 'src/pages/*'], pages)
    watch(['app/*.html']).on('change', browserSync.reload)
}


function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/images/*.*',
        'app/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.building = building;
exports.watching = watching;
exports.fonts = fonts;
exports.pages = pages;

exports.build = series(cleanDist, building)
exports.default = parallel(styles, images, scripts, pages, watching)