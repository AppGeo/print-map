'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('GET returns image', function (t) {
  t.plan(1);

  request(app)
    .get('/?latlng=40.712,-74.227')
    .expect('Content-Type', 'image/jpeg')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'no error');
    });
});

test('POST returns image', function (t) {
  t.plan(1);

  request(app)
    .post('/')
    .send({
      view: {
        latlng: [40.712, -74.227]
      }
    })
    .expect('Content-Type', 'image/jpeg')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'no error');
    });
});

test('POST with modified output', function (t) {
  t.plan(1);

  request(app)
    .post('/')
    .send({
      view: {
        latlng: [40.712, -74.227]
      },
      output: {
        size: '1920x1080'
      }
    })
    .expect('Content-Type', 'image/jpeg')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'no error');
    });
});

// Hack to get it to process.exit
// Probably due to dangling setInterval or promises
test('end', function (t) {
  t.end();
  process.nextTick(function () {
    process.exit();
  });
});
