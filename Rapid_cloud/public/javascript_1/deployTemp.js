var _ip = "http://172.29.59.63:3000";
$(document).ready(function(){
	var i =0;
	/*$(".clickRole").click(function(){
		$(this).find(".dropDown").slideToggle();
	})*/
	
	//$(".nodeSel tr:nth-child(even)").css({'background-color':'green'})
	//$(".nodeSel tr:nth-child(odd)").css({'background-color':'#f7f7f7'})
	
	/*$(".clickRole").click(function(e){
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

	$(document).on("click", function () {
		$(".dropDown").slideUp();
	});
	function dataUpDate(){
		$(this).parent(".dropDown").slideUp();
	}*/
	$(document).on("click",".clickRole",function(e){
	e.stopPropagation();
	if ($(this).find(".dropDown").css('display') == 'block'){
		$(this).find(".dropDown").slideUp();
	}else{
		$(".dropDown").slideUp();
		$(this).find(".dropDown").slideDown();
	}
	});
	$(document).delegate(".closeAlert", "click", function (){
			$(this).parent().hide()
	});
	$(document).delegate(".addStoTab", "click", function (){
		event.preventDefault();
		var te = $(this).find("a").text();
		if(te == "Infrastructure"){
			$(this).parent().find(".active").removeClass("active");
			$(this).addClass("active");
			$(this).parent().parent().find(".tab1").addClass("active");
			$(this).parent().parent().find(".tab2").removeClass("active");
		}else if(te == "Packages"){
			$(this).parent().find(".active").removeClass("active");
			$(this).addClass("active");
			$(this).parent().parent().find(".tab2").addClass("active");
			$(this).parent().parent().find(".tab1").removeClass("active");
		}
	});
	$(document).on("click", function (){
		$(".dropDown").slideUp();
	});	
	
	
	$(".proDiv ,.popupData").hide();
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
	/* ---------------------------------------------
		These common actions(Hide, Show, Hide and Show toggle) we can use all pages.
	------------------------------------------------*/	
	/* function HideAndShow_Constructor(clickedElement,hideAndShowElement){
		this.clickedElement=clickedElement;
		this.hideAndShowElement=hideAndShowElement;
	}	
	HideAndShow_Constructor.prototype.defaultHide = function(){
			var adv = $("."+this.hideAndShowElement);
				adv.hide();
	}
	HideAndShow_Constructor.prototype.showActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideDown();
			});
	}
	HideAndShow_Constructor.prototype.hideActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideUp();
			});		
	}
	HideAndShow_Constructor.prototype.toggleHandS = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideToggle();
			});
	}
	var adVanOp = new HideAndShow_Constructor("advancedOptions","advancedOptionsDivCon");
		adVanOp.defaultHide();
		adVanOp.toggleHandS();
		
	var adVan = new HideAndShow_Constructor("closeAdvan","advancedOptionsDivCon");
		adVan.hideActionOnly();
		
	var closeRoleConfi = new HideAndShow_Constructor("closeRoleConfi","closeConfig");
		closeRoleConfi.hideActionOnly();
	
	var addRole = new HideAndShow_Constructor("1stRowAdd","closeConfig");
		addRole.defaultHide();
		addRole.showActionOnly();

	var elesticRow = new HideAndShow_Constructor("","addClonedElements");
		elesticRow.defaultHide();

	var elesticRow = new HideAndShow_Constructor("addMoreElastitcIP","addClonedElements");
		elesticRow.showActionOnly();
		
	var hideClonedRow = new HideAndShow_Constructor("removeElastitcIP","addClonedElements");
		hideClonedRow.hideActionOnly();*/
	/* ---------------------------------------------
		::::::::::::::::::End:::::::::::::::::::::
	------------------------------------------------*/
		

})
$(document).on("click", "#doneDeploy", function(){
	$(".popupData, .proDiv").hide();
	location.href = _ip+"/manageEnv";
})
var accountName,projName,prodName;
function setStorageData(){
	accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	//var theDiv = document.getElementById("data");
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
	 //alert(aTex);
	 if(idd == "selvpc"){
		 var vId = aTex.split("/");
		 vpcId = vId[1];getSubnetName(vId[1]);getSecurity(vId[1]);getRouteTable(vId[1]);getInetGWay(vId[1]);getKeyPair();}
	 if(idd == "selsn"){
		 var sId = aTex.split("/");
		 subnetId = sId[1];}
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
	img_data.region = pvd_region;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: img_data,	 
	     url: _ip+'/temp_image1',
	     success: function(results) {
				console.log(results);
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
	//console.log(epn);
}



window.onload = function(){
	get_templateName();
	//get_project();
	getVpcName();
	get_role_os();
	//getSubnetName();
	getCloudService();
	setStorageData();
	getAzureStorage();
	getResources();
	getVnet();
	getSubnet();
}
function getAzureStorage(){
	$(function(){
		$.getJSON('http://172.29.59.63:3000/getAzureStg', function(data){
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
		   $.getJSON('http://172.29.59.63:3000/org_temp', function(data) {			
			   
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

function getSecurity(vpcName){
	var secName = [];
	$(function(){
		  $.getJSON(_ip+'/getSecurity', function(data){
			  //console.log(data);			  
			 for(var x=0;x<data.length;x++)
				 {
				 	if(data[x].vpc_id == vpcName)
				 		{
				 			secName[x] = data[x].sg_name;
				 		}
				 }
			if(str == "multi"){
			for(var y=0;y<temp_info.length;y++){
				var tT = document.getElementById("selsgn"+y+"");
								tT.innerHTML+='<li onclick="selectOpt(this,'+y+')" class="Dev"><dl><dt></dt><dd class="va">'+secName+'</dd></dl></li>';					
			}
			}else{
				var z=0;
				var tT = document.getElementById("selsgn"+z+"");
								tT.innerHTML+='<li onclick="selectOpt(this,'+z+')" class="Dev"><dl><dt></dt><dd class="va">'+secName+'</dd></dl></li>';
			}
			   //var appendD = new DropdownConst();
			   //appendD.appendData(secName,"selsgn0");
		  });		 
	});
}
function getRouteTable(vpcName){
	var routeName = [];
	$(function(){
		  $.getJSON(_ip+'/getRouteTable', function(data){
			 console.log(data);			  
			 for(var x=0;x<data.length;x++)
				 {
				 	if(data[x].vpc_name == vpcName)
				 		{
							var tT = document.getElementById("rtTable");
								tT.innerHTML+='<li onclick="selectOpt(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[x].route_name+'</dd></dl></li>';					
				 		}
				 }
		  });		 
	});
}
function getInetGWay(vpcName){
	var gWay = [];
	$(function(){
		  $.getJSON(_ip+'/getInetGateWay', function(data){
			 console.log(data);			  
			 for(var x=0;x<data.length;x++)
				 {
				 	if(data[x].vpc_name == vpcName)
				 		{
				 			gWay[x] = data[x].igateway_name;
							var tT = document.getElementById("gtWay");
								tT.innerHTML+='<li onclick="selectOpt(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[x].igateway_name;+'</dd></dl></li>';					
				 		}
				 }
			   //var appendD = new DropdownConst();
			   //appendD.appendData(gWay,"gtWay");
		  });		 
	});
}
function getKeyPair(){
	var kp = [];
	$(function(){
		  $.getJSON(_ip+'/getKeypair', function(data){
			 console.log(data);		
			 for(var y=0;y<data.length;y++)
			 {
				 kp[y] = data[y].key_name;
			 }	
		var appendD = new DropdownConst();
		appendD.appendData(kp,"kpair");
		  });		 
	});
	
}

var node_info;
var pvd_name;
var pvd_region;
var temp_info;
var str;
var str2;
function get_templateName(){
	$(function(){	
		var url = document.location.href,
	     params = url.split('?')[1].split('&'),
	     params2 = url.split('?')[2].split('&'),
	     data = {}, tmp, data2 = {}, tmp2, data3={}, tmp3, data4={}, tmp4;
		 //http://172.29.59.63:3000/deployTemplate?data=single?data2=t2.nano
		 //console.log(params + params2);
		 for (var i = 0, l = params.length; i < l; i++) {
		       tmp = params[i].split('=');
		       data[tmp[0]] = tmp[1];
		  }
		 for (var i = 0, l = params2.length; i < l; i++) {
		       tmp2 = params2[i].split('=');
		       data2[tmp[0]] = tmp2[1];
		  }
		 str = data.data;
		 str2 = data2.data;
		 if(str == "single"){
			 console.log("single_node_deployment");
			 var params3 = url.split('?')[3].split('&');
			 for (var i = 0, l = params3.length; i < l; i++) {
			       tmp3 = params3[i].split('=');
			       data3[tmp[0]] = tmp3[1];
			  }
			 var str3 = data3.data;
			 var params4 = url.split('?')[4].split('&');
			 for (var i = 0, l = params3.length; i < l; i++) {
			       tmp4 = params4[i].split('=');
			       data4[tmp[0]] = tmp4[1];
			  }
			 var str4 = data4.data;
			 pvd_region = str4;
			 console.log(str3);
			 pvd_name = str3;
			 	if (str3 == "AWS"){
			 		 var tr = $('<tr/>');
			            tr.append("<td><img src='images_1/AWS_Logo.png'/></td>");	
			            tr.append("<td><span style='font-size:18px;font-weight:bold;'><span class='deploytempNa'>Name : </span>"+str2+"</span><br>Region : "+str4+"<br></td>");
			            $('table.temp_info').append(tr);
			            document.getElementById("regName").value=str4;
			            //$('td#tdkey').hide();
			            //$('td#tdkey1').hide();
			            show_singlenode(str2);			            
			            $('td#depClsrv').hide();
			            $('div.advancedOptionsDiv').hide();
			            $('table.nodeSel').hide();
			            $('div.advOpn').hide();
			            $('#scriptConfig').hide();
						$('#resGorup').hide();
						$('#stoAco').hide();
			 	}
			 	else{
			 		var tr = $('<tr/>');
		            tr.append("<td><img src='images_1/Windows_Azure_Logo.png'/></td>");	
		            tr.append("<td><span style='font-size:18px;font-weight:bold;'><span class='deploytempNa'>Name : </span>"+str2+"</span><br>Region : "+str4+"<br></td>");
		            $('table.temp_info').append(tr);
		            document.getElementById("regNameClsrv").value=str4;
		            show_singlenode(str2)
			 		$('td#depVpc').hide();
		            $('td#depSub').hide();
		            $('td#tdroute').hide();
		            $('td#tdroute1').hide();
		            $('div.advancedOptionsDiv').hide();
		            $('td#tdgateway').hide();
		            $('td#tdgateway1').hide();
		            $('td#tdkey').hide();
		            $('td#tdkey1').hide();
		            $('div.advancedOptionsDiv').hide();
		            $('div.advOpn').hide();
		            $('button.1stRowAdd').hide();
		            $('table.nodeSel').hide();
			 	}
		 }
		 else{
			 console.log("multi_node_deployment");
			 var template={};
			  template.tname=str2;
			  $.ajax({
				     type: 'POST',
					 jsonpCallback: "callback",
				     datatype: 'jsonp',
				     data: template,	 
				     url: _ip+'/pvd_template',
				     success: function(results) {
				    	 //console.log(results);
				    	 temp_info = results[0].Instances;
				    	 pvd_name = results[0].Cloud;
				    	 pvd_region = results[0].Region;
				    	 // Fucntion to check AWS or Azure
				    	 if(pvd_name == "AWS")
				         {
				    	 tr = $('<tr/>');
				            tr.append("<td><img src='images_1/AWS_Logo.png'/></td>");	
				            tr.append("<td><span style='font-size:18px;font-weight:bold;'><span class='deploytempNa'>Name : </span>"+results[0].Template_name+"</span><br>Region : "+results[0].Region+"<br>Provider : "+results[0].Cloud+"</td>");
				            $('table.temp_info').append(tr);
				            document.getElementById("regName").value=results[0].Region;
				            node_info=results[0].Instances;
				            show_nodeDetails(node_info);
				            $('td#depClsrv').hide();
				            $('td#stoAco').hide();
				            $('td#singlenode').hide();
				            $('td#instname').hide();
				            $('table.nodeSelSingle').hide();
				            $('#roleappend').hide();
				            $('#osappend').hide();
				            $('#scriptConfig').hide();
							$('#resGorup').hide();
							if(pvd_name == "AWS")
			            	{
			            		displayZones(pvd_name,pvd_region);
			            	}
				            
				         }
				    	 else
				    	 {
				    		 tr = $('<tr/>');
				    		 tr.append("<td><img src='images_1/Windows_Azure_Logo.png'/></td>");	
					            tr.append("<td><span style='font-size:18px;font-weight:bold;'><span class='deploytempNa'>Name : </span>"+results[0].Template_name+"</span><br>Region : "+results[0].Region+"<br>Provider : "+results[0].Cloud+"</td>");
					            $('table.temp_info').append(tr);
					            document.getElementById("regNameClsrv").value=results[0].Region;
					            document.getElementById("Location_Input_Id").value = results[0].Region;
					            node_info=results[0].Instances;
					            show_nodeDetails(node_info);
					            $('td#depVpc').hide();
					            $('td#depSub').hide();
					            $('div.routeAndGatWayConfiguration').hide();
					            $('div.latestUpdates').hide();
					            $('button.1stRowAdd').hide();
					            $('td#singlenode').hide();
					            $('td#instname').hide();
					            $('table.nodeSelSingle').hide();
				    	 }
				    	 },
					 error: function (xhr, status, error){
				        console.log('Failure');
						alert("failure");
						},
		 });
		 }
		 var template={};
		 template.type = str;
		 template.tname = str2;		 
			   });
		}
function displayZones(pname,region){
	//alert(pname);
	var p_name=pname;	
	var data = {};
    data.pname = p_name;
	   $.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/temp_region',
	     success: function(results) {
	    	//console.log(results);
	    	 var zones;
	    	 for(var i=0;i<results.length;i++)
	    		 {
	    		 	if(results[i].region_name == region)
	    		 		{
	    		 			zones = results[i].availability_zones;
	    		 		}
	    		 }
	    	 //console.log(zones);
	    	 var appendD = new DropdownConst();
				appendD.appendData(zones,"selsZn");
	    	
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });
}

/*function get_project(){
	$(function(){
		  $.getJSON('http://172.29.59.63:3000/project', function(data){
			   var proje = data;
			   var pj_Na=[];
			   for(var d=0; d<=proje.length-1; d++){				   			   
				    pj_Na [d] = data[d].p_name;				    			   
			   }
			   var appendD = new DropdownConst();
				appendD.appendData(pj_Na,"selspj");
		  });
	});
}*/

function getVpcName(){
	$(function(){
		  $.getJSON('http://172.29.59.63:3000/vpc_deploy', function(data){
			 //console.log(data);
			  var vpc_Name = [];
			 for(var x=0;x<data.length;x++)
				 {
				 	vpc_Name[x] = data[x].vpc_name+"/"+data[x].vpc_id;
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(vpc_Name,"selsvpc");
			   appendD.appendData(vpc_Name,"selsVpcSn");	
			   
		  });
	});
	
}
var zone;
function getSubnetName(vpcid){
	var id=vpcid;
	var subNetName1 = [];
	$(function(){
		  $.getJSON('http://172.29.59.63:3000/subnet_deploy', function(data){			  
			 for(var x=0;x<data.length;x++)
				 {
				 	if(data[x].vpc_id == id)
				 		{
				 			//subNetName1[x] = /*data[x].subnet_name+"/"+*/data[x].subnet_id;
							zone = data[x].availability_zone;
							var tT = document.getElementById("selssn");
								tT.innerHTML+='<li onclick="selectOpt(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data[x].subnet_name+"/"+data[x].subnet_id+'</dd></dl></li>';					
				 		}
				 }
			   //var appendD = new DropdownConst();
			   //appendD.appendData(subNetName1,"selssn");
		  });
		 
	});
}

//cloud service list changed code
function getCloudService(){
	$(function(){
		  $.getJSON('http://172.29.59.63:3000/list_cloud_service', function(data){
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
function getPublicIp(value, append){
	
	if(value == "My IP")
	{
	    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
	      function(json) {
	        var pubIp = json.ip;
	        document.getElementById("ipText"+append+"").value=pubIp+"/32";
	      }
	    );
	 
	}else if(value == "Anywhere")
		{
			var Anywhere = "0.0.0.0/0"
			document.getElementById("ipText"+append+"").value=Anywhere;
		}else{
			document.getElementById("ipText"+append+"").value="";
			$('#ipText'+append+'').focus();
		}
}
function iopsFunction(value,Id){
	var idNum = Id.substr(Id.length-3);
	var vType = document.getElementById("selstg"+idNum+"").innerText;
	if(vType == "General Purpose SSD")
		{	
			if(value >= 1 && value <= 3333)
				{
					var iops=value*3;
					document.getElementById("stgIops"+idNum+"").value=iops;
				}else{
					document.getElementById("stgIops"+idNum+"").value="10000";
				}
		}else if(vType == "Magnetic")
			{
				document.getElementById("stgIops"+idNum+"").value="NA";
			}
}
function fortCheckFunction(value, Id){
	//alert(value+""+Id);
	if(value < 0 || value > 65535)
		{
			$('#'+Id+'').val("");
		}
}

/*-------------Azure resource group functions-----------------*/
//Get the Azure resource groups
function getResources(){
	$(function(){
		  $.getJSON(_ip+'/getResource', function(data){
			 //console.log(data);
			 var resGp = [];
			 for(var resG=0;resG<data.length;resG++)
			 {
				 resGp[resG] = data[resG].resourcegroup;
			 }
			 var appendD = new DropdownConst();
			 appendD.appendData(resGp,"resgs");
			 
			 
		  });
	});
}
//Get virtual network
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
			appendD.appendData(vNetwork,"vnets");
		});
	});
}
//Get the subnet of the resource group
function getSubnet(){
	$(function(){
		$.getJSON(_ip+'/getSubnet', function(data){
			var subnet = [];
			for(snet=0;snet<data.length;snet++)
			{
				subnet[snet] = data[snet].subnet_conf_name;
			}
			var appendD = new DropdownConst();
			appendD.appendData(subnet,"snets");
		});
	});
}


$('#clsc_check, #rsg_check').on('change', function(){
		console.log(this.id);
		if(this.id == "clsc_check"){$('#classic').show();$('#resource').hide();
		}else{$('#resource').show();$('#classic').hide();}
	})
function show_nodeDetails(data){
	for(var i=0;i<data.length;i++)
		{
			 var tr = $('<tr/>');
	         tr.append("<td>"+data[i].node+"</td>");
	         tr.append("<td>"+data[i].image+"</td>");
	         tr.append("<td>"+data[i].role+"</td>");
	         tr.append("<td><div class='input-group spinner pull-left count_1'><input id='count"+i+"' type='text' class='form-control' value='1'><div class='input-group-btn-vertical'>"
	        		 +"<button class='btn btn-default up_1' type='button'><i class='fa glyphicon glyphicon-triangle-top'></i></button>"
	         		 +"<button class='btn btn-default down_1' type='button'><i class='fa glyphicon glyphicon-triangle-bottom'></i></button>"
	         		 +"</div></div><button class='redButton pull-left countAlign 1stRowAdd' id='add"+i+"' name='add_"+i+"'>Add</button>"
	        		 +"</td>");
	         tr.append("<td>No</td>");
	         $('table.nodeSel').append(tr);
	         
	         var tr1 = $('<tr class="closeConfig add_'+i+'"/>');
	         tr1.append("<td colspan='5' style='padding: 2px 10px;'></td>");
	         $('tabel.nodeSel').append(tr1);
		
			var tr2 = $('<tr class="closeConfig add_'+i+'"/>');
			tr2.addClass();
			tr2.append("<td style='padding:0px;' colspan='5'>" 
					  +"<table style='width:100%;'>"
					  +"<tr><td style='padding:0px;width:250px;vertical-align: top;background-color:#FBFBFB;'>"
					  +"<div class='col-lg-12 col-md-12 col-sm-12 content_box padZero padAllSides' id='latestUpdates'>"
					  +"<ul id='latestUpdatesTab' class='nav nav-tabs hidden-xs'><li class='active addStoTab'><a href='#alerts"+i+"' data-toggle='tab'>Add Storage</a></li><li><a href='#requests"+i+"' data-toggle='tab'>Security Groups</a></li><li><a href='#publicIp"+i+"' data-toggle='tab'>Public IP</a></li><li class='pull-right'>"
					  +"<button type='button' class='close redLinks closeRoleConfi' name='add_"+i+"' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>x</span></button></li>"
					  +"</ul><div class='panel-group visible-xs' id='latestUpdatesTab-accordion'></div>"
					  +"<div class='tab-content hidden-xs'>"
					  
					  +"<div class='tab-pane fade  in active alignAllsides' id='alerts"+i+"'>"
					  +"<div class='roleID '><div class='pull-left'><label class='labelTemp'>Volume Type</label><div id='selstg"+i+"_0' class='clickRole borderNoN'><span>Select</span><ul id='selsstg"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Volume Size</label><div class='clickRole addStoTabWid'><input type='number' onchange='iopsFunction(this.value, this.id)' id='stgsz"+i+"_0' min='1' style='border:none;width:100%;'/></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>IOPS</label><div class='clickRole addStoTabWid'><input type='Text' id='stgIops"+i+"_0' placeholder='' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Volume Name</label><div class='clickRole addStoTabWid'><input id='stgName"+i+"_0' type='text' style='border:none;width:100%;'></div></div></div>"
					  +"<span class='glyphicon glyphicon-plus-sign' onclick='createVol("+i+");' id='addRole' style='color:#999999;'></span></a>"
					  //+"</div>"
					  +"<div class='tab-pane fade in active alignAllsides' id='dup"+i+"'><br></br></div>"
					  //+"</div>"
					  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign disk"+i+"' id='storage"+i+"_0' onclick='createStgFunction(this.id, "+i+")'>Create</button></div>"
					  +"</div>"
					  
					  
					  +"<div class='tab-pane fade alignAllsides' id='requests"+i+"'>"
					  //+"<div><form class='' id='rbtn"+i+"'><label class='radio-inline'> <input type='radio' name='inlineRadioOptions' checked='checked' id='inlineRadio1"+i+"' value='option1'>Create New </label><label class='radio-inline'> <input type='radio' name='inlineRadioOptions' id='inlineRadio2"+i+"' value='option2'>Use Old </label></form></div>"
					  +"<div class='CreateNewSecurity CreateSec"+i+"' ><div class='roleId'><div class='pull-left'><div id='selsg"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsgn"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div></div>"
					  //+"<div style='' class='securityGr' id='securityGrIDD"+i+"'><div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Name</label><div class='clickRole addStoTabWid'><input type='text' id='sgName"+i+"' style='border:none;width:100%;'></div></div></div>"
					  //+"<div class='roleID'><div class='pull-left'><label class='labelTemp'>Rule</label><div id='selrl"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selrle"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
      				  //+"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>From Port</label><div class='clickRole addStoTabWid'><input id='sgFPort"+i+"' type='number' min='0' placeholder='0 - 65535' onchange='fortCheckFunction(this.value, this.id)' style='border:none;width:100%;'></div></div></div>"
					  //+"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Port</label><div class='clickRole addStoTabWid'><input id='sgTPort"+i+"' type='number' min='0' placeholder='0 - 65535' onchange='fortCheckFunction(this.value, this.id)' style='border:none;width:100%;'></div></div></div>"
					  //+"<div class='roleID'><div class='pull-left'><label class='labelTemp'>CIDR IP</label><div id='selci"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsci"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  //+"<div class='operatingSys"+i+"'><div class='pull-left'><label class='labelTemp'></label><div class='clickRole addStoTabWid'><input id='ipText"+i+"' type='text' style='border:none;width:100%;'></div></div>"
					  //+"<a href='#' style='margin-top: 26px;display: inline-block;'><span class='glyphicon glyphicon-plus-sign addMoreSecuGro' id='"+i+"' style='font-size:23px;color:#999999;'></span></a>"
					  //+"</div>"					 
					  //+"</div>"
					  //+"<div class='addMorehere"+i+"'></div>"
					  //+"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='secGroup"+i+"' onclick='createSgpFunction(this.id, "+i+")'>Create</button></div>"
					  +"</div>"
	
					 /* +"<div class='tab-pane fade alignAllsides' id='svpTweet"+i+"'>"
					  +"<div><form class='' id='rbtnkp"+i+"'><label class='radio-inline'> <input type='radio' id='key_Create"+i+"' name='inlineRadioOptions' checked='checked' id='inlineRadio1"+i+"' value='option1'>Create New </label><label class='radio-inline'> <input type='radio' id='key_Old"+i+"' name='inlineRadioOptions' id='inlineRadio2"+i+"' value='option2'>Use Old </label></form></div>"
					  +"<div id='KeyNew"+i+"' class='operatingSys'><div class='pull-left'><label class='labelTemp'>Key Name</label><div class='clickRole addStoTabWid'><input id='keyPairName"+i+"' type='text' style='border:none;width:100%;'></div></div></div>"
					  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='keyPair"+i+"' onclick='createKpFunction(this.id, "+i+")'>Create</button></div>"
					  +"<div class='CreateNewSecurity' id='keyOld"+i+"'><div class='roleID'><div class='pull-left'><label class='labelTemp'></label><div id='selkp"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selskp"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  +"</div></div>"*/
					  
					  +"<div class='tab-pane fade alignAllsides' id='publicIp"+i+"'>"
					  +"<div class='operatingSys'><div class='pull-left'><div class='checkB addStoTabWid'><form id='ip"+i+"'><input type='radio' name='pubIp' value='Yes' style='border:none'/>Yes<input name='pubIp' type='radio' value='No' checked style='border:none'/>No</form></div></div></div>"
					  +"</div>"
					  
					  +"</div></div>"
					  +"</td></tr></table>"
					  +"</td>");
			$('table.nodeSel').append(tr2);
			//addRow(i);
			var appendD = new DropdownConst();
			appendD.appendData(volumeType,"selsstg"+i+"");
			//appendD.appendData(cidrIp,"selsci"+i+"");
			//appendD.appendData(rule,"selrle"+i+"");
		}
	
	//$(".nodeSel tr:nth-child(odd)").css({'background-color':'#f7f7f7'})
	$(".nodeSel tr:nth-child(even)").css({'background-color':'#eee'})
	function HideAndShow_Constructor(clickedElement,hideAndShowElement){
		this.clickedElement=clickedElement;
		this.hideAndShowElement=hideAndShowElement;
	}	
	HideAndShow_Constructor.prototype.defaultHide = function(){
			var adv = $("."+this.hideAndShowElement);
				adv.hide();
	}
	/*HideAndShow_Constructor.prototype.showActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
			
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideDown();
			});
	}*/
	HideAndShow_Constructor.prototype.hideActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideUp();
			});		
	}
	HideAndShow_Constructor.prototype.toggleHandS = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideToggle();
			});
	}
	var adVanOp = new HideAndShow_Constructor("advancedOptions","advancedOptionsDivCon");
		adVanOp.defaultHide();
		adVanOp.toggleHandS();
		
	var adVan = new HideAndShow_Constructor("closeAdvan","advancedOptionsDivCon");
		adVan.hideActionOnly();
		
	/*var closeRoleConfi = new HideAndShow_Constructor("closeRoleConfi","closeConfig");
		closeRoleConfi.hideActionOnly();*/
	
	var addRole = new HideAndShow_Constructor("1stRowAdd","closeConfig");
		addRole.defaultHide();
		//Role.showActionOnly();

	/*var elesticRow = new HideAndShow_Constructor("","addClonedElements");
		elesticRow.defaultHide();

	var elesticRow = new HideAndShow_Constructor("addMoreElastitcIP","addClonedElements");
		elesticRow.showActionOnly();
		
	var hideClonedRow = new HideAndShow_Constructor("removeElastitcIP","addClonedElements");
		hideClonedRow.hideActionOnly();*/
		$(".1stRowAdd").click(function(){
			var na = $(this).attr("name");
			$("."+na).show();
			console.log(na);
		});
		
		$(".close").click(function(){
			var na = $(this).attr("name");
			$("."+na).hide();
			console.log(na);
		});

		
		$(".up_1").click(function(e){
			   var vv = $(this).parent().parent().children("input[type='text']");
			   var valu = vv.val();
			    valu == 10 ? false : valu++;   
			    vv.val(valu);
			  });
		$(".down_1").click(function(e){
			   var vv = $(this).parent().parent().children("input[type='text']");
			   var valu = vv.val();
			    valu == 0 ? false : valu--;
			    vv.val(valu);
			  });
		/*$(".clickRole").click(function(){
			$(this).find(".dropDown").slideToggle();
		})*/
	
		
		
		/*$(".CreateNewSecurity").hide();
	$('[name="inlineRadioOptions"]').click(function(){
		var th = $(this).attr("id");
		//console.log(th);
		var pos = th.charAt(th.length-1);
		if(th == "inlineRadio2"+pos+""){
			$(".CreateSec"+pos+"").show();
			$("#securityGrIDD"+pos+"").hide();
			$("#secGroup"+pos+"").hide();
		}else if(th == "inlineRadio1"+pos+""){
			$("#securityGrIDD"+pos+"").show()
			$(".CreateSec"+pos+"").hide();
			$("#secGroup"+pos+"").show();
		}
	})*/
	
		/*$(".CreateNewSecurity").hide();
			$('[name="inlineRadioOptions"]').click(function(){
				var th = $(this).attr("id")
				//console.log(th);
				 pos = th.charAt(th.length-1);
				if(th == "key_Old"+pos+""){
					$("#keyOld"+pos+"").show();
					$("#KeyNew"+pos+"").hide();
					$("#keyPair"+pos+"").hide();
				}else if(th == "key_Create"+pos+""){
					$("#KeyNew"+pos+"").show();
					$("#keyOld"+pos+"").hide();
					$("#keyPair"+pos+"").show();
				}
			})
			var i = 0;
			$(".addMoreSecuGro").click(function(e){
				e.preventDefault();
				i++;
				var cl = $("#securityGrIDD"+this.id+"").clone();
				console.log(cl);
				cl.find("#securityGrIDD"+this.id+"");
				cl.attr("id","securityGrIDD_"+i);
				cl.find(".glyphicon-plus-sign").addClass("glyphicon-minus-sign")
				cl.find(".glyphicon-plus-sign").attr("title", "securityGrIDD_"+i);
				cl.find(".glyphicon-plus-sign").on("click", closeThis);
				$(".addMorehere"+this.id+"").append(cl);
			});*/
			function closeThis(e){
				e.preventDefault();
				var myName = $(this).attr("title");
				$("#"+myName).remove();
			}
}
var inc = 1;
function createVol(num){
	var id = num;
	alert(id);
	var epn = document.getElementById("dup"+id+"");
	epn.innerHTML+="<div style='clear:both;'>&nbsp;</div><div id = 'attach"+id+"_"+inc+"'><div class='roleID '><div class='pull-left'><div id='selstg"+id+"_"+inc+"' class='clickRole borderNoN'><span>Select</span><ul id='selsstg"+id+"_"+inc+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					+"<div class='operatingSys'><div class='pull-left'><div class='clickRole addStoTabWid'><input type='number' onchange='iopsFunction(this.value, this.id)' id='stgsz"+id+"_"+inc+"' min='1' style='border:none;width:100%;'/></div></div></div>"
					+"<div class='operatingSys'><div class='pull-left'><div class='clickRole addStoTabWid'><input type='Text' id='stgIops"+id+"_"+inc+"' placeholder='' style='border:none;width:100%;'></div></div></div>"
					+"<div class='operatingSys'><div class='pull-left'><div class='clickRole addStoTabWid'><input id='stgName"+id+"_1' type='text' style='border:none;width:100%;'></div></div></div>"
					+"<span class='glyphicon glyphicon-minus-sign' onclick='deleteVol(this,"+id+");' id='addRole' style='color:#999999;'></span>"
					+"</div>"
					
					
	var appendD = new DropdownConst();				
	appendD.appendData(volumeType,"selsstg"+id+"_"+inc+"");
	document.getElementById("storage"+id+"_"+(inc-1)+"").id = "storage"+id+"_"+inc+"";
	inc++;
	/*$(".clickRole").click(function(){
			$(this).find(".dropDown").slideToggle();
		})*/	
}
function deleteVol(row, n){
	var pn = row.parentNode;
	var id = pn.id;
	alert(n);
	$("#"+id).remove();
	inc--;
	document.getElementById("storage"+n+"_"+(inc)+"").id = "storage"+n+"_"+(inc-1)+"";
	
}

function show_singlenode(data){
	console.log(data);
	var i =0;
	 var tr = $('<tr/>');
     tr.append("<td>"+data+"</td>");
     tr.append("<td><div id='roleappend' class='pull-left'><span></span><label id='image' class='labelTemp'></label><div id='selImag' class='clickRole borderNoN temp1stRowWid'><span>Select</span><ul id='selImage' class='dropDown'></ul><span id='image' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></td>");
     tr.append("<td><div class='input-group spinner pull-left count_1'><input type='text' class='form-control' value='1'><div class='input-group-btn-vertical'>"
    		 +"<button class='btn btn-default up_1' type='button'><i class='fa glyphicon glyphicon-triangle-top'></i></button>"
     		 +"<button class='btn btn-default down_1' type='button'><i class='fa glyphicon glyphicon-triangle-bottom'></i></button>"
     		 +"</div></div><button class='redButton pull-left countAlign 1stRowAdd' name='add_"+0+"'>Add</button>"
    		 +"</td>");
     
     $('table.nodeSelSingle').append(tr);
     
     var tr1 = $('<tr class="closeConfig add_'+i+'"/>');
     tr1.append("<td colspan='5' style='padding: 2px 10px;'></td>");
     $('tabel.nodeSelSingle').append(tr1);

	var tr2 = $('<tr class="closeConfig add_'+i+'"/>');
	tr2.addClass();
	tr2.append("<td style='padding:0px;' colspan='5'>" 
			  +"<table style='width:100%;'>"
			  +"<tr><td style='padding:0px;width:250px;vertical-align: top;background-color:#FBFBFB;'>"
			  +"<div class='col-lg-12 col-md-12 col-sm-12 content_box padZero padAllSides' id='latestUpdates'>"
			  +"<ul id='latestUpdatesTab' class='nav nav-tabs hidden-xs'><li class='active addStoTab'><a href='#alerts"+0+"' data-toggle='tab'>Add Storage</a></li><li><a href='#requests"+0+"' data-toggle='tab'>Security Groups</a></li><li><a href='#publicIp"+0+"' data-toggle='tab'>Public IP</a></li><li class='pull-right'>"
			  +"<button type='button' class='close redLinks closeRoleConfi' name='add_"+0+"' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>x</span></button></li>"
			  +"</ul><div class='panel-group visible-xs' id='latestUpdatesTab-accordion'></div>"
			  +"<div class='tab-content hidden-xs'>"
			  
			  +"<div class='tab-pane fade  in active alignAllsides' id='alerts"+i+"'>"
			  +"<div class='roleID '><div class='pull-left'><label class='labelTemp'>Volume Type</label><div id='selstg"+i+"_0' class='clickRole borderNoN'><span>Select</span><ul id='selsstg"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Volume Size</label><div class='clickRole addStoTabWid'><input type='number' onchange='iopsFunction(this.value, this.id)' id='stgsz"+i+"_0' min='1' style='border:none;width:100%;'/></div></div></div>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>IOPS</label><div class='clickRole addStoTabWid'><input type='Text' id='stgIops"+i+"_0' placeholder='' style='border:none;width:100%;'></div></div></div>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Volume Name</label><div class='clickRole addStoTabWid'><input id='stgName"+i+"_0' type='text' style='border:none;width:100%;'></div></div></div>"
			  +"<span class='glyphicon glyphicon-plus-sign' onclick='createVol("+i+");' id='addRole' style='color:#999999;'></span></a>"
			  //+"</div>"
			  +"<div class='tab-pane fade in active alignAllsides' id='dup"+i+"'><br></br></div>"
			  //+"</div>"
			  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign disk"+i+"' id='storage"+i+"_0' onclick='createStgFunction(this.id, "+i+")'>Create</button></div>"
			  +"</div>"
			  
			  
			  +"<div class='tab-pane fade alignAllsides' id='requests"+i+"'>"
			  +"<div class='CreateNewSecurity CreateSec"+i+"' ><div class='roleId'><div class='pull-left'><div id='selsg"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsgn"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div></div>"
			  /*+"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Name</label><div class='clickRole addStoTabWid'><input type='text' id='sgName"+0+"' style='border:none;width:100%;'></div></div></div>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>From Port</label><div class='clickRole addStoTabWid'><input id='sgFPort"+0+"' type='text' style='border:none;width:100%;'></div></div></div>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>To Port</label><div class='clickRole addStoTabWid'><input id='sgTPort"+0+"' type='text' style='border:none;width:100%;'></div></div></div>"
			  +"<div class='roleID'><div class='pull-left'><label class='labelTemp'>CIDR IP</label><div id='selci"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsci"+0+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'></label><div class='clickRole addStoTabWid'><input id='ipText"+0+"' type='text' style='border:none;width:100%;'></div></div></div>"
			  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='secGroup"+i+"' onclick='createSgpFunction(this.id, "+0+")'>Create</button></div>"*/
			  +"</div>"
			  
			  /*+"<div class='tab-pane fade alignAllsides' id='svpTweet"+i+"'>"
			  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Key Name</label><div class='clickRole addStoTabWid'><input id='keyPairName"+i+"' type='text' style='border:none;width:100%;'></div></div></div>"
			  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='keyPair"+i+"' onclick='createKpFunction(this.id, "+i+")'>Create</button></div>"
			  +"</div>"*/
			  
			  +"<div class='tab-pane fade alignAllsides' id='publicIp"+i+"'>"
			  +"<div class='operatingSys'><div class='pull-left'><div class='checkB addStoTabWid'><form id='ip"+i+"'><input type='radio' name='pubIp' value='Yes' style='border:none'/>Yes<input name='pubIp' type='radio' value='No' checked style='border:none'/>No</form></div></div></div>"
			  +"</div>"
			  
			  +"</div></div>"
			  +"</td></tr></table>"
			  +"</td>");
	$('table.nodeSelSingle').append(tr2);
	//addRow(i);
	var appendD = new DropdownConst();
	appendD.appendData(volumeType,"selsstg"+i+"");
	//var appendD = new DropdownConst();
	//appendD.appendData(volumeType,"selsstg"+i+"");
	//appendD.appendData(cidrIp,"selsci"+i+"");


		//$(".nodeSel tr:nth-child(odd)").css({'background-color':'#f7f7f7'})
		$(".nodeSelSingle tr:nth-child(even)").css({'background-color':'#eee'})
		function HideAndShow_Constructor(clickedElement,hideAndShowElement){
		this.clickedElement=clickedElement;
		this.hideAndShowElement=hideAndShowElement;
		}	
		HideAndShow_Constructor.prototype.defaultHide = function(){
			var adv = $("."+this.hideAndShowElement);
				adv.hide();
		}
		/*HideAndShow_Constructor.prototype.showActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
			
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideDown();
			});
		}*/
		HideAndShow_Constructor.prototype.hideActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideUp();
			});		
		}
		HideAndShow_Constructor.prototype.toggleHandS = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideToggle();
			});
		}
		var adVanOp = new HideAndShow_Constructor("advancedOptions","advancedOptionsDivCon");
		adVanOp.defaultHide();
		adVanOp.toggleHandS();
		
		var adVan = new HideAndShow_Constructor("closeAdvan","advancedOptionsDivCon");
		adVan.hideActionOnly();
		
		/*var closeRoleConfi = new HideAndShow_Constructor("closeRoleConfi","closeConfig");
		closeRoleConfi.hideActionOnly();*/
		
		var addRole = new HideAndShow_Constructor("1stRowAdd","closeConfig");
		addRole.defaultHide();
		//addRole.showActionOnly();
		
		/*var elesticRow = new HideAndShow_Constructor("","addClonedElements");
		elesticRow.defaultHide();
		
		var elesticRow = new HideAndShow_Constructor("addMoreElastitcIP","addClonedElements");
		elesticRow.showActionOnly();
		
		var hideClonedRow = new HideAndShow_Constructor("removeElastitcIP","addClonedElements");
		hideClonedRow.hideActionOnly();*/
		$(".1stRowAdd").click(function(){
			var na = $(this).attr("name");
			$("."+na).show();
			//console.log(na);
		});
		
		$(".close").click(function(){
			var na = $(this).attr("name");
			$("."+na).hide();
			//console.log(na);
		});
		
		
		/*$(".up_1").click(function(e){
			   var vv = $(this).parent().parent().children("input[type='text']");
			   var valu = vv.val();
			    valu == 10 ? false : valu++;   
			    vv.val(valu);
			  });
		$(".down_1").click(function(e){
			   var vv = $(this).parent().parent().children("input[type='text']");
			   var valu = vv.val();
			    valu == 0 ? false : valu--;
			    vv.val(valu);
			  });
		$(".clickRole").click(function(){
			$(this).find(".dropDown").slideToggle();
		})	*/	
}
$(".closeAlert").click(function(){
	$(".alertS div.alert").stop().slideUp();
})
$('#createVpc').click(function(){
	
    var region = document.getElementById("regName").value;
	var cidr = document.getElementById("cidrBlk").value;
	var vpc = document.getElementById("vpcName").value;
	var tenancy = document.getElementById("selTn").innerText
	if(cidr == "" || cidr == null)
		{
			document.getElementById("cidrBlk").style.border="thin dashed #0099FF";
			return;
		}else if(vpc == "" || vpc == null)
			{
			document.getElementById("vpcName").style.border="thin dashed #0099FF";
			return;
			}else if(tenancy == "Select")
				{
				document.getElementById("selTn").style.border="thin dashed #0099FF";
				return;
				}
	var data={};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.region = region;
	data.cidr = cidr;
	data.vpc = vpc;
	data.tenancy = tenancy;
	data.provider = pvd_name;
	//console.log(data);
	
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/vpc',
        success: function(data, textStatus){
        	console.log(data);
        	$(".popupData").hide();
    		$(".popData").hide();
	    	 $(".alert-vpc").stop().slideDown();
	    	 getVpcName();
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
})


var zone;
$('#createSubnet').click(function(){
	alert("In Create subnet page");
	var snName = document.getElementById("nameTag").value;
	var cidrBlkSn = document.getElementById("cidrBlkSn").value;
	var snVpc = document.getElementById("selVpcSn").innerText;
	var snZone = document.getElementById("selZn").innerText;
	//console.log(snName+cidrBlkSn+snVpc+snZone+pvd_region);
	zone = snZone;
	if(snName == "" || snName == null)
	{
		document.getElementById("nameTag").style.border="thin dashed #0099FF";
		return;
	}else if(cidrBlkSn == "" || cidrBlkSn == null)
		{
		document.getElementById("cidrBlkSn").style.border="thin dashed #0099FF";
		return;
		}else if(snVpc == "Select")
			{
			document.getElementById("selVpcSn").style.border="thin dashed #0099FF";
			return;
			}else if(snZone == "Select")
				{
				document.getElementById("selZn").style.border="thin dashed #0099FF";
				return;
				}
	
	var data={};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.cidrBlkSn = cidrBlkSn;
	data.snVpc = snVpc;
	data.snName = snName;
	data.snZone = snZone;
	
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/subnet',
        success: function(data, textStatus){
        	console.log(data);
        	$(".popupData").hide();
    		$(".popData1").hide();
        	 $(".alert-subnet").stop().slideDown();
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
})

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
			  
			   //alert("Cloud Service Created");		   
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
})
$('.buttonRt').click(function(){

	var routeName = document.getElementById("routeName").value;
	var vpcId1 = document.getElementById("selvpc").innerText;
	var subnetId1 = document.getElementById("selsn").innerText;
	//alert(vpcId1);
	if(vpcId1 == "Select")
		{
			document.getElementById("selvpc").style.border="thin dashed #0099FF";
			return;
		}else if(subnetId1 == "Select")
			{
				document.getElementById("selsn").style.border="thin dashed #0099FF";
				return;
			}else if(routeName == null || routeName == "")
				{
					$('#routeName').focus()
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
	data.routeSubnet = subnetId;
	//console.log(routeName+routeVpc+pvd_name);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/routeTable',
        success: function(data, textStatus){
        	console.log(data);
        	$(".alert-route").stop().slideDown();
        	document.getElementById("buttonRt").disabled=true;
        	
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
})
$('.buttonGtw').click(function(){

	var gtWayName = document.getElementById("gateWayName").value;
	if(gtWayName == null || gtWayName == "")
		{
		$('#gateWayName').focus()
		return;
		}
	var data = {};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.gtWayName = gtWayName;
	data.gtWayVpc = vpcId;
	//console.log(gtWayName+gtWayVpc+pvd_name);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/gateWay',
        success: function(data, textStatus){
        	console.log(data);
        	$(".alert-gate").stop().slideDown();
        	document.getElementById("buttonGtw").disabled=true;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
})

function createStgFunction(buttonId, Id){
	
	var str = buttonId
	    ,finalData = {};
	var idNum = str.substr(str.length-3);
	var res = idNum.split("_");
	for(var i=0;i<=res[1];i++)
	{
		//alert(i);
		var vType = document.getElementById("selstg"+res[0]+"_"+i+"").innerText;
		var vSize = document.getElementById("stgsz"+res[0]+"_"+i+"").value;
		var vIops = document.getElementById("stgIops"+res[0]+"_"+i+"").value;
		var vName = document.getElementById("stgName"+res[0]+"_"+i+"").value
		if(vType == "Select")
			{
			document.getElementById("selstg"+res[i]+"_"+i+"").style.border="thin dashed #0099FF";
			return;
			}else if(vSize == null || vSize == "" || vSize > 16384)
				{
					$('#stgsz'+Id+'_'+i+'').attr("placeholder", "1-16384 GiB").val("").focus().blur();
					return;
				}else if(vType =="Magnetic" && (vSize == null || vSize == "" || vSize > 1024))
					{
						$('#stgsz'+Id+'_'+i+'').attr("placeholder", "1-1024 GiB").val("").focus().blur();
						return;
					}else if(vName == "" || vName == null)
					{
						$('#stgName'+Id+'_'+i+'').focus();
						return;
					}
		var data = {};
		data.accountName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.provider = pvd_name;
		data.region = pvd_region;
		data.vType = vType;
		data.vSize = vSize;
		data.vIops = vIops;
		data.vName = vName;
		data.vZone = zone;
		//data.vZone = "us-east-1d";
	
	console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createStorage',
        success: function(data, textStatus){
        	console.log(data);
        	$(".alert-stg").stop().slideDown();
        	//document.getElementById("storage"+Id+"").disabled=true;
			inc = 1;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
	}	
}
function createSgpFunction(buttonId, Id){
	
	var sgName = document.getElementById("sgName"+Id+"").value;
	var sgFPort = document.getElementById("sgFPort"+Id+"").value;
	var sgTPort = document.getElementById("sgTPort"+Id+"").value;
	var sgCidrIp = document.getElementById("ipText"+Id+"").value;
	var cidr = document.getElementById("selci"+Id+"").innerText;
	var vpcId1 = document.getElementById("selvpc").innerText;
	var vpcId = vpcId1.split("/");
	if (sgName == "" || sgName == null)
		{
			$('#sgName'+Id+'').focus()
			return;
		}else if(sgFPort == "" || sgFPort == null)
			{
				$('#sgFPort'+Id+'').focus();
				return;
			}else if(sgTPort == "" || sgTPort == null)
				{
					$('#sgTPort'+Id+'').focus();
					return;
				}else if(cidr == "Select")
				{
					document.getElementById("selci"+Id+"").style.border="thin dashed #0099FF";
					return;
				}
	
	var data = {};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.provider = pvd_name;
	data.region = pvd_region;
	data.sgName = sgName;
	data.sgFPort = sgFPort;
	data.sgTPort = sgTPort;
	data.sgCidrIp = sgCidrIp;
	data.vpcId = vpcId[1];
	//console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createSecGroup',
        success: function(data, textStatus){
        	console.log(data);
        	$(".alert-sg").stop().slideDown();
        	document.getElementById("secGroup"+Id+"").disabled=true;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}
function createKpFunction(buttonId, Id){
	var keyPair = document.getElementById("keyPairName"+Id+"").value;
	if(keyPair == null || keyPair == "")
		{
		$('#keyPairName'+Id+'').focus()
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
        	console.log(data);
        	$(".alert-kp").stop().slideDown();
        	document.getElementById("keyPair"+Id+"").disabled=true;
        	
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}
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
$('#deploy').click(function(e) {
//function deployFunction(){
	//alert("In deploy function");
	e.preventDefault();
	var pvName = pvd_name;
	if(pvName == "AWS")
	{
		console.log("This is AWS template");
		var region = pvd_region;
		var pvName = pvd_name;
		var region = pvd_region;
		var envName = document.getElementById("sel").innerText;
		//var prjName = document.getElementById("selpj").innerText;
		var prdName = localStorage.getItem("ProjectName");
		var vpcId1 = document.getElementById("selvpc").innerText;
		var vpcId = vpcId1.split("/"); 
		var subnetId1 = document.getElementById("selsn").innerText;
		var subnetId = subnetId1.split("/"); 
		//var routeName = document.getElementById("routeName").value;
		//var gateName = document.getElementById("gateWayName").value;
		var routeName = document.getElementById("rtTab").innerText;
		var gateName = document.getElementById("gtw").innerText;
		if(envName == "Select")
			{
			document.getElementById("sel").style.border="thin dashed #0099FF";
			return;
			}
		if(str == "multi")
		{	
			//alert("Multi node deployment");
			for(var i=0;i<temp_info.length;i++)
				{
					//var stgName = document.getElementById("stgName"+i+"").value;
					var dsk = document.querySelector('.disk'+i+'').id;
					var dskNo = dsk.substr(dsk.length-3),
					    dskLoop = dskNo.split("_");
						//alert(dskLoop.length)
						for(j=0;j<=dskLoop[1];j++)
						{
							//var stgName = document.getElementById("stgName"+dskLoop[0]+"_"+i+"").value
						}
					
					//var stgName = document.getElementById("stgName0_0").value;
					var count = document.getElementById("count"+i+"").value;
					var form = document.getElementById("ip"+i+"");
					var pIp=form.elements["pubIp"].value;
					//var form1 = document.getElementById("rbtn"+i+"");
					//var selopt = form1.elements["inlineRadioOptions"].value;
					//if(selopt == "option1")
						//{
						//var sgName = document.getElementById("sgName"+i+"").value;
						//}else{
							var sgName = document.getElementById("selsg"+i+"").innerText;
						//}
					/*var form2 = document.getElementById("rbtnkp"+i+"");
					var selopt2 = form2.elements["inlineRadioOptions"].value;
					if(selopt2 == "option1")
						{
							var keyPairName = document.getElementById("keyPairName"+i+"").value
						}else{
								var keyPairName = document.getElementById("selkp"+i+"").innerText;
						}*/
					/*if(!($('#storage'+i+'').prop('disabled')) ) { 
			            //alert('disabled');
						document.getElementById("add"+i+"").style.border="thin dashed #0099FF";
						return;
			        }else if(!($('#secGroup'+i+'').prop('disabled'))){
			        	document.getElementById("add"+i+"").style.border="thin dashed #0099FF";
						return;
			        }*/
				}
		}else
			{
				alert("Singlr node deploymnet");
			}
		 
		
	}else
		{
		console.log("This is Azure template");
		var envName = document.getElementById("sel").innerText;
		//var prjName = document.getElementById("selpj").innerText;
		var CloudName = document.getElementById("selClsrv").innerText;		
		}
	deployTemplateFunction();
});

function deployTemplateFunction()
{
		//alert("In deploy function");
		var pvName = pvd_name;
		console.log(pvd_name);
		if(pvName == "AWS")
		{
			console.log("This is AWS template1");
			var region = pvd_region;
			var result_arr = [];
			var pvName = pvd_name;
			var region = pvd_region;
			var envName = document.getElementById("sel").innerText;
			//var prjName = document.getElementById("selpj").innerText;
			var accName = localStorage.getItem("Account");
			var prjName = localStorage.getItem("ProjectName");
			var prdName = localStorage.getItem("ProductName");
			var vpcId1 = document.getElementById("selvpc").innerText;
			var vpcId = vpcId1.split("/");
			var subnetId1 = document.getElementById("selsn").innerText;
			var subnetId = subnetId1.split("/");
			//var routeName = document.getElementById("routeName").value;
			//var gateName = document.getElementById("gateWayName").value;
			//var keyPairName = document.getElementById("keyPairName0").value
			var routeName = document.getElementById("rtTab").innerText;
			var gateName = document.getElementById("gtw").innerText;
			var keyPairName = document.getElementById("kp").innerText;
			if(envName == "Select")
				{
				document.getElementById("sel").style.border="thin dashed #0099FF";
				return;
				}
			console.log(pvName+region+envName+prdName+vpcId[1]+subnetId[1]+routeName+gateName);
			result_arr.push(pvName,"create_env", region,envName,accName,prjName,prdName,vpcId[1],subnetId[1],routeName,gateName,keyPairName);
			
			
			var resultObj1 = [],disks1 = [];
			if(str == "multi")
			{
				//alert("Multi node deployment");
				for(var i=0;i<temp_info.length;i++)
					{
						var resultObj = [],disks = [];
						var dsk = document.querySelector('.disk'+i+'').id;
						var dskNo = dsk.substr(dsk.length-3),
					    dskLoop = dskNo.split("_");
						console.log(dskLoop);
						for(j=0;j<=dskLoop[1];j++)
						{
							var stgName = document.getElementById("stgName"+dskLoop[0]+"_"+j+"").value;
							//alert(stgName);
							disks.push(stgName);
						}
						disks1.push(disks);
						//var stgName = document.getElementById("stgName"+i+"").value;stgName0_0
						//var stgName = document.getElementById("stgName0_0").value;
						var count = document.getElementById("count"+i+"").value;
						var form = document.getElementById("ip"+i+"");
						var pIp=form.elements["pubIp"].value;
						//var form1 = document.getElementById("rbtn"+i+"");
						//var selopt = form1.elements["inlineRadioOptions"].value;
						//if(selopt == "option1")
							//{
							//var sgName = document.getElementById("sgName"+i+"").value;
							//}else{
								var sgName = document.getElementById("selsg"+i+"").innerText;
							//}
						/*var form2 = document.getElementById("rbtnkp"+i+"");
						var selopt2 = form2.elements["inlineRadioOptions"].value;
						if(selopt2 == "option1")
							{
								var keyPairName = document.getElementById("keyPairName"+i+"").value
							}else{
									var keyPairName = document.getElementById("selkp"+i+"").innerText;
							}*/
						
						var instName = temp_info[i].node;
						var imageName = temp_info[i].image;
						var id = imageName.split("~");
						var roleName = temp_info[i].role;
						console.log(stgName+sgName+instName+imageName+roleName);
						resultObj.push((disks.length),sgName,pIp,instName,id[1],roleName);
						resultObj1.push(resultObj);			
					}
				}else{
					var resultObj = [],disks = [];
					var dsk = document.querySelector('.disk0').id;
						var dskNo = dsk.substr(dsk.length-3),
					    dskLoop = dskNo.split("_");
						console.log(dskLoop);
						for(j=0;j<=dskLoop[1];j++)
						{
							var stgName = document.getElementById("stgName"+dskLoop[0]+"_"+j+"").value;
							//alert(stgName);
							disks.push(stgName);
						}
						disks1.push(disks);
					//var stgName = document.getElementById("stgName0").value;
					//var count = document.getElementById("count0").value;
					var form = document.getElementById("ip0");
					var pIp=form.elements["pubIp"].value;
					//var form1 = document.getElementById("rbtn0");
					//var selopt = form1.elements["inlineRadioOptions"].value;
					//if(selopt == "option1")
						//{
						//var sgName = document.getElementById("sgName0").value;
						//}else{
								var sgName = document.getElementById("selsg0").innerText;
						//}
					/*var form2 = document.getElementById("rbtnkp0");
					var selopt2 = form2.elements["inlineRadioOptions"].value;
					if(selopt2 == "option1")
						{
							var keyPairName = document.getElementById("keyPairName0").value
						}else{
								var keyPairName = document.getElementById("selkp0").innerText;
						}*/
					
					var instName = str2;
					var imageName = document.getElementById("selImag").innerText;
					var id = imageName.split("~");
					var roleName = document.getElementById("selRole").innerText;					
					console.log(stgName+sgName+instName+imageName+roleName);
					resultObj.push((disks.length),sgName,pIp,instName,id[1],roleName);
					resultObj1.push(resultObj);	
				}
			console.log(result_arr);
			console.log(resultObj1);
			$(".popupData, .proDiv").show(); 
			$.ajax({
			  type: 'POST',
			  //datatype: 'jsonp',
			  data:  "d1="+result_arr+"&d2="+resultObj1+"&d4="+disks1,
			  url: _ip+'/deployTemplate'
			})
			.done(function(data){
				$("#instanceName").html("<b>"+data+"</b>");
				setTimeout(function(){
					$(".popupData, .proDiv").hide();
					location.href = _ip+"/manageEnv";
				},5000);
				
			})
			.fail(function(err){
				console.log(err);
			})
			/*$.ajax({
		        type: 'POST',
		   	 	jsonpCallback: "callback",
		        datatype: 'jsonp', 
				async: false,
		        data:  "d1="+result_arr+"&d2="+resultObj1+"&d4="+disks1,
		        url: _ip+'/deployTemplate',
		        success: function(data, textStatus){
		        	alert(data);
		        	//$(".alert-temp").stop().slideDown();
		        	//location.href="http://172.29.59.63:3000/master_2"
					/*var st = [];
					if(str == "single"){
						var st = {};
						st.node = str2;
						temp_info = st
					}
					$(".popupData, .proDiv").show(); 
			        //var instanceCount = ["t2.micro","t3.micro"] 
			        var int = setInterval(hideme, temp_info.length*60000); 
			        
			        var i = temp_info.length*60000/1000; 
			        
			        console.log(temp_info.length) 
			        console.log(i/temp_info.length) 
			        var count = 0; 
			        setInterval(function (){ 
			                console.log(i--); 
			                if(i%60 == 0){ 
			                        count++; 
			                }                       
							$("#instanceName").html("<b>"+temp_info[count].role+"</b>"+" is Deploying..");
			                
			         }, 1000);
					function hideme(){
							$("#doneDeploy, .sucessMes").show();
							$(".deployText, #loadingImg").hide();
							
							//$(".popupData, .proDiv").hide();
							console.log(int);
							window.clearInterval(int);
						}
		        	},
		        	 error: function (xhr, status, error){
		                 console.log('Failure');
		         		alert("failure");
		         		},
		            });	*/		
		}else
			{
			console.log("This is Azure template");
			var form2 = document.getElementById("resgp");
			var selopt1 = form2.elements["rsg"].value;
			if(selopt1 == "Resource Group"){
				ressourceFunction();
			}else{
				var result_arr = [];
				var region = pvd_region;
				var envName = document.getElementById("sel").innerText;
				//var prjName = document.getElementById("selpj").innerText;
				var accName = localStorage.getItem("Account");
				var prjName = localStorage.getItem("ProjectName");
				var prdName = localStorage.getItem("ProductName");
				var CloudName = document.getElementById("selClsrv").innerText;
				console.log(pvName+region+envName+prjName+CloudName);
				result_arr.push(pvName,region,envName,accName,prjName,prdName,CloudName,"mystock");
				result_arr.splice(1, 0, "create_environment");
				var resultObj1 = [];
				if(envName == "Select")
				{
				document.getElementById("sel").style.border="thin dashed #0099FF";
				return;
				}else if(prjName == "Select")
					{
					document.getElementById("selpj").style.border="thin dashed #0099FF";
					return;
					}
				if(str == "multi")
				{
					for(var i=0;i<temp_info.length;i++)
					{
						var instName = temp_info[i].node;
						var imageName = temp_info[i].image;
						var id = imageName.split("~");
						var roleName = temp_info[i].role;
						//console.log(instName+imageName+roleName);
						resultObj1.push(instName,id[0],roleName);
					}
				}else{
					var instName = str2;
					var imageName = document.getElementById("selImag").innerText;
					var roleName = document.getElementById("selRole").innerText;
					console.log(instName+imageName+roleName);
					resultObj1.push(instName,imageName,roleName);
				}
				console.log(result_arr.length);
				console.log(resultObj1.length);
				$.ajax({
					type: 'POST',
					jsonpCallback: "callback",
					datatype: 'jsonp',
					data:  "d1="+result_arr+"&d2="+resultObj1,
					url: _ip+'/deployTemplate',
					success: function(data, textStatus){
						alert(data);
						//location.href=_ip+"/master_2"
						$(".popupData, .proDiv").show(); 
				        //var instanceCount = ["t2.micro","t3.micro"] 
				        var int = setInterval(hideme, temp_info.length*60000); 
				        
				        var i = temp_info.length*60000/1000; 
				        
				        console.log(temp_info.length) 
				        console.log(i/temp_info.length) 
				        var count = 0; 
				        setInterval(function (){ 
				                console.log(i--); 
				                if(i%60 == 0){ 
				                        count++; 
				                }                       
								$("#instanceName").html("<b>"+temp_info[count].role+"</b>"+" is Deploying..");
				                
				         }, 1000);
						function hideme(){
								$("#doneDeploy, .sucessMes").show();
								$(".deployText, #loadingImg").hide();
								
								//$(".popupData, .proDiv").hide();
								console.log(int);
								window.clearInterval(int);
							}
						},
						 error: function (xhr, status, error){
							 console.log('Failure');
							alert("failure");
							},
						});
				}
			}
}

$('.exit').click(function(){
	location.href = _ip+"/master_2";
})
function ressourceFunction(){
	alert("Inside resource group");
	var resultObj2 = [], result_arr1 = [];
	var region = pvd_region;
	var accName = localStorage.getItem("Account");
	var prjName = localStorage.getItem("ProjectName");
	var prdName = localStorage.getItem("ProductName");
	var env = document.getElementById("sele").innerText,
	    resgroup = document.getElementById("resg").innerText,
		virtNet = document.getElementById("vnet").innerText,
		subnet = document.getElementById("snet").innerText;
	if(env == "Select")
	{
		document.getElementById("sele").style.border="thin dashed #0099FF";
		return;
	}else if(resgroup == "Select")
		{
			document.getElementById("resg").style.border="thin dashed #0099FF";
			return;
		}else if(virtNet == "Select")
			{
				document.getElementById("vnet").style.border="thin dashed #0099FF";
				return;
			}else if(subnet == "Select")
				{
					document.getElementById("snet").style.border="thin dashed #0099FF";
					return;
				}
		result_arr1.push(accName,prjName,prdName,env,resgroup,virtNet,subnet,region);
	for(var i=0;i<temp_info.length;i++)
	{
		
		var instName = temp_info[i].node;
		var os = temp_info[i].os;
		var roleName = temp_info[i].role;
		var role_info = {};
		role_info.instName = instName;
		role_info.os = os;
		role_info.roleName = roleName;
		resultObj2.push(role_info);
	}
	var arr1=JSON.stringify(resultObj2);
	console.log(result_arr1);
	console.log(arr1);
			$.ajax({
					type: 'POST',
					jsonpCallback: "callback",
					datatype: 'jsonp',
					data:  "d1="+result_arr1+"&d2="+arr1,
					url: _ip+'/deployResource',
					success: function(data, textStatus){
						//alert(data);
						$(".popupData, .proDiv").show(); 
				        //var instanceCount = ["t2.micro","t3.micro"] 
				        var int = setInterval(hideme, temp_info.length*60000); 
				        
				        var i = temp_info.length*60000/1000; 
				        
				        console.log(temp_info.length) 
				        console.log(i/temp_info.length) 
				        var count = 0; 
				        setInterval(function (){ 
				                console.log(i--); 
				                if(i%60 == 0){ 
				                        count++; 
				                }                       
								$("#instanceName").html("<b>"+temp_info[count].role+"</b>"+" is Deploying..");
				                
				         }, 1000);
						function hideme(){
								$("#doneDeploy, .sucessMes").show();
								$(".deployText, #loadingImg").hide();
								
								//$(".popupData, .proDiv").hide();
								console.log(int);
								window.clearInterval(int);
							}
						},
						 error: function (xhr, status, error){
							 console.log('Failure');
							alert("failure");
							},
				});
}

