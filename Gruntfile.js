'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            test: {
                files: ['**/*.js'],
                tasks: ['mochaTest'],
                options: {
                    spawn: true
                }
            }
        },
        markdox: {

            sourceFiles: {
                files: [{
                    src: 'lib/auth-storage.js',
                    dest: 'docs/auth-storage.md'
                }, {
                    src: 'lib/crypton.js',
                    dest: 'docs/crypton.md'
                }, {
                    src: 'lib/auth.js',
                    dest: 'docs/auth.md'
                }]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-markdox');

    grunt.registerTask('doc', 'markdox');
    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('watch-test', 'watch');


};