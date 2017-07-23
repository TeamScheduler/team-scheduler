(function () {
    'use strict';

    angular.module('MyApp').factory('TeamService', Service);

    var API = 'http://localhost:3000/team';

    function Service($http, $q) {
        var service = {};

        service.createTeam = createTeam;

        return service;

        function createTeam(teamName, admin) {
            var deferred = $q.defer();

            if( teamName === '' || admin.name === undefined ){
                deferred.reject({error:'validation error'})
            }else{
                var teamBody  = {
                    name: teamName,
                    admin: admin
                }

                $http.post(API, teamBody).then(
                    function success(response){
                        deferred.resolve(response.data);
                    },
                    function err(response){
                        deferred.reject(response)
                    }
                );
            }
            return deferred.promise;
        }
    }
})();