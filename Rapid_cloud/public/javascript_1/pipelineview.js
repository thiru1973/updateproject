//////////////////////////////////////////////////////
var _ip = "http://172.29.59.63:3000";
var editProfileUrl;
$(document).ready(function(){
	$(".cancelPoup, .close").click(function(){
		$("#instan").hide();
		$("#logDetail").hide();
	});
	$(".proDiv ,.popupData").hide();	
});
window.onload = function(){
	//getData();
}
function getData(){
	$.ajax({
		  type: 'GET',
		  url: _ip+'/demoJenkins'
		})
		.done(function(data){
			console.log(data[0].stages.length);
		})
		.fail(function(err){
			console.log(err);
		})
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
		var pipe = url.substring(idx+5).replace("#","");
		var delData = pipe.split(",");
		var data = {};
		data.pipelineName = delData[0];
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		 $.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/pipelineviewdata',
			success: function(data, textStatus){
				console.log(data)
				if(data.notFound == true){
					alert("No Jobs found");
				}else{	$('.pipeline').html(delData[0]);
						$('.pipeline').append("&nbsp&nbsp&nbsp&nbsp<a href='#' title="+data.jobs[0].name+","+delData[1]+" onclick='pL.buildPipeLine(this)' class='viewLink'>Trigger Build</a>");	
                    	editProfileUrl = data.url+"/configure";
						for(var i=0; i<data.jobs.length; i++){
							if(i != (data.jobs.length-1)){
								if(data.jobs[i].color == "red"){
									$("#pipeView").append("<span id='job' style='background:rgba(239, 41, 41, 0.73);'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Failed</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger' style='margin-left:auto;margin-right:auto' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
									+"</span>"									
									+"<span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "disabled"){
									$("#pipeView").append("<span id='job' style='background:#e6e6e6;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Disabled</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
									+"</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "notbuilt"){
									$("#pipeView").append("<span id='job' style='background:#00ccff;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Not built</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
									+"</span><span class='glyphicon glyphicon-arrow-right'></span>")
								}
								if(data.jobs[i].color == "blue"){
									var clickData = data.jobs[i].name;
									$("#pipeView").append("<span id='job' style='background:#1bd130; padding:10px; width:30%; display: inline-block;'><i><a href='#' title="+data.jobs[i].name+" onfocus='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Bulid Success</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger devops-btn' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
									
									+"</span>"
												
									+"<span class='glyphicon glyphicon-arrow-right'></span>")									
								}
								
								
								pL.showDetails(data.jobs[i].name,i);
							}else{
								if(data.jobs[i].color == "red"){
									$("#pipeView").append("<span id='job' style='background:rgba(239, 41, 41, 0.73);'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Failed</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
										+"</span>")
								}
								if(data.jobs[i].color == "disabled"){
									$("#pipeView").append("<span id='job' style='background:#e6e6e6;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Disabled</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
										+"</span>")
								}
								if(data.jobs[i].color == "notbuilt"){
									$("#pipeView").append("<span id='job' style='background:#00ccff;;'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Not built</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
										+"</span>")
								}
								if(data.jobs[i].color == "blue"){
									$("#pipeView").append("<span id='job' style='background:#1bd130; padding:10px; width:30%'><i><a href='#' title="+data.jobs[i].name+" onclick='pL.showDetails(this)' class='viewLink1'>"+data.jobs[i].name+"</a></i></br>Bulid Success</br>"
									+"<table style='width:100%' class='nodeSell'><thead id=''></thead><tbody id='instList"+i+"'></tbody></table>"
                                        +"<button class='btn btn-danger devops-btn' title="+data.jobs[i].name+" onclick='pL.showLogdetails(this)'>View Log</button>"
										+"</span>"									
									)
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
		//alert(ev.title);
		var buildData = (ev.title).split(",");
		var data = {};
		data.jobName = buildData[0];
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		
		$.ajax({
		  type: 'POST',
		  data: data,	 
		  url: _ip+'/buildPipe'
		})
		.done(function(data){
			//alert(data);
			console.log(data);
			var newUrl = data.url+'/view/'+buildData[1]+'/';
			$('.btn').hide();
			$('#pipeView').hide();
			$('#build').hide();
			$('#jenkins-inline').append(
				"<iframe width='1100' height='600px' target='_parent' src="+newUrl+"></iframe>" +
					"<button class='btn btn-danger' id='go-back'>Back</button>"
			)
			/*$(".popupData, .proDiv").show(); 
			$("#instanceName").html("<b>"+data.msg+" : "+data.queue+"</b></br><b>Please visit after sometime for Build information</b>");
			
			setTimeout(function(){
					$(".popupData, .proDiv").hide();
					location.herf = location.origin + '/manageEnv';
				},8000);*/
		})
		.fail(function(err){
			console.log(err);
		})
	},
	showLogdetails : function(ev){
		var data = {};
		data.jobName = ev.title;
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
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
		//alert(ev)
		var self = this;		
		var build = document.getElementById("build");
		var buildDetails = document.createElement('div');
		buildDetails.id = 'buildDetails '+ev;
		buildDetails.className  = 'build-info';
		build.appendChild(buildDetails);
		var data = {};
		data.jobName = ev;
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		 $.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/getBuild',
			success: function(data, textStatus){
				//console.log(data);
				if(data.notFound == true){
					alert("NO data found");
				}else{
					//buildDetails.innerHTML="";
					var date = new Date(data.timestamp);
					var ms = data.duration, min = (ms/1000/60) << 0, sec = (ms/1000) % 60;
					var ms1 = data.estimatedDuration, mins = (ms1/1000/60) << 0, secs = (ms1/1000) % 60;
					
					buildDetails.innerHTML+='  <!--<tr><th>Job Name</th>\
								<td>'+data.fullDisplayName+'</td></tr>-->\
								<tr><th><span class="build-label">Total Builds</span></th>\
								<td class="padleft"> '+ data.number + '<br/></td></tr>\
								<tr><th><span class="build-label">Lastbuild Result</span></th>\
								<td>'+data.result+' <br/></td></tr>\
								<tr><th><span class="build-label">StartDate</span></th>\
								<td><p>'+date+' </p><br/></td></tr>\
								<tr><th><span class="build-label">Build Duration</span></th>\
								<td>'+min+':'+sec+' sec <br/></td></tr>\
								<tr><th><span class="build-label">Estimated Duration</span></th>\
								<td>'+mins+':'+secs+' sec <br/></td></tr>\
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

$(document).on("click", "#design_0", function(){
    location.href = location.origin + '/manageEnv';
});

$(document).on("click", "#edit-pipeline", function(){
	var newUrl = editProfileUrl;
	$('.btn').hide();
    $('#pipeView').hide();
	$('#build').hide();
    $('#jenkins-inline').append(
		"<iframe width='1100' height='600px' target='_parent' src="+newUrl+"></iframe>" +
			"<button class='btn btn-danger' id='go-back'>Back</button>"
	)
});

$(document).on("click", "#yui-gen2-button", function(){
    $('#pipeView').show();
    $('.btn').show();
});

$(document).on("click", "#go-back", function(){
    //location.href = location.origin + '/pipelinelist';
	window.location.reload();
});
////////////////////////////////////////////////////
