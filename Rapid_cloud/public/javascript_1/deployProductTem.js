var _ip = "http://172.29.59.63:3000";
$(document).ready(function(){
	var i =0;
	/*$(".clickRole").click(function(){
		$(this).find(".dropDown").slideToggle();
	})*/
	
	//$(".nodeSel tr:nth-child(even)").css({'background-color':'green'})
	//$(".nodeSel tr:nth-child(odd)").css({'background-color':'#f7f7f7'})
	
	$(".clickRole").click(function(e){
		//console.log(this);
		e.stopPropagation();
		if ($(this).find(".dropDown").css('display') == 'block'){
			$(this).find(".dropDown").slideUp();
		}else{
			$(".dropDown").slideUp();
			$(this).find(".dropDown").slideDown();
		}

		//$(document).find(".nowShowing").find(".dropDown").slideUp()
		//$(this).find(".dropDown").slideDown();
		//$(this).addClass("nowShowing");
	});

	$(document).on("click", function(){
		$(".dropDown").slideUp();
	});
	function dataUpDate(){
		$(this).parent(".dropDown").slideUp();
	}
	
	$(".popupData, .proDiv").hide();
	$(".popData").hide();
	$(".buttonVpc").click(function(){
		$(".popupData").show();
		$(".popData").show();
	});
	
	$(".popData1").hide();
	$(".buttonSn").click(function(){		
		$(".popupData").show();
		$(".popData1").show();
	});
	
	/*$(".close, .cancelPoup").click(function(){
		$(".popupData").hide();
		$(".popData").hide();
		$(".popData1").hide();
	})*/
	$(".popDataClsrv").hide();
	$(".buttonClsrv").click(function(){
		$(".popupData").show();
		$(".popDataClsrv").show();
		$(".popData1").hide();
	});
	$(".createNewStor").click(function(){
		$(".popupData").show();
		$("#createAccPOP").show();
		
	});
	$(".close, .cancelPoup").click(function(){
		$(".popupData").hide();
		$(".popData").hide();
		$(".popData1").hide();
		$(".popDataClsrv").hide();
		$("#createAccPOP").hide();
	})
	
	 $('[data-toggle="tooltip"]').tooltip({title: "Select any of your previous project to get VPC and Subnet details. Or, You can create New VPC and Subnet for this template.", placement: "right"});
	 $('[data-toggle="tooltipVpc"]').tooltip({title: "choose vpc so that you can launch your resources in dedicated virtual network", placement: "right"});
	 $('[data-toggle="tooltipSubnet"]').tooltip({title: "It is a range of IP addresses in your VPC. Use public subnet for subnet that must be connected to internet", placement: "right"});
	 $('[data-toggle="tooltiproute"]').tooltip({title: "Used to determine where network is directed", placement: "right"});
	 $('[data-toggle="tooltipgate"]').tooltip({title: "To provide communication between your instances in VPC and internet", placement: "right"});
	 $('[data-toggle="tooltipkp"]').tooltip({title: "to log into your instance create a keyapir", placement: "right"});
	 $('[data-toggle="tooltipClsrv"]').tooltip({title: "Choose already deployed Cloud Service, Or Create a new Cloud Service", placement: "right"});
	

})
var accountName,projName,prodName;
function setStorageData(){
	accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var theDiv = document.getElementById("data");
	//theDiv.innerHTML += accountName+">>"+projName+">>"+prodName; 
}
var cidrIp = ["Anywhere", "My IP", "Custom IP"];
var volumeType = ["Provisioned IOPS SSD", "General Purpose SSD", "Magnetic"];
var rule = ["In Bound", "Out Bound"];
var vpcId;
var subnetId;
function selectOpt(ev, idn){
	
	event.stopPropagation();
	$(ev).parent(".dropDown").slideUp();
	
	var aImage = ev.getElementsByTagName("dt")[0].innerHTML;
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	 var v = ev.parentNode;
	 var vb = v.parentNode;
	 var idd = vb.id; 
	 if(idd == "selvpc"){vpcId = aTex;getSubnetName(aTex);}
	 if(idd == "selsn"){subnetId = aTex;}
	 if(idd == "selOs"){populate_image(aTex);}
	 /*for(var i=0;i<node_info.length;i++)
		 {
			 if(idd == "selci"+i+""){getPublicIp(aTex,i);}
		 }*/
	 document.getElementById(idd).style.border="none";
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
}
function populate_image(idd){
	var pvd_name1 = pvd_name;
	var img_data = {};
	img_data.provider = pvd_name1;
	img_data.os = idd;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: img_data,	 
	     url: _ip+'/temp_image',
	     success: function(results) {		    		 
		    	 	var appendD = new DropdownConst();
		    	 	appendD.appendData(results,"selImage");
	    		 
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });		
}

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
	//console.log(name);
	var epn = document.getElementById(appentoWhat);
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
	//console.log(epn); sbi clearks
}

window.onload = function(){
	//getVpcName();
	//get_role_os();
	getCloudService();
	setStorageData();
	getAzureStorage();
}
// stgacc
function getAzureStorage(){
	$(function(){
		$.getJSON(_ip+'/getAzureStg', function(data){
			console.log(data+"typeDro");
			var stgAcc = [];
			for(i=0;i<data.length;i++)
				{
					stgAcc[i] = data[i].storagename; 
				}
			var appendD = new DropdownConst();
			appendD.appendData(stgAcc, "stgacc");
		})
	})
}
function get_role_os(){
	$(function(){
		   $.getJSON(_ip+'/org_temp', function(data) {
			   
			   var idArr = [], osArr = [];
			   
			   idDt = data[0].types;			  
			   for(var j=0;j<=idDt.length-1;j++){
				   var dd = data[0].types[j].name;				   
				   idArr.push(dd);
			   }
			   var appendD = new DropdownConst();
			   	 appendD.appendData(idArr,"selRoles");
			   
			   var os = data[1].types;			  
			   for(var d=0; d<=os.length-1; d++){				   
				   var oss = data[1].types[d].name;				  
				   osArr.push(oss);
			   }
			   var appendD = new DropdownConst();
			   	 appendD.appendData(osArr,"selOps");			  
		   });
		 
		});
}
var node_info, pvd_name, pvd_region, temp_info, str, str2;

function getVpcName(){
	var dt = document.getElementById("dtN"),
		re = document.getElementById("_re"),
		locaIn = document.getElementById("Location_Input_Id"),
		pr = document.getElementById("_pr"),
		regNCls = document.getElementById("regNameClsrv"),
		devVM = document.getElementById("devOpsVMID"),
		deOvRe = sessionStorage.getItem("Deploy_DevOps_Region");
		
		g = sessionStorage.getItem("Deploy_DevOps_Template");
		g ? dt.innerText= g: dt.innerText= "--" ;
		
		
		re.innerText = locaIn.value = deOvRe;

		pr.innerText = sessionStorage.getItem("Deploy_DevOps_Provider");
		regNCls.value = deOvRe;
		
		var recordID = sessionStorage.getItem("Deploy_DevOps_id");
		
		$.getJSON(_ip+"/javascript_1/product_data.json", function(d , responce){
			console.log(d[recordID]);
			for(var i=0; i< d.length; i++){
				//console.log( d[i]["deployTemplate"][0]._templateName );
				if(d[i]["deployTemplate"][0]._templateName == g){
						var ci_len = Object.keys(d[i]["deployTemplate"][0].cIVMs).length;
						var cilen = Object.keys(d[i]["deployTemplate"][0].cIVMs);
						if(cilen.total == undefined){
							for(var m in cilen){
								//console.log(m);
								if(m != "total"){
									devVM.innerHTML+='<tr>\
													<td>'+ d[i]["deployTemplate"][0].cIVMs[m]._vmRole +'</td>\
													<td>'+ci_len+'</td>\
													<td>'+ d[i]["deployTemplate"][0]._tool_name +' </td>\
													<td id="'+i+m+'"></td>\
													<td>CI</td>\
												</tr>';

									var ob = d[i]["deployTemplate"][0].cIVMs[m]._vmPackages;
									var ddd = ""+i+""+m
									for(var key in ob){
										if(ob[key] === true){
											var getI = document.getElementById(ddd);
												getI.innerHTML+=key+", ";
											}
										}
								}
							}
						}
						
						var ct_len = Object.keys(d[i]["deployTemplate"][0].cTVMs).length;
						var cten = d[i]["deployTemplate"][0].cTVMs;
						
						if(cten.total == undefined){
							for(var t in cten){
								if(t != "total"){
									devVM.innerHTML+='<tr>\
											<td>'+ d[i]["deployTemplate"][0].cTVMs[t]._vmRole +'</td>\
											<td>'+ct_len+'</td>\
											<td>'+ d[i]["deployTemplate"][0]._tool_name +' </td>\
											<td id="'+i+t+'"></td>\
											<td>CT</td>\
										</tr>';

								var obct = d[i]["deployTemplate"][0].cTVMs[t]._vmPackages;
								var _ctt = ""+i+""+t
								for(var key in obct){
									if(obct[key] === true){
										var getI = document.getElementById(_ctt);
												getI.innerHTML+=key+", ";
										}
									}	
								}
							
							
							}
						}
						
						
						var cd_len = Object.keys(d[i]["deployTemplate"][0].cDVMs).length;
						var cden = d[i]["deployTemplate"][0].cDVMs;
						if(cden.total == undefined){
							for(var cde in cden){
								if(cde != "total"){
									devVM.innerHTML+='<tr>\
													<td>'+ d[i]["deployTemplate"][0].cDVMs[cde]._vmRole +'</td>\
													<td>'+cd_len+'</td>\
													<td>'+ d[i]["deployTemplate"][0]._tool_name +' </td>\
													<td id="'+i+cde+'"></td>\
													<td>CD</td>\
												</tr>';

									var obcd = d[i]["deployTemplate"][0].cDVMs[cde]._vmPackages;
									var _cdc = ""+i+""+cde;
									var getI = document.getElementById(_cdc);
									console.log();
									Object.keys(obcd).length == 0 ? getI.innerHTML="No Tools" : false ;
									for(var key in obcd){
										console.log(obcd);
										if(obcd[key] === true){
												getI.innerHTML+=key+", ";
											}
									}
								}
							}
						}
				}
			}
		});
}

var ddT = {
	da:{},
	fun: function(){
		var dt = document.getElementById("dtN"),
		re = document.getElementById("_re"),
		locaIn = document.getElementById("Location_Input_Id"),
		pr = document.getElementById("_pr"),
		regNCls = document.getElementById("regNameClsrv"),
		devVM = document.getElementById("devOpsVMID"),
		deOvRe = sessionStorage.getItem("Deploy_DevOps_Region");
		
		g = sessionStorage.getItem("Deploy_DevOps_Template");
		g ? dt.innerText= g: dt.innerText= "--" ;
		
		
		re.innerText = locaIn.value = deOvRe;

		pr.innerText = sessionStorage.getItem("Deploy_DevOps_Provider");
		regNCls.value = deOvRe;
		
		var recordID = sessionStorage.getItem("Deploy_DevOps_id");
		var self = this;
		$.getJSON(_ip+"/javascript_1/product_data.json", function(d , responce){
			console.log(self.da = d[recordID]);
			for(var i=0; i< d.length; i++){
				//console.log( d[i]["deployTemplate"][0]._templateName );
				if(d[i]["deployTemplate"][0]._templateName == g){
						var ci_len = Object.keys(d[i]["deployTemplate"][0].cIVMs).length;
						var cilen = Object.keys(d[i]["deployTemplate"][0].cIVMs);
						if(cilen.total == undefined){
							for(var m in cilen){
								//console.log(m);
								if(m != "total"){
									devVM.innerHTML+='<tr>\
													<td>'+ d[i]["deployTemplate"][0].cIVMs[m]._vmRole +'</td>\
													<td>'+d[i]["deployTemplate"][0].cIVMs[m]._vmName+'</td>\
													<td>'+ d[i]["deployTemplate"][0]._tool_name +' </td>\
													<td id="'+i+m+'"></td>\
												</tr>';

									var ob = d[i]["deployTemplate"][0].cIVMs[m]._vmPackages;
									var ddd = ""+i+""+m
									for(var key in ob){
										if(ob[key] === true){
											var getI = document.getElementById(ddd);
												getI.innerHTML+=key+", ";
											}
										}
								}
							}
						}
						
						var ct_len = Object.keys(d[i]["deployTemplate"][0].cTVMs).length;
						var cten = d[i]["deployTemplate"][0].cTVMs;
						
						if(cten.total == undefined){
							for(var t in cten){
								if(t != "total"){
									devVM.innerHTML+='<tr>\
											<td>'+ d[i]["deployTemplate"][0].cTVMs[t]._vmRole +'</td>\
											<td>'+d[i]["deployTemplate"][0].cTVMs[t]._vmName+'</td>\
											<td>'+ d[i]["deployTemplate"][0]._tool_name +' </td>\
											<td id="'+i+t+'"></td>\
										</tr>';

								var obct = d[i]["deployTemplate"][0].cTVMs[t]._vmPackages;
								var _ctt = ""+i+""+t
								for(var key in obct){
									if(obct[key] === true){
										var getI = document.getElementById(_ctt);
												getI.innerHTML+=key+", ";
										}
									}	
								}
							
							
							}
						}
						var cd_len = Object.keys(d[i]["deployTemplate"][0].cDVMs).length;
						var cden = d[i]["deployTemplate"][0].cDVMs;
						if(cden.total == undefined){
							for(var cde in cden){
								if(cde != "total"){
									devVM.innerHTML+='<tr>\
													<td>'+ d[i]["deployTemplate"][0].cDVMs[cde]._vmRole +'</td>\
													<td>'+d[i]["deployTemplate"][0].cDVMs[cde]._vmName+'</td>\
													<td>'+ d[i]["deployTemplate"][0]._tool_name +' </td>\
													<td id="'+i+cde+'"></td>\
												</tr>';

									var obcd = d[i]["deployTemplate"][0].cDVMs[cde]._vmPackages;
									var _cdc = ""+i+""+cde;
									var getI = document.getElementById(_cdc);
									console.log();
									Object.keys(obcd).length == 0 ? getI.innerHTML="No Tools" : false ;
									for(var key in obcd){
										console.log(obcd);
										if(obcd[key] === true){
												getI.innerHTML+=key+", ";
											}
									}
								}
							}
						}
				}
			}
		});		
	},
	clc: function(){
		this.da.deployData = {
			TemplateName : document.getElementById("dtN").innerText,
			Environment  : $("#sel  span").text(),
			CloudService : $("#selClsrv  span").text(),
			StorageAccounts : $("#stgac  span").text()
		};
		console.log(this.da);
		//this.da.deployData = this.deployDataObject
		var d = JSON.stringify(this.da);
		$.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: "d1="+d,
			     url: _ip+'/DepDeOsTem',
				 //async:false,
			     success: function(results){
					console.log(results)
					results == "saved" ? alert("Inserted values sucessfully") (location.href=_ip+"/viewProductTemplate") : false;
				 },
				 error: function (xhr, status, error){
			        console.log('Failure: '+error);
					alert(error);
				},
			});
	},
	deployClick: function(){
		//ddT.clc();
		//console.log(JSON.stringify(this.deployDataObject))
		$("#sel  span").text() != "Select" &&  $("#selClsrv  span").text() != "Select" &&  $("#stgac  span").text() != "Select"? this.clc() : alert("Please Select Environment, Cloud Service and Storage Accounts.");
	}
}
ddT.fun();

/* $('#deployFunction').click(function(){ */
	/*
	var dt = document.getElementById("dtN");
	var eM = $("#sel  span").text();
	var cS = $("#selClsrv  span").text();
	var sA = $("#stgac  span").text(); */
	
/* }); */ 


$(".closeAlert").on("click", function(){
	$(".alert-vpc").slideUp();
});
function getSubnetName(vpcid){
	var id=vpcid;
	var subNetName1 = [];
	$(function(){
		  $.getJSON(_ip+'/subnet_deploy', function(data){
			  console.log(data);
			  
			 for(var x=0;x<data.length;x++)
				 {
				 	if(data[x].vpc_id == id)
				 		{
				 			alert(data[x].subnet_id);
				 			subNetName1[x] = /*data[x].subnet_name+"/"+*/data[x].subnet_id;
				 		}
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(subNetName1,"selssn");
		  });
		 
	});
}

$('#createClsrv').click(function(){
	//alert("In cloud page");
	var cloudname = document.getElementById("cloudName").value;
	var region = document.getElementById("regNameClsrv").value;
	//var prjName = document.getElementById("selpj").innerText;
	console.log(cloudname+region);
	var data = {};
	data.name = cloudname;
	data.location = region;
	data.account = localStorage.getItem("Account");
	data.project = localStorage.getItem("ProjectName");
	data.product = localStorage.getItem("ProductName");
	
	 $.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,
		 //contentType: 'application/json',
	     url: _ip+'/create_cloud_service',
	     success: function(data, textStatus) {
	     //alert('success');
		   //if(!alert('Details updated succesfully!')){window.close();}
		   if(data == "Success")
		   {
			   $(".popupData").hide();
			   $(".popDataClsrv").hide();
			   $(".alert-cldsrv").stop().slideDown();
			  
			   alert("Cloud Service Created");
		   }
		   else
		   {
		   alert(data);
		   //window.location.reload();
		   }
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			if(!alert('Failure!')){window.location.reload();}
			},
	   });
});
function storageaccFun(){
	//alert("storage function");
	var stracc = document.getElementById("createAccount_Input_Id").value;
	var strloc = document.getElementById("Location_Input_Id").value;
	//alert(stracc+strloc);
	var data = {};
	data.stracc = stracc;
	data.strloc = strloc;
	data.account = localStorage.getItem("Account");
	data.project = localStorage.getItem("ProjectName");
	data.product = localStorage.getItem("ProductName");
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/straccount',
        success: function(data, textStatus){
        	console.log(data);
        	 $(".popupData").hide();
        	 $(".popDataNew").hide();
        	$(".alert-stracc").stop().slideDown();        	
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}

//cloud service list changed code
function getCloudService(){
	$(function(){
		  $.getJSON(_ip+'/list_cloud_service', function(data){
			 //console.log(data);
			 var cloud_name = [];
			 for(var x=0;x<data.length;x++)
			 {
			 	cloud_name[x] = /*data[x].vpc_name+"/"+*/data[x].cloud_name;
			 }
			 var appendD = new DropdownConst();
			 appendD.appendData(cloud_name,"selsClsrv");
		  });
	});
}


$('.exit').click(function(){
	location.href = _ip+"/viewProductTemplate";
})

