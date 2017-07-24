angular.module('MyApp').directive('navbar', function($state, $window, $auth) {
    return {
        templateUrl: 'components/dashboard/shared/navbar/navbar.html',
        link: function(scope, element, attrs) {
            scope.logout = function() {
                $auth.logout();
                delete $window.localStorage.user;
                $state.go('find-team');
            }
        }
    };
});