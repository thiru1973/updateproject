var _ip = "http://172.29.59.65:3000";
window.onload = function(){
	//getVnet();
	getVpcName();
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
function getVpcName(){
	$(function(){
		  $.getJSON(_ip+'/vpc_deploy', function(data){
			  var vpc_Name = [];
			 for(var x=0;x<data.length;x++)
				 {
				 	vpc_Name[x] = data[x].vpc_name+"/"+data[x].vpc_id;
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(vpc_Name,"vpc2_Drop");			   
		  });
	});
	
}
function createGateway()
{
	var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var gtWayName = document.getElementById("GW_name").value;
	var gtVpc1 = document.getElementById("vpc2_").innerText;
	var gtVpc = gtVpc1.split("/");
	if(gtVpc1 == "Select")
	{
		document.getElementById("vpc2_").style.border="thin dashed #0099FF";
		return;
	}else if(gtWayName == null || gtWayName == "")
		{
		$('#GW_name').focus()
		return;
		}
	var data = {};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.gtWayName = gtWayName;
	data.gtWayVpc = gtVpc[1];
	console.log(data);
	/*$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/gateWay',
        success: function(data, textStatus){
        	alert("Success");
			document.getElementById("cTA_CreateAndDeploy").disabled=true;        	
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });*/
}