describe("pubsub service", function() {
    "use strict";

    var pubsubService;

    beforeEach(angular.mock.module("praesto.admin"));

    beforeEach(angular.mock.inject(function($injector){
        pubsubService = $injector.get("pubsubService");
    }));

    describe("count subscribers", function() {
        beforeEach(function() {
            pubsubService.subscribe("test", function() {});
            pubsubService.subscribe("test", function() {});
        });

        it("will have two subscribers in total", function() {
            var count = pubsubService.countSubscribers("test");
            expect(count).toEqual(2);
        });
    });

    describe("unsubscribe", function() {
        var subscriber1 = null;
        var subscriber2 = null;

        beforeEach(function() {
            subscriber1 = pubsubService.subscribe("test", function() {});
            subscriber2 = pubsubService.subscribe("test", function() {});
        });

        it("will have two subscribers initially", function() {
            var count = pubsubService.countSubscribers("test");
            expect(count).toEqual(2);
        });

        it("after removing an subscriber there will be one remaining", function() {
            pubsubService.unsubscribe(subscriber1);
            var count = pubsubService.countSubscribers("test");
            expect(count).toEqual(1);
        });
    });

    describe("publish", function() {
        var callCount = 0;

        beforeEach(function() {
            callCount = 0;
            pubsubService.subscribe("test", () => callCount++);
            pubsubService.subscribe("test", () => callCount++);
        });

        it("will notify two subscribers when no data is supplied", function() {
            pubsubService.publish("test", { test: "1" });
            expect(callCount).toEqual(2);
        });
    });
});
