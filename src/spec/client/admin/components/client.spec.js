describe("client component", function () {
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

    var clientTemplate = jasmine.getFixtures().read("client/client.html");
    $templateCache.put("js/app/admin/components/client/client.html", clientTemplate);

    clientService.getClients.and.callFake(function () {
      return $q(function (resolve) {
        resolve([]);
      });
    });

    $rootScope.client = { id: "test123", name: "test 1", registeredOn: "2016-07-11T14:00:00" };

    element = $compile("<client client='client'></client>")($rootScope);
    $rootScope.$digest();
  }));

  describe("creates a component", function () {

    it("with the name", function () {
      expect(element.find(".client-name").html()).toContain("test 1");
    });

    it("with the registered on date", function () {
      expect(element.find(".registered-on").html()).toContain("Jul 11, 2016 2:00:00 PM");
    });

    it("without a current asset", function () {
      expect(element.find(".asset-name").text()).toContain("None");
    });

  });


});
