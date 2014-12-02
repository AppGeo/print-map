'use strict';

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var uuid = require('node-uuid');
var snapshot = require('../lib');

var app = express();
var env = process.env.NODE_ENV || 'development';
var hbs = exphbs.create({
  extname: '.html',
  helpers: {
    json: require('./helpers/json')
  }
});
var data = {};

app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.engine);

if (env === 'production') {
  app.enable('view cache');
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '..', 'static')));

app.post('/', function (req, res) {
  if (req.body) {
    var id = uuid.v1();

    data[id] = req.body;

    snapshot(id, function (err, data) {
      if (err) {
        return console.error(err);
      }

      res.set('Content-Type', 'image/jpg');
      res.send(new Buffer(data, 'base64'));
    });
  }
});

app.get('/:id', function (req, res) {
  var id = req.param('id');

  res.render('map', { options: data[id] });
});

module.exports = app;
