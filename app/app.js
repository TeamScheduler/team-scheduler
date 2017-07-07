angular.module('MyApp', ['ui.router', 'satellizer'])


    .config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html'
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            resolve: { skipIfAuthenticated: skipIfAuthenticated }
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl',
            resolve: { skipIfAuthenticated: skipIfAuthenticated }
        })

        .state('account', {
            url: '/account',
            templateUrl: 'partials/profile.html',
            controller: 'ProfileCtrl',
            resolve: { loginRequired: loginRequired }
        })

        .state('reset', {
            url: '/reset/:token',
            templateUrl: 'partials/reset.html',
            controller: 'ResetCtrl'
        })

        .state('forgot', {
            url: '/forgot',
            templateUrl: 'partials/forgot.html',
            controller: 'ForgotCtrl',
            resolve: { skipIfAuthenticated: skipIfAuthenticated }
        })

        $urlRouterProvider.otherwise('/home');

        $authProvider.loginUrl = '/login';
        $authProvider.signupUrl = '/signup';

        function skipIfAuthenticated($state, $auth) {
            console.log("skip if is auth");
            if ($auth.isAuthenticated()) {
                $state.go('home')
            }
        }

        function loginRequired($state, $auth) {
            if (!$auth.isAuthenticated()) {
                $state.go('login');
            }
        }
    })

  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }

  });
