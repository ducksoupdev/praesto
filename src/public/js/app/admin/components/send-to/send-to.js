(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("sendTo", {
      templateUrl: "js/app/admin/components/send-to/send-to.html",
      controller: SendToController,
      bindings: {
        asset: "="
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
          that.updateStatus.apply(that);
        }, function (err) {
          toaster.pop("error", "An error occurred", err.message, 0);
        });
    };

    that.init();

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
