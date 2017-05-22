var my_vis;
function visualize(vis_data,cont) {	
		my_vis = new SentStructure(vis_data);	
		my_vis.setBase({font_size:12,container:cont});
		my_vis.ready(function() {

		if (my_vis.length+200>$(cont).width()) {
			my_vis.setProperties({ySpacing:200, left:300,
				display_dependencies:false,
				display_alignments:false,
				display_pos:false
			});
		}else {	
			padding= ($(cont).width()-my_vis.length)/2
			my_vis.setProperties({ySpacing:200,left:padding,right:padding,
				display_dependencies:false,
				display_alignments:false,
				display_pos:false
			});
		}
		my_vis.addEvent("mouseenter","g.nodes rect,g.nodes text",function(d) {	
				d3.selectAll("g.pos-tags text#_"+d.id).classed("hov",true);
				d3.selectAll("g.pos-tags text.aligned_to"+d.id).classed("hov",true);
				my_vis.show_dependencies(d);})
		my_vis.addEvent("mouseleave","g.nodes rect,g.nodes text",function(d) {	
				d3.selectAll("g.pos-tags text#_"+d.id+":not(.important):not(.locked)").classed("hov",false);
				d3.selectAll("g.pos-tags text.aligned_to"+d.id+":not(.important):not(.locked)").classed("hov",false);
				my_vis.hide_dependencies(d);
			})
		my_vis.addEvent("click","g.nodes rect,g.nodes text",function(d) {
				my_vis.show_dependencies(d);
				my_vis.mark(d);			
		});
			
		my_vis.drawGraphs();	
			
		});			
}

