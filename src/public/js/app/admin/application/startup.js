(function () {
  "use strict";

  angular.module("praesto.admin")
    .run(runBlock);

  runBlock.$inject = [
    "$rootScope",
    "$state"
  ];

  function runBlock(
    $rootScope,
    $state) {
    $rootScope.$state = $state;
  }
})();
