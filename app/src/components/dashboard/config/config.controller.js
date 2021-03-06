angular.module('MyApp')
    .controller('ConfigController', function($scope, $rootScope, $state, $window, $auth, Account, TeamService) {

        $scope.profile = $rootScope.currentUser;
        $scope.team = $scope.profile.team;

        $scope.updateProfile = function() {
            Account.updateProfile($scope.profile)
                .then(function(response) {
                    $rootScope.currentUser = response.data.user;
                    $window.localStorage.user = JSON.stringify(response.data.user);
                    $scope.messages = {
                        success: [response.data]
                    };
                })
                .catch(function(response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.changePassword = function() {
            Account.changePassword($scope.profile)
                .then(function(response) {
                    $scope.messages = {
                        success: [response.data]
                    };
                })
                .catch(function(response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.createFeedback = function(feedback) {
            TeamService.createFeedback(feedback).then(
                function (feedback) {
                    $scope.messages = {
                        success: [feedback]
                    };
                },
                function (response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                }
            )
            $scope.feedback = "";
        };

        $scope.link = function(provider) {
            $auth.link(provider)
                .then(function(response) {
                    $scope.messages = {
                        success: [response.data]
                    };
                })
                .catch(function(response) {
                    $window.scrollTo(0, 0);
                    $scope.messages = {
                        error: [response.data]
                    };
                });
        };
        $scope.unlink = function(provider) {
            $auth.unlink(provider)
                .then(function(response) {
                    $scope.messages = {
                        success: [response.data]
                    };
                })
                .catch(function(response) {
                    $scope.messages = {
                        error: [response.data]
                    };
                });
        };

        $scope.deleteAccount = function() {
            Account.deleteAccount()
                .then(function() {
                    $auth.logout();
                    delete $window.localStorage.user;
                    $state.go('find-team');
                })
                .catch(function(response) {
                    $scope.messages = {
                        error: [response.data]
                    };
                });
        };
    });