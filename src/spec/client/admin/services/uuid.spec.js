describe("uuid service", function () {
  "use strict";

  var uuidService;

  beforeEach(angular.mock.module("praesto.admin"));

  beforeEach(angular.mock.inject(function ($injector) {
    uuidService = $injector.get("uuidService");
  }));

  it("create a new uuid on each call", function () {
    var uuid1 = uuidService.getNewUuid();
    var uuid2 = uuidService.getNewUuid();
    expect(uuid1).not.toEqual(uuid2);
  });
});
