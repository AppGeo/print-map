'use strict';

//var path = require('path');
var page = require('webpage').create();
var args = require('system').args;
var id = args[1];

page.open('http://localhost:3000/' + id, function() {
  var imagePath = 'tmp/' + id + '.jpg';

  setTimeout(function () {
    page.render(imagePath, { quality: '100' });
    console.log(imagePath);

    phantom.exit();
  }, 1000);
});