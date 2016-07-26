(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("client", {
      templateUrl: "js/app/admin/components/client/client.html",
      controller: ClientController,
      bindings: {
        client: "<"
      }
    });

  ClientController.$inject = ["$timeout", "socketService"];

  function ClientController($timeout, socketService) {
    var that = this;

    socketService.on("client:clear", function (data) {
      if (data.name === that.client.name) {
        $timeout(function () {
          that.client.assetName = null;
        });
      }
    });

    that.reset = function () {
      socketService.emit("client:reset", that.client);
      that.client.assetName = null;
    };
  }
})();
