var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync
    less = require('gulp-less'); // подключаем Less
    concat = require('gulp-concat'); // подключаем плагин для объединения файлов в один

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('less', function(){ // Создаем таск Sass
    return gulp.src('less/**/*.less') // Берем источник
        .pipe(less()) // Преобразуем Sass в CSS посредством gulp-less
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: '' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('css', function() { // Создаем таск css
  return gulp.src('css/*.css') // выбираем все css файлы
    .pipe(concat('finish.css')) // объединяем содержимое файлов в один - finish.css 
    .pipe(gulp.dest('css/')); // указываем путь для создания файла finish.css
});

gulp.task('watch', ['browser-sync', 'sass', 'less'], function() {
    gulp.watch('sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch(['*.html', 'css/*.css'], browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});