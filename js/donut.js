// d3 video lesson 13
// ==================
var data = {
	apples: [5, 100, 40, 23],
	oranges: [20, 4, 15, 30]
};
var width = 620;
var height = 620;
var radius = Math.min(width, height) / 2;

// construct new ordinal scale with a 10 color range
var color = d3.scale.category20();

// pie selection (returns array of objects)
var pie = d3.layout.pie()
	.value(function(d){ return d; });

// path for an arc
var arc = d3.svg.arc()
	.innerRadius(radius - 150)
	.outerRadius(radius - 20);

// append svg
var svg = d3.select('#target').append('svg')
	.attr('width', width)
	.attr('height', height)
	// creates group
	.append('g')
		.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

// draw every arc
var arcs = svg.selectAll('path')
	.data(pie(data['apples']))
	.enter()
		.append('path')		// append a path
		.attr('fill', function(d, i){
			return color(i);	// color based on index
		})
		.attr('d', arc)
		.each(function(d){ this.currentDatum = d; })	// store each path's data

// add text labels
var text = svg.selectAll('text')
	.data(pie(data['apples']))
	.enter()
		.append('text')
		.attr('transform', function(d){
			return 'translate(' + arc.centroid(d) + ')';
		})
		.text('text-anchor', 'middle')
		.attr('font-size', '2em')
		.text(function(d){
			return d.data;
		});

// listen for changes
d3.selectAll('input').on('change', change);

function change(){
	var value = this.value;	// this is selected <input> tag

	arcs = arcs.data(pie(data[value]));	// supply new data
	//arcs.attr('d', arc);	// redraw arcs
	arcs.transition().duration(750).attrTween('d', arcTween)
	
	// redraw labels
	text.data(pie(data[value]))
		.transition()
		.delay(300)
		.attr('transform', function(d){
			return 'translate(' + arc.centroid(d) + ')';
		})
		.text(function(d){
			return d.data;
		})
}

// Store the displayed angles in currentDatum.
// Then, interpolate from currentDatum to the new angles.
// During the transition, currentDatum is updated in-place by d3.interpolate.
function arcTween(a){
	var i = d3.interpolate(this.currentDatum, a);
	this.currentDatum = i(0)
	return function(t){
		return arc(i(t))
	}
}