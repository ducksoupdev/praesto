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
    that.status = {
      disabled: true,
      isOpen: false
    };
    that.assetList = null;
    that.selectedAssetList = [];
    that.sendButtonText = "Select assets";
    that.sendButtonTitle = "Select assets";

    that.sendAssets = function () {
      event.preventDefault();
      socketService.emit("client:asset", {
        assetList: that.selectedAssetList,
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
        this.sendButtonText = "Send " + this.selectedAssetList.length + " asset" + (this.selectedAssetList.length !== 1 ? "s": "");
        this.sendButtonTitle = "Send asset" + (this.selectedAssetList.length !== 1 ? "s": "") + " to " + this.client.name + ": " + this.selectedAssetList.map(function(o) { return o.name; }).join(", ");
      } else {
        this.sendButtonText = "Select assets";
        this.sendButtonTitle = "Select assets";
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
