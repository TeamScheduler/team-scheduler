/*jshint strict:false */

angular.module('MyApp').controller('MembersController', function($scope, $rootScope, TeamService) {

    var currentUser = $rootScope.currentUser;
    var teamId = currentUser.team;


    function init() {
        TeamService.getTeamMembers(teamId).then(
            function succecss(response) {
                $scope.members = response;
            },
            function err(err) {
                //TODO: tratar erro.
                console.log(err);
            }
        );
        if(currentUser.isAdmin) {
            TeamService.getTeamPendingMembers(teamId).then(
                function succecss(response) {
                    $scope.requests = response;
                },
                function err(err) {
                    //TODO: tratar erro.
                    console.log(err);
                }
            );
        }
    }

    (function main() {
        init();
    })();

    /*$scope.members = [
        {
            name: 'Gustavo Diniz',
            email: 'gustavo@email.com',
            tags: [
                {
                    name: 'DEV',
                    color: '#212121'
                },
                {
                    name: 'QA',
                    color: '#F4424E'
                }
            ]
        },

        {
            name: 'Matheus P.',
            email: 'matheus@email.com',
            tags: [
                {
                    name: 'DEV',
                    color: '#212121'
                },
                {
                    name: 'UX',
                    color: '#4179F4'
                }
            ]
        },

        {
            name: 'Vinicius A',
            email: 'agostinho@email.com',
            tags: [
                {
                    name: 'DEV',
                    color: '#212121'
                },
                {
                    name: 'LGBT',
                    color: '#F441AF'
                }
            ]
        }
    ];*/

    $scope.resolvePendingMembers = function (userId, action) {
        TeamService.updateTeamPendingMembers(teamId, {
            userId: userId,
            action: action
        }).then(
            function success(response) {
                init();
            },
            function err(response) {
                //TODO: Tratar erro
                console.log(err);
            }
        )
    }
    
    $scope.toggle = true;

    $scope.showMembers = function () {
        $scope.toggle = true;
    };

    $scope.showInvites = function () {
        $scope.toggle = false;
    };

});