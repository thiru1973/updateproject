//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	$(".cancelPoup, .close").click(function(){
		$("#instan").hide();
		$("#logDetail").hide();
	});
	
});
var dwData;
function pipelineList(){
	this.addLoadBa = document.getElementById("mvTable");
	
}
pipelineList.prototype = {
	init:function(){
		var self = this;
		var url = document.location.href
		var idx = url.lastIndexOf("data=");
		var pipe = url.substring(idx+5).replace("#","");
		var data = {};
		data.pipelineName = pipe;
		 $.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/pipelineviewdata',
			success: function(data, textStatus){
				 console.log(data);
				if(data.notFound == true){
					alert("No Jobs found");
				}else{			
						$("#pipeView").append("<h5>"+pipe+"<i>&nbsp&nbsp&nbsp<a href="+data.url+"/configure title="+data.url+" target='_blank' class='viewLink'>Edit</a>&nbsp&nbsp&nbsp<a href='#' title="+data.jobs[0].name+" onclick='pL.buildPipeLine(this)' class='viewLink'>Build PipeLine</a></i></h5>")
						for(var i=0; i<data.jobs.length; i++){
							if(i != (data.jobs.length-1)){
								if(data.jobs[i].color == "red"){
									$("#pipeView").append("<span id='job' style='background:rgba(239, 41, 41, 0.73);'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Failed</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span>"
									+"<span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "disabled"){
									$("#pipeView").append("<span id='job' style='background:#e6e6e6;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Disabled</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "notbuilt"){
									$("#pipeView").append("<span id='job' style='background:#00ccff;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Not built</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "blue"){
									$("#pipeView").append("<span id='job' style='background:#1bd130;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Bulid Success</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								pL.showDetails(data.jobs[i].name,i);
							}else{
								if(data.jobs[i].color == "red"){
									$("#pipeView").append("<span id='job' style='background:rgba(239, 41, 41, 0.73);'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Failed</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span>")
								}
								if(data.jobs[i].color == "disabled"){
									$("#pipeView").append("<span id='job' style='background:#e6e6e6;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Disabled</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span>")
								}
								if(data.jobs[i].color == "notbuilt"){
									$("#pipeView").append("<span id='job' style='background:#00ccff;;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Not built</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span>")
								}
								if(data.jobs[i].color == "blue"){
									$("#pipeView").append("<span id='job' style='background:#1bd130;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Bulid Success</br><a href='#' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>console log</a>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
									+"</span>")
								}
								pL.showDetails(data.jobs[i].name,i);
							}
							
						}						
					}
				 },
				 error: function (xhr, status, error){
					   console.log('Failure');
					},
				});
	},
	openWindow : function(ev){
		var reWindow = window.open(ev.title+"configure", "Jenkins page", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=nowidth=1000px,height=700px");
	},
	buildPipeLine : function(ev){
		alert(ev.title);
		var data = {};
		data.jobName = ev.title;
		$.ajax({
		  type: 'POST',
		  data: data,	 
		  url: _ip+'/buildPipe'
		})
		.done(function(data){
			alert(data);
		})
		.fail(function(err){
			alert(err);
		})
	},
	showLogdetails : function(ev){
		var data = {};
		data.jobName = ev.title;
		$.ajax({
		  type: 'POST',
		  data: data,	 
		  url: _ip+'/getBuildLog'
		})
		.done(function(data){
			dwData = data;
			$("#logDet").html("<span>"+data+"</span>");
			$("#logDetail").show();
		})
		.fail(function(err){
			alert(err);
		})
		
	},
	download : function(name,type){
		  var a = document.getElementById("a");
		  var file = new Blob([dwData], {type: type});
		  a.href = URL.createObjectURL(file);
		  console.log(a.href);
		  a.download = "Status.txt";

	},
	showDetails : function(ev,id){
		console.log(ev+id);
		var self = this;
		var inList = document.getElementById("instList"+id+"");
		var data = {};
		data.jobName = ev;
		 $.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/getBuild',
			success: function(data, textStatus){
				console.log(data);
				if(data.notFound == true){
					alert("NO data found");
				}else{
					inList.innerHTML="";
					var date = new Date(data.timestamp);
					var ms = data.duration, min = (ms/1000/60) << 0, sec = (ms/1000) % 60;
					var ms1 = data.estimatedDuration, mins = (ms1/1000/60) << 0, secs = (ms1/1000) % 60;
					
					inList.innerHTML+='<tr><th>Job Name</th>\
								<td>'+data.fullDisplayName+'</td></tr>\
								<tr><th>Total Builds</th>\
								<td>'+data.number+'</td></tr>\
								<tr><th>Lastbuild Result</th>\
								<td>'+data.result+'</td></tr>\
								<tr><th>StartDate</th>\
								<td>'+date+'</td></tr>\
								<tr><th>Build Duration</th>\
								<td>'+min+':'+sec+' sec</td></tr>\
								<tr><th>Estimated Duration</th>\
								<td>'+mins+':'+secs+' sec</td></tr>\
								<!--<tr><th>Url</th>\
								<td>'+data.url+'</td></tr>-->\
								';					
					//$("#instan").show();
				}
				 },
				 error: function (xhr, status, error){
					   console.log('Failure');
					},
				});
	}
	
}
var pL = new pipelineList();
	pL.init();
////////////////////////////////////////////////////
