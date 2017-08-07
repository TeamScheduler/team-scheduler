/*jshint strict:false */

angular.module('MyApp').controller('JoinConfirmController', function($scope, $state) {

    $scope.goToFindTeam = function() {
        $state.go('find-team');
    };

});