var _ip = "http://172.29.59.65:3000";
function createKeyPair(){
	var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var keyPair = document.getElementById("KP_name").value;
	if(keyPair == null || keyPair == "")
		{
		$('#KP_name').focus()
		return;
		}
	var data = {};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.keyPair = keyPair;
	console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createKeyPair',
        success: function(data, textStatus){
			if(data == "Success")
		    		 {window.open(_ip+'/downloadKp');}
		    	 else{alert(results);}  
			document.getElementById("cTA_CreateAndDeploy").disabled=true;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}