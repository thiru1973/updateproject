var _ip = "http://172.29.59.63:3000";
window.onload = function(){
	getEnvironment();
	getSubnetName();
	getSecurity();
};

$(document).ready(function(){
	var i =0;
	/* Start Dropdown function */
	function dataUpDate(e){
		event.stopPropagation();
		$(e).parent(".dropDown").slideUp();
	}
	var type = sessionStorage.getItem("chooseUrCloud");

	if(type == "Azure"){
			 $("[role='forAzure']").css("display","");
			 $("[role='forAWS']").css("display","none");
		}else if(type == "AWS"){
			 $("[role='forAzure']").css("display","none");
			 $("[role='forAWS']").css("display","");
	 }
	$(".clickRole").click(function(e){		
		e.stopPropagation();
		if ($(this).find(".dropDown").css('display') == 'block'){
			$(this).find(".dropDown").slideUp();
		}else{
			$(".dropDown").slideUp();
			$(this).find(".dropDown").slideDown();
		}
	});
	$(document).on("click", function () {
		$(".dropDown").slideUp();
	});

	/* End Dropdown function */
	$("#volumeDetailsPopup").hide();
	$(".close, .cancelPoup").click(function(){
		$("#volumeDetailsPopup").hide();
		$(".exVol").remove();
		//var exVolId = document.getElementById("existingVolumesID");
		//exVolId.innerHTML="";
	});
	$("#ConfigureHealthpopupClose, .cancelPoup, #subnetsPopupClose").click(function(){
		$("#ConfigureHealthChecksAdvanced, #SubnetsPoup, #addInstPopUpWin, #securityGroWin, #addEndPointID").hide();
	});	
});

$(function(){
	$.getJSON(_ip+'/accountDetails', function(data){
		for(var i =0; i < data.data2.length; i++){
			var tT = document.getElementById("pro_ID");
				tT.innerHTML+='<li onclick="getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data2[i].p_name+'</dd></dl></li>';
		}
	})
});
function getSubnetName(){
	$(function(){
		  $.getJSON(_ip+'/subnet_deploy', function(data){			  
			 for(var x=0;x<data.length;x++)
				 {
					 var tT = document.getElementById("snets");
						 tT.innerHTML+='<li onclick="getAccounts(this,'+x+')" class="Dev"><dl><dt style="padding:0px"></dt><dd class="va">'+data[x].subnet_id+'</dd></dl></li>';				 		
				 }	
		  });		 
	});
}
function getSecurity(){
	$(function(){
		  $.getJSON(_ip+'/getSecurity', function(data){
			  console.log(data);			  
			 for(var x=0;x<data.length;x++)
				 {
					var tT = document.getElementById("secg");
						tT.innerHTML+='<li onclick="getAccounts(this,'+x+')" class="Dev"><dl><dt style="padding:0px"></dt><dd class="va">'+data[x].sg_id+'</dd></dl></li>';
				 }
		  });		 
	});
}
function assignport(port)
{
	document.getElementById("LPort").value=port;
}
function getAccounts(event, idn){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(idd);
	if(idd == "sel"){assignport(aTex);}
	if(idd == "env"){showInstances(aTex);}
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
}
function assignport(protocol){
	alert(protocol);
	if(protocol == "Http"){
		document.getElementById("lbPort").value=80;
	}else{
		document.getElementById("lbPort").value=443;
	}
}

var envData;
function getEnvironment(){
	var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		
	var data = {};	
	data.id = prodName;
			 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip +'/filter_env2',
				success: function(data, textStatus){
					console.log(data);
					envData = data;
					for(var i =0; i < data.length; i++){
						var tT = document.getElementById("envi");
						tT.innerHTML+='<li onclick="getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].env_name+'</dd></dl></li>';
					}
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
}
var region;
function showInstances(env){
	var proj_name = localStorage.getItem("ProjectName")
	var data = {};
		data.env_name = env;
		data.proj_id = proj_name ;
		//console.log(data);
		 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip+'/node_detailsManage',
				success: function(data, textStatus) {
					console.log(data);
					region = data[0].region;
					for(var i=0;i<data.length;i++){
						var newCheckbox = document.createElement("input");							
							newCheckbox.type = "checkbox";
							newCheckbox.value = data[i].inst_id
							newCheckbox.name = "instances";
							document.getElementById("toBeDone").appendChild(newCheckbox);

							var label = document.createElement('label');
							label.appendChild(document.createTextNode(data[i].inst_type));

							document.getElementById("toBeDone").appendChild(label);
							document.getElementById("toBeDone").appendChild(document.createElement("br"));
					}
			 },
			 error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
}
function loadBalancer(){
	var expTname = /^\w+$/;
	var LbName = document.getElementById("lbName").value,
	    protocol = document.getElementById("protocol").value,
	    locPort = document.getElementById("LPort").value,
	    pubPort = document.getElementById("PPort").value,
	    epName = document.getElementById("epName").value,
	    lbSet = document.getElementById("lbsname").value,
		env = document.getElementById("env").innerText;
	var cldService = [];
		for(var i=0;i<envData.length;i++)
		{
			if(env == envData[i].env_name)
			{
				cldService[i] = envData[i].cloud_name;				
			}
		}
	if(!expTname.test(LbName)){
		$(".dnsName").stop().slideDown();
		document.getElementById("lbName").focus();
		return;
	}else if(!expTname.test(epName)){
		$(".epName").stop().slideDown();
		document.getElementById("epName").focus();
		return;
	}else if(!expTname.test(lbSet)){
		$(".lbsName").stop().slideDown();
		document.getElementById("lbsname").focus();
		return;
	} 
	var data = {};
	data.cldService = cldService[0];
	data.LbName = LbName;
	data.protocol = protocol;
	data.locPort = locPort;
	data.pubPort = pubPort;
	data.epName = epName;
	data.lbSet = lbSet;
	console.log(data);
	$.ajax({
		type: 'POST',
	 	jsonpCallback: "callback",
	 	datatype: 'jsonp',
	 	data: data,
	 	url: _ip+'/azureLoad',
	 	success: function(data, textStatus){
	 		console.log(data);
	 		$(".alert-success").stop().slideDown();
    	},
    	 error: function (xhr, status, error){
             console.log('Failure');
     		alert("failure");
     		},
        }); 
}
function createAwsLoad(){
            var instances = [];
            $.each($("input[name='instances']:checked"), function(){            
                instances.push($(this).val());
            });
			alert(region);
			var expTname = /^\w+$/;
           var lbName = document.getElementById("ldName").value
		       ,lbProtocol = document.getElementById("sel").innerText
			   ,lbPort = document.getElementById("lbPort").value
			   ,lbPort1 = document.getElementById("lbPort").value
			   ,secGp = document.getElementById("sec").innerText
			   ,snet = document.getElementById("snet").innerText;			
			var accountName = localStorage.getItem("Account")
				,projName = localStorage.getItem("ProjectName")
				,prodName = localStorage.getItem("ProductName");
				
			if(!expTname.test(lbName)){
				document.getElementById("ldName").focus();
				return;
			}else if(lbProtocol == "Select"){
					document.getElementById("sel").style.border="thin dashed #E24B4B";
					return;
				}else if(!expTname.test(lbPort)){
						document.getElementById("lbPort").focus();
						return;
					}else if(secGp == "Select"){
							document.getElementById("sec").style.border="thin dashed #E24B4B";
							return;
						}else if(snet == "Select"){
							document.getElementById("snet").style.border="thin dashed #E24B4B";
							return;
						}				
			var data = [];
			data.push(accountName,projName,prodName,region,lbName,lbProtocol,lbPort,lbPort1,secGp,snet);
			console.log(data);
			$.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data:  "d1="+data+"&d2="+instances,
				url: _ip +'/loadBalancerCreate',
				success: function(data, textStatus){
					console.log(data);
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });

			
			
		
		
		   
        
}