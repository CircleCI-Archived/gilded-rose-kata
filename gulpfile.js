const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

// Static Server + watching files
gulp.task('serve', function() {

    browserSync.init({
    server: "./src",
});

    gulp.watch("src/**/*").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
