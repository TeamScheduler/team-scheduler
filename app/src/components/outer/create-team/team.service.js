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
        service.createTag = createTag;
        service.getTeamTags  = getTeamTags;
        service.addMemberOnTag = addMemberOnTag;

        return service;

        function createTeam(teamName, admin) {
            var deferred = $q.defer();

            if( teamName === '' || admin.name === undefined ){
                deferred.reject({error:'validation error'});
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

        function getTeamMembers() {
            var deferred = $q.defer();

            $http.get(API + '/members').then(
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

        function getTeamPendingMembers() {
            var deferred = $q.defer();

            $http.get(API + '/pending-members').then(
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

        function updateTeamPendingMembers(body) {
            var deferred = $q.defer();

            $http.patch(API + '/pending-members', body).then(
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

        function createTag(tag) {
            var deferred = $q.defer();

            $http.post(API + '/tag', tag).then(
                function success(response){
                    team = response.data.team;
                    deferred.resolve(response.data);
                },
                function err(response){
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function addMemberOnTag(tagId, memberId) {
            var deferred = $q.defer();
            var body = {
                action : "add",
                memberId : memberId,
                tagId : tagId
            }
            $http.patch(API + '/tag', body).then(
                function success(response) {
                    var tags = response.data;
                    deferred.resolve(tags);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }

        function getTeamTags() {
            var deferred = $q.defer();

            $http.get(API + '/tags').then(
                function success(response) {
                    var tags = response.data;
                    deferred.resolve(tags);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }
    }
})();