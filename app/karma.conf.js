module.exports = function(config) {
    config.set({
        files: [
            // Third-party vendor files
            '../public/node_modules/angular/angular.js',
            '../public/node_modules/angular-ui-router/release/angular-ui-router.js',
            'vendor/satellizer.js',
            'vendor/angular-mocks.js',
            // App entry point
            'app.js',
            // App services, controllers, directives, filters, etc.
            'components/**/*.js',
            'services/*.js',
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
            'app.js': ['coverage'],
            'controllers/*.js': ['coverage'],
            'services/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'test',
            subdir: 'coverage'
        }
    });
};