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
      t.error(err);
    });
});
