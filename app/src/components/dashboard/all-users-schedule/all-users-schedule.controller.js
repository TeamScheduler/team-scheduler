/*jshint strict:false */

angular.module('MyApp').controller('AllUsersScheduleController', function($scope) {

    //Columns
    $scope.days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    //Lines
    /*$scope.hours = ['5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
     '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
     '17:00', '17:30', '18:00', '18:30', '19:00'];*/

    $scope.hours =[
        {
            hour: '5:30',
            mon: ['Matheus', 'Gustavo'],
            tue: ['Vinicius', 'Daniyel'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '6:00',
            mon: ['Maia', 'Gustavo'],
            tue: ['Maia', 'Igor'],
            wed: [],
            thu: ['Luis'],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '6:30',
            mon: ['Maia', 'Luis'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '7:00',
            mon: ['Maia', 'Gustavo'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '7:30',
            mon: ['Maia', 'Gustavo'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '8:00',
            mon: ['Maia', 'Gustavo'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '8:30',
            mon: ['Maia', 'Gustavo'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '9:00',
            mon: ['Maia', 'Gustavo'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        },
        {
            hour: '9:30',
            mon: ['Maia', 'Gustavo'],
            tue: ['Vinicius', 'Igor'],
            wed: [],
            thu: [],
            fri: [],
            sat: ['Vinicius', 'Matheus'],
            sun: []
        }
    ]
});