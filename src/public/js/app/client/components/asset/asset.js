(function () {
  "use strict";

  angular.module("praesto.client")
    .component("asset", {
      templateUrl: "js/app/client/components/asset/asset.html",
      bindings: {
        url: "<"
      }
    });
})();
