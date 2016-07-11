(function () {
  "use strict";

  angular.module("praesto.shared")
    .filter("trustAsResourceUrl", trustAsResourceUrl);

  trustAsResourceUrl.$inject = [
    "$sce"
  ];

  function trustAsResourceUrl($sce) {
    return function (val) {
      return $sce.trustAsResourceUrl(val);
    };
  }
})();
