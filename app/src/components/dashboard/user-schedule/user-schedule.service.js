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
            $http.patch(API+'/hours', body).then(
                function success(response){
                    deferred.resolve(hoursMapper(response.data));
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
            $http.patch(API+'/hours', body).then(
                function success(response){
                    deferred.resolve(hoursMapper(response.data));
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
                    deferred.resolve(hoursMapper(response.data));
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }


        function hoursMapper(userHours) {
            var templateHoursModel = [
                { hour: '00:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '01:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '02:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '03:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '04:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '05:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '06:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '07:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '08:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '09:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '10:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '11:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '12:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '13:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '14:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '15:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '16:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '17:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '18:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '19:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '20:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '21:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '22:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
                { hour: '23:00', mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }
            ];

            userHours.forEach(function(userHour) {
                templateHoursModel.forEach(function(templateHour) {
                    if(userHour.hour === templateHour.hour) {
                        templateHour[userHour.day] = userHour._id;
                    }
                });
            });
            return templateHoursModel;
        }


    }
})();