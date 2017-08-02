angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $rootScope, $state, $window, $auth, TeamService) {

      (function main(){
        var team = TeamService.getTeam();

        if(! team) {
            $state.go('find-team');
        }
        $scope.team = team;
      })();


      $scope.goToJoinTeam = function() {
          $state.go('join-team');
      };

    $scope.login = function() {
      $scope.user.teamId = $scope.team._id;
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $state.go('account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $state.go('home');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  });