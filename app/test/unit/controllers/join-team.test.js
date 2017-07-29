describe("JoinTeamController", function() {
  var state, controller, scope, account, teamService;

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($state, $controller, TeamService, Account) {
      scope = {
          team: {}
      };

      state = $state;
      teamService = TeamService;
      account = Account; 

      controller = $controller("JoinTeamController", {
        $scope: scope,
        $state: state,
        Account: account,
        TeamService: teamService
      });
    })
  );

//   it("should exist", function() {
//     expect(controller).to.be.ok;
//   });

//   it("should have a function submit", function() {
//     expect(scope.submit).to.be.ok;
//   });

});
