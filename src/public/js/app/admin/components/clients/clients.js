(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("clients", {
      templateUrl: "js/app/admin/components/clients/clients.html",
      controller: ClientsController
    });

  ClientsController.$inject = ["socketService", "clientService", "toaster", "pubsubService"];

  function ClientsController(socketService, clientService, toaster, pubsubService) {
    var that = this;
    that.clientList = null;

    var loadClients = function () {
      clientService
        .getClients()
        .then(function (clientList) {
          that.clientList = clientList;
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    that.$onInit = function () {
      // set up asset subscriptions
      pubsubService.subscribe("sendAssets", loadClients);

      socketService.on("client:changed", function () {
        loadClients();
      });

      socketService.on("client:disconnected", function () {
        loadClients();
      });

      loadClients();
    };
  }
})();
