//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	$(".cancelPoup, .close").click(function(){
		$("#instan").hide();
	});
});

var volumeType = ["Provisioned IOPS SSD", "General Purpose SSD", "Magnetic"];
function DropdownConst(createEle,addId,addClass,appendTo,labName,createCon,imageArray,dataSt){
	this.createEle=createEle;
	this.addId=addId;
	this.appendTo=appendTo;
	this.labName=labName;
	this.imageArray=imageArray;
	this.dataSt=dataSt;
	this.createCon = function(){
		var apch = document.getElementById(appendTo);
		var creAl = document.createElement(createEle);
		creAl.innerHTML="<span>"+labName+"</span>";
		creAl.id=addId;
		creAl.className=addClass;
		apch.appendChild(creAl);
	}
};
DropdownConst.prototype.appendData = function(name,appentoWhat){
	//console.log(name);
	var epn = document.getElementById(appentoWhat);
	epn.innerHTML="";
	for(var i=0;i<=name.length-1;i++){
		var epn;
		epn.innerHTML+="<li onclick='selectOpt(this,"+i+")' class='"+name[i]+"'>"
						+"<dl>"
						+"<dt></dt>"
						+"<dd class='va'>"+name[i]+"</dd>"
						+"</dl>"
						+"</li>"
	}
	epn.write = epn;
	//console.log(epn);
}



function Con_ManageVolumes(){
	this.addLoadBa = document.getElementById("mvTable");
	this.attachInstancesArray = {};
	this.attachInstancesArray.InstanceName = "";
}
Con_ManageVolumes.prototype = {
	init:function(){
		this.getEnvironment();
		var self = this;
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
		$(".countConfigBox").hide();
		// http://172.29.59.65:3000/volumeDetails
		$.getJSON( _ip + '/volumeDetails1', function (data){
			console.log(data);
			if(data.length == 0){
				for(var i=0; i<data.length; i++){
					var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
					insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<td>'+data[i].volume_id+'</td>\
								<td>'+data[i].volume_name+'</td>\
								<td>'+data[i].volume_size+'</td>\
								<td>'+data[i].volume_type+'</td>\
								<td>'+data[i].iops+'</td>\
								<td>'+data[i].status+' Attached</td>\
								<td>'+data[i].availability_zone+'</td>\
								<td>'+data[i].region+'</td>\
								<td><a href="#" title="'+data[i].volume_name+','+data[i].region+'" onclick="mV.attachVolume(this)" class="viewLink">Attach</a>&nbsp;&nbsp;\
								\
								<a href="#" title="'+data[i].volume_name+','+data[i].region+'"  onclick="mV.deleteVolume(this)" class="viewLink">Delete</a></td>\
								';
				}
			}else{
				var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
					insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<h3 align = "center"><p>No colume to attach</p></h3>\
					';
			}
		});
	},
	getAvailableZone : function(){
	//alert(pname);
	var region = sessionStorage.getItem("chooseRegion");
	var pname = sessionStorage.getItem("chooseUrCloud");
	var p_name=pname;	
	var data = {};
    data.pname = p_name;
	   $.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/temp_region',
	     success: function(results) {
	    	//console.log(results);
	    	 var zones;
	    	 for(var i=0;i<results.length;i++)
	    		 {
	    		 	if(results[i].region_name == region)
	    		 		{
	    		 			zones = results[i].availability_zones;
	    		 		}
	    		 }
	    	 var appendD = new DropdownConst();
			 appendD.appendData(zones,"aZones");
	    	
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });		
	},
	getEnvironment: function(){
		var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		this.attachInstancesArray.AccountName = accountName;
		this.attachInstancesArray.ProjectName = projName;
		this.attachInstancesArray.ProductName = prodName;
		var data = {};
			data.id = prodName;
			$.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip +'/filter_env2',
				success: function(data, textStatus){
					envData = data;
					console.log(data);
					for(var i =0; i < data.length; i++){
						var tT = document.getElementById("endpointFs2_Drop");
						tT.innerHTML+='<li onclick="getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].env_name+'</dd></dl></li>';
					}
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	},
	deleteVolume:function(ev){
		console.log("Delete Volume:::"+ev.title);
		var volData = (ev.title).split(",");
		console.log(volData);
		var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
		var data = {};
		data.accName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.volName = volData[0];
		data.region = volData[1];
		$.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip +'/deleteVol',
				success: function(data, textStatus){
					console.log(data);
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	
	},
	attachVolume:function(ev){
		console.log("Attach Volume:::"+ev.title);
		var volData = (ev.title).split(",");
		var inList = document.getElementById("instList");
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
		this.attachInstancesArray.VolumeID = volData[0];
		this.attachInstancesArray.Region = volData[1];
		var env = document.getElementById("endpointFs2").innerText;
		if(env == "Select"){
			document.getElementById("endpointFs2").style.border="thin dashed #0099FF";
				return;
		}
		this.attachInstancesArray.EnvironmentName = env;
		var proj_name = localStorage.getItem("ProjectName");
		var data = {};
			data.env_name = env
			data.proj_id = proj_name ;
			 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip+'/node_detailsManage',
				success: function(data, textStatus){
					console.log(data);
					inList.innerHTML="";
					for(var i=0; i<data.length; i++){
						inList.innerHTML+='<tr><td>'+data[i].inst_type+'</td>\
									<td><input type="radio" onchange="mV.intName(this)" name="'+data[i].inst_type+'" id="'+data[i].inst_id+'" /></td></tr>\
									';
					}
					$("#instan").show();
			 },
			 error: function (xhr, status, error){
				   console.log('Failure');
				},
			});
	},
	intName: function(ev){
		this.attachInstancesArray.InstanceName = ev.id;
	},
	selectDone: function(){
		if(this.attachInstancesArray.InstanceName == ""){
			alert("Please select to add");
			return;
		}else{
			//console.log(this.attachInstancesArray);
			var data = {};
			data.accName = this.attachInstancesArray.AccountName;
			data.projName = this.attachInstancesArray.ProjectName;
			data.prodName = this.attachInstancesArray.ProductName;
			data.instId = this.attachInstancesArray.InstanceName;
			data.volumeId = this.attachInstancesArray.VolumeID;
			data.region = this.attachInstancesArray.Region;
			/*$.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/attachVol',
			success: function(data, textStatus){
				//console.log(data);
				alert("Volume attached to instance successfully");
				$("#instan").hide();
				},
				 error: function (xhr, status, error){
					 console.log('Failure');
					alert("failure");
					},
				});*/
			//$("#instan").hide();
		}
		//this.attachInstancesArray.InstanceName == "" ? alert("Please select to add...") : $("#instan").hide();
		//console.log(this.attachInstancesArray);
	},
	createVolume:function(ev){
		$(".enviTable").hide();
		$(".countConfigBox").show();
		var appendD = new DropdownConst();
		appendD.appendData(volumeType,"sels0");
	},
	cancelV: function(){
		$(".enviTable").show();
		$(".countConfigBox").hide();
	},
	createVolumeFun: function(){
		var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
		var zone = document.getElementById("aZone").innerText;
		var pvd_region = sessionStorage.getItem("chooseRegion");
		var pvd_name = sessionStorage.getItem("chooseUrCloud");
		for(var i=0;i<n;i++)
		{
			//alert(i);
			var vType = document.getElementById("sel"+i+"").innerText;
			var vSize = document.getElementById("stgsz"+i+"").value;
			var vIops = document.getElementById("stgIops"+i+"").value;
			var vName = document.getElementById("stgName"+i+"").value
			
			if(vType == "Select")
				{
				document.getElementById("selstg"+i+"").style.border="thin dashed #0099FF";
				return;
				}else if(vSize == null || vSize == "" || vSize > 16384)
					{
						$('#stgsz'+i+'').attr("placeholder", "1-16384 GiB").val("").focus().blur();
						return;
					}else if(vType =="Magnetic" && (vSize == null || vSize == "" || vSize > 1024))
						{
							$('#stgsz'+i+'').attr("placeholder", "1-1024 GiB").val("").focus().blur();
							return;
						}else if(vName == "" || vName == null)
						{
							$('#stgName'+i+'').focus();
							return;
						}
			var data = {};
			data.accountName = accountName;
			data.projName = projName;
			data.prodName = prodName;
			data.provider = pvd_name;
			data.region = pvd_region;
			data.vType = vType;
			data.vSize = vSize;
			data.vIops = vIops;
			data.vName = vName;
			data.vZone = zone;
		
		console.log(data);
		$.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/createStorage',
			success: function(data, textStatus){
				alert("Volume created...!!!!")
				//$(".alert-stg").stop().slideDown();
				//document.getElementById("storage"+Id+"").disabled=true;
				//inc = 1;
				},
				 error: function (xhr, status, error){
					 console.log('Failure');
					alert("failure");
					},
				});
		}
	}
}
var mV = new Con_ManageVolumes();
	mV.init();
	mV.getAvailableZone();
/////////////////////////////////////////////////////	
var n = 1;
function createVol(num){
	var dd = document.getElementById("volumes1");
		dd.innerHTML+="<div style='clear:both;'>&nbsp;</div><div id = 'attach"+n+"'><div class='roleID '><div class='pull-left'><div id='sel"+n+"' class='clickRole borderNoN'><span>Select</span><ul id='sels"+n+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					+"<div class='operatingSys'><div class='pull-left'><div class='clickRole addStoTabWid'><input type='number' onchange='iopsFunction(this.value, this.id)' id='stgsz"+n+"' min='1' style='border:none;width:100%;'/></div></div></div>"
					+"<div class='operatingSys'><div class='pull-left'><div class='clickRole addStoTabWid'><input type='Text' id='stgIops"+n+"' placeholder='' style='border:none;width:100%;'></div></div></div>"
					+"<div class='operatingSys'><div class='pull-left'><div class='clickRole addStoTabWid'><input id='stgName"+n+"' type='text' style='border:none;width:100%;'></div></div></div>"
					+"<span class='glyphicon glyphicon-minus-sign' onclick='removeRow(this,"+n+");' id='addRole' style='color:#999999;'></span>"
					+"</div>"
	
	var appendD = new DropdownConst();				
	appendD.appendData(volumeType,"sels"+n+"");	
	n++;
	
}
function removeRow(ev, n){
	var pn = ev.parentNode;
	var id = pn.id;
	alert(n);
	$("#"+id).remove();
	n--;
}
function iopsFunction(value,Id){
	var idNum = Id.substr(Id.length-1);
	var vType = document.getElementById("sel"+idNum+"").innerText;
	if(vType == "General Purpose SSD")
		{	
			if(value >= 1 && value <= 3333)
				{
					var iops=value*3;
					document.getElementById("stgIops"+idNum+"").value=iops;
				}else{
					document.getElementById("stgIops"+idNum+"").value="10000";
				}
		}else if(vType == "Magnetic")
			{
				document.getElementById("stgIops"+idNum+"").value="NA";
			}
}