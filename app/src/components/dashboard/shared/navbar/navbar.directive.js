/*jshint strict:false */
angular.module('MyApp').directive('navbar', function($state, $window, $auth, $rootScope) {
    return {
        templateUrl: 'components/dashboard/shared/navbar/navbar.html',
        link: function(scope, element, attrs) {
            var currentUser = $rootScope.currentUser;

            scope.logout = function() {
                $auth.logout();
                delete $window.localStorage.user;
                $state.go('find-team');
            };

            scope.isAdmin = currentUser.isAdmin;
        }
    };
});