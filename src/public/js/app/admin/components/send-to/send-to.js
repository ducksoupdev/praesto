(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("sendTo", {
      templateUrl: "js/app/admin/components/send-to/send-to.html",
      controller: SendToController,
      bindings: {
        asset: "<"
      }
    });

  SendToController.$inject = ["toaster", "clientService", "socketService"];

  function SendToController(toaster, clientService, socketService) {
    var that = this;

    that.status = {
      disabled: false,
      isOpen: false
    };

    that.clientList = null;

    var loadClients = function() {
      clientService
        .getClients()
        .then(function (clientList) {
          that.clientList = clientList;
          that.updateStatus();
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    that.$onInit = function () {
      socketService.on("client:changed", function () {
        loadClients();
      });

      socketService.on("client:disconnected", function () {
        loadClients();
      });

      loadClients();
    };

    that.sendToClient = function (event, client) {
      event.preventDefault();
      socketService.emit("client:asset", {
        asset: that.asset,
        client: client
      });
    };

    that.updateStatus = function () {
      if (that.clientList.length === 0) {
        that.status.disabled = true;
      } else {
        that.status.disabled = false;
      }
    };
  }
})();
