/*jshint strict:false */

angular.module('MyApp').controller('FindTeamController', function ($scope, $state, Account) {
  
  $scope.goToCreateTeam = function() {
    $state.go('create-team');
  };

  $scope.goToJoinTeam = function() {
    $state.go('join-team');
  };

  $scope.findTeam = function () {
      Account.findTeam($scope.id)
          .then(function(response) {
              $window.localStorage.team = JSON.stringify(response.data.team);
              $state.go('join-team');
          })
          .catch(function(response) {
              $scope.messages = {
                  error: Array.isArray(response.data) ? response.data : [response.data]
              };
          });

  }

});