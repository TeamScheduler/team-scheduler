(function () {
    'use strict';

    angular.module('MyApp').factory('UserScheduleService', Service);

    var API = '/user';

    var team;

    function Service($http, $q) {
        var service = {};

        service.createHour = createHour;
        service.deleteHour = deleteHour;
        service.getUserHours = getUserHours;


        return service;

        function createHour(hour) {
            var deferred = $q.defer();
            var body = {
                action: 'add',
                hour: hour
            }
            $http.post(API+'/hours', body).then(
                function success(response){
                    deferred.resolve(response.data);
                },
                function err(response){
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function deleteHour(hourId) {
            var deferred = $q.defer();
            var body = {
                action: 'remove',
                hourId: hourId
            }
            $http.post(API+'/hours', body).then(
                function success(response){
                    deferred.resolve(response.data);
                },
                function err(response){
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function getUserHours(userId) {
            var deferred = $q.defer();
            var body = {
                userId : userId
            }
            $http.get(API + '/hours', body).then(
                function success(response) {
                    deferred.resolve(response.data);
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }


        function hoursMapper(userHours) {
            var templateHoursModel = []


        }


    }
})();