var _ip = "http://172.29.59.65:3000";
window.onload = function(){
	getVpcName();
	//getSubnet();
	getVnet();
	getSubnetName();
}
function getVnet(){
	$(function(){
		$.getJSON(_ip+'/getVnet', function(data){
			var vNetwork = [];
			for(vNet=0;vNet<data.length;vNet++)
			{
				vNetwork[vNet] = data[vNet].vnetname;
			}
			var appendD = new DropdownConst();
			appendD.appendData(vNetwork,"vnetName2");
		});
	});
}
function getVpcName(){
	$(function(){
		  $.getJSON(_ip+'/vpc_deploy', function(data){
			  var vpc_Name = [];
			 for(var x=0;x<data.length;x++)
				 {
				 	vpc_Name[x] = /*data[x].vpc_name+"/"+*/data[x].vpc_id;
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(vpc_Name,"endpointFs21_Drop");			   
		  });
	});
	
}
function getSubnet(){
	$(function(){
		$.getJSON(_ip+'/getSubnet', function(data){
			var subnet = [];
			for(snet=0;snet<data.length;snet++)
			{
				subnet[snet] = data[snet].subnet_conf_name;
			}
			var appendD = new DropdownConst();
			appendD.appendData(subnet,"subnetFs21_Drop");
		});
	});
}
function getSubnetName(){
	var subNetName1 = [];
	$(function(){
		  $.getJSON(_ip+'/subnet_deploy', function(data){			  
			 for(var x=0;x<data.length;x++)
				 {
				 			subNetName1[x] = data[x].subnet_id;
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(subNetName1,"subnetFs21_Drop");
		  });
		 
	});
}
function createRoute()
{
	alert("In Create subnet page");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
	if(pvd_name == "Azure")
	{
		createRouteAzure(pvd_name,pvd_region);
	}else{
		var routeName = document.getElementById("RM_name3").value;
		var vpcId1 = document.getElementById("endpointFs21").innerText;
		var subnetId1 = document.getElementById("subnetFs21").innerText;
		//alert(vpcId1);
		if(vpcId1 == "Select")
			{
				document.getElementById("endpointFs21").style.border="thin dashed #0099FF";
				return;
			}else if(subnetId1 == "Select")
				{
					document.getElementById("subnetFs21").style.border="thin dashed #0099FF";
					return;
				}else if(routeName == null || routeName == "")
					{
						$('#RM_name3').focus()
						return;
					}
					var data = {};
					data.accountName = accountName;
					data.projName = projName;
					data.prodName = prodName;
					data.provider = pvd_name;
					data.region = pvd_region;
					data.routeName = routeName;
					data.routeVpc = vpcId1;
					data.routeSubnet = subnetId1;
					console.log(data);
					//console.log(routeName+routeVpc+pvd_name);
					$.ajax({
						type: 'POST',
						jsonpCallback: "callback",
						datatype: 'jsonp',
						data: data,
						url: _ip+'/routeTable',
						success: function(data, textStatus){
							console.log(data);
							},
							 error: function (xhr, status, error){
								 console.log('Failure');
								alert("failure");
								},
							});
	}
}
function createRouteAzure(pvd,region){
	alert(pvd+region);
	var resGp = document.getElementById("RM_name1").value,
	    vnetName = document.getElementById("vnetName").innerText,
		routTable = document.getElementById("routeNm").value,
		routeConf = document.getElementById("confNm").value,
		addPrefix = document.getElementById("addPfx").value,
		nextHop = document.getElementById("endpointFs2").innerText,
		nextHopIp = document.getElementById("RM_name2").value;
		var accountName = localStorage.getItem("Account")
			,projName = localStorage.getItem("ProjectName")
			,prodName = localStorage.getItem("ProductName");
			
		if(vnetName == "Select")
		{
			document.getElementById("vnetName").style.border="thin dashed #0099FF";
			return;
		}else if(routTable == "" || routTable == null)
			{
				$('#routeNm').focus()
				return;
			}else if(routeConf == "" || routeConf == null)
				{
					$('#confNm').focus()
					return;
				}else if(addPrefix == "" || addPrefix == null)
					{
						$('#addPfx').focus()
						return;
					}else if(nextHop == "Select")
						{
							document.getElementById("endpointFs2").style.border="thin dashed #0099FF";
							return;
						}else if(nextHopIp == "" || nextHopIp == null)
							{
								$('#RM_name2').focus()
								return;
							}
			
		var data = {};
		data.accountName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.provider = pvd;
		data.region = region;
		data.resGp = resGp;
		data.vnetName = vnetName;
		data.routTable = routTable;
		data.routeConf = routeConf;
		data.addPrefix = addPrefix;
		data.nextHop = nextHop;
		data.nextHopIp = nextHopIp;
		
		$.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/createRtTable',
			success: function(data, textStatus){
			alert(data);
			},
			error: function (xhr, status, error){
			console.log('Failure');
			alert("failure");
			},
		});
}








