module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            all: {
                src: 'src/Translator.js',
                dest: 'dist/j29n.js'
            },
            options: {
                browserifyOptions: {
                    standalone: 'src/Translator'
                }
            }
        },
        uglify: {
            build: {
                src: 'dist/j29n.js',
                dest: 'dist/j29n.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'uglify']);
};