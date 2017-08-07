/*jshint strict:false */

angular.module('MyApp').controller('TagsController', function($scope, $state, TeamService) {


    (function main() {
        TeamService.getTeamTags().then(
            function success(tags) {
                $scope.tags = tags;
            },
            function err(err) {
                //TODO: tratar erros
            }
        )
    })();

    /*$scope.tags = [
        {
            name: 'DEV',
            color: '#212121',
            users: [
                {
                    email: 'vinicius@email.com'
                },
                {
                    email: 'maia@email.com'
                },
                {
                    email: 'matheus@email.com'
                },
                {
                    email: 'gustavo@email.com'
                }
            ]
        },

        {
            name: 'UX',
            color: '#4179F4',
            users: [
                {
                    email: 'matheus@email.com'
                }
            ]
        },

        {
            name: 'QA',
            color: '#F4424E',
            users: [
                {
                    email: 'gustavo@email.com'
                }
            ]
        }
    ];*/

    $scope.goToCreateTag = function () {
        $state.go('dashboard.create-tag');
    };

    $scope.goBackToTags = function () {
        $state.go('dashboard.tags-adm');
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
    }
});