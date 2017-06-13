var _ip = "http://172.29.59.65:3000";
window.onload = function(){
	getVnet();	
	getSubnet();
	document.getElementById("RM_name1").value = sessionStorage.getItem("resourceGroup");
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
			appendD.appendData(vNetwork,"vpc2_Drop");
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
			appendD.appendData(subnet,"snet_Drop");
		});
	});
}

function createVnetGtWay(){
	alert("inside the gateWay");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var resGp = document.getElementById("RM_name1").value
	   ,pip = document.getElementById("pip").value
	   ,alMethod = document.getElementById("vpc3_").innerText
	   ,vnet = document.getElementById("vpc2_").innerText
	   ,snet = document.getElementById("snet_").innerText
	   ,gwType = document.getElementById("vpc4_").innerText
	   ,vpnType = document.getElementById("vpc5_").innerText
	   ,gwSku = document.getElementById("vpc6_").innerText
	   ,gwName = document.getElementById("RM_name2").value;
	if(pip == "" || pip == null)
	{
		$('#pip').focus();return;
	}else if(alMethod == "Select")
		{
			document.getElementById("vpc3_").style.border="thin dashed #0099FF";return;
		}else if(vnet == "Select")
			{
				document.getElementById("vpc2_").style.border="thin dashed #0099FF";return;
			}else if(snet == "Select")
				{
					document.getElementById("snet_").style.border="thin dashed #0099FF";return;
				}else if(gwType == "Select")
					{
						document.getElementById("vpc4_").style.border="thin dashed #0099FF";return;
					}else if(vpnType == "Select")
						{
							document.getElementById("vpc5_").style.border="thin dashed #0099FF";return;
						}else if(gwSku == "Select")
							{
								document.getElementById("vpc6_").style.border="thin dashed #0099FF";return;
							}else if(gwName == "" || gwName == null)
								{
									$('#RM_name2').focus();return;
								}
	
	 var data={};
		data.accountName = accountName;data.projName = projName;data.prodName = prodName;data.provider = pvd_name;data.region = pvd_region;data.resGp = resGp;
		data.pip = pip;data.alMethod = alMethod;data.vnet = vnet;data.snet = snet;data.gwType = gwType;data.vpnType = vpnType;
		data.gwSku = gwSku;data.gwName = gwName;
	console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createVnetGWay',
        success: function(data, textStatus){
        	alert("Success");
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}