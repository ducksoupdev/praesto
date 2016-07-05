describe("assets component", function () {
  jasmine.getFixtures().fixturesPath = "base/src/public/js/app/admin/components";
  var $compile,
    $q,
    $templateCache,
    $rootScope,
    element;

  beforeEach(angular.mock.module("praesto.admin"));

  var clientService = jasmine.createSpyObj("clientService", ["getClients"]);
  var assetService = jasmine.createSpyObj("assetService", ["getAssets"]);

  beforeEach(angular.mock.module(function ($provide) {
    $provide.value("clientService", clientService);
    $provide.value("assetService", assetService);
  }));

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _$templateCache_, _$q_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $templateCache = _$templateCache_;
    $q = _$q_;

    var assetsTemplate = jasmine.getFixtures().read("assets/assets.html");
    $templateCache.put("js/app/admin/components/assets/assets.html", assetsTemplate);

    var assetTemplate = jasmine.getFixtures().read("asset/asset.html");
    $templateCache.put("js/app/admin/components/asset/asset.html", assetTemplate);

    var sendToTemplate = jasmine.getFixtures().read("send-to/send-to.html");
    $templateCache.put("js/app/admin/components/send-to/send-to.html", sendToTemplate);

    clientService.getClients.and.callFake(function () {
      return $q(function (resolve) {
        resolve([]);
      });
    });

    assetService.getAssets.and.callFake(function () {
      return $q(function (resolve) {
        resolve([
          { id: "test123", type: "local", url: "/assets/test1", name: "test 1", createdOn: "2016-07-11T14:00:00" },
          { type: "local", url: "/assets/test2", name: "test 2", createdOn: "2016-07-11T14:00:00" },
          { id: "test789", type: "remote", url: "/assets/test3", name: "test 3", createdOn: "2016-07-11T14:00:00" }
        ]);
      });
    });

    element = $compile("<assets></assets>")($rootScope);
    $rootScope.$digest();
  }));

  describe("creates the component", function () {

    it("with the list of assets", function () {
      expect(element.find(".asset-item").length).toEqual(3);
    });

    it("with the created on date", function () {
      expect(element.find(".asset-item .created-on").html()).toContain("Jul 11, 2016 2:00:00 PM");
    });

    it("with an icon", function () {
      expect(element.find(".asset-item .panel-title-left i.fa").attr("class")).toContain("fa-slideshare");
    });

  });

});
