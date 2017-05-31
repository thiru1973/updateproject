var _ip = "http://172.29.59.63:3000";

$(document).ready(function(){	
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var theDiv = document.getElementById("data");
	theDiv.innerHTML += accountName+">>"+projName+">>"+prodName;
	var data = {};
	data.account = accountName;
	data.project = projName;
		$.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: data,	 
			     url: 'http://172.29.59.63:3000/getSubProviders',
			     success: function(results) {	
						console.log(results[0].provider);
			    	 },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
			   });
});
				
function Projects(){
			
	}
	
Projects.prototype.importVmDetails = function(){
	var projName = localStorage.getItem("ProjectName")
	,provider = sessionStorage.getItem("Provider");
	var data = {};
	data.provider = provider;
	data.project = projName;
		$.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: data,	 
			     url: 'http://172.29.59.63:3000/getvms',
			     success: function(data) {	
						for(var d=0; d<data.length; d++){				   			   
							var createTr = document.createElement("tr");
							createTr.id = d;
							manageTable.appendChild(createTr);
							var manageTr = document.getElementById(d);
							manageTr.innerHTML+='<td>'+data[d].prov_id+'</td>'
										+'<td>'+data[d].cloud_name+'</td>'
										+'<td>'+data[d].region+'</td>'
										+'<td>'+data[d].inst_type+'</td>'
										+'<td>'+data[d].status+'</td>'
										+'<td>'+data[d].type+'</td>'
					   }
			    	 },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
			   });
}
Projects.prototype.syncVms = function(){
	var projName = localStorage.getItem("ProjectName")
	,provider = sessionStorage.getItem("Provider");
	var data = {};
	data.provider = provider;
	data.project = projName;
	 $.ajax({
		type: 'POST',
		jsonpCallback: "callback",
		datatype: 'jsonp',
		data: data,
		url: _ip +'/syncVmData',
		success: function(data, textStatus){
			//consle.log(data);
			if(data == "Success"){
				alert("VM's are updated to databse");
				location.href=_ip+"/manageEnv"
			}
		},
		error: function (xhr, status, error){
		   console.log('Failure');
		},
	  });
}
var manage = new Projects();
manage.importVmDetails();