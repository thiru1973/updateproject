var _ip = "http://172.29.59.63:3000";
window.onload = function(){
	getEnvironment();
};

$(document).ready(function(){
	var i =0;
	/* Start Dropdown function */
	function dataUpDate(e){
		event.stopPropagation();
		$(e).parent(".dropDown").slideUp();
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

function getAccounts(event, idn){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(aTex);
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
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
					envData = data;
					for(var i =0; i < data.length; i++){
						var tT = document.getElementById("accounts_ID");
						tT.innerHTML+='<li onclick="getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].env_name+'</dd></dl></li>';
					}
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
}
function trafficManager(){
		var expTname = /^\w+$/;
		var cldService = []
		    ,pfName = document.getElementById("pfName").value
		    ,dmName = document.getElementById("dmName").value
		    ,lbMethod = document.getElementById("typeo11").innerText
		    ,mnProtocol = document.getElementById("typeDro12").innerText
		    ,mPort = document.getElementById("mPort").value
			,env = document.getElementById("typeDro1").innerText;
	
		for(var i=0;i<envData.length;i++)
		{
			if(env == envData[i].env_name)
			{
				cldService[i] = envData[i].cloud_name;				
			}
		}
		if(!expTname.test(pfName)){
			alert("Enter the profile name");
			document.getElementById("pfName").focus();
			return;
		}else if(!expTname.test(dmName)){
			alert("Enter domain name and it should be unique..!");
			document.getElementById("dmName").focus();
			return;
		}else if(lbMethod == "Select"){
			document.getElementById("typeo11").style.border="thin dashed #E24B4B";
			return;
		}else if(mnProtocol == "Select"){
			document.getElementById("typeDro12").style.border="thin dashed #E24B4B";
			return;
		}
		var data = {};
		data.cldService = cldService[0];
		data.pfName = pfName;
		data.dmName = dmName;
		data.lbMethod = lbMethod;
		data.mnProtocol = mnProtocol;
		data.mPort = mPort;
		console.log(data);
		
		$.ajax({
			type: 'POST',
		 	jsonpCallback: "callback",
		 	datatype: 'jsonp',
		 	data: data,
		 	url: _ip+'/trafficManage',
		 	success: function(data, textStatus){
		 		alert(data);		 		
	    	},
	    	 error: function (xhr, status, error){
	             console.log('Failure');
	     		alert("failure");
	     		},
	        });
	}