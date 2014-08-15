var svg = d3.select('.shapeCreation').append('svg')
  .attr({
    width: window.innerWidth,
    height: window.innerHeight
  });

var parse = d3.time.format('%Y').parse;

d3.csv('./tutsplus.csv', function(d){
  // parse string into date object
  d.year = parse(d.year);

  return d;
}, function(data){

  // get highest and lowest Dates
  var yearRange = d3.extent(data, function(d){
    return d.year
  });

  // SCALES
  var yearScale = d3.time.scale()
    .domain(yearRange)
    .range([50, window.innerWidth - 50]);

  var numberScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d){ return d.number })])
    .range([50, window.innerHeight - 50]);

  // AXIS
  var yearAxis = d3.svg.axis().scale(yearScale)
    .tickSize(100 - window.innerHeight) // reverse tick direction
    .orient('bottom');

  var numberAxis = d3.svg.axis().scale(numberScale);

  // DRAW
  svg.append('g')
    .attr({
      'class': 'axis',
      'transform': 'translate(' + [0, window.innerHeight - 50]  + ')'
    }).call(yearAxis)

  // top line
  svg.append('line')
    .attr({
      x1: 50,
      y1: 50,
      x2: window.innerWidth - 50,
      y2: 50,
      fill: 'none',
      stroke: '#474747'
    });

  // line generator function
  var line = d3.svg.line()
    .x(function(d){
      return yearScale(d.year)
    })
    .y(function(d){
      return window.innerHeight - numberScale(d.number)
    });

  // add line to SVG
  svg.append('path')
    .data([data])
    .attr({
        d: line,
        fill: 'none',
        stroke: '#78B446',
        'stroke-width': 5
    });

  // fill generator function
  var area =  d3.svg.area()
    .x(function(d){ return yearScale(d.year) })
    .y0(window.innerHeight - 50)
    .y1(function(d){ return window.innerHeight - numberScale(d.number) })

  // add fill to graph
  svg.append('path')
    .data([data]) // treat data as single entity
    .attr({
      d: area,
      fill: '#C3E4AB',
      stroke: 'none'
    })

  // plot circles
  svg.selectAll('circle')
    .data(data)
    .enter()
      .append('circle')
      .attr({
        cx: function(d){
          return yearScale(d.year);
        },
        cy: function(d){
          return window.innerHeight - numberScale(d.number);
        },
        r: 5,
        fill: '#fff',
        stroke: '#78B446',
        "stroke-width": 4
      })


})
