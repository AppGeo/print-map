'use strict';

var page = require('webpage').create();
var args = require('system').args;
var port = fallback(args[1], 3000);
var id = args[2];
var size = fallback(args[3], '800x600');
var quality = fallback(args[4], '100');
var url = 'http://localhost:' + port + '/' + id;

if (size) {
  size = size.split('x');
  page.viewportSize = { width: size[0], height: size[1] };
}

page.open(url, function () {
  var imagePath = '.tmp/' + id + '.jpeg';

  setTimeout(function () {
    page.render(imagePath, { quality: quality });
    console.log(imagePath);

    phantom.exit();
  }, 1000);
});

function fallback(original, fallback) {
  return original && original !== 'undefined' ? original : fallback;
}
