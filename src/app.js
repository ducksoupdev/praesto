/* global process, __dirname */
var path = require("path");
var express = require("express");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
var socketIo = require("socket.io");
var low = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");

var indexRoutes = require("./routes/index");
var adminRoutes = require("./routes/admin");
var socketRoutes = require("./routes/socket");
var apiRoutes = require("./routes/api");

var app = express();

var env = process.env.NODE_ENV || "development";
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === "development";

// initialise the database
var db = low("data/db.json", {
  storage: fileAsync
});
db.defaults({clients: [], assets: []}).value();
db.set("clients", []).value();

// add the socket object
var sio = socketIo();
app.io = sio;

// add the db and socket io instances to the request and response pipeline
app.use(function (req, res, next) {
  req.db = db;
  res.io = sio;
  next();
});

// view engine setup
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials")
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(favicon(path.join(__dirname, "public/img/praesto.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/components", express.static(path.join(__dirname, "../", "node_modules")));
app.use("/docs", express.static(path.join(__dirname, "../", "docs")));

// home page route
app.use("/", indexRoutes);

// admin route
app.use("/admin", adminRoutes);

// api routes
app.use("/api", apiRoutes);

// redirect all others to the index (HTML5 history)
app.get("*", indexRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler - will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
      title: "error"
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
    title: "error"
  });
});

// sockets
sio.on("connection", socketRoutes(db));

module.exports = app;
