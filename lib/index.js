'use strict';

var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var scriptPath = path.join(__dirname, 'screenshot.js');


module.exports = function (id, callback) {
  var childArgs = [
    scriptPath,
    id
  ];
  var options = {
    maxBuffer: 200 * 5000
  };

  childProcess.execFile(binPath, childArgs, options, function(err, stdout, stderr) {
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
