/*jshint strict:false */

angular.module('MyApp').controller('TagsController', function($scope, $state, TeamService) {


    (function main() {

        TeamService.getTeamMembers(teamId).then(
            function succecss(response) {
                $scope.members = response;
            },
            function err(response) {
                //TODO: tratar erro.
                console.log(err);
            }
        );

    })();


    $scope.tags = [
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
    ];

    $scope.goToCreateTag = function () {
        $state.go('dashboard.create-tag');
    };

    $scope.goBackToTags = function () {
        $state.go('dashboard.tags-adm')
    };

    $scope.membersAutocomplete = function(search){

        if (search === ""){

            $scope.completing = false;

        }else{

            $scope.completing = true;
            $scope.completes = forEach()
            { search : $scope.members.email};

        }
    };



});