(function () {
  "use strict";

  angular.module("praesto.admin")
    .service("assetService", assetService);

  assetService.$inject = ["$q", "$resource", "uuidService"];

  function assetService($q, $resource, uuidService) {
    var that = this;

    that.getAssets = function () {
      return $q(function (resolve, reject) {
        var resource = $resource("/api/assets", {}, {
          query: {
            description: "Retrieving assets",
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

    that.saveAsset = function (asset) {
      var method = "PUT";
      var url = "/api/asset/:id";
      var params = {};

      if (!asset.hasOwnProperty("id")) {
        asset.id = uuidService.getNewUuid();
        method = "POST";
        url = "/api/asset";
      } else {
        params = { id: asset.id };
      }

      return $q(function (resolve, reject) {
        var resource = $resource(url, params, {
          save: {
            method: method,
            description: "Saving an asset"
          }
        });
        resource.save(asset,
          function success() {
            resolve(asset);
          },
          function error(err) {
            reject(err);
          }
        );
      });
    };

    that.removeAsset = function (asset) {
      return $q(function (resolve, reject) {
        var params = { id: asset.id };
        var resource = $resource("/api/asset/:id", params, {
          remove: {
            method: "DELETE",
            description: "Removing an asset"
          }
        });
        resource.remove(function success() {
          resolve(asset);
        },
          function error(err) {
            reject(err);
          }
        );
      });
    };
  }
})();
