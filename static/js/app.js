var map = L.map('map', {
  zoomControl: false,
  attributionControl: options.attribution === false ? false : true
});
var view;

map.setView([51.505, -0.09], 13);
L.Icon.Default.imagePath = 'images';
options = options || {};

if (options.view) {
  view = options.view;

  if (view.bounds) {
    map.fitBounds(view.bounds);
  }
  else {
    if (view.latlng) {
      map.panTo(view.latlng, {
        animate: false
      });
    }

    if (view.zoom) {
      map.setZoom(view.zoom, {
        animate: false
      });
    }
  }
}

// add an OpenStreetMap tile layer
L.tileLayer(options.baseMap ? options.baseMap : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: options.attribution || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
