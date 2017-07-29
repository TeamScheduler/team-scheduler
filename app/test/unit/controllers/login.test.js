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
      scope = {};

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
});
