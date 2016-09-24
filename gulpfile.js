var gulp = require('gulp');


var webserver = require('gulp-webserver');
gulp.task('default', function(){
    gulp.src('src')
        .pipe(webserver({
	    host: '192.168.1.234',
            livereload: true,
            open: true,
            directoryListing: false
        }));
});

