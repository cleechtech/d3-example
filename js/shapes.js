// Basic bar chart
// =========================
for (var i = 0; i < 5; i++){
	// create divs
	d3.select('#right-contain')
		.append('div')
		.attr('class', 'bars')
}

d3.selectAll('.bars')
	.data([125, 230, 435, 140, 335])
	.transition()
	.duration(1000)	// animation
	.style('width', function(d) { return d + 'px'; })	// set width based on data
	.style('background-color', 'steelblue');

// Draw basic shapes
// =========================
var canvas = d3.select('#target')
			.append('svg')
			.attr('width', 500)
			.attr('height', 350);

var rectangle = canvas.append('rect')	// top left corner
					.attr('width', 100)
					.attr('height', 50);

var line = canvas.append('line')
				.attr('x1', 500)
				.attr('y1', 100)			// first point
				.attr('x2', 300)
				.attr('y2', 300)			// second point
				.attr('stroke', 'green')	// color
				.attr('stroke-width', 8);	// width

var circle = canvas.append('circle')
				.attr('cx', 150)		// x position
				.attr('cy', 200)		// y position
				.attr('r', 40)			// radius

// Transitions
// =========================
circle.transition()
	// when transition starts
	.each('start', function(d){
		// this === <circle></circle>
		// d3.select(this)
		circle.attr('fill', 'blue')
	})
	.delay(500)
	.duration(900)
	.attr('cx', 50)

	.transition()
	.each('start', function(d){
		circle.attr('fill', 'pink')
	})
	.each('end', function(d){
		circle.attr('fill', 'red')
	})
	.attr('cy', 50)

	.transition()
	.attr('cx', 250)
	.attr('cy', 300)
	// when transition ends
	.each('end', function(d){
		circle.attr('fill', 'green')
	})

// Selections
// =========================
/*
DOM elements < data elements (enter)
DOM elements > data elements (exit)
DOM elements === data elements (update)
*/
var data = [10, 60];
var circles = canvas.selectAll('circle')
				.data(data)
				// fills circle that is in the selection
				.attr('fill', 'green')
				// enter() will only use 2nd data point because one circle already exists
				.enter()
					.append('circle')
					.attr('cx', 250)
					.attr('cy', 100)
					// fills the new circles that weren't in original selection
					.attr('fill', 'red')
					.attr('r', function(d){
						return d;
					});