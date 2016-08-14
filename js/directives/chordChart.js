 'use strict'

 app.directive('chord', ['$window','chordHelpers', function($window,chordHelpers) {
 	return {
 		restrict: 'EA',
 		scope: {
 			data:'=',
 			keya:'@',
 			keyb:'@'
 		},
 		link: link
 	}


 	function link(scope, element, attrs) {
 		
 		var svg = d3.select(element[0]).append("svg");

 		scope.$watch('data', function(data) {
 	    	if (!data) return;
			d3.select("svg").remove();
 			scope.render(data)
 		},true);

 		scope.render = function(data) {

 			var mpr = chordHelpers.chordMpr(scope.data);
 			mpr.addValuesToMap(scope.keya)
 			.setFilter(function (row, a, b) {
 				return (row[scope.keya] === a.name && row[scope.keyb] === b.name)
 			})
 			.setAccessor(function (recs, a, b) {
 				if (!recs[0]) return 0;
 				return recs[0].count;
 			});

 			var rdr = chordHelpers.chordRdr(mpr.getMatrix(), mpr.getMap());
 			var width = attrs.width,
 			height = attrs.height,
 			outerRadius = Math.min(width, height) / 2 - 10,
 			innerRadius = outerRadius - 24;


 			svg = d3.select(element[0]).append("svg")
 			.attr("width", width)
 			.attr("height", height)
 			.attr('class','chord-svg')
 			.append("g")
 			.attr("id", "circle")
 			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 			svg.append("circle")
 			.attr("r", outerRadius);

 			var formatPercent = d3.format(".1%");
 			var color = d3.scale.ordinal()
 			.domain(d3.range(4))
 			.range(["#000000","#F26223", "#FFDD89","#957244"]);

 			var arc = d3.svg.arc()
 			.innerRadius(innerRadius)
 			.outerRadius(outerRadius);

 			var layout = d3.layout.chord()
 			.padding(.04)
 			.sortSubgroups(d3.descending)
 			.sortChords(d3.ascending);

 			var path = d3.svg.chord()
 			.radius(innerRadius);

 			


			  // Compute the chord layout.
			  layout.matrix(mpr.getMatrix());

			  // Add a group per color.
			  var group = svg.selectAll(".group")
			  .data(layout.groups)
			  .enter().append("g")
			  .attr("class", "group")
			  .on("mouseover", mouseover);

			  // Add a mouseover title.
			  group.append("title").text(function(d, i) {
			  	return d.value + ' people';
			  });

			  // Add the group arc.
			  var groupPath = group.append("path")
			  .attr("id", function(d, i) { return "group" + i; })
			  .attr("d", arc)
			  .style("fill", function(d, i) {return color(d.index); });

			  // Add a text label.
			  var groupText = group.append("text")
			  .attr("x", 6)
			  .attr("dy", 15);
			  groupText.append("textPath")
			  .attr("xlink:href", function(d, i) { return "#group" + i; })
			  .text(function(d, i) {return rdr(d).gname;});


			  // Add the chords.
			  var chord = svg.selectAll(".chord")
			  .data(layout.chords)
			  .enter().append("path")
			  .attr("class", "chord")
			  .style("fill", function(d) { return color(d.source.index); })
			  .attr("d", path);

			  // Add an elaborate mouseover title for each chord.
			  chord.append("title").text(function(d) {
			  	var p = d3.format(".0%"), q = d3.format(",3r")
			  	var r = rdr(d);
			  	return "Chord Info:"
			  	+ p(r.svalue/r.stotal) + " (" + q(r.svalue) + ") of "
			  	+ r.sname + " prefer " + r.tname
			  	+ (r.sname === r.tname ? "": (' while '
			  		+ p(r.tvalue/r.ttotal) + " (" + q(r.tvalue) + ") of "
			  		+ r.tname + " prefer " + r.sname))
			  });

			  function mouseover(d, i) {
			  	chord.classed("fade", function(p) {
			  		return p.source.index != i
			  		&& p.target.index != i;
			  	});
			  }


			}
			//scope.render();


		}





	}]);