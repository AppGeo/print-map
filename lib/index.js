'use strict';

var fs = require('fs');
var path = require('path');
var phantomjs = require('phantomjs');
var ectoplasm = require('ectoplasm');
var scriptPath = path.join(__dirname, 'screenshot.js');
var port = process.env.PORT;
var ectoOptions = {
  phantomPath: phantomjs.path
};
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

  ectoplasm.initialise(scripts, ectoOptions, function (err) {
    if (err) {
      return callback(err);
    }

    ectoplasm.run('screenshot', options, function (err, filePath) {
      if (err) {
        return callback(err);
      }

      fs.readFile(filePath, function (err, data) {
        callback(err, data);

        // delete temp file
        fs.unlink(filePath, function (err) {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  });
};
