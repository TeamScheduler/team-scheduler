/*jshint strict:false */
"use strinct";
angular.module('MyApp', ['ui.router', 'satellizer', 'autocomplete'])
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
                name: 'join-confirm',
                url: '/join-confirm',
                controller: 'JoinConfirmController',
                templateUrl: 'components/outer/join-confirm/join-confirm.html'
            })

            .state({
                name: 'team-info',
                url: '/team-info',
                controller: 'TeamInfoController',
                templateUrl: 'components/outer/team-info/team-info.html'
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
                controller: 'JoinTeamController',
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
                templateUrl: 'components/outer/login/login.html',
                controller: 'LoginCtrl'
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
                templateUrl: 'components/dashboard/root/root.html',
                //resolve: { loginRequired: loginRequired }
            })

            .state({
                name: 'dashboard.all-users-schedule',
                url: '/all-users-schedule',
                templateUrl: 'components/dashboard/all-users-schedule/all-users-schedule.html',
                controller: 'AllUsersScheduleController'
            })

            .state({
                name: 'dashboard.user-schedule',
                url: '/user-schedule',
                templateUrl: 'components/dashboard/user-schedule/user-schedule.html',
                controller: 'UserScheduleController'
            })

            .state({
                name: 'dashboard.members',
                url: '/members',
                templateUrl: 'components/dashboard/members/members.html',
                controller: 'MembersController'
            })

            .state({
                name: 'dashboard.members-adm',
                url: '/members-adm',
                templateUrl: 'components/dashboard/members/members-adm.html',
                controller: 'MembersController'
            })

            .state({
                name: 'dashboard.tags',
                url: '/tags',
                templateUrl: 'components/dashboard/tags/tags.html',
                controller: 'TagsController'
            })

            .state({
                name: 'dashboard.tags-adm',
                url: '/tags-adm',
                templateUrl: 'components/dashboard/tags/tags-adm.html',
                controller: 'TagsController'
            })

            .state({
                name: 'dashboard.create-tag',
                url: '/tags-adm/create-tag',
                templateUrl: 'components/dashboard/tags/create-tag.html',
                controller: 'TagsController'
            })

            .state({
                name: 'dashboard.tag-members',
                url: '/tags/tag-members',
                templateUrl: 'components/dashboard/tags/tag-members.html',
                controller: 'TagsController'
            })

            .state({
                name: 'dashboard.config',
                url: '/config',
                templateUrl: 'components/dashboard/config/config.html',
                controller: 'ConfigController'
            });

            $urlRouterProvider.otherwise('/find-team');

        $authProvider.loginUrl = '/login';
        $authProvider.signupUrl = '/signup';

        function skipIfAuthenticated($state, $auth) {
            console.log("skip if is auth");
            if ($auth.isAuthenticated()) {
                $state.go('dashboard');
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
