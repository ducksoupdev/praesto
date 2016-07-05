(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("clients", {
      templateUrl: "js/app/admin/components/clients/clients.html",
      controller: ClientsController
    });

  ClientsController.$inject = ["socketService", "clientService", "toaster"];

  function ClientsController(socketService, clientService, toaster) {
    var that = this;
    that.clientList = null;

    socketService.on("client:changed", function () {
      that.init();
    });

    socketService.on("client:disconnected", function () {
      that.init();
    });

    that.init = function () {
      clientService
        .getClients()
        .then(function (clientList) {
          that.clientList = clientList;
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    that.init();
  }
})();
