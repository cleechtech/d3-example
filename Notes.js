// for every time that we see data but do not see an element
.enter()

/*
DOM elements < data elements (enter)
DOM elements > data elements (exit)
DOM elements === data elements (update)
*/

// closure
function functor(x){
	return function(){
		return x;
	};
}

var val = functor(10);
assert.equal(val(), 10);	// val is a function that always returns 10

// empty selection
var selection = d3.selectAll('circle')
					.data([1,2,3]);

// for each part of the data which is not joined to 
// an element in the selection, add an element
selection.enter()
	.append('circle');

// for each part of the selection that is no longer
// in the data, remove it
selection.exit()
	.remove();

// for each part of the selection update some attribute
selection.text(function(d){
	return d.fooBar;
})

// Handles all three states: enter, exit and update
// The enter, update and exit selections are computed by the data operator
// can recompute when given various sized datasets
var circle = svg.selectAll("circle")
    .data(data);

circle.exit()
	.transition()
	.attr('r', 0)	// shrink out
	.remove();

circle.enter().append("circle")
	.attr('r', 0)	
	.transition()
    .attr("r", 2.5);	// expand in

circle
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

// The update selection is returned by selection.data, 
// while the enter and exit selections hang off the update 
// selection
// http://bost.ocks.org/mike/join/

// SCALE
d3.scale.linear()
	// data comes in
	.domain([0, 10])
	// representation comes out
	.range([0, 1]);

// GEO
var projection = d3.geo.mercator();
// data goes in representation comes out
var px projection([lon, lat]);

//	Array methods
=====================
d3.extend(dataArray)		// gives the [max, min] values in array
d3.shuffle(dataArray)		// randomize array
d3.sum(dataArray)
d3.mean(dataArray)
d3.median(dataArray)

// Groups
// The SVG Transform Attribute applies a list of transformations to an element and it's children.
// <svg width="200" height="200">
// 	<g transform="translate(...) scale(...) rotate(...) translate(...) rotate(...)">
// 	</g>
// </svg>