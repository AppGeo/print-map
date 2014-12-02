var map = L.map('map').setView([51.505, -0.09], 13);
var view;

L.Icon.Default.imagePath = 'images';
options = options || {};

if (options.view) {
  view = options.view;

  if (view.bounds) {
    map.fitBounds(view.bounds);
  }
  else if (view.latlng) {
    map.setView(view.latlng, view.zoom || 10, {
      animate: false
    });
  }
}

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: options.attribution || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
