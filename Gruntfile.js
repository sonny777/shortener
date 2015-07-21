module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            test: {
                options: {
                    reporter: 'list',
                    timeout: 15000
                },
                src: ['test/tests.js']
            }
        },

        'jshint': {
            'beforeconcat': ['*.js']
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['mochaTest']);
};
