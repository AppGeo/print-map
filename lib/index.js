'use strict';

var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var scriptPath = path.join(__dirname, 'screenshot.js');
var port = process.env.PORT;

module.exports = function (id, options, callback) {
  if (arguments.length === 2) {
    callback = options;
  }

  var childArgs = [
    scriptPath,
    port,
    id
  ];
  var execOptions = {
    maxBuffer: 200 * 5000
  };

  options = options || {};

  if (typeof options === 'object') {
    childArgs.push(options.size);
    childArgs.push(options.quality);
  }

  childProcess.execFile(binPath, childArgs, execOptions, function(err, stdout, stderr) {
    if (err) {
      return callback(err);
    }

    var imagePath = stdout ? stdout.replace(/\n$/, '') : '';

    fs.readFile(imagePath, function (err, data) {
      callback(err, data);

      fs.unlink(imagePath, function (err) {
        if (err) {
          console.error(err);
        }
      });
    });
  });
};
