describe("TeamInfoController", function() {
  var scope, controller;

    var fake = {
    _id: "597fe34b776f5610f713e09b",
    updatedAt: "2017-08-01T02:11:23.144Z",
    createdAt: "2017-08-01T02:11:23.144Z",
    name: "loram",
    email: "fake@g.com",
    team: "597fe34b776f5610f713e09a",
    __v: 0
  };

  var tags = [
    {
      name: "DEV",
      color: "#212121",
      members: [fake]
    },
    {
      name: "QA",
      color: "#F4424E",
      members: []
    }
  ];

  beforeEach(module("MyApp"));

  beforeEach(
    inject(function($controller) {
      scope = {};
      controller = $controller("AllUsersScheduleController", {
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

  it("should get members tag", function() {
    expect(scope.getMemberTags(tags, fake._id)).to.be.ok;
  });
});
