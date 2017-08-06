/*jshint strict:false */
describe("UserScheduleController", function() {
  var scope, controller;
  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller) {
      scope = {};
      controller = $controller("UserScheduleController", {
        $scope: scope
      });
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should exist an days attribute", function() {
    expect(scope.days).to.be.ok;
  });

  it("should exist an hours attibute", function() {
    expect(scope.hours).to.be.ok;
  });
});
