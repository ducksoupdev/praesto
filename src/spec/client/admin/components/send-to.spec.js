describe("send to component", function () {
  jasmine.getFixtures().fixturesPath = "base/src/public/js/app/admin/components";
  var $compile,
    $q,
    $templateCache,
    $rootScope,
    element;

  beforeEach(angular.mock.module("praesto.admin"));

  var clientService = jasmine.createSpyObj("clientService", ["getClients"]);

  beforeEach(angular.mock.module(function ($provide) {
    $provide.value("clientService", clientService);
  }));

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _$templateCache_, _$q_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $templateCache = _$templateCache_;
    $q = _$q_;

    var sendToTemplate = jasmine.getFixtures().read("send-to/send-to.html");
    $templateCache.put("js/app/admin/components/send-to/send-to.html", sendToTemplate);

    clientService.getClients.and.callFake(function () {
      return $q(function (resolve) {
        resolve([
          { name: "test 1", registeredOn: "2016-07-11T14:00:00" },
          { name: "test 2", registeredOn: "2016-07-11T14:00:00" },
          { name: "test 3", registeredOn: "2016-07-11T14:00:00" }
        ]);
      });
    });

    $rootScope.asset = { id: "test123", type: "local", url: "/assets/test", name: "test", createdOn: "2016-07-11T14:00:00" };

    element = $compile("<send-to asset='asset'></send-to>")($rootScope);
    $rootScope.$digest();
  }));

  describe("creates the component", function () {

    it("with the list of clients", function () {
      expect(element.find(".client-item").length).toEqual(3);
    });

    it("with a send all option", function () {
      expect(element.find(".send-all").length).toBeGreaterThan(0);
    });

  });

});
