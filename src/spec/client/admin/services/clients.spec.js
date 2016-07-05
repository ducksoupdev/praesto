describe("client service", function () {
  var clientService, $httpBackend;

  beforeEach(angular.mock.module("praesto.admin"));

  beforeEach(angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get("$httpBackend");
    clientService = $injector.get("clientService");
  }));

  it("return a list of clients", function () {
    var fetchedClients;
    var clientsToReturn = [{ name: "client 1" }, { name: "client 2" }];
    $httpBackend.expectGET("/api/clients").respond(function () {
      return [200, clientsToReturn];
    });
    clientService
      .getClients()
      .then(function (clients) {
        fetchedClients = clients;
      });

    $httpBackend.flush();
    expect(fetchedClients.length).toEqual(2);
  });
});
