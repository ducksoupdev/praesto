(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("assets", {
      templateUrl: "js/app/admin/components/assets/assets.html",
      controller: AssetsController
    });

  AddAssetController.$inject = ["$uibModalInstance", "asset"];

  function AddAssetController($uibModalInstance, asset) {
    var that = this;
    that.asset = asset;

    that.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

    that.add = function () {
      $uibModalInstance.close(that.asset);
    };
  }

  AssetsController.$inject = ["toaster", "assetService", "$uibModal", "pubsubService"];

  function AssetsController(toaster, assetService, $uibModal, pubsubService) {
    var that = this;
    that.assetList = null;

    var saveAsset = function (assetToSave) {
      assetService
        .saveAsset(assetToSave)
        .then(function () {
          loadAssets();
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    var removeAsset = function (assetToRemove) {
      assetService
        .removeAsset(assetToRemove)
        .then(function () {
          loadAssets();
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    var loadAssets = function() {
      assetService
        .getAssets()
        .then(function (assetList) {
          that.assetList = assetList;
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    that.$onInit = function () {
      // set up asset subscriptions
      pubsubService.subscribe("saveAsset", saveAsset);
      pubsubService.subscribe("removeAsset", removeAsset);

      loadAssets();
    };

    that.newAsset = function () {
      var modalInstance = $uibModal.open({
        templateUrl: "js/app/admin/components/assets/new-asset.html",
        controller: AddAssetController,
        controllerAs: "ctrl",
        resolve: {
          asset: function () {
            return {
              type: "remote",
              createdOn: new Date()
            };
          }
        }
      });

      modalInstance.result.then(function (newAsset) {
        saveAsset(newAsset);
      });
    };
  }
})();
