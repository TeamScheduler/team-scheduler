/*jshint strict:false */

angular.module('MyApp').controller('FindTeamController', function ($scope, $state, TeamService) {
  
  $scope.goToCreateTeam = function() {
    $state.go('create-team');
  };

  $scope.goToJoinTeam = function(teamId) {
    TeamService.findTeamById(teamId).then(
      function success() {
        $state.go('join-team');
      },
      function err() {
        //exibir mensagem de erro
      }
    );
  };

});