var canvas1 = d3.select('#line').append('svg')
	.attr('width', 300)
	.attr('height', 300);

// diagonal path generator
var diagonal = d3.svg.diagonal()
	.source({x: 10, y: 10})
	.target({x: 300, y: 250 })

canvas1.append('path')
	.attr('fill', 'none')
	.attr('stroke', 'black')
	.attr('d', diagonal);

//==================================//

// TREE DIAGRAM
var canvas2 = d3.select('#tree').append('svg')
	.attr('width', 650)
	.attr('height', 650)
	.append('g')
		.attr('transform', 'translate(50, 50)')

var tree = d3.layout.tree()
	.size([500, 500])

d3.json('mydata.json', function(data){
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
			.attr('d', diagonal)




})





