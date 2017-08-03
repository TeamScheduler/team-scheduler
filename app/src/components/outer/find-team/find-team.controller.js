/*jshint strict:false */

angular.module('MyApp').controller('FindTeamController', function ($scope, $state, TeamService) {
  
  $scope.goToCreateTeam = function() {
    $state.go('create-team');
  };

  $scope.err = {
    exists: false,
    msg: ''
  };

  $scope.clearErr = function () {
    $scope.err.exists = false;
    $scope.err.msg = '';
  };

  $scope.goToJoinTeam = function(teamId) {
    TeamService.findTeamById(teamId).then(
      function success() {
        $state.go('login');
      },
      function err() {
        $scope.err.exists = true;
        $scope.err.msg = 'Time não encontrado!';
      }
    );
  };

});