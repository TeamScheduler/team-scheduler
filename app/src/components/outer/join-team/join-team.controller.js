angular.module('MyApp').controller('JoinTeamController', function($scope, $state, Account, TeamService) {

    $scope.user = {};

    (function main(){
        var team = TeamService.getTeam();

        if(! team) {
            $state.go('find-team');
        }
        $scope.team = team;
    })();

    $scope.submit = function(user) {
        user.team = $scope.team._id;
        var promise = Account.joinTeam(user);
        promise.then(success, err);

        function success(response){
            //exibe mensagem de sucesso para o usuario
            console.log(response);
            $state.go('login');
        }

        function err(response) {
            //exibe mensagem de erro para o usuario
            console.log(response);
        }
    }
});