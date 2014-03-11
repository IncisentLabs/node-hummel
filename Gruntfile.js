module.exports = function(grunt) {

    grunt.initConfig({
        nodeunit: {
            console: {
                src: ['test/*_test.js']
            },
            ci: {
                src: ['test/*_test.js'],
                options: {
                    reporter: 'junit',
                    reporterOptions: {
                        output: 'test-results'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', 'nodeunit:console');
};