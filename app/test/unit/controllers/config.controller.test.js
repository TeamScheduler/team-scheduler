describe("ConfigController", function() {
  var scope, controller, root, state, window, auth, account, backend;

  var fake = {
    user: {
          _id: "597fe34b776f5610f713e09b",
          updatedAt: "2017-08-01T02:11:23.144Z",
          createdAt: "2017-08-01T02:11:23.144Z",
          name: "loram",
          email: "fake@g.com",
          team: "597fe34b776f5610f713e09a",
          __v: 0
        }
  };

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller, $rootScope, $state, $window, $auth, $httpBackend,Account) {
      scope = {};
      root = $rootScope;
      state = $state;
      window = $window;
      auth = $auth;
      backend = $httpBackend;
      account = Account;

      root.currentUser = fake.user;

      controller = $controller("ConfigController", {
        $scope: scope,
        $rootScope: root,
        $state: state,
        $window: window,
        $auth: auth,
        Account: account
      });

      backend.whenPUT('/account').respond(200, fake);
      backend.whenDELETE('/account').respond(200, {});     
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should have a function updateProfile", function() {
    expect(scope.updateProfile).to.be.ok;
  });

  it("should have a function changePassword", function() {
    expect(scope.changePassword).to.be.ok;
  });

  it("should have a function link", function() {
    expect(scope.link).to.be.ok;
  });

  it("should have a function unlink", function() {
    expect(scope.unlink).to.be.ok;
  });

  it("should have a function deleteAccount", function() {
    expect(scope.deleteAccount).to.be.ok;
  });

  it('should update profile', function() {
    scope.updateProfile();
    backend.flush();
    assert.equal(JSON.stringify(fake.user),JSON.stringify(root.currentUser));
  });

  it('should change password', function() {
    scope.changePassword();
    backend.flush();
    assert.equal(JSON.stringify(scope.messages.success[0]), JSON.stringify(fake));
  });

  it('should delet account', function() {
    var spy = sinon.spy(state, 'go');
    scope.deleteAccount();
    backend.flush();
    expect(window.localStorage.user).not.to.be.ok;
    assert(spy.calledWith('find-team'));
  });
});
