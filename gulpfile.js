var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
concat      = require('gulp-concat'),
uglify      = require('gulp-uglifyjs'),
cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
rename      = require('gulp-rename'); // Подключаем библиотеку для переименования файлов




gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результат в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function(){
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            //'app/libs/owl.carousel/dist/owl.carousel.min.js',
            //'app/libs/fancybox/dist/jquery.fancybox.min.js',
         ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-mini', function() {
    return gulp.src([
            'app/sass/main.sass',
            'app/sass/libs.sass',
    ]) // Выбираем файл для минификации
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', [ 'browser-sync', 'sass', 'css-mini', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], browserSync.reload);
});


gulp.task('default', ['watch']);





