function createDNS()
{
	alert("Inside dns function");
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var resGp = document.getElementById("RM_name").value
	   ,dnsName = document.getElementById("DNS_name").value;
	   
	if(dnsName == "" || null)
	{
		$('#DNS_name').focus()
		return;
	}
	   
	  var data={};
		data.accountName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.provider = pvd_name;
		data.region = pvd_region;
		data.resGp = resGp;
		data.dnsName = dnsName;
		$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createDns',
        success: function(data, textStatus){
        	alert("Success");
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}