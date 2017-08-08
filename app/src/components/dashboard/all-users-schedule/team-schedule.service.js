(function () {
    'use strict';

    angular.module('MyApp').factory('TeamScheduleService', Service);

    var API = '/team';

    var team;

    function Service($http, $q) {
        var service = {};

        service.getUserHours = getUserHours;


        return service;

        function getUserHours(userId) {
            var deferred = $q.defer();
            var body = {
                userId : userId
            }
            $http.get(API + '/members', body).then(
                function success(response) {
                    deferred.resolve(hoursMapper(response.data));
                },
                function err(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }


        function hoursMapper(users) {
            var templateHoursModel = [
                { hour: '00:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '01:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '02:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '03:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '04:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '05:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '06:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '07:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '08:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '09:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '10:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '11:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '12:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '13:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '14:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '15:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '16:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '17:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '18:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '19:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '20:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '21:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '22:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
                { hour: '23:00', mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] }
            ];
            
            users.forEach(function (user) {
                var userHours = user.hours;
                userHours.forEach(function(userHour) {
                    templateHoursModel.forEach(function(templateHour) {
                        if(userHour.hour === templateHour.hour) {
                            templateHour[userHour.day].push(user);
                        }
                    });
                });
            });

            return templateHoursModel;
        }


    }
})();