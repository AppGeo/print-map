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
      app.cleanup();
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
      app.cleanup();
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
      app.cleanup();
    });
});

test('POST with invalid output.format', function (t) {
  t.plan(2);

  request(app)
    .post('/')
    .send({
      view: {
        latlng: [40.712, -74.227]
      },
      output: {
        format: 'monster'
      }
    })
    .expect('Content-Type', /json/)
    .expect(400)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.equal(res.body.message, 'Invalid format type, valid options include: jpeg, png, gif, pdf', 'Valid error message');
      app.cleanup();
    });
});

test('POST with pdf format', function (t) {
  t.plan(1);

  request(app)
    .post('/')
    .send({
      view: {
        latlng: [40.712, -74.227]
      },
      output: {
        format: 'pdf'
      }
    })
    .expect('Content-Type', 'application/pdf')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No error');
      app.cleanup();
    });
});

// Hack to get it to process.exit
// Probably due to dangling setInterval or promises
test('end', function (t) {
  t.end();
  app.cleanup();
  process.nextTick(function () {
    process.exit();
  });
});
