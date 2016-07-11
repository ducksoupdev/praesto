var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var plumber = require("gulp-plumber");
var livereload = require("gulp-livereload");
var eslint = require("gulp-eslint");
var jasmine = require("gulp-jasmine");
var sass = require("gulp-sass");
var KarmaServer = require("karma").Server;

gulp.task("sass", function () {
  gulp.src("./src/public/css/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("./src/public/css"))
    .pipe(livereload());
});

gulp.task("watch", function () {
  gulp.watch("./src/public/css/*.scss", ["sass"]);
});

gulp.task("develop", function () {
  livereload.listen();
  nodemon({
    script: "bin/www",
    ext: "js handlebars coffee",
    stdout: false
  }).on("readable", function () {
    this.stdout.on("data", function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task("lint", function () {
  return gulp.src(["./src/**/*.js", "!./src/public/components/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("test:server", function () {
  return gulp.src("./src/spec/server/**/*.spec.js")
    .pipe(jasmine());
});

gulp.task("test:client", function (done) {
  new KarmaServer({
    configFile: __dirname + "/conf/karma.conf.js",
    singleRun: true
  }, done).start();
});

gulp.task("test:client:watch", function (done) {
  new KarmaServer({
    configFile: __dirname + "/conf/karma.conf.js"
  }, done).start();
});

gulp.task("test", ["test:server", "test:client"]);

gulp.task("default", [
  "sass",
  "develop",
  "watch"
]);
