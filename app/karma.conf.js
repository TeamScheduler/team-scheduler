/*jshint strict:false */
module.exports = function(config) {
    config.set({
        files: [
            // Third-party vendor files
            '../public/node_modules/angular/angular.js',
            '../public/node_modules/angular-ui-router/release/angular-ui-router.js',
            'src/app.js',
            'src/**/*.js',
            // Unit tests
            'test/unit/**/*.test.js'
            //interface
            //'test/interface/tests/*.js'
        ],

        autoWatch: true,

        frameworks: ['mocha', 'chai', 'jasmine', 'sinon'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-coverage',
            'karma-jasmine',
            'karma-sinon'
        ],

        reporters: ['progress', 'coverage'],

        colors: true,

        logLevel: config.LOG_INFO,

        preprocessors: {
            'src/app.js': ['coverage'],
            'src/controllers/*.js': ['coverage'],
            'src/components/dashboard/**/*.controller.js': ['coverage'],
            'src/components/dashboard/**/*.service.js': ['coverage'],
            'src/components/outer/**/*.js': ['coverage']            
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'test',
            subdir: 'coverage'
        }
    });
};
