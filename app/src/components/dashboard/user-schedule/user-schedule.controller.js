/*jshint strict:false */

angular.module('MyApp').controller('UserScheduleController', function($scope, $rootScope, UserScheduleService) {

    $scope.user = $rootScope.currentUser;
    //Columns
    $scope.days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    (function main(){
        $scope.hours = [
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

        UserScheduleService.getUserHours($scope.user._id).then(
            function success(hours) {
                $scope.hours = hours;
            },
            function err(response) {
                //TODO: Tratar erros.
            }
        )
    })();

    $scope.isEditMode = false;

    $scope.editTableHour = function (hour, dayFlag) {
        if($scope.isEditMode){
            var temp = $scope.hours[getIndex(hour)];

            if(temp[dayFlag]){
                UserScheduleService.deleteHour(temp[dayFlag]).then(
                    function success(hours) {
                        $scope.hours = hours;
                    },
                    function err(response) {
                        //TODO: Tratar erros
                    }
                );
            }else {
                var hour = {
                    hour:  temp.hour,
                    day: dayFlag
                }
                UserScheduleService.createHour(hour).then(
                    function success(hours) {
                        $scope.hours = hours;
                    },
                    function err(response) {
                        //TODO: Tratar erros
                    }
                );
            }

            temp[dayFlag] = !temp[dayFlag];

        }
    };

    function getIndex(hour) {
      return $scope.hours.indexOf(hour);
    };
});