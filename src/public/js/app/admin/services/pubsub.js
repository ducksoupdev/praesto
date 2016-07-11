(function () {
  "use strict";

  angular.module("praesto.admin")
    .service("pubsubService", pubsubService);

  function pubsubService() {
    var that = this;
    that.subUid = -1;
    that.topics = {};

    that.subscribe = function (topic, callback) {
      if (!that.topics[topic]) {
        that.topics[topic] = [];
      }
      var token = (++that.subUid).toString();
      that.topics[topic].push({
        token: token,
        func: callback
      });
      return token;
    };

    that.countSubscribers = function (topic) {
      var count = 0;
      for (var m in that.topics) {
        if (m === topic) {
          count = that.topics[m].length;
        }
      }
      return count;
    };

    that.publish = function (topic, args) {
      if (!that.topics[topic]) {
        return false;
      }
      var subscribers = that.topics[topic];
      var len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(args);
      }
      return true;
    };

    that.unsubscribe = function (token) {
      for (var m in that.topics) {
        if (that.topics[m]) {
          for (var i = 0, j = that.topics[m].length; i < j; i++) {
            if (that.topics[m][i].token === token) {
              that.topics[m].splice(i, 1);
              return token;
            }
          }
        }
      }
      return null;
    };
  }
})();

