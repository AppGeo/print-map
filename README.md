print-map
=========

Send map data and get back an image/pdf

## Usage

```no-highlight
npm install
npm start
```

Send a POST request to `localhost:3000` with a 'Content-Type' of `application/json` with the following options:

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

If you want basic features, you can use a GET request instead, e.g. localhost:3000/?latlng=40.712,-74.227&zoom=16

## Options

### `view`

* `bounds` - is an array of two arrays that hold lat, lng values, e.g. `[[40.712, -74.227], [40.774, -74.125]]`, supersedes `latlng` + `zoom`.
* `latlng` - an array of lat, lng values, e.g. `[40.712, -74.227]`, usually goes with the `zoom` option.
* `zoom` - an integer zoom value, defaults to `10`.

### `attribution`

Currently a text value that can contain HTML, and replaces the attribution on the map.


## TODO

* Decide how to make this generic enough that it's useful as a service
* Add custom basemaps/overlays
