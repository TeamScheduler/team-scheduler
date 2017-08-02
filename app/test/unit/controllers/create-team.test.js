describe("CreateTeamController", function() {
  var state, controller, scope, teamService, admin, teamName, backend;
  var API = "/team";
  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($state, $controller, TeamService, $httpBackend) {
      scope = {};
      admin = {
        name: "lorem",
        email: "lorem@g.com",
        password: "opa123"
      };
      teamName = "time";

      state = $state;
      teamService = TeamService;

      backend = $httpBackend;

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

  describe("should accept values", function() {

    beforeEach(function() {
      backend.whenPOST(API).respond(200, {
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
    });

    it("should have a transition to team-info", function() {
      var spy = sinon.spy(state, "go");
      scope.submit(teamName, admin);
      backend.flush();
      assert(spy.calledWith("team-info"));
    });
  });

  describe("should not accept values", function() {
    beforeEach(function() {
      backend.whenPOST(API).respond(400, {});
    });

    it("should deffer values", function() {
      expect(scope.submit("", admin)).to.be.not.ok;
      expect(scope.submit(teamName, "")).to.be.not.ok;
    });

    it("should not have a transition to login", function() {
      var spy = sinon.spy(state, "go");
      scope.submit(teamName, admin);
      backend.flush();
      assert.isFalse(spy.calledWith("login"));
    });
  });
});
