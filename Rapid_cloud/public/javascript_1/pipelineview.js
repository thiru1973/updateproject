//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	$(".cancelPoup, .close").click(function(){
		$("#instan").hide();
	});
	
});




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
					console.log("No Jobs found");
				}else{			
						$("#pipeView").append("<h5>"+pipe+"<i>&nbsp&nbsp&nbsp<a href='#' title="+data.url+" onclick='pL.openWindow(this)' class='viewLink'>Edit</a></i></h5>")
						for(var i=0; i<data.jobs.length; i++){
							if(i != (data.jobs.length-1)){
								if(data.jobs[i].color == "red"){
									$("#pipeView").append("<span id='job' style='background:rgba(239, 41, 41, 0.73);'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Failed</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "disabled"){
									$("#pipeView").append("<span id='job' style='background:#e6e6e6;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Disabled</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "notbuilt"){
									$("#pipeView").append("<span id='job' style='background:#00ccff;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Not built</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "blue"){
									$("#pipeView").append("<span id='job' style='background:#1bd130;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Bulid Success</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
							}else{
								if(data.jobs[i].color == "red"){
									$("#pipeView").append("<span id='job' style='background:#ef2929;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Failed</span>")
								}
								if(data.jobs[i].color == "disabled"){
									$("#pipeView").append("<span id='job' style='background:#e6e6e6;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Disabled</span>")
								}
								if(data.jobs[i].color == "notbuilt"){
									$("#pipeView").append("<span id='job' style='background:#00ccff;;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Not built</span>")
								}
								if(data.jobs[i].color == "blue"){
									$("#pipeView").append("<span id='job' style='background:#1bd130;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Bulid Success</span>")
								}
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
		window.open(ev.title, "Jenkins page", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=nowidth=1000px,height=700px");
	},
	showDetails : function(ev){
		//console.log(ev.title);
		var self = this;
		var inList = document.getElementById("instList");
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
		var data = {};
		data.jobName = ev.title;
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
								<tr><th>Url</th>\
								<td>'+data.url+'</td></tr>\
								';					
					$("#instan").show();
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
