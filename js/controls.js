$(document).ready(function() {
var mapper = {
	type:1,
	pos:3,
	lemma:2,
	id:8,
	dep:7,
	dep_to:6,
	align:13,
	lang:14
};
$("#yspacing").val(200);
$("#xspacing").val(3);
$("#xoffset").val(1);
try {Object.keys(localStorage).forEach(function(k) {
	mapper[k]=localStorage[k];
})
}
catch (err) {}
$("#settings select.col-sel").each(function() {
 for (i=0;i<15;i++) {
	$(this).append("<option>"+i+"</option>"); 	
 }
 $(this).val(mapper[$(this).attr("id").slice(0,$(this).attr("id").length-7)])
});
$("#controls").hide()
$("#down").on("click", function() {
	$(this).attr("href",getDownloadURI()).attr("download","SentStructure.svg");
});


});
$("#sub").on("click", function(e) {
 	e.preventDefault();
	$("#graph-visual").empty();
	Object.keys(mapper).forEach(function(m) {
		console.log($("#"+m+"-column").val())
		mapper[m]=$("#"+m+"-column").val();
		localStorage.setItem(m,$("#"+m+"-column").val());
	});
	input_obj = {"segments":{},"alignments":[]}
	console.log(mapper)
	$("textarea.input_text").each(function(i) {
		info = parse_CONLL($(this).val(),mapper,input_obj.alignments);
		input_obj.segments[i]=info.segment;
		input_obj.alignments=input_obj.alignments.concat(info.alignments);	
	})
	console.log(input_obj);
	if ($("#getter").val()=="") inparr=starting;
	$("#yspacing").val(200);
	$("#xspacing").val(3);
	$("#xoffset").val(1);
	visualize(input_obj,"#graph-visual")
	//$.ajax({
	//	type: 'POST',
	//	url: "get_alignments.php",
	//	data: {input:inparr},
	//	success: function(response) {
	//		resp=JSON.parse(response);
	//		visualize(resp,"#graph-visual");
	//	}
	//});
});

$("#setting-link").on("click",function() {
	$("#settings").toggle();
	if ($("#settings").css("display")=="block") { $(this).text("Hide settings")}
	else {$(this).text("Show settings")}
})
$("#add_s").on("click",function(e) {
	e.preventDefault();
	$("#inputs").append(
	$("<div class='col-md-6'></div>").append($("<p><label>sentence "+($("#inputs label").length+1)+"</label><span class='glyphicon glyphicon-remove remove_sent'></span></p>"))
		.append($("<textarea id='gettext"+($("#inputs label").length+1)+"'>").addClass("input_text"))		
	)	
})
$(document).on("click","span.remove_sent", function() {
	//console.log(this)
	$(this).parent().parent().remove();
	$("#inputs label").each(function(i) {$(this).text("sentence "+(i+1))});
	$("textarea.input_text").each(function(i) {$(this).attr("id","gettext"+(i+1))});
});
$("#yspacing").on("input",function() {
	tab_id=$("ul.nav-tabs > li.active > a").attr("href");
	//my_vis=vis_tabs[tab_id];
	my_vis.setProperties({ySpacing:$(this).val()});
	my_vis.drawGraphs();
});
$("#xspacing").on("input",function() {
	tab_id=$("ul.nav-tabs > li.active > a").attr("href");
	//my_vis=vis_tabs[tab_id];
	console.log($(this).val())
	my_vis.setProperties({xSpacing:$(this).val()});
	my_vis.drawGraphs();
});
$("#xoffset").on("input",function() {
	tab_id=$("ul.nav-tabs > li.active > a").attr("href");
	//my_vis=vis_tabs[tab_id];
	console.log($("#xoffset-sel").val())
	my_vis.setProperties({xOffset:$(this).val(),xOffsetRange:$("#xoffset-sel").val()});
	my_vis.drawGraphs();
});
$("#pos").on("change",function(evt) {
	state=$(this).is(":checked");
	 elements=d3.selectAll("g.pos-tags text");
	  if (state==true) {
		  elements.classed("locked",function(d) {d.locked=true;return true;});
	  } else {
		  elements.classed("locked",function(d) {d.locked=false;return false;});
	  }	
});
$("#dep").on("change",function(evt) {
	state=$(this).is(":checked");
	if (state==true) {
		d3.selectAll("g.link path").data().forEach(function(d) {
			id=d.id;	
			d3.selectAll("g.link .source_"+id+":not(.important)")
				.classed("locked",function(d) {d.locked=true;return true;});
			d3.selectAll("#marker"+id).classed("locked",function(d) {d.locked=true;return true;});
		});
	   } else {
		d3.selectAll("g.link path").data().forEach(function(d) {
			id=d.id;
			d3.selectAll("g.link .source_"+id+":not(.important)")
				.classed("locked",function(d) {d.locked=false;return false;});
			//d3.selectAll("#marker"+id).style("visibility","hidden");
		});
	   }
});
$("#al").on("change",function(evt) {
	state=$(this).is(":checked");
	elements=d3.selectAll("g.token-alignments path:not(.important)");
	  if (state==true) {
		  elements.classed("locked",function(d) {d.locked=true;return true;});
	  } else {
		  elements.classed("locked",function(d) {d.locked=false;return false;});
	  }
});
$("#show_controls").on("click",function() {
	$("#controls").toggle();
	if ($(this).find("span").hasClass("glyphicon-chevron-up")) {
		$(this).find("span").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
	}
	else {
		$(this).find("span").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
	}
});
