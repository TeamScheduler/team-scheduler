angular.module('MyApp').controller('JoinTeamController', function($scope, $state, Account, TeamService) {

    $scope.user = {};
    $scope.team = TeamService.getTeam().name;//Fica undefined depois de um reload//Cache?

    $scope.submit = function(user) {
        console.log(user);
        var promise = Account.joinTeam(team, user);
        promise.then(success, err);

        function success(response){
            //exibe mensagem de sucesso para o usuario
            $state.go('login'); //Se foi cadastrado vai para a tela de login(Aguardar ser aceito)
            console.log(response);
        }

        function err(response) {
            //exibe mensagem de erro para o usuario
            console.log(response);
        }
    }
});