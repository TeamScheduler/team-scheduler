/*jshint strict:false */
describe("FindTeamController", function() {
  var state, controller, scope, teamService, backend;

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($state, $httpBackend, $controller, TeamService) {
      scope = {};

      state = $state;
      teamService = TeamService;
      backend = $httpBackend;

      controller = $controller("FindTeamController", {
        $scope: scope,
        $state: state,
        TeamService: teamService
      });

      backend.whenGET("/team/597fe34b776f5610f713e09a").respond(400, {});
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

  it("should have a function clearErr", function() {
    expect(scope.goToJoinTeam).to.be.ok;
  });

  it("should clear error", function() {
    scope.clearErr();
    expect(scope.err.exists).to.be.false;
    expect(scope.err.msg).to.be.equal("");
  });

  it("shold make transition to create-team state", function() {
    var spy = sinon.spy(state, "go");
    scope.goToCreateTeam();
    assert(spy.calledWith("create-team"));
  });

  it("dont should make transition to find-team", function() {
    var spy = sinon.spy(state, "go");
    scope.goToJoinTeam();
    assert.isFalse(spy.calledWith("login"));
  });

  it("should make transition to login", function() {
    var spy = sinon.spy(state, "go");
    scope.goToJoinTeam("597fe34b776f5610f713e09a");
    backend.flush();
    assert.isFalse(spy.calledWith("login"));
  });
});
