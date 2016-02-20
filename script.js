var width = window.innerWidth,
    height = window.innerHeight,
    root,
    linkDist = 0.22 * width - 84.3,
    radius = width/25,
    linkWidth = width/30,
    nodeStrokeWidth = width/30,
    fontWidth = radius / 1.5,
    charge = -20 * width,
    gravity = 0.3;

  var force = d3.layout.force()
  .linkDistance(linkDist)
  .charge(charge)
  .gravity(gravity)
.size([width, height])
  .on("tick", tick);

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

  var link = svg.selectAll(".link"),
  node = svg.selectAll(".node");

d3.json("graph.json", function(error, json) {
    root = json;
    flatten(root); //to set ids
    setParents(root, null);
    collapseAll(root);
    root.children = root._children;
    root._children = null;
    update();
    });


function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
    .nodes(nodes)
    .links(links)
    .start();

  // Update links.
  link = link.data(links, function(d) { return d.target.id;  });

  link.exit().remove();

  link.enter().insert("line", ".node")
    .attr("stroke-width", linkWidth)
    .attr("class", "link");

  // Update nodes.
  node = node.data(nodes, function(d) { return d.id;  });

  node.exit().remove();

  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .on("click", click)
    .call(force.drag);

  nodeEnter.append("circle")
    .attr('stroke-width', nodeStrokeWidth) 
    .attr("r", function(d) {
        var r = radius; 
        return (d.factor ? r * d.factor : r);
    });

  nodeEnter.append("text")
    .attr("dy", ".35em")
    .attr("font-size", fontWidth)
    .attr("font-family", "sans-serif")
    .text(function(d) { return d.name;  });
}

function tick() {
  link.attr("x1", function(d) { return d.source.x;  })
    .attr("y1", function(d) { return d.source.y;  })
    .attr("x2", function(d) { return d.target.x;  })
    .attr("y2", function(d) { return d.target.y;  });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";  });

}

// Toggle children on click.
function click(d) {
  if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;

  } else {
    if (d._parent){
      d._parent.children.forEach(function(e){
          if (e != d){
            collapseAll(e);
          }
        });
      }
    d.children = d._children;
    d._children = null;
    if (d.url) {
      window.open(d.url);
    }
  }
  update();

}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);

  }

  recurse(root);
  return nodes;

}

function collapseAll(d){
  if (d.children){
      d.children.forEach(collapseAll);
      d._children = d.children;
      d.children = null;
  }
  else if (d._children){
      d._children.forEach(collapseAll);
  }
}

function setParents(d, p){
      d._parent = p;
      if (d.children) {
              d.children.forEach(function(e){ setParents(e,d); });
      } else if (d._children) {
              d._children.forEach(function(e){ setParents(e,d); });
      }
}
