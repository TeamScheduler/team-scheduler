angular.module('MyApp', ['ui.router', 'satellizer'])


    .config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.html'
            })

            .state('find-team', {
                url: '/find-team',
                controller: 'FindTeamController',
                templateUrl: 'components/find-team/find-team.html'
            })

            .state('create-team', {
                url: '/create-team',
                templateUrl: 'components/create-team/create-team.html'
            })


            .state('contact', {
                url: '/contact',
                templateUrl: 'components/contact/contact.html',
                controller: 'ContactCtrl'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl',
                resolve: { skipIfAuthenticated: skipIfAuthenticated }
            })

            .state('signup', {
                url: '/signup',
                templateUrl: 'components/signup/signup.html',
                controller: 'SignupCtrl',
                resolve: { skipIfAuthenticated: skipIfAuthenticated }
            })

            .state('account', {
                url: '/account',
                templateUrl: 'components/profile/profile.html',
                controller: 'ProfileCtrl',
                resolve: { loginRequired: loginRequired }
            })

            .state('reset', {
                url: '/reset/:token',
                templateUrl: 'components/reset/reset.html',
                controller: 'ResetCtrl'
            })

            .state('forgot', {
                url: '/forgot',
                templateUrl: 'components/forgot/forgot.html',
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

    .run(function ($rootScope, $window) {
        if ($window.localStorage.user) {
            $rootScope.currentUser = JSON.parse($window.localStorage.user);
        }

    });
