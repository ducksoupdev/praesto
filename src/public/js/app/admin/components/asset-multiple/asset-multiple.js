(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("assetMultiple", {
      templateUrl: "js/app/admin/components/asset-multiple/asset-multiple.html",
      controller: AssetMultipleController,
      bindings: {
        client: "<"
      }
    });

  AssetMultipleController.$inject = ["toaster", "assetService", "socketService", "pubsubService"];

  function AssetMultipleController(toaster, assetService, socketService, pubsubService) {
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
        timeout: that.timeout * 1000,
        client: that.client
      });
      pubsubService.publish("sendAssets", {});
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

    that.$onInit = function () {
      assetService
        .getAssets()
        .then(function (assetList) {
          that.assetList = assetList;
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };
  }
})();
