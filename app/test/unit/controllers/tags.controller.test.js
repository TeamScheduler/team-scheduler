/*jshint strict:false */
describe("TagsController", function() {
  var scope, controller;
  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller) {
      scope = {};
      controller = $controller("TagsController", {
        $scope: scope
      });
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should exist an tags attribute", function() {
    expect(scope.tags).to.be.ok;
  });
});
