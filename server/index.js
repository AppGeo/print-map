'use strict';

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var uuid = require('node-uuid');
var snapshot = require('../lib');
var toNumber = require('./utils/to-number');
var formatTypes = require('./utils/format-types');

var app = express();
var env = process.env.NODE_ENV || 'development';
var hbs = exphbs.create({
  extname: '.html',
  helpers: {
    json: require('./helpers/json')
  }
});
var data = {};

if (env === 'development') {
  app.use(morgan('dev'));
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.engine);

if (env === 'production') {
  app.enable('view cache');
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '..', 'static')));

app.get('/', function (req, res) {
  var id = uuid.v1();
  var latlng = req.query.latlng;
  var zoom = req.query.zoom;
  var size = req.query.size;
  var format = req.query.format || 'jpeg';
  var options = {
    output: {
      format: format
    },
    view: {
      latlng: latlng ? latlng.split(',').map(toNumber) : undefined,
      zoom: zoom
    }
  };

  data[id] = options;

  snapshot(id, {
    size: size,
    format: format
  }, snapshotResponse(format, res));
});

app.post('/', function (req, res) {
  if (req.body) {
    var id = uuid.v1();
    var output = req.body.output;
    var options = {};
    var format = output && output.format || 'jpeg';

    data[id] = req.body;

    if (output) {
      options.size = output.size;
      options.quality = output.quality;
      options.format = output.format;
    }

    snapshot(id, options, snapshotResponse(format, res));
  }
});

// Called by phantomjs to get map
app.get('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id, data[id]);
  res.render('map', { options: data[id] });
});

module.exports = app;

function snapshotResponse(format, res) {
  return function (err, data) {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }

    var result = format === 'pdf' ? data : new Buffer(data, 'base64');

    if (format) {
      res.set('Content-Type', formatTypes[format]);
    }

    res.send(result);
  };
}
