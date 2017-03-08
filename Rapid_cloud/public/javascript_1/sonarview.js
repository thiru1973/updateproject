//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	$(".cancelPoup, .close").click(function(){
		$("#instan").hide();
		$("#logDetail").hide();
	});
	
});

function showMore(i){
	$(".advancedOpt"+i+"").toggle();
}
var dwData;
function pipelineList(){
	this.addLoadBa = document.getElementById("mvTable");
	
}
pipelineList.prototype = {
	init:function(){
		var self = this;
		var url = document.location.href
		var idx = url.lastIndexOf("data=");
		var prj = url.substring(idx+5).replace("#","");
		var data = {};
		data.mtName = "projIssues";
		data.pjName = prj;
		$.ajax({
		  type: 'GET',
		  data:data,
		  url: _ip+'/sonarPrjList'
		})
		.done(function(data){
			var ot = JSON.parse(data.data1);
			console.log(ot);
			$("#pipeView").append("<h5>"+prj+"</h5>")
			for(var i=0;i<ot.issues.length-80;i++){
				$("#pipeView").append("<li class='roles gapForDiv'>"+ot.issues[i].message+"<a href='#' class='showadvancedOpt"+i+" pull-right' style='font-size:12px;' onclick='showMore("+i+");'>More</a></li>");
				$("#pipeView").append("<div class='advancedOpt"+i+"' style='display:none;'><div class='roles gapForDiv'><div class='pull-left' style=''>"
										+"<span><b>component : </b>"+ot.issues[i].component+"</span></br><span><b>Debt : </b>"+ot.issues[i].debt+"</span></br>"
										+"<span><b>Creation Date : </b>"+ot.issues[i].creationDate+"</span></br><span><b>Message : </b>"+ot.issues[i].message+"</span></br>"
										+"<span><b>Project : </b>"+ot.issues[i].project+"</span></br><span><b>Rule : </b>"+ot.issues[i].rule+"</span></br>"
										+"<span><b>Severity : </b>"+ot.issues[i].severity+"</span></br><span><b>Stataus : </b>"+ot.issues[i].status+"</span></br>"
										+"<span><b>Updated Date : </b>"+ot.issues[i].updateDate+"</span>"
										+"</div></div>");
				 
				 
			}
		})
		.fail(function(err){
			console.log(err);
		})
	}
	
}
var pL = new pipelineList();
	pL.init();
////////////////////////////////////////////////////
