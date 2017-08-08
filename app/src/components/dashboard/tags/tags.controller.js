/*jshint strict:false */

angular.module('MyApp').controller('TagsController', function($scope, $rootScope, $state, TeamService) {

    $scope.goBackToTags = function () {
        if($rootScope.currentUser.isAdmin){
            $state.go('dashboard.tags-adm');
        }else{
            $state.go('dashboard.tags');
        }
    };

    (function main() {

        if(!$rootScope.currentTag){
            $scope.goBackToTags();
        }

        $scope.currentTag = $rootScope.currentTag;
        $scope.currentUser = $rootScope.currentUser;

        TeamService.getTeamTags().then(
            function success(tags) {
                $scope.tags = tags;
            },
            function err(err) {
                //TODO: tratar erros
            }
        );

        TeamService.getTeamMembers().then(
            function succecss(response) {
                $scope.members = response;
            },
            function err(err) {
                //TODO: tratar erro.
                console.log(err);
            }
        );
    })();

    /*$scope.tags = [
        {
            name: 'DEV',
            color: '#212121',
            users: [
                {
                    email: 'vinicius@email.com'
                },
                {
                    email: 'maia@email.com'
                },
                {
                    email: 'matheus@email.com'
                },
                {
                    email: 'gustavo@email.com'
                }
            ]
        },

        {
            name: 'UX',
            color: '#4179F4',
            users: [
                {
                    email: 'matheus@email.com'
                }
            ]
        },

        {
            name: 'QA',
            color: '#F4424E',
            users: [
                {
                    email: 'gustavo@email.com'
                }
            ]
        }
    ];*/

    $scope.goToCreateTag = function () {
        $rootScope.currentTag = "NOT_NEEDED";
        $state.go('dashboard.create-tag');
    };

    $scope.createTag  = function(tag) {
        TeamService.createTag(tag).then(
            function success() {
                $state.go('dashboard.tags-adm');
            },
            function err() {
                //TODO: tratar erro.
            }
        );
    };

    $scope.goToTagMembers = function(tag) {
        $rootScope.currentTag = tag;
        $state.go('dashboard.tag-members');
    };

    $scope.selectMember = function(member){
        $scope.member = member;
    }

    $scope.render = function (member) {
        return member.email;
    }

    $scope.addMemberToTag = function(member, tag) {
        if(member) {
            TeamService.addMemberOnTag(tag._id, member._id).then(
                function success(responseTag) {
                    $scope.currentTag = responseTag;
                },
                function err(tags){
                    //TODO: tratar erro.
                }
            )
        }
    }


});