/*jshint strict:false */

angular.module('MyApp').controller('CreateTeamController', function($scope, $state, TeamService) {
    $scope.team = '';
    $scope.admin = {};

    $scope.submit = function(teamName, admin) {
        var promise = TeamService.createTeam(teamName, admin);
        promise.then(success, err);

        function success(response){
            //exibe mensagem de sucesso para o usuario
            $state.go('team-info'); //????
            console.log(response);
        }

        function err(response) {
            //exibe mensagem de erro para o usuario
            $scope.messages = {
                error:  Array.isArray(response.data) ? response.data : [response.data]
            };
            console.log(response);
        }
    };
});