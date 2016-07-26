(function () {
  "use strict";

  angular.module("praesto.client")
    .component("assetMultiple", {
      templateUrl: "js/app/client/components/asset-multiple/asset-multiple.html",
      controller: AssetMultipleController,
      bindings: {
        assetList: "<",
        timeout: "<"
      }
    });

    AssetMultipleController.$inject = ["$interval", "socketService"];

    function AssetMultipleController($interval, socketService) {
      var that = this;
      var stop = null;
      that.url = null;
      that.index = 0;

      function rotateAssets() {
        that.url = that.assetList[that.index].url;
        if ((that.index + 1) === that.assetList.length) {
          that.index = 0;
        } else {
          ++that.index;
        }
      }

      that.$onInit = function() {
        rotateAssets();
        stop = $interval(rotateAssets, that.timeout);
      };

      that.$onDestroy = function() {
        $interval.cancel(stop);
      };
    }
})();
