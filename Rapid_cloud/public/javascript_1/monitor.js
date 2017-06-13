var _ip = "http://172.29.59.65:3000"

$(document).on("click", "#go-back", function(){
	window.location.reload();

});

$(document).ready(function(){
	$(".clickRole").click(function(e){		
		e.stopPropagation();
		if ($(this).find(".dropDown").css('display') == 'block'){
			$(this).find(".dropDown").slideUp();
		}else{
			$(".dropDown").slideUp();
			$(this).find(".dropDown").slideDown();
		}
	});

     

	
});

   

function selectOpt(event, idn, con){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	if(idd =="monitorEnv"){
		mn.monitorNodes(idd,aTex);
	}
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
	
}
window.onload=function(){
     var newUrl = 'http://zabbixservercld.cloudapp.net/zabbix/charts.php?ddreset=1';
	//$('.btn').hide();
    $('#pipeView').hide();
	$('#build').hide();
	$('#jenkins-inline').empty();;
    $('#jenkins-inline').append(
		"<div class='zabixMonitor'><object type='text/html' width='1045px' height='600px' target='_parent' data="+newUrl+"></object>" +
			"<button class='btn btn-danger' id='go-back'>Back</button></div>"
			//"<object type='text/html' data='http://validator.w3.org/' width='800px' height='600px' style='overflow:auto;border:5px ridge blue'></object>"
	);
       
};

$(document).on("l", ".deployInfrMonitoring", function(){
	var newUrl = 'http://zabbixservercld.cloudapp.net/zabbix/charts.php?ddreset=1';
	//$('.btn').hide();
    $('#pipeView').hide();
	$('#build').hide();
	$('#jenkins-inline').empty();;
    $('#jenkins-inline').append(
		"<object type='text/html' width='1045px' height='600px' target='_parent' data="+newUrl+"></object>" +
			"<button class='btn btn-danger' id='go-back'>Back</button>"
			//"<object type='text/html' data='http://validator.w3.org/' width='800px' height='600px' style='overflow:auto;border:5px ridge blue'></object>"
	)
});
$(document).on("click", "#edit-app", function(){
		$.ajax({
		  type: 'GET',
		  url: _ip+'/openzabbix'
		})
		.done(function(data){
			console.log(data);
			$('.btn').hide();
			$('#pipeView').hide();
			$('#build').hide();
			$('#jenkins-inline').empty();;
			$('#jenkins-inline').append(
/* 				"<iframe width='1100' height='600px' target='_parent' src="+data+"></iframe>" +
					"<button class='btn btn-danger' id='go-back'>Back</button>"
 */	
				    "<object type='text/html' data='http://validator.w3.org/' width='800px' height='600px' style='overflow:auto;border:5px ridge blue'></object>"

			)
		})
		.fail(function(err){
			console.log(err)
		})
	
	
	/* var newUrl = 'http://admin:zabbix@zabbixservercld.cloudapp.net/zabbix/charts.php?ddreset=1';
	$('.btn').hide();
    $('#pipeView').hide();
	$('#build').hide();
	$('#jenkins-inline').empty();;
    $('#jenkins-inline').append(
		"<iframe width='1100' height='600px' target='_blank' src="+newUrl+"></iframe>" +
			"<button class='btn btn-danger' id='go-back'>Back</button>"
	) */
});

function monitor(){
	
}
monitor.prototype = {
	init:function(){
		var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		var data = {};
			data.id = prodName;
			$.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip +'/filter_env2',
				success: function(data, textStatus){
					for(var i =0; i < data.length; i++){
						var tT = document.getElementById("monitorEnv_Drop");
						$('#monitorEnv_Drop').append('<li onclick="selectOpt(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].env_name+'</dd></dl></li>');
					} 
			  }
	});
	},
	monitorNodes : function(env,eName){
		var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		var mndata = {};
		mndata.accName = accountName;
		mndata.projName = projName;
		mndata.prodName = prodName;
		mndata.envName = eName;
		$.ajax({
		  type: 'POST',
		  data: mndata,
		  url: _ip+'/nodeData'
		})
		.done(function(data){
			for(var i=0;i<data.length;i++){
				$('#toBeDone').empty();
				var newCheckbox = document.createElement("input");							
				newCheckbox.type = "checkbox";
				newCheckbox.value = data[i].deploy_id
				newCheckbox.name = "instances";
				document.getElementById("toBeDone").appendChild(newCheckbox);

				var label = document.createElement('label');
				label.appendChild(document.createTextNode(data[i].inst_id));

				document.getElementById("toBeDone").appendChild(label);
				document.getElementById("toBeDone").appendChild(document.createElement("br"));
			}
		})
		.fail(function(err){
			console.log(err)
		})
	}
}
var mn = new monitor();
	mn.init();
	
	
$('#host-infra').click(function(){	
	var instances = [];
	$.each($("input[name='instances']:checked"), function(){            
		instances.push($(this).val());
	});
	console.log(instances);
	var data = {};
	data.inst = instances; 
	$.ajax({
		  type: 'POST',
		  data: "d1="+instances,
		  url: _ip+'/zabbixHost'
		})
		.done(function(data){
			console.log(data);
		})
		.fail(function(err){
			console.log(err)
		})
	
})	