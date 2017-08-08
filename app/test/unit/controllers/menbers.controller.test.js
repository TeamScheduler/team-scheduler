/*jshint strict:false */
describe("MembersController", function() {
  var scope, root, teamService, controller, backend;

  var fake = {
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
    inject(function($rootScope, $controller, $httpBackend, TeamService) {
      scope = {};
      root = $rootScope;
      teamService = TeamService;
      backend = $httpBackend;

      root.currentUser = {
        team: "597fe34b776f5610f713e09a",
        isAdmin: true
      };
      controller = $controller("MembersController", {
        $scope: scope,
        $rootScope: root,
        TeamService: teamService
      });

      backend
        .whenGET("/team/members")
        .respond(200, [fake]);

      backend
        .whenGET("/team/pending-members")
        .respond(200, [fake]);

      backend
        .whenPATCH("/team/pending-members")
        .respond(200, [fake]);
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should toggle true", function() {
    assert.isTrue(scope.toggle);
  });

  it("should toggle true after show members", function() {
    assert.isTrue(scope.toggle);
    scope.showMembers();
    assert.isTrue(scope.toggle);
  });

  it("should toggle false after show invites", function() {
    assert.isTrue(scope.toggle);
    scope.showInvites();
    assert.isFalse(scope.toggle);
  });

  it("should load members", function() {
    backend.flush();
    expect(scope.members).to.be.ok;
    assert.equal(JSON.stringify(scope.members), JSON.stringify([fake]));
  });

  it("should load pending members", function() {
    backend.flush();
    expect(scope.requests).to.be.ok;
    assert.equal(JSON.stringify(scope.requests), JSON.stringify([fake]));
  });

  it("should load pending members 2", function() {
    backend.flush();
    scope.resolvePendingMembers(undefined, undefined);
    backend.flush();
    expect(scope.requests).to.be.ok;
    assert.equal(JSON.stringify(scope.requests), JSON.stringify([fake]));
  });
});
