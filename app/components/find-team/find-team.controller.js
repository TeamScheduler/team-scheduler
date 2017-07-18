/*jshint strict:false */

angular.module('MyApp').controller('FindTeamController', function ($scope, $state) {
  
  $scope.goToCreateTeam = function() {
    $state.go('create-team');
  };

  $scope.goToJoinTeam = function() {
    $state.go('join-team');
  };

});