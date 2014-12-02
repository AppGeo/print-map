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
  "bounds": [
    [40.712, -74.227],
    [40.774, -74.125]
  ],
  "attribution": "Hello :)"
}
```


## TODO

* Decide how to make this generic enough that it's useful as a service
* Add custom basemaps/overlays
