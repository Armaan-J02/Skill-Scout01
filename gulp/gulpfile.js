var gulp = require('gulp'),
    gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function () {
    if (node) node.kill();
    node = spawn('node', ['server.js'], {stdio: 'inherit'}); 
    node.on('close', function (code) {
        if (code === 8) {
            gutil.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('default');

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('dev', ['server'], function () {
    gulp.watch(['server.js', './src/**/**'], ['server']); // Adjust the watch paths
});

// Clean up if an error goes unhandled.
process.on('exit', function () {
    if (node) node.kill();
});
