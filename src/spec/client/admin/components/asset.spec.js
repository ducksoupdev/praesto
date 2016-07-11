describe("asset component", function () {
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

    var assetTemplate = jasmine.getFixtures().read("asset/asset.html");
    $templateCache.put("js/app/admin/components/asset/asset.html", assetTemplate);
    var sendToTemplate = jasmine.getFixtures().read("send-to/send-to.html");
    $templateCache.put("js/app/admin/components/send-to/send-to.html", sendToTemplate);

    clientService.getClients.and.callFake(function () {
      return $q(function (resolve) {
        resolve([]);
      });
    });

    $rootScope.asset = { id: "test123", type: "local", url: "/assets/test", name: "test", createdOn: "2016-07-11T14:00:00" };

    element = $compile("<asset asset='asset'></asset>")($rootScope);
    $rootScope.$digest();
  }));

  describe("creates a local component", function () {

    it("with the type", function () {
      expect(element.find(".type").html()).toContain("local");
    });

    it("with the created on date", function () {
      expect(element.find(".created-on").html()).toContain("Jul 11, 2016 2:00:00 PM");
    });

    it("with an icon", function () {
      expect(element.find(".panel-title-left i.fa").attr("class")).toContain("fa-slideshare");
    });

  });

  describe("creates a local component not saved to the db", function () {
    beforeEach(function () {
      $rootScope.asset = { type: "local", url: "/assets/test", name: "test2", createdOn: "2016-07-11T14:00:00" };
      element = $compile("<asset asset='asset'></asset>")($rootScope);
      $rootScope.$digest();
    });

    it("with the type", function () {
      expect(element.find(".type").html()).toContain("local");
    });

    it("with the created on date", function () {
      expect(element.find(".created-on").html()).toContain("Jul 11, 2016 2:00:00 PM");
    });

    it("with an icon", function () {
      expect(element.find(".panel-title-left i.fa").attr("class")).toContain("fa-warning");
    });

  });

  describe("creates a remote component", function () {

    beforeEach(function () {
      $rootScope.asset = { id: "test123", type: "remote", url: "/assets/test", name: "test", createdOn: "2016-07-11T14:00:00" };
      element = $compile("<asset asset='asset'></asset>")($rootScope);
      $rootScope.$digest();
    });

    it("with the type", function () {
      expect(element.find(".type").html()).toContain("remote");
    });

    it("with the created on date", function () {
      expect(element.find(".created-on").html()).toContain("Jul 11, 2016 2:00:00 PM");
    });

    it("with an icon", function () {
      expect(element.find(".panel-title-left i.fa").attr("class")).toContain("fa-external-link");
    });

  });


});
