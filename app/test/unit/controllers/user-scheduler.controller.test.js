/*jshint strict:false */
describe("UserScheduleController", function() {
  var scope, controller, root, backend;
  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller, $rootScope, $httpBackend) {
      scope = {
        isEditMode: true
      };
      root = $rootScope;
      backend = $httpBackend;
      root.currentUser = {
        _id: "597fe34b776f5610f713e09b",
        updatedAt: "2017-08-01T02:11:23.144Z",
        createdAt: "2017-08-01T02:11:23.144Z",
        name: "loram",
        email: "fake@g.com",
        team: "597fe34b776f5610f713e09a",
        __v: 0
      };

      controller = $controller("UserScheduleController", {
        $scope: scope
      });

      backend.whenGET('/user/hours').respond(200, {});
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should exist an days attribute", function() {
    expect(scope.days).to.be.ok;
  });

  // it('should get user hours', function() {
  //   backend.flush();
  //   expect(scope.hours).to.be.ok;
  // });
});
