'use strict';

exports.run = function (options, cb) {
  var page = require('webpage').create();
  var port = options.port || 3000;
  var id = options.id;
  var size = options.size || '800x600';
  var quality = options.quality || 100;
  var format = options.format || 'jpeg';
  var url = 'http://localhost:' + port + '/' + id;
  var validFormats = ['jpeg', 'png', 'gif', 'pdf'];

  if (validFormats.indexOf(format) === -1) {
    return cb('Invalid format type, valid options include: ' + validFormats.join(', '));
  }

  page.viewportSize = { width: 600, height: 600 };

  if (size) {
    size = size.split('x');
    page.viewportSize = { width: size[0], height: size[1] };
  }

  if (format === 'pdf') {
    if (size) {
      page.paperSize = { width: size[0], height: size[1], margin: '0px' };
    }
    else {
      page.paperSize = { format: 'A4', orientation: 'landscape', margin: '1cm' };
    }
  }

  page.onResourceError = function (resourceError) {
    page.reason = resourceError.errorString;
    page.reasonUrl = resourceError.url;
  };

  page.open(url, function (status) {
    status = status.replace('phantom says: ', '');

    if (status !== 'success') {
      page.close();
      return cb(status + ' (' + page.reasonUrl + '): ' + page.reason);
    }

    var filePath = '.tmp/' + id + '.' + format;

    setTimeout(function () {
      page.render(filePath, { format: format, quality: quality });

      cb(undefined, filePath);

      page.close();
    }, 200);
  });
};
