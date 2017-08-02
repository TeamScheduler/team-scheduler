describe("TeamInfoController", function() {
  var scope, controller, state, backend, teamService;
  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller, $state, $httpBackend, TeamService) {
      scope = {};
      state = $state;
      backend = $httpBackend;
      teamService = TeamService;

      controller = $controller("TeamInfoController", {
        $scope: scope,
        $state: state,
        TeamService: teamService
      });

      backend.whenGET("/team/597fe34b776f5610f713e09a").respond(200, {
        team: {
          _id: "597fe34b776f5610f713e09a",
          updatedAt: "2017-08-01T02:11:23.484Z",
          createdAt: "2017-08-01T02:11:23.056Z",
          name: "time",
          __v: 0,
          admin: {
            _id: "597fe34b776f5610f713e09b",
            updatedAt: "2017-08-01T02:11:23.144Z",
            createdAt: "2017-08-01T02:11:23.144Z",
            name: "loram",
            email: "fake@g.com",
            team: "597fe34b776f5610f713e09a",
            __v: 0
          },
          tags: [],
          blocked_users: [],
          members: [],
          id: "597fe34b776f5610f713e09a"
        }
      });
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should have a function goToLogin", function() {
    expect(scope.goToLogin).to.be.ok;
  });

  it('should make transition to login state', function() {
      var spy = sinon.spy(state, 'go');
      scope.goToLogin('597fe34b776f5610f713e09a');
      backend.flush();
      assert(spy.calledWith("login"));
  });
});
