(function () {
    'use strict';

    angular.module('MyApp').factory('TeamService', Service);

    var API = '/team';

    var team;

    function Service($http, $q) {
        var service = {};

        service.createTeam = createTeam;
        service.findTeamById = findTeamById;
        service.getTeam = getTeam;
        service.getTeamMembers = getTeamMembers;
        service.getTeamPendingMembers = getTeamPendingMembers;
        service.updateTeamPendingMembers = updateTeamPendingMembers;

        return service;

        function createTeam(teamName, admin) {
            var deferred = $q.defer();

            if( teamName === '' || admin.name === undefined ){
                deferred.reject({error:'validation error'})
            }else{
                var teamBody  = {
                    name: teamName,
                    admin: admin
                };

                $http.post(API, teamBody).then(
                    function success(response){
                        team = response.data.team;
                        deferred.resolve(response.data);
                    },
                    function err(response){
                        deferred.reject(response);
                    }
                );
            }
            return deferred.promise;
        }

        function findTeamById(teamId) {
            var deferred = $q.defer();

            $http.get(API + '/' + teamId).then(
                function success(response) {
                    team = response.data;
                    deferred.resolve(team);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }

        function getTeamMembers(teamId) {
            var deferred = $q.defer();

            $http.get(API + '/' + teamId + '/members').then(
                function success(response) {
                    var members = response.data;
                    deferred.resolve(members);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }

        function getTeamPendingMembers(teamId) {
            var deferred = $q.defer();

            $http.get(API + '/' + teamId + '/pending-members').then(
                function success(response) {
                    var members = response.data;
                    deferred.resolve(members);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }

        function updateTeamPendingMembers(teamId, body) {
            var deferred = $q.defer();

            $http.patch(API + '/' + teamId + '/pending-members', body).then(
                function success(response) {
                    var members = response.data;
                    deferred.resolve(members);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }

        function getTeam() {
            return team;
        }
    }
})();