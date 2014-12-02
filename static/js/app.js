var map = L.map('map').setView([51.505, -0.09], 13);

L.Icon.Default.imagePath = 'images';

if (options.bounds) {
  map.fitBounds(options.bounds);
}

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: options.attribution || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
