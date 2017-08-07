/*jshint strict:false */

angular.module('MyApp').controller('TagsController', function($scope, $rootScope, $state, TeamService) {


    (function main() {

        $scope.currentTag = $rootScope.currentTag;
        $scope.currentUser = $rootScope.currentUser;

        TeamService.getTeamTags().then(
            function success(tags) {
                $scope.tags = tags;
            },
            function err(err) {
                //TODO: tratar erros
            }
        );

        TeamService.getTeamMembers().then(
            function succecss(response) {
                $scope.members = response;
            },
            function err(err) {
                //TODO: tratar erro.
                console.log(err);
            }
        );
    })();

    $scope.goToCreateTag = function () {
        $state.go('dashboard.create-tag');
    };

    $scope.goBackToTags = function () {
        if($rootScope.currentUser.isAdmin){
            $state.go('dashboard.tags-adm');
        }else{
            $state.go('dashboard.tags');
        }
    };

    $scope.createTag  = function(tag) {
        TeamService.createTag(tag).then(
            function success() {
                $state.go('dashboard.tags-adm');
            },
            function err() {
                //TODO: tratar erro.
            }
        )
    };

    $scope.goToTagMembers = function(tag) {
        $rootScope.currentTag = tag;
        $state.go('dashboard.tag-members');
    };
});