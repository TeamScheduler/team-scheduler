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
        ],

        autoWatch: true,

        frameworks: ['mocha', 'chai'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-coverage'
        ],

        reporters: ['progress', 'coverage'],

        colors: true,

        logLevel: config.LOG_INFO,

        preprocessors: {
            'src/app.js': ['coverage'],
            'src/controllers/*.js': ['coverage'],
            'src/services/*.js': ['coverage'],
            'src/components/**/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'test',
            subdir: 'coverage'
        }
    });
};