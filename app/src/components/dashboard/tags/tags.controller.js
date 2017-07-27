/*jshint strict:false */

angular.module('MyApp').controller('TagsController', function($scope) {

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

});