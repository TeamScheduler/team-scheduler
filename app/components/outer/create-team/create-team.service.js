(function () {
    'use strict';

    angular.module('MyApp').factory('CreateTeamService', Service);

    const API = 'http://localhost:3000/'

    function Service($http) {
        var service = {};

        service.createTeam = createTeam;

        return service;

        function createTeam(user, callback) {

            $http.post(API.concat('signup'), { name: user.name, email: user.email, password: user.password }).then(success, err)

            function success (response) {
                var token = response.data.token;
                if (token) {
                    callback(true);
                } else {
                    callback(false);
                }
            }

            function err (response) {
                callback(false);
            }

        }
    }
})();