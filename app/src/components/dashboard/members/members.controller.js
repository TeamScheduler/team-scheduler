/*jshint strict:false */

angular.module('MyApp').controller('MembersController', function($scope) {

    $scope.members = [
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
    ];

    $scope.requests = [
        {
            email: 'joaoartur@email.com'
        },
        {
            email: 'jorgefigueiredo@email.com'
        },
        {
            email: 'daltonserey@email.com'
        },
        {
            email: 'rohitgheyi@email.com'
        },
        {
            email: 'franklin@email.com'
        },
        {
            email: 'thiagomassoni@email.com'
        }
    ];

    $scope.toggle = true;

    $scope.showMembers = function () {
        $scope.toggle = true;
    };

    $scope.showInvites = function () {
        $scope.toggle = false;
    };

});