/* global markdown */
(function () {
  angular
    .module("praesto.admin", [
      "praesto.shared",
      "ngResource",
      "ngSanitize",
      "ngMessages",
      "ui.bootstrap",
      "ui.router",
      "toaster",
      "LocalStorageModule"
    ])
    .constant("markdown", markdown);
})();
