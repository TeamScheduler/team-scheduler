describe("FindTeamController", function() {
  var state, controller, scope, teamService;

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($state, $controller, TeamService) {
      scope = {};

      state = $state;
      teamService = TeamService;
      controller = $controller("FindTeamController", {
        $scope: scope,
        $state: state,
        TeamService: teamService
      });
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should have a function goToCreateTeam", function() {
    expect(scope.goToCreateTeam).to.be.ok;
  });

  it("should have a function goToJoinTeam", function() {
    expect(scope.goToJoinTeam).to.be.ok;
  });

  // it("shold make transition", function() {
    // inject(function($rootScope) {
    //   $rootScope.$apply(function() {
    //     state.go("create-team");
    //   });
    //   expect(state.current.name).to.equal("create-team");
    // });
  // });
});
