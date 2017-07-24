angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $state, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $state.href();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $state.go('find-team');
    };
  });
