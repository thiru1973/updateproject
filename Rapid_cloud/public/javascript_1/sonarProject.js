//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){

});

function closeMore(val){
	$(".advancedOpt"+val+"").hide();
}

function sonarProject(){
	this.addLoadBa = document.getElementById("mvTable");
}
sonarProject.prototype = {
	init:function(){
		var self = this;
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
			var data = {};
			data.mtName = "projectList";
			data.accountName = localStorage.getItem("Account");
			data.projectName = localStorage.getItem("ProjectName");
			data.productName = localStorage.getItem("ProductName");
			$.ajax({
			  type: 'GET',
			  data:data,
			  url: _ip+'/sonarPrjList'
			})
			.done(function(data){
				if(data.length > 0){				
				for(var i=0; i<data.length; i++){
					$("#pipeView").append("<li class='roles gapForDiv'>"+data[i].sonar_project+""
						+"&nbsp&nbsp<a href='#' class='showadvancedOpt"+i+" pull-right' style='font-size:12px;' title='"+data[i].sonar_project+"' onclick='pL.showMore(this, "+i+");'>More</a>"
						+"</li>");
				}
			}else{
				var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
					insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<h3 align = "center"><p>No Project</p></h3>\
					';
			}
			})
			.fail(function(err){
				alert(err);
			})
	},
	projectView: function(ev){
		location.href=_ip+"/sonarView"+"?data="+ev.title;
	},
	showMore: function(id,i){	
		//window.open("http://172.29.59.33:9000/overview?id=sonarproject", "Jenkins page", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=nowidth=1000px,height=700px");
		var data = {};
		data.mtName = "projIssues";
		data.pjName = id.title;
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		$.ajax({
		  type: 'GET',
		  data:data,
		  url: _ip+'/sonarPrjList'
		})
		.done(function(data){
			var ot = JSON.parse(data.data1),
			   ot1 = JSON.parse(data.data2);
			  complexData = JSON.parse(ot1[0].msr[6].data);
			$(".advancedOpt"+i+"").empty();
			$("#pipeView").append("<div class='advancedOpt"+i+"' style='display:none;'><div class='roles gapForDiv'><div class='pull-left' style=''>"
										+"<button type='button' class='close' data-dismiss='modal' aria-label='Close' id='more' onclick='closeMore("+i+");'><span style='margin-left:100%;' aria-hidden='true'>x</span></button>"
										+"<span><b>"+ot.facets[0].property+"</b><a href='#' class='pull-right' onclick='pL.openWindow(this)' title='"+id.title+"'>edit</a></span></br>"
										+"<div></div>"
										+"<span class='label label-danger glyphicon glyphicon-exclamation-sign'>"+ot.facets[0].values[4].val+" :</span><span> "+ot.facets[0].values[4].count+"</span></br>"
										+"<span class='label label-danger glyphicon glyphicon-arrow-up'>"+ot.facets[0].values[3].val+" :</span><span> "+ot.facets[0].values[3].count+"</span></br>"
										+"<span class='label label-danger glyphicon glyphicon-chevron-up'>"+ot.facets[0].values[0].val+" :</span><span> "+ot.facets[0].values[0].count+"</span></br>"
										+"<span class='label label-success glyphicon glyphicon-chevron-down'>"+ot.facets[0].values[1].val+" :</span><span> "+ot.facets[0].values[1].count+"</span></br>"
										+"<span class='label label-success glyphicon glyphicon-arrow-down'>"+ot.facets[0].values[2].val+" :</span><span> "+ot.facets[0].values[2].count+"</span></br>"
										+"<div style='clear:both;line-height:10px;'>&nbsp;</div>"
										+"<div class='info'><span>Sqale Rating : "+ot1[0].msr[4].frmt_val+"</br>Technical Debt Ratio : "+ot1[0].msr[5].frmt_val+"</span></div></br>"
										+"<div class='info'><span>Line of Code : "+ot1[0].msr[0].frmt_val+"</span></div></br>"
										+"<div class='info'><span>Debt : "+ot1[0].msr[3].frmt_val+"</span></div></br>"
										+"<div class='info'><span>Comment Lines : "+complexData.conditions[0].actual+"</span></div></br>"
										+"<div class='info'><span>"+ot1[0].msr[6].key+" : "+complexData.level+"</span></div></br>"
										+"<div class='info'><span>"+ot1[0].msr[1].key+" : "+ot1[0].msr[1].frmt_val+"</br>"										
										+"<li>"+complexData.conditions[1].metric+" : "+complexData.conditions[1].actual+"</li></br>"
										+"<li>"+complexData.conditions[2].metric+" : "+complexData.conditions[2].actual+"</li></span></div>"
										+"<div class='info'><a href='#' class='pull-right' onclick='pL.projectView(this)' title='"+id.title+"'>View"
										+"</div></div>");
										
			$(".advancedOpt"+0+"").show();
		})
		.fail(function(err){
			console.log(err);
		})
	},
	openWindow: function(ev){
		console.log(ev.title);
		window.open("http://172.29.59.33:9000/overview?id="+ev.title, "Jenkins page", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=nowidth=1000px,height=700px");
	}
}
var pL = new sonarProject();
	pL.init();
/////////////////////////////////////////////////////	
