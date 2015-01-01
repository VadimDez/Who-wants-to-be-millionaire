module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    // measures the time each task takes
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            default: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/styles/main.css': 'app/styles/main.less'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false,
                compress: {
//                    drop_console: true
                },
                sourceMap: true
            },
            build: {
                src: [
                    'app/js/Controllers/*.js',
                    'app/js/Filters/*.js',
                    'app/js/Services/*.js',
                    'app/js/Directives/*.js',
                    'app/js/*.js'
                ],
                dest: 'public/js/app.min.js'
            }
        },
        concat: {
            options: {
                separator: ';',
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';",
                process: function(src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                src: [
                    //'bower_components/angular/angular.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'public/js/app.min.js'
                ],
                dest: 'public/js/angular-app.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'app/*.js',
                    'app/js/Controllers/*.js',
                    'app/js/Filters/*.js',
                    'app/js/Services/*.js',
                    'app/js/Directives/*.js',
                    'app/js/*.js',
                    'app/styles/*.less',
                    'public/js/app/app.js'
                ],
                tasks: ['less', 'uglify', 'concat'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: [
                    'public/views/*.html',
                    'public/views/modals/*.html',
                    'public/*.html'
                ]
            }
        }
    });

    grunt.registerTask('default',['watch']);
};