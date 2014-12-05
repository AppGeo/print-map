print-map [![Build Status][travis-badge]][travis-badge-url]
=========

Send map data and get back an image/pdf

[![NPM][npm-badge]][npm-badge-url]

## Usage

```no-highlight
npm install
npm start
```

Send a POST request to `localhost:3000` with a 'Content-Type' of `application/json` with the following body:

```json
{
  "view": {
    "bounds": [
      [40.712, -74.227],
      [40.774, -74.125]
    ],
    "latlng": [40.712, -74.227],
    "zoom": 16
  },
  "attribution": "Hello :)"
}
```

### Using via a GET request

If you want basic features, you can use a GET request instead, e.g.  `localhost:3000/?latlng=40.712,-74.227&zoom=16`

#### Available Options

* latlng
* zoom
* size

## Options

### `output`

* `size` - string of the following format 'widthxheight', defaults to '800x600'.
* `quality` - number from 0 - 100, defaults to 100.

### `view`

* `bounds` - is an array of two arrays that hold lat, lng values, e.g. `[[40.712, -74.227], [40.774, -74.125]]`, supersedes `latlng` + `zoom`.
* `latlng` - an array of lat, lng values, e.g. `[40.712, -74.227]`, usually goes with the `zoom` option.
* `zoom` - an integer zoom value, defaults to `10`.

### `baseMap`

Currently a text value that defaults to `http://{s}.tile.osm.org/{z}/{x}/{y}.png`.

### `geoJson`

Accepts valid [GeoJSON][geojson] and draws it on the basemap.

### `attribution`

Currently a text value that can contain HTML, and replaces the attribution on the map.
Passing `false` will disable attribution.


## TODO

* Decide how to make this generic enough that it's useful as a service
* Add custom basemaps/overlays (bring [these](http://leaflet-extras.github.io/leaflet-providers/preview/) in)
* Add output options (type, size, quality -- see [here for example](https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js))
* Add Google Maps

[geojson]: http://geojson.org/geojson-spec.html
[travis-badge-url]: https://travis-ci.org/AppGeo/print-map
[travis-badge]: https://travis-ci.org/AppGeo/print-map.svg?branch=master
[npm-badge-url]: https://nodei.co/npm/print-map/
[npm-badge]: https://nodei.co/npm/print-map.png?downloads=true&stars=true
