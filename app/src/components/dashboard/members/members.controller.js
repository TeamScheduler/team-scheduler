/*jshint strict:false */

angular
  .module("MyApp")
  .controller("MembersController", function($scope, $rootScope, TeamService) {
    var currentUser = $rootScope.currentUser;

    function init() {
      TeamService.getTeamMembers().then(
        function succecss(response) {
          $scope.members = response;
        },
        function err(err) {
          //TODO: tratar erro.
          console.log(err);
        }
      );
      if (currentUser.isAdmin) {
        TeamService.getTeamPendingMembers().then(
          function succecss(response) {
            $scope.requests = response;
          },
          function err(err) {
            //TODO: tratar erro.
            console.log(err);
          }
        );
      }
    }

    function getAllTags() {
        TeamService.getTeamTags().then(
            function success(tags) {
                $scope.tags = tags;
            },
            function err(err) {
                //TODO: tratar erros
            }
        );
    }

    (function main() {
      init();
      getAllTags();
    })();

    /*$scope.members = [
        {
            name: 'Gustavo Diniz',
            email: 'gustavo@email.com',
            tags: [
                {
                    name: 'DEV',
                    color: '#212121'
                },
                {
                    name: 'QA',
                    color: '#F4424E'
                }
            ]
        },

        {
            name: 'Matheus P.',
            email: 'matheus@email.com',
            tags: [
                {
                    name: 'DEV',
                    color: '#212121'
                },
                {
                    name: 'UX',
                    color: '#4179F4'
                }
            ]
        },

        {
            name: 'Vinicius A',
            email: 'agostinho@email.com',
            tags: [
                {
                    name: 'DEV',
                    color: '#212121'
                },
                {
                    name: 'LGBT',
                    color: '#F441AF'
                }
            ]
        }
    ];*/

    $scope.resolvePendingMembers = function(userId, action) {
      TeamService.updateTeamPendingMembers(
        {
            userId: userId,
            action: action
        }).then(
        function success(response) {
          console.log(response);
          init();
        },
        function err(err) {
          //TODO: Tratar erro
          console.log(err);
        }
      );
    };

    $scope.toggle = true;

    $scope.showMembers = function() {
      $scope.toggle = true;
    };

    $scope.showInvites = function() {
      $scope.toggle = false;
    };

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
