(function () {
  "use strict";

  angular.module("praesto.admin")
    .service("clientService", clientService);

  clientService.$inject = ["$q", "$resource"];

  function clientService($q, $resource) {
    var that = this;
    that.getClients = function () {
      return $q(function (resolve, reject) {
        var resource = $resource("/api/clients", {}, {
          query: {
            description: "Retrieving clients",
            isArray: true
          }
        });
        resource.query(function (response) {
          resolve(response);
        },
          function () {
            reject();
          }
        );
      });
    };
  }
})();
