describe("CreateTeamController", function() {
  var state, controller, scope, teamService;

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($state, $controller, TeamService) {
      scope = {};

      state = $state;
      teamService = TeamService;
      controller = $controller("CreateTeamController", {
        $scope: scope,
        $state: state,
        TeamService: teamService
      });
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should have a function submit", function() {
    expect(scope.submit).to.be.ok;
  });
});
