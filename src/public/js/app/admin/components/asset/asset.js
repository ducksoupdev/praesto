(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("asset", {
      templateUrl: "js/app/admin/components/asset/asset.html",
      controller: AssetController,
      bindings: {
        asset: "<"
      }
    });

  AssetModalController.$inject = ["$uibModalInstance", "asset", "mode"];

  function AssetModalController($uibModalInstance, asset, mode) {
    var that = this;
    that.asset = asset;
    that.mode = mode;

    that.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

    that.close = function () {
      $uibModalInstance.close(that.asset);
    };
  }

  AssetController.$inject = ["$timeout", "toaster", "$uibModal", "assetService", "pubsubService"];

  function AssetController($timeout, toaster, $uibModal, assetService, pubsubService) {
    var that = this;

    that.cssTypesMap = {
      "local": "fa-slideshare",
      "remote": "fa-external-link"
    };

    that.getCssClass = function (type) {
      if (!that.asset.hasOwnProperty("id")) return "fa-warning";
      return that.cssTypesMap[type];
    };

    that.add = function () {
      if (that.asset.hasOwnProperty("id")) return;

      var modalInstance = $uibModal.open({
        templateUrl: "js/app/admin/components/asset/edit.html",
        controller: AssetModalController,
        controllerAs: "ctrl",
        resolve: {
          asset: function () {
            return angular.copy(that.asset);
          },
          mode: function () {
            return "Add";
          }
        }
      });

      modalInstance.result.then(function (editedAsset) {
        pubsubService.publish("saveAsset", editedAsset);
      });
    };

    that.remove = function () {
      pubsubService.publish("removeAsset", that.asset);
    };

    that.edit = function () {
      var modalInstance = $uibModal.open({
        templateUrl: "js/app/admin/components/asset/edit.html",
        controller: AssetModalController,
        controllerAs: "ctrl",
        resolve: {
          asset: function () {
            return angular.copy(that.asset);
          },
          mode: function () {
            return "Edit";
          }
        }
      });

      modalInstance.result.then(function (editedAsset) {
        pubsubService.publish("saveAsset", editedAsset);
      });
    };

    that.preview = function() {
      $uibModal.open({
        templateUrl: "js/app/admin/components/asset/preview.html",
        controller: AssetModalController,
        controllerAs: "ctrl",
        size: "lg",
        windowClass: "preview",
        resolve: {
          asset: function () {
            return angular.copy(that.asset);
          },
          mode: function () {
            return "Preview";
          }
        }
      });
    };
  }
})();
