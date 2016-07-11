describe("clients component", function () {
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

    var clientsTemplate = jasmine.getFixtures().read("clients/clients.html");
    $templateCache.put("js/app/admin/components/clients/clients.html", clientsTemplate);

    var clientTemplate = jasmine.getFixtures().read("client/client.html");
    $templateCache.put("js/app/admin/components/client/client.html", clientTemplate);

    clientService.getClients.and.callFake(function () {
      return $q(function (resolve) {
        resolve([
          { name: "test 1", registeredOn: "2016-07-11T14:00:00", assetname: "test asset 1" },
          { name: "test 2", registeredOn: "2016-07-11T14:00:00", assetname: "test asset 1" },
          { name: "test 3", registeredOn: "2016-07-11T14:00:00", assetname: "test asset 1" }
        ]);
      });
    });

    element = $compile("<clients></clients>")($rootScope);
    $rootScope.$digest();
  }));

  describe("creates the component", function () {

    it("with the list of clients", function () {
      expect(element.find(".client-item").length).toEqual(3);
    });

    it("with the registered on date", function () {
      expect(element.find(".client-item .registered-on").html()).toContain("Jul 11, 2016 2:00:00 PM");
    });

    it("with an icon", function () {
      expect(element.find(".client-item .asset-name").text()).toContain("None");
    });

  });

});
