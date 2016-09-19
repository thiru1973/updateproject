window.onload = function(){
	document.getElementById("RM_name").value = sessionStorage.getItem("resourceGroup");	
}

function createLocNwGtWay(){
	alert("Inside the function");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var resGp = document.getElementById("RM_name").value,
	    gwName = document.getElementById("GW_name").value,
		gwIpAdd = document.getElementById("GW_add").value,
		addPfx = document.getElementById("ADD_pfx").value;
	
	if(gwName == "" || gwName == null)
	{
		$('#GW_name').focus();
		return;
	}else if(gwIpAdd == "" || gwIpAdd == null)
			{
				$('#GW_add').focus();
				return;
			}else if(addPfx == "" || addPfx == null)
					{
						$('#ADD_pfx').focus();
						return;
					}
	
	var data={};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.resGp = resGp;
	data.gwName = gwName;
	data.gwIpAdd = gwIpAdd;
	data.addPfx = addPfx;
	console.log(data)
		$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createLclNetGtWay',
        success: function(data, textStatus){
        	alert("Success");
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}