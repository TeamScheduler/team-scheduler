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

            scope.goToMembers = function() {
                console.log(currentUser.isAdmin);
                if(currentUser.isAdmin){
                    $state.go('dashboard.members-adm');
                }else{
                    $state.go('dashboard.members');
                }
            };
        }
    };
});