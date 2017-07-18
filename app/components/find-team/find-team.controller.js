/*jshint strict:false */

angular.module('MyApp').controller('FindTeamController', function ($scope, $state) {
  
  $scope.goToCreateTeam = function() {
    $state.go('create-team');
  };

});