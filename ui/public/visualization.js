var width = 960,
    height = 500

var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(0.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

d3.json("artistData2.json", function(error, json) {
  if (error) throw error;

  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke-width", (d) => d.value*2)

  link
    .on("click", function (d) {
      console.log('selected link', d);
      d3.selectAll('.artistName').remove();
      d3.selectAll('.artistImg').remove();
      d3.selectAll('.artistRole').remove();
      d3.selectAll('.collabNumber').remove();

      d3.select('#artist1Name')
        .append('text')
        .attr("class", "artistName")
        .text(`${d.source.name}`);
      d3.select('#artist1Img')
       .append("img")
       .attr("class", "artistImg")
       .attr('width', '100')
       .attr('height', '100')
       .attr("src", `${d.source.thumbnail}`);
       d3.select('#artist1Role')
         .append('text')
         .attr("class", "artistRole")
         .text(`(${d.source.role})`);

         d3.select('#artist2Name')
           .append('text')
           .attr("class", "artistName")
           .text(`${d.target.name}`);
         d3.select('#artist2Img')
          .append("img")
          .attr("class", "artistImg")
          .attr('width', '100')
          .attr('height', '100')
          .attr("src", `${d.target.thumbnail}`);
          d3.select('#artist2Role')
            .append('text')
            .attr("class", "artistRole")
            .text(`(${d.target.role})`);

        d3.select('#description')
          .append('text')
          .attr('class', 'collabNumber')
          .text(d.value === 1 ? `${d.value} song together` : `${d.value} songs together`);

      })
    // .on("mouseout", (d) => {
    //     d3.selectAll("text.songs").remove();
    //   })

  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(force.drag);


  node.append("circle")
      .attr("r", 7)
      .attr("fill", function(d) { return d.role === 'rapper' ? '#241587' : '#911b07' })

  node.append("text")
      .attr("dx", 15)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  node.on('click', d => {
    console.log('selected artist', d)
    d3.selectAll('.artistName').remove();
    d3.selectAll('.artistImg').remove();
    d3.selectAll('.artistRole').remove();
    d3.selectAll('.collabNumber').remove();

    d3.select('#artistName')
      .append('text')
      .attr("class", "artistName")
      .attr("x", "-50")
      .attr("y", "-50")
      .text(`${d.name}`);
    d3.select('#artistImg')
     .append("img")
     .attr("class", "artistImg")
     .attr("x", "-50")
     .attr("y", "-50")
     .attr('width', '120')
     .attr('height', '100')
     .attr("src", `${d.thumbnail}`);
     d3.select('#artistRole')
       .append('text')
       .attr("class", "artistRole")
       .attr("x", "-50")
       .attr("y", "-50")
       .text(`(${d.role})`);

  })

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});
