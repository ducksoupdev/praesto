var express = require("express");
var fs = require("fs");

var router = express.Router();

function sortAssets(asset1, asset2) {
  if (asset1.name < asset2.name) return -1;
  if (asset1.name > asset2.name) return 1;
  return 0;
}

function assetExists(currentAssets, assetName) {
  var exists = false;
  for (var i = 0; i < currentAssets.length; i++) {
    if (currentAssets[i].url === "/assets/" + assetName) {
      exists = true;
    }
  }
  return exists;
}

router.get("/assets", function (req, res) {
  var i;
  var assets = [];
  var savedAssets = req.db.get("assets").value();
  for (i = 0; i < savedAssets.length; i++) {
    assets.push(savedAssets[i]);
  }

  var dir = "./src/public/assets";
  var newAssets = fs.readdirSync(dir);
  for (i = 0; i < newAssets.length; i++) {
    var file = dir + "/" + newAssets[i];
    var stats = fs.statSync(file);
    if (stats.isDirectory() && !assetExists(assets, newAssets[i])) {
      assets.push({
        name: newAssets[i],
        type: "local",
        createdOn: stats.birthtime,
        url: "/assets/" + newAssets[i]
      });
    }
  }

  assets.sort(sortAssets);
  res.send(assets);
});

router.post("/asset", function (req, res) {
  if (req.body.type != null && req.body.name != null) {
    var assets = req.db.get("assets");
    var asset = assets.find({ name: req.body.name }).value();
    if (asset != null) {
      res.sendStatus(409);
    } else {
      assets
        .push(req.body)
        .last()
        .value();
      res.sendStatus(204);
    }
  } else {
    res.sendStatus(400);
  }
});

router.route("/asset/:id")
  .put(function(req, res) {
    if (req.params.id != null) {
      req.db.get("assets")
        .find({ id: req.params.id })
        .assign(req.body)
        .value();
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  })
  .delete(function (req, res) {
    if (req.params.id != null) {
      req.db.get("assets")
        .remove({ id: req.params.id })
        .value();
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  });

router.get("/clients", function (req, res) {
  res.send(req.db.get("clients").value());
});

router.post("/client", function (req, res) {
  if (req.body.clientName != null) {
    var clients = req.db.get("clients");
    clients
      .push({
        name: req.body.clientName,
        registeredOn: new Date()
      })
      .last()
      .value();

    res.io.sockets.emit("client:added");
    res.sendStatus(204);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
