/*jshint strict:false */

angular.module('MyApp').controller('UserScheduleController', function($scope, $rootScope) {

    $scope.user = $rootScope.currentUser;
    //Columns
    $scope.days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    //Lines
    $scope.hours =[
        {
            hour: '0:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '1:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '2:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '3:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '4:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
         {
             hour: '5:00',
             mon: false,
             tue: false,
             wed: false,
             thu: false,
             fri: false,
             sat: false,
             sun: false
        },
        {
            hour: '6:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '7:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '8:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '9:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '10:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '11:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '12:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '13:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '14:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '15:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '16:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '17:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '18:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '19:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '20:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '21:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '22:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        },
        {
            hour: '23:00',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        }
    ];

    $scope.isEditMode = false;

    $scope.editTableHour = function (hour, dayFlag) {

        if($scope.isEditMode){
            temp = $scope.hours[getIndex(hour)];

            if(dayFlag === 'mon')
                temp.mon = !temp.mon;

            if(dayFlag === 'tue')
                temp.tue = !temp.tue;

            if(dayFlag === 'wed')
                temp.wed = !temp.wed;

            if(dayFlag === 'thu')
                temp.thu = !temp.thu;

            if(dayFlag === 'fri')
                temp.fri = !temp.fri;

            if(dayFlag === 'sat')
                temp.sat = !temp.sat;

            if(dayFlag === 'sun')
                temp.sun = !temp.sun;
        }
    };

    function getIndex(hour) {
      return $scope.hours.indexOf(hour);
    };
});