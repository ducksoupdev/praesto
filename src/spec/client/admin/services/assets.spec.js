describe("asset service", function () {
  var assetService, $httpBackend;

  beforeEach(angular.mock.module("praesto.admin"));

  beforeEach(angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get("$httpBackend");
    assetService = $injector.get("assetService");
  }));

  it("return a list of assets", function () {
    var fetchedAssets;
    var assetsToReturn = [{ name: "asset 1" }, { name: "asset 2" }];
    $httpBackend.expectGET("/api/assets").respond(function () {
      return [200, assetsToReturn];
    });
    assetService
      .getAssets()
      .then(function (assets) {
        fetchedAssets = assets;
      });

    $httpBackend.flush();
    expect(fetchedAssets.length).toEqual(2);
  });

  it("save an asset", function () {
    var savedAsset;
    var assetToSave = { name: "asset 1" };
    $httpBackend.expectPOST("/api/asset", assetToSave).respond(function () {
      return [204, {}, {}];
    });
    assetService
      .saveAsset(assetToSave)
      .then(function (asset) {
        savedAsset = asset;
      });

    $httpBackend.flush();
    expect(savedAsset.id).toBeDefined();
  });

  it("update an asset", function () {
    var savedAsset;
    var assetToSave = { id: "test123", name: "asset 1" };
    $httpBackend.expectPUT("/api/asset/test123", assetToSave).respond(function () {
      return [204, {}, {}];
    });
    assetService
      .saveAsset(assetToSave)
      .then(function (asset) {
        savedAsset = asset;
      });

    $httpBackend.flush();
    expect(savedAsset.id).toBeDefined();
  });

  it("remove an asset", function () {
    var isRemoved;
    var assetToSave = { id: "12345", name: "asset 1" };
    $httpBackend.expectDELETE("/api/asset/12345").respond(function () {
      return [204, null];
    });
    assetService
      .removeAsset(assetToSave)
      .then(function () {
        isRemoved = true;
      });

    $httpBackend.flush();
    expect(isRemoved).toBeTruthy();
  });
});
