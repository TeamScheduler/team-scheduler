/*jshint strict:false */
describe("JoinTeamController", function() {
  var state, controller, backend, scope, account, teamService;

  var user = {
    _id: "597fe34b776f5610f713e09b",
    updatedAt: "2017-08-01T02:11:23.144Z",
    createdAt: "2017-08-01T02:11:23.144Z",
    name: "loram",
    email: "fake@g.com",
    team: "597fe34b776f5610f713e09a",
    __v: 0
  };

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($state, $controller, $httpBackend, TeamService, Account) {
      scope = {};

      state = $state;
      teamService = TeamService;
      backend = $httpBackend;

      teamService.getTeam = function() {
        return { name: "projetoes" };
      };

      account = Account;

      controller = $controller("JoinTeamController", {
        $scope: scope,
        $state: state,
        Account: account,
        TeamService: teamService
      });

      backend.whenPOST("/signup").respond(200, {});
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should have a function submit", function() {
    expect(scope.submit).to.be.ok;
  });

  it("shoul have transition to login state", function() {
    var spy = sinon.spy(state, "go");
    scope.submit(user);
    backend.flush();
    assert(spy.calledWith('login'));
  });
});
