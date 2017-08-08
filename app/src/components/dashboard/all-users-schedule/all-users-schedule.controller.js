/*jshint strict:false */

angular.module('MyApp').controller('AllUsersScheduleController', function($scope, $rootScope, TeamService, TeamScheduleService) {

    (function main() {
        TeamService.getTeamTags().then(
            function success(tags) {
                $scope.tags = tags;
            },
            function err(err) {
                //TODO: tratar erros
            }
        )

        $scope.hours = [
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

        TeamScheduleService.getUserHours($rootScope.currentUser._id).then(
            function (hours) {
                $scope.hours = hours;
            }
        )
    })();

    $scope.toggleTags = false;

    $scope.days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    var checkMemberInTag = function (tag, memberId){
        var isMemberInTag = false;
        var tagMembers = tag.members;
        tagMembers.forEach(function(tagMember){
            if(tagMember._id === memberId){
                isMemberInTag = true;
            }
        });
        return isMemberInTag;
    };

    $scope.getMemberTags = function (tags, memberId) {

        if(!tags || !memberId){
            return [];
        }

        var memberTags = tags.filter( function( tag, index, array ) {
            return checkMemberInTag(tag, memberId);
        });

        return memberTags;
    };
});