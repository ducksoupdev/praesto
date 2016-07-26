// Karma configuration
// Generated on Thu Jul 07 2016 08:52:39 GMT+0100 (GMT Daylight Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "../",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/jasmine-jquery/lib/jasmine-jquery.js",
      "node_modules/socket.io-client/socket.io.js",
      "node_modules/angular/angular.min.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "node_modules/angular-resource/angular-resource.min.js",
      "node_modules/angular-sanitize/angular-sanitize.min.js",
      "node_modules/angular-confirm/angular-confirm.min.js",
      "node_modules/angular-messages/angular-messages.min.js",
      "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
      "node_modules/angular-ui-router/release/angular-ui-router.min.js",
      "node_modules/angular-local-storage/dist/angular-local-storage.min.js",
      "node_modules/AngularJS-Toaster/toaster.js",
      "node_modules/markdown/lib/markdown.js",
      "src/public/js/**/*.js",
      "src/spec/client/**/*.spec.js",
      { pattern: "src/public/js/**/*.html", included: false }
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome_custom"],
    customLaunchers: {
      "Chrome_custom": {
        base: "Chrome",
        flags: ["--remote-debugging-port=9222"]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
