(function () {
  "use strict";

  angular.module("praesto.client")
    .component("home", {
      templateUrl: "js/app/client/components/home/home.html",
      controller: HomeController
    });

  RegisterController.$inject = ["$uibModalInstance"];

  function RegisterController($uibModalInstance) {
    var that = this;
    that.clientName = null;

    that.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

    that.register = function () {
      $uibModalInstance.close(that.clientName);
    };

    that.hitEnter = function (evt) {
      if (evt.keyCode === 13 && that.clientName != null && that.clientName !== "") {
        that.register();
      }
    };
  }

  HomeController.$inject = [
    "$timeout",
    "socketService",
    "localStorageService",
    "$uibModal"
  ];

  function HomeController($timeout, socketService, localStorageService, $uibModal) {
    var that = this;
    that.asset = null;
    that.clientName = null;

    socketService.on("client:show", function (data) {
      if (data.client.name === "all" || data.client.name === that.clientName) {
        $timeout(function () {
          that.asset = data.asset;
        });
      }
    });

    socketService.on("client:clear", function (data) {
      if (data.name === that.clientName) {
        $timeout(function () {
          that.asset = null;
        });
      }
    });

    that.init = function () {
      var clientName = localStorageService.get("clientName");
      if (clientName != null) {
        socketService.emit("client:register", clientName);
        that.clientName = clientName;
      }
    };

    that.registerClient = function () {
      var modalInstance = $uibModal.open({
        templateUrl: "js/app/client/components/home/register.html",
        controller: RegisterController,
        controllerAs: "ctrl"
      });

      modalInstance.result.then(function (clientName) {
        localStorageService.add("clientName", clientName);
        socketService.emit("client:register", clientName);
        that.clientName = clientName;
      });
    };

    that.init();
  }
})();
