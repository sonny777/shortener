module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mocha: {
            all: {
                src: ['test/testrunner.html']
            },
            options: {
                run: true
            }
        },

        'jshint': {
            'beforeconcat': ['*.js']
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['mocha']);
};
