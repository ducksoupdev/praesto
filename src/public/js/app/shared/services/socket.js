(function () {
  "use strict";

  angular.module("praesto.shared")
    .service("socketService", socketService);

  socketService.$inject = ["io"];

  function socketService(io) {
    var that = this;
    that.socket = io();
    that.socket.connect();

    that.on = function (msg, handler) {
      return that.socket.on(msg, handler);
    };

    that.emit = function (msg, data) {
      return that.socket.emit(msg, data);
    };

    that.connect = function () {
      return that.socket.connect();
    };

    that.disconnect = function (close) {
      return that.socket.disconnect(close);
    };
  }
})();
