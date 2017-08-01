/*jshint strict:false */

angular.module('MyApp').controller('TeamInfoController', function($scope, $state, TeamService) {

    (function main(){
        var team = TeamService.getTeam();

        if(! team) {
            $state.go('find-team');
        }
        $scope.team = team;
    })();

    $scope.goToLogin = function(teamId) {
        TeamService.findTeamById(teamId).then(
            function success() {
                $state.go('login');
            },
            function err() {
                //exibir mensagem de erro
            }
        );
    };

});