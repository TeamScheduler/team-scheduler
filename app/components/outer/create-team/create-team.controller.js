/*jshint strict:false */

angular.module('MyApp').controller('CreateTeamController', function($scope, CreateTeamService) {
    $scope.team = '';
    $scope.user = {};

    $scope.submit = function() {
        CreateTeamService.createTeam($scope.user, function (isCreated) {
            if (isCreated) {
                console.log("OK");
            }
        });
    }
});