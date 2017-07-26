/*jshint strict:false */

angular.module('MyApp').controller('CreateTeamController', function($scope, $state, TeamService) {
    $scope.team = '';
    $scope.admin = {};

    $scope.submit = function(teamName, admin) {
        var promise = TeamService.createTeam(teamName, admin);
        promise.then(success, err);

        function success(response){
            //exibe mensagem de sucesso para o usuario
            $state.go('login'); //????
            console.log(response);
        }

        function err(response) {
            //exibe mensagem de erro para o usuario
            console.log(response);
        }
    }
});