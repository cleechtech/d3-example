var oakland = { lat: 37.804844, lon: -122.239609 },
	usa = { lat: 37.8, lon: -96.9 }

var map = new L.Map('d3map', { center: [ usa.lat, usa.lon ], zoom: 4 })
	.addLayer(new L.TileLayer("https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png"))

// Layer Switch on map
// http://www.digital-geography.com/d3-mapping-basics-draft-for-digital-geography-com/#.U-_2zNSx15Q
// var map = L.map('map').setView([52.45,13.4], 9);
// var toolserver = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png');
// var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
// var baseLayers = {"stamen": stamen, "toolserver-mapnik":toolserver};L.control.layers(baseLayers).addTo(map);
// L.control.layers(baseLayers).addTo(map);

// add SVG to Leaflet's overlay pane
var svg = d3.select(map.getPanes().overlayPane).append('svg'),
	g = svg.append('g').attr('class', 'leaflet-zoom-hide');

d3.json('data/us-states.json', function(collection){
	console.log(collection)

	// GeoJSON to SVG
	var transform = d3.geo.transform({ point: projectPoint }),
		path = d3.geo.path().projection(transform);

	var feature = g.selectAll('path')
		.data(collection.features)
		.enter()
			.append('path');

	map.on('viewreset', reset);
	reset();

	// Reposition SVG to cover the features
	function reset(){
		// projected bounding box
		var bounds = path.bounds(collection),
			topLeft = bounds[0],
			bottomRight = bounds[1];

		svg.attr('width', bottomRight[0] - topLeft[0])
			.attr('height', bottomRight[1] - topLeft[1])
			.attr('left', topLeft[0] + 'px')
			.attr('top', topLeft[1] + 'px');

		g.attr('transform', 'translate(' + topLeft[0] + ',' + -topLeft[1] + ')')

		feature.attr('d', path);
	}

	// "custom geometric transformation"
	function projectPoint(x, y){
		var point = map.latLngToLayerPoint(new L.LatLng(y, x));
		this.stream.point(point.x, point.y)
	}
})