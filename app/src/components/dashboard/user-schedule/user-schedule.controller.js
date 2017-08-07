/*jshint strict:false */

angular.module('MyApp').controller('UserScheduleController', function($scope, $rootScope, UserScheduleService) {

    $scope.user = $rootScope.currentUser;
    //Columns
    $scope.days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    (function main(){
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