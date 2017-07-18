angular.module('MyApp', ['ui.router', 'satellizer'])


    .config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

        $stateProvider

            .state({
                name: 'home',
                url: '/home',
                templateUrl: 'components/home/home.html'
            })

            .state({
                name: 'find-team',
                url: '/find-team',
                controller: 'FindTeamController',
                templateUrl: 'components/outer/find-team/find-team.html'
            })

            .state({
                name: 'create-team',
                url: '/create-team',
                controller: 'CreateTeamController',
                templateUrl: 'components/outer/create-team/create-team.html'
            })

            .state({
                name: 'join-team',
                url: '/join-team',
                templateUrl: 'components/outer/join-team/join-team.html'
            })


            .state({
                name: 'contact',
                url: '/contact',
                templateUrl: 'components/contact/contact.html',
                controller: 'ContactCtrl'
            })

            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl',
                resolve: { skipIfAuthenticated: skipIfAuthenticated }
            })

            .state({
                name: 'signup',
                url: '/signup',
                templateUrl: 'components/signup/signup.html',
                controller: 'SignupCtrl',
                resolve: { skipIfAuthenticated: skipIfAuthenticated }
            })

            .state({
                name: 'account',
                url: '/account',
                templateUrl: 'components/profile/profile.html',
                controller: 'ProfileCtrl',
                resolve: { loginRequired: loginRequired }
            })

            .state({
                name: 'reset',
                url: '/reset/:token',
                templateUrl: 'components/reset/reset.html',
                controller: 'ResetCtrl'
            })

            .state({
                name: 'forgot',
                url: '/forgot',
                templateUrl: 'components/forgot/forgot.html',
                controller: 'ForgotCtrl',
                resolve: { skipIfAuthenticated: skipIfAuthenticated }
            })

            .state({
                name: 'dashboard',
                url: '/dashboard',
                templateUrl: 'components/dashboard/root/root.html'
            })

            .state({
                name: 'all-users-schedule',
                url: '/dashboard/all-users-schedule',
                templateUrl: 'components/dashboard/all-users-schedule/all-users-schedule.html'
            })

            .state({
                name: 'user-schedule',
                url: '/dashboard/user-schedule',
                templateUrl: 'components/dashboard/user-schedule/user-schedule.html'
            })

            .state({
                name: 'members',
                url: '/dashboard/members',
                templateUrl: 'components/dashboard/members/members.html'
            })

            .state({
                name: 'tags',
                url: '/dashboard/tags',
                templateUrl: 'components/dashboard/tags/tags.html'
            })

            .state({
                name: 'config',
                url: '/dashboard/config',
                templateUrl: 'components/dashboard/config/config.html'
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
