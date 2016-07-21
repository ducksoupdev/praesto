(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("assetMultiple", {
      templateUrl: "js/app/admin/components/asset-multiple/asset-multiple.html",
      controller: AssetPopupController,
      bindings: {
        client: "="
      }
    });

  AssetPopupController.$inject = ["toaster", "assetService", "socketService"];

  function AssetPopupController(toaster, assetService, socketService) {
    var that = this;
    that.status = {
      disabled: true,
      isOpen: false
    };
    that.timeout = 120;
    that.assetList = null;
    that.selectedAssetList = [];
    that.dropdownText = "Select assets";
    that.dropdownTitle = "Select assets";

    that.sendAssets = function () {
      event.preventDefault();
      socketService.emit("client:asset", {
        assetList: that.selectedAssetList,
        timeout: that.timeout,
        client: that.client
      });
    };

    that.addAsset = function (event, asset) {
      event.preventDefault();
      event.stopPropagation();

      if (asset.hasOwnProperty("selected") && asset.selected) {
        asset.selected = false;
        that.selectedAssetList.splice(that.selectedAssetList.indexOf(asset), 1);
      } else {
        asset.selected = true;
        that.selectedAssetList.push(asset);
      }

      setSendButtonText.call(this);

      that.status.disabled = (that.selectedAssetList.length === 0);
    };

    function setSendButtonText() {
      if (this.selectedAssetList.length) {
        this.dropdownText = this.selectedAssetList.length + " asset" + (this.selectedAssetList.length !== 1 ? "s": "");
        this.dropdownTitle = "Selected asset" + (this.selectedAssetList.length !== 1 ? "s": "") + ": " + this.selectedAssetList.map(function(o) { return o.name; }).join(", ");
      } else {
        this.dropdownText = "Select assets";
        this.dropdownTitle = "Select assets";
      }
    }

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
