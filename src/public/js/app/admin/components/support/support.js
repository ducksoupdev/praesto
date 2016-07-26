(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("support", {
      templateUrl: "js/app/admin/components/support/support.html",
      controller: SupportController
    });

  SupportController.$inject = ["$http", "$document", "markdown"];

  function SupportController($http, $document, markdown) {
    var that = this;
    that.markdownPreview = null;
    var assetsMarkdownUrl = "/docs/assets.md";

    that.$onInit = function () {
      $http({ method: "GET", url: assetsMarkdownUrl })
        .success(function (data) {
          that.markdownPreview = markdown.toHTML(data);
        });
    };
  }
})();
