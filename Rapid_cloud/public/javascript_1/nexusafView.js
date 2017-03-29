//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	$(".cancelPoup, .close").click(function(){
		$("#instan").hide();
		$("#logDetail").hide();
	});
	
});
function pipelineList(){
	this.addLoadBa = document.getElementById("mvTable");
	
}
pipelineList.prototype = {
	init:function(){
		var self = this;
		var data = {};
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		$.ajax({
		  type: 'POST',
		  data:data,
		  url: _ip+'/nexusaf'
		})
		.done(function(data){
			//console.log(data.project);
			$("#pipeView").append("<span id='job'><h5 class='artifact-status'><i >"+data.project.artifactId[0]+"</i></h5> <span class='top-line'><a href='#' class='btn btn-danger artifact_btn' title="+data.project.artifactId[0]+" onclick='pL.showStaus(this)'>Status</a></span></span>");
		})
		.fail(function(err){
			console.log(err);
		})
	},
	showStaus :function(dt){
		var data = {};
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		data.artifact = dt.title;
		$.ajax({
		  type: 'POST',
		  data:data,
		  url: _ip+'/nexusstatus'
		})
		.done(function(data){
			var resData = data.content.data["0"]["content-item"];
			$("#status").empty();
			$("#status").append("<h5 class='artifact-info'><i><span class='Artifact-lable'>Artifact Info</spanb></i> <i><span class='Artifact-lable'>Browse Storage</spanb></i> <i><span class='Artifact-lable'>Security Issues</spanb></i></h5>");
			if(resData.length == undefined){
				$("#status").append("<span><i>"+data+"</i></span></br>");
			}
						
			var key = Object.keys(resData[0]);			
			for(var len=0;len<resData.length;len++){				
				$("#status").append("<span><label class='data-label'>"+key[2]+"  </label> </span> <span class='data-list'><i>: "+ resData[len].text[0]+"</i></span></br>");
				$("#status").append("<span><label class='data-label'>"+key[4]+"  </label> </span> <span class='data-list'><i> : "+resData[len].lastModified[0]+"</i></span></br>");
				$("#status").append("<span><label class='data-label'>"+key[5]+"  </label> </span> <span class='data-list'><i>: "+resData[len].sizeOnDisk[0]+" bytes</i></span></br>");
				$("#status").append("<span><label class='data-label'>"+key[1]+"  </label> </span> <span class='data-list'><i> : "+resData[len].relativePath[0]+"</i></span></br>");
				$("#status").append("<hr></hr>")
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
