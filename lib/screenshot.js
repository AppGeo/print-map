'use strict';

exports.run = function (options, cb) {
  var page = require('webpage').create();
  var port = options.port || 3000;
  var id = options.id;
  var size = options.size || '800x600';
  var quality = options.quality || 100;
  var url = 'http://localhost:' + port + '/' + id;

  if (size) {
    size = size.split('x');
    page.viewportSize = { width: size[0], height: size[1] };
  }

  page.open(url, function () {
    var imagePath = '.tmp/' + id + '.jpeg';

    setTimeout(function () {
      page.render(imagePath, { quality: quality });

      cb(undefined, imagePath);
    }, 1000);
  });
};
