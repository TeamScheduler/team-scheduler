/*jshint strict:false */
describe("TagsController", function() {
  var scope, controller, backend;
  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller, $httpBackend) {
      scope = {};
      backend = $httpBackend;
      controller = $controller("TagsController", {
        $scope: scope
      });

      backend.whenGET("/team/tags").respond(200, [
        {
          name: "DEV",
          color: "#212121",
          users: [
            {
              email: "vinicius@email.com"
            },
            {
              email: "maia@email.com"
            },
            {
              email: "matheus@email.com"
            },
            {
              email: "gustavo@email.com"
            }
          ]
        }
      ]);
    })
  );

  it("should exist", function() {
    expect(controller).to.be.ok;
  });

  it("should exist an tags attribute", function() {
    backend.flush();
    expect(scope.tags).to.be.ok;
  });
});
