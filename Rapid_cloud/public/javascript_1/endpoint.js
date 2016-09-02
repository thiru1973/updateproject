function createEndPoints(){
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	if(pvd_name == "Azure")
	{
		createAzureEndpoint(pvd_name,pvd_region);
	}
}
function createAzureEndpoint(pvd, region){
	alert("Inside the azure end point");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var resGp = document.getElementById("RM_name").value
	   ,pfName = document.getElementById("PF_name").value
	   ,rtMethod = document.getElementById("vpc2_").innerText
	   ,dnsName = document.getElementById("DNS_name").value
	   ,ttl = document.getElementById("ttl").value
	   ,protocol = document.getElementById("vpc3_").innerText
	   ,port = document.getElementById("MN_port").value
	   ,path = document.getElementById("MN_path").value
	   ,webAppName = document.getElementById("WEB_name").value
	   ,epName = document.getElementById("EP_name").value
	   ,epType = document.getElementById("vpc4_").innerText
	   ,epStatus = document.getElementById("vpc5_").innerText;
	   
	if(pfName == "" || pfName == null)
	{
		$('#PF_name').focus();return;
	}else if(rtMethod == "Select")
		{
			document.getElementById("vpc2_").style.border="thin dashed #0099FF";return;
		}else if(dnsName == "" || dnsName == null)
			{
				$('#DNS_name').focus();return;
			}else if(ttl == "" || ttl == null)
				{
					$('#ttl').focus();return;
				}else if(protocol == "Select")
					{
						document.getElementById("vpc3_").style.border="thin dashed #0099FF";return;
					}else if(port == "" || port == null)
						{
							$('#MN_port').focus();return;	
						}else if(path == "" || path == null)
							{
								$('#MN_path').focus();return;	
							}else if(webAppName == "" || webAppName == null)
								{
									$('#WEB_name').focus();return;	
								}else if(epName == "" || epName == null)
									{
											$('#EP_name').focus();return;	
									}else if(epType == "Select")
										{
											document.getElementById("vpc4_").style.border="thin dashed #0099FF";return;	
										}else if(epStatus == "Select")
											{
												document.getElementById("vpc5_").style.border="thin dashed #0099FF";return;
											}
					
	    
	   var data = {};
	    data.accountName = accountName;data.projName = projName;data.prodName = prodName;data.provider = pvd;data.region = region;data.resGp = resGp;
		data.pfName = pfName;data.rtMethod = rtMethod;data.dnsName = dnsName;data.ttl = ttl;data.protocol = protocol;data.port = port;
		data.path = path;data.webAppName = webAppName;data.epName = epName;data.epType = epType;data.epStatus = epStatus;
		
		$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createEndPoint',
        success: function(data, textStatus){
        	alert("Success");
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}