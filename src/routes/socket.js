var db = null;

module.exports = function (dbInstance) {
  db = dbInstance;
  return handlers;
};

var saveAssetToClient = function (clientName, assetName) {
  var clients = db.get("clients");
  if (clientName === "all") {
    var allClients = clients.value();
    for (var i = 0; i < allClients.length; i++) {
      clients
      .find({ name: allClients[i].name })
      .assign({ assetName: assetName })
      .value();
    }
  } else {
    clients
      .find({ name: clientName })
      .assign({ assetName: assetName })
      .value();
  }
};

var handlers = function (socket) {

  socket.on("disconnect", function () {
    var clients = db.get("clients");
    clients.remove({ sessionId: socket.id }).value();
    socket.broadcast.emit("client:disconnected");
  });

  socket.on("client:register", function (clientName) {
    var clients = db.get("clients");
    var client = clients.find({ name: clientName }).value();

    if (client == null) {
      client = clients
        .push({
          name: clientName,
          sessionId: socket.id,
          registeredOn: new Date(),
          assetName: null
        })
        .last()
        .value();
    }

    socket.broadcast.emit("client:changed");
  });

  socket.on("client:asset", function (data) {
    var nameToSave;
    if (data.hasOwnProperty("assetList")) {
      nameToSave = data.assetList.map(function(a) { return a.name; }).join(", ");
    } else {
      nameToSave = data.asset.name;
    }
    saveAssetToClient(data.client.name, nameToSave);
    socket.broadcast.emit("client:show", data);
  });

  socket.on("client:reset", function (data) {
    saveAssetToClient(data.name, null);
    socket.broadcast.emit("client:clear", data);
  });
};
