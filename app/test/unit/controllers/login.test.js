describe("LoginController", function() {
  var state, controller, scope, rootScope, window, auth, teamService;

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function(
      $state,
      $rootScope,
      $window,
      $auth,
      $controller,
      TeamService
    ) {
      scope = {
        user: {
          teamId: ''
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

  it("should have a function autheticate", function() {
    expect(scope.authenticate).to.be.ok;
  });

  it("shold make transition to join-team state", function() {
    var spy = sinon.spy(state, "go");
    scope.goToJoinTeam();
    assert(spy.calledWith("join-team"));
  });
});
