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
			$("#pipeView").append("<span id='job'><i>"+data.project.artifactId[0]+"</i></br><a href='#' title="+data.project.artifactId[0]+" onclick='pL.showStaus(this)'>Status</a></span>");
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
			$("#status").append("<span><i><b>Artifact Info</i></b></span></br>");
			if(resData.length == undefined){
				$("#status").append("<span><i>"+data+"</i></span></br>");
			}
						
			var key = Object.keys(resData[0]);			
			for(var len=0;len<resData.length;len++){				
				$("#status").append("<span><i>"+key[2]+" : "+resData[len].text[0]+"</i></span></br>");
				$("#status").append("<span><i>"+key[4]+" : "+resData[len].lastModified[0]+"</i></span></br>");
				$("#status").append("<span><i>"+key[5]+" : "+resData[len].sizeOnDisk[0]+" bytes</i></span></br>");
				$("#status").append("<span><i>"+key[1]+" : "+resData[len].relativePath[0]+"</i></span></br>");
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
