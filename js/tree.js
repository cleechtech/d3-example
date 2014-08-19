var radius = window.innerHeight;

var svg = d3.select('#tree1').append('svg')
	.attr({
		width: window.innerWidth,
		height: window.innerHeight
	}).append('g')
	.attr('transform', 'translate(' + [60, radius/2] + ')rotate(60)')

var tree = d3.layout.tree().size([60, radius]);

var diagonal =  d3.svg.diagonal.radial()
	.projection(function(d){
		return [d.y, d.x / 180 * Math.PI]
	})

d3.json('./data/tree.json', function(data){
	var nodeData = tree.nodes(data),
		linkData = tree.links(nodeData);

		svg.selectAll('path.link')
			.data(linkData)
			.enter()
				.append('path')
				.attr({
					'class': 'link',
					fill: 'none',
					stroke: '#ccc',
					d: diagonal
				});

		var nodes = svg.selectAll('g.node')
			.data(nodeData)
			.enter()
				.append('g')
				.attr({
					'class': 'node',
					'transform': function(d){
						return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')'
					}
				});

		nodes.append('circle')
			.attr({
				fill: '#fff',
				stroke: '#78B446',
				'stroke-width': 4,
				r: 4
			})

		nodes.append('text')
			.attr('dx', 10)
			.text(function(d){
				return d.name
			})


})

//==================================//

// TREE DIAGRAM
var canvas2 = d3.select('#tree').append('svg')
	.attr('width', 650)
	.attr('height', 650)
	.append('g')
		.attr('transform', 'translate(50, 50)')

var tree = d3.layout.tree()
	.size([500, 500])

d3.json('data/peopleTree.json', function(data){
	var nodes = tree.nodes(data)	// returns all objects in data as array
	// console.log(nodes)

	var links = tree.links(nodes) // paths between each node
	// console.log(links)

	// group to hold nodes together
	var node = canvas2.selectAll('.node')
		.data(nodes)
		.enter()
			.append('g')
			.attr('class', 'node')
			.attr('transform', function(d){
				return 'translate(' + d.x + ',' + d.y + ')'
			})

	node.append('circle')
		.attr('fill', 'steelblue')
		.attr('r', 5)

	node.append('text')
		.text(function(d){
			return d.name
		})

	var diagonal = d3.svg.diagonal()

	canvas2.selectAll('.link')
		.data(links)
		.enter()
			.append('path')
			.attr('class', 'link')
			.attr('fill', 'none')
			.attr('stroke', '#ADADAD')
			.attr('d', diagonal);
})
