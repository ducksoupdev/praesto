(function () {
  "use strict";

  angular.module("praesto.admin")
    .config(config);

  config.$inject = [
    "$stateProvider",
    "$urlRouterProvider"
  ];

  function config(
    $stateProvider,
    $urlRouterProvider) {

    $urlRouterProvider.otherwise("/welcome");

    $stateProvider
      .state("welcome", {
        url: "/welcome",
        template: "<welcome></welcome>"
      })
      .state("assets", {
        url: "/assets",
        template: "<assets></assets>"
      })
      .state("clients", {
        url: "/clients",
        template: "<clients></clients>"
      })
      .state("support", {
        url: "/support",
        template: "<support></support>"
      });
  }
})();
