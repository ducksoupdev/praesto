(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("assetPopup", {
      templateUrl: "js/app/admin/components/asset-popup/asset-popup.html",
      controller: AssetPopupController,
      bindings: {
        client: "="
      }
    });

  AssetPopupController.$inject = ["toaster", "assetService", "socketService"];

  function AssetPopupController(toaster, assetService, socketService) {
    var that = this;
    that.assetList = null;

    that.sendAsset = function (event, asset) {
      event.preventDefault();
      socketService.emit("client:asset", {
        asset: asset,
        client: that.client
      });
    };

    that.init = function () {
      assetService
        .getAssets()
        .then(function (assetList) {
          that.assetList = assetList;
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    that.init();
  }
})();
