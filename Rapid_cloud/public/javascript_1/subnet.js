var _ip = "http://172.29.59.65:3000";
window.onload = function(){
	getVnet();
	displayZones();
	getVpcName();
	document.getElementById("RM_name1").value = sessionStorage.getItem("resourceGroup");
}
/*
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
	var epn = document.getElementById(appentoWhat);
	//console.log(epn);
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
}*/
function getVpcName(){
	$(function(){
		  $.getJSON(_ip+'/vpc_deploy', function(data){
			 //console.log(data);
			  var vpc_Name = [];
			 for(var x=0;x<data.length;x++)
				 {
				 	vpc_Name[x] = /*data[x].vpc_name+"/"+*/data[x].vpc_id;
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(vpc_Name,"vpc2_Drop");			   
		  });
	});
	
}

function getVnet(){
	$(function(){
		$.getJSON(_ip+'/getVnet', function(data){
			//console.log(data);
			var vNetwork = [];
			for(vNet=0;vNet<data.length;vNet++)
			{
				vNetwork[vNet] = data[vNet].vnetname;
			}
			var appendD = new DropdownConst();
			appendD.appendData(vNetwork,"endpointFs2_Drop");
		});
	});
}

function displayZones(){
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
			 appendD.appendData(zones,"vpc9_Drop");
	    	
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });
}
function createSubnet()
{
	alert("In Create subnet page");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	if(pvd_name == "Azure")
	{
		createAzureSnet(pvd_name);
	}
	var snName = document.getElementById("nameTag1").value;
	var cidrBlkSn = document.getElementById("cidrBlkSn3").value;
	var snVpc = document.getElementById("selVpcSn").innerText;
	var snZone = document.getElementById("selZn9").innerText;
	if(snName == "" || snName == null)
	{
		document.getElementById("nameTag1").style.border="thin dashed #0099FF";
		return;
	}else if(cidrBlkSn == "" || cidrBlkSn == null)
		{
		document.getElementById("cidrBlkSn3").style.border="thin dashed #0099FF";
		return;
		}else if(snVpc == "Select")
			{
			document.getElementById("selVpcSn").style.border="thin dashed #0099FF";
			return;
			}else if(snZone == "Select")
				{
				document.getElementById("selZn9").style.border="thin dashed #0099FF";
				return;
				}
	
	var data={};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.cidrBlkSn = cidrBlkSn;
	data.snVpc = snVpc;
	data.snName = snName;
	data.snZone = snZone;
	console.log(data)
	
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/subnet',
        success: function(data, textStatus){
        	alert("Success");			
			document.getElementById("cTA_CreateAndDeploy").disabled=true;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}
function createAzureSnet(pvd){
	alert(pvd);
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var resGp = document.getElementById("RM_name1").value;
	var vnetname = document.getElementById("endpointFs2").innerText;
	var cidrBlkSn = document.getElementById("cidrBlkSn1").value;
	var confName = document.getElementById("RM_name2").value;
	var data={};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.resGp = resGp;
	data.vnetname = vnetname;
	data.confName = confName;
	data.cidrBlkSn = cidrBlkSn;
	console.log(data)
		$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createSubnet',
        success: function(data, textStatus){
        	alert("Success");
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}
