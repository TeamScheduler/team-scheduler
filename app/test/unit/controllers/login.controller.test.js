/*jshint strict:false */
describe("LoginController", function() {
  var state, backend, controller, scope, rootScope, window, auth, teamService;

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function(
      $state,
      $rootScope,
      $window,
      $auth,
      $controller,
      $httpBackend,
      TeamService
    ) {
      scope = {
        user: {
          teamId: ""
        },
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
      };

      state = $state;
      rootScope = $rootScope;
      teamService = TeamService;
      window = $window;
      auth = $auth;
      backend = $httpBackend;

      controller = $controller("LoginCtrl", {
        $scope: scope,
        $state: state,
        $rootScope: scope,
        TeamService: teamService
      });
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should have a function goToJoinTeam", function() {
    expect(scope.goToJoinTeam).to.be.ok;
  });

  it("should have a function login", function() {
    expect(scope.login).to.be.ok;
  });

  it("shold make transition to join-team state", function() {
    var spy = sinon.spy(state, "go");
    scope.goToJoinTeam();
    assert(spy.calledWith("join-team"));
  });

  it("should be called with user credentials", function() {
    var spy = sinon.spy(auth, "login");
    scope.login();
    assert(spy.calledWith({ teamId: "597fe34b776f5610f713e09a" }));
  });

  describe("login process should be accept", function() {
    beforeEach(function() {
      backend.whenPOST("/login").respond(200, {
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJteS5kb21haW4uY29tIiwic3ViIjoiNTk3ZmVhMzRjNmRmNjIxZmNkZDM5NGI3IiwiaWF0IjoxNTAxNjM1NTE2LCJleHAiOjE1MDIyNDAzMTZ9.rUFdwW2DF3H01PqNkBk5QA57RxS6cmLfGcq8-Nfh8v4",
        user: {
          _id: "597fea34c6df621fcdd394b7",
          updatedAt: "2017-08-01T02:40:52.502Z",
          createdAt: "2017-08-01T02:40:52.502Z",
          name: "loram",
          email: "fake@g.com",
          team: "597fea34c6df621fcdd394b6",
          __v: 0,
          isAdmin: false
        }
      });
    });

    it("shold make transition to account state", function() {
      var spy = sinon.spy(state, "go");
      scope.login();
      backend.flush();
      assert(spy.calledWith("dashboard.all-users-schedule"));
    });
  });

  describe("login process should be reject", function() {
    beforeEach(function() {
      backend.whenPOST("/login").respond(400, {});
    });

    it("shold make transition to account state", function() {
      var spy = sinon.spy(state, "go");
      scope.login();
      backend.flush();
      assert.isFalse(spy.calledWith("dashboard.all-users-schedule"));
    });
  });
});
