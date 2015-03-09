'use strict';

var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var ectoplasm = require('ectoplasm');
var binPath = phantomjs.path;
var scriptPath = path.join(__dirname, 'screenshot.js');
var port = process.env.PORT;
var scripts = {
  screenshot: scriptPath
};

module.exports = function (id, options, callback) {
  if (arguments.length === 2) {
    callback = options;
  }

  options = options || {};

  options.port = port;
  options.id = id;

  ectoplasm.initialise(scripts, { phantomPath: phantomjs.path }, function (err) {
    if (err) {
      return callback(err);
    }

    ectoplasm.run('screenshot', options, function (err, imagePath) {
      fs.readFile(imagePath, function (err, data) {
        callback(err, data);

        fs.unlink(imagePath, function (err) {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  });
};
