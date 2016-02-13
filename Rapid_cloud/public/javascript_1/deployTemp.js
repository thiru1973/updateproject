
$(document).ready(function(){
	var i =0;
	/*$(".clickRole").click(function(){
		$(this).find(".dropDown").slideToggle();
	})*/
	
	//$(".nodeSel tr:nth-child(even)").css({'background-color':'green'})
	//$(".nodeSel tr:nth-child(odd)").css({'background-color':'#f7f7f7'})
	
	$(".popupData").hide();
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
	
	$(".close, .cancelPoup").click(function(){
		$(".popupData").hide();
		$(".popData").hide();
		$(".popData1").hide();
	})
	
	 $('[data-toggle="tooltip"]').tooltip({title: "Select any of your previous project to get VPC and Subnet details. Or, You can create New VPC and Subnet for this template.", placement: "right"});
	 $('[data-toggle="tooltipVpc"]').tooltip({title: "VPC Help content comes here..", placement: "right"});
	 $('[data-toggle="tooltipSubnet"]').tooltip({title: "Subnet Help content comes here..", placement: "right"});

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
var cidrIp = ["Anywhere", "My IP", "Custom IP"];
var volumeType = ["Provisioned IOPS SSD", "General Purpose SSD", "Magnetic"];
var vpcId;
var subnetId;
function selectOpt(ev, idn){
	
	var aImage = ev.getElementsByTagName("dt")[0].innerHTML;
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	 var v = ev.parentNode;
	 var vb = v.parentNode;
	 var idd = vb.id;
	 //alert(idd);
	 if(idd == "selvpc")
		 {
		 	vpcId = aTex;
		 	getSubnetName(aTex);
		 }
	 if(idd == "selsn")
		 {
		 	subnetId = aTex;
		 }
	 for(var i=0;i<node_info.length;i++)
		 {
			 if(idd == "selci"+i+"")
				 {
				 	getPublicIp(aTex,i);
				 }
		 }
	 document.getElementById(idd).style.border="none";
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
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
	//console.log(appentoWhat);
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
	get_project();
	getVpcName();
	//getSubnetName();
}
var node_info;
var pvd_name;
var pvd_region;
var temp_info;
function get_templateName(){
	$(function(){	
		var url = document.location.href,
	     params = url.split('?')[1].split('&'),
	     data = {}, tmp;
		  for (var i = 0, l = params.length; i < l; i++) {
		       tmp = params[i].split('=');
		       data[tmp[0]] = tmp[1];
		  }
		  var str = data.data;
		  var template={};
		  template.tname=str;
		  $.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: template,	 
			     url: 'http://172.29.59.65:3000/pvd_template',
			     success: function(results) {
			    	 //console.log(results);
			    	 temp_info = results[0].Instances;
			    	 pvd_name = results[0].Cloud;
			    	 pvd_region = results[0].Region;
			    	 tr = $('<tr/>');
			            tr.append("<td><img src='images_1/AWS_Logo.png'/></td>");	
			            tr.append("<td><span style='font-size:18px;font-weight:bold;'><span class='deploytempNa'>Name : </span>"+results[0].Template_name+"</span><br>Region : "+results[0].Region+"<br>Provider : "+results[0].Cloud+"</td>");
			            $('table.temp_info').append(tr);
			            document.getElementById("regName").value=results[0].Region;
			            node_info=results[0].Instances;
			            show_nodeDetails(node_info);
			            if(pvd_name == "AWS")
			            	{
			            		displayZones(pvd_name,pvd_region);
			            	}
			    	 },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
			   });
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
	     url: 'http://172.29.59.65:3000/temp_region',
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
	    	 console.log(zones);
	    	 var appendD = new DropdownConst();
				appendD.appendData(zones,"selsZn");
	    	
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });
}

function get_project(){
	$(function(){
		  $.getJSON('http://172.29.59.65:3000/project', function(data){
			   var proje = data;
			   var pj_Na=[];
			   for(var d=0; d<=proje.length-1; d++){				   			   
				    pj_Na [d] = data[d].p_name;				    			   
			   }
			   var appendD = new DropdownConst();
				appendD.appendData(pj_Na,"selspj");
		  });
	});
}

function getVpcName(){
	$(function(){
		  $.getJSON('http://172.29.59.65:3000/vpc_deploy', function(data){
			 //console.log(data);
			  var vpc_Name = [];
			 for(var x=0;x<data.length;x++)
				 {
				 	vpc_Name[x] = /*data[x].vpc_name+"/"+*/data[x].vpc_id;
				 }
			   var appendD = new DropdownConst();
			   appendD.appendData(vpc_Name,"selsvpc");
			   appendD.appendData(vpc_Name,"selsVpcSn");			   
		  });
	});
	
}

function getSubnetName(vpcid){
	$(function(){
		  $.getJSON('http://172.29.59.65:3000/subnet_deploy', function(data){
			  //console.log(data);
			  var subNetName = [];
			 for(var x=0;x<data.length;x++)
				 {				 
				 	if(data[x].vpc_id == vpcid)
				 		{
				 			
				 			subNetName[x] = /*data[x].subnet_name+"/"+*/data[x].subnet_id;
				 			//alert(subNetName[x]);
				 		}
				 }
			 //console.log(subNetName[0]);
			   var appendD = new DropdownConst();
			   appendD.appendData(subNetName,"selssn");
			   
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
	//alert(value+""+Id);
	var vType = document.getElementById("selstg"+Id+"").innerText;
	if(vType == "General Purpose SSD")
		{	
			if(value >= 1 && value <= 3333)
				{
					var iops=value*3;
					document.getElementById("stgIops"+Id+"").value=iops;
				}else{
					document.getElementById("stgIops"+Id+"").value="10000";
				}
		}else if(vType == "Magnetic")
			{
				document.getElementById("stgIops"+Id+"").value="NA";
			}
}
function fortCheckFunction(value, Id){
	//alert(value+""+Id);
	if(value < 0 || value > 65535)
		{
			$('#'+Id+'').val("");
		}
}
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
	         		 +"</div></div><button class='redButton pull-left countAlign 1stRowAdd' name='add_"+i+"'>Add</button>"
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
					  +"<ul id='latestUpdatesTab' class='nav nav-tabs hidden-xs'><li class='active addStoTab'><a href='#alerts"+i+"' data-toggle='tab'>Add Storage</a></li><li><a href='#requests"+i+"' data-toggle='tab'>Security Groups</a></li><li><a href='#svpTweet"+i+"' data-toggle='tab'>Key Pairs</a></li><li><a href='#publicIp"+i+"' data-toggle='tab'>Public IP</a></li><li class='pull-right'>"
					  +"<button type='button' class='close redLinks closeRoleConfi' name='add_"+i+"' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>x</span></button></li>"
					  +"</ul><div class='panel-group visible-xs' id='latestUpdatesTab-accordion'></div>"
					  +"<div class='tab-content hidden-xs'>"
					  
					  +"<div class='tab-pane fade  in active alignAllsides' id='alerts"+i+"'>"
					  +"<div class='roleID'><div class='pull-left'><label class='labelTemp'>Volume Type</label><div id='selstg"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsstg"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Volume Size</label><div class='clickRole addStoTabWid'><input type='number' onchange='iopsFunction(this.value, "+i+")' id='stgsz"+i+"' min='1' style='border:none;width:100%;'/></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>IOPS</label><div class='clickRole addStoTabWid'><input type='Text' id='stgIops"+i+"' placeholder='' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Volume Name</label><div class='clickRole addStoTabWid'><input id='stgName"+i+"' type='text' style='border:none;width:100%;'></div></div></div>"
					  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='storage"+i+"' onclick='createStgFunction(this.id, "+i+")'>Create</button></div>"
					  +"</div>"
					  
					  
					  +"<div class='tab-pane fade alignAllsides' id='requests"+i+"'>"
					  +"<div><form class='' id='rbtn"+i+"'><label class='radio-inline'> <input type='radio' name='inlineRadioOptions' checked='checked' id='inlineRadio1"+i+"' value='option1'>Create New </label><label class='radio-inline'> <input type='radio' name='inlineRadioOptions' id='inlineRadio2"+i+"' value='option2'>Use Old </label></form></div>"
					  +"<div class='CreateNewSecurity CreateSec"+i+"' ><div class='roleId'><div class='pull-left'><div id='selsg"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsgn"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div></div>"
					  +"<div style='' class='securityGr' id='securityGrIDD"+i+"'><div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Name</label><div class='clickRole addStoTabWid'><input type='text' id='sgName"+i+"' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>From Port</label><div class='clickRole addStoTabWid'><input id='sgFPort"+i+"' type='number' min='0' placeholder='0 - 65535' onchange='fortCheckFunction(this.value, this.id)' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>To Port</label><div class='clickRole addStoTabWid'><input id='sgTPort"+i+"' type='number' min='0' placeholder='0 - 65535' onchange='fortCheckFunction(this.value, this.id)' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='roleID'><div class='pull-left'><label class='labelTemp'>CIDR IP</label><div id='selci"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsci"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'></label><div class='clickRole addStoTabWid'><input id='ipText"+i+"' type='text' style='border:none;width:100%;'></div></div></div>"
					  +"</div>"
					  +"<div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='secGroup"+i+"' onclick='createSgpFunction(this.id, "+i+")'>Create</button></div>"
					  +"</div>"
					  
					  +"<div class='tab-pane fade alignAllsides' id='svpTweet"+i+"'>"
					  +"<div><form class='' id='rbtnkp"+i+"'><label class='radio-inline'> <input type='radio' id='key_Create' name='inlineRadioOptions' checked='checked' id='inlineRadio1"+i+"' value='option1'>Create New </label><label class='radio-inline'> <input type='radio' id='key_Old' name='inlineRadioOptions' id='inlineRadio2"+i+"' value='option2'>Use Old </label></form></div>"
					  +"<div id='KeyNew' class='operatingSys'><div class='pull-left'><label class='labelTemp'>Key Name</label><div class='clickRole addStoTabWid'><input id='keyPairName"+i+"' type='text' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='CreateNewSecurity'><div id='keyOld' class='roleID'><div class='pull-left'><label class='labelTemp'>CIDR IP</label><div id='selci"+i+"' class='clickRole borderNoN'><span>Select</span><ul id='selsci"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  +"</div><div style='clear:both;' class='pull-right'><button class='redButton pull-left countAlign' id='keyPair"+i+"' onclick='createKpFunction(this.id, "+i+")'>Create</button></div>"
					  +"</div>"
					  
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
			appendD.appendData(cidrIp,"selsci"+i+"");
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
		$(".clickRole").click(function(){
			$(this).find(".dropDown").slideToggle();
		})
		
		$(".CreateNewSecurity").hide();
	$('[name="inlineRadioOptions"]').click(function(){
		var th = $(this).attr("id")
		var pos = th.charAt(th.length-1);
		console.log(pos);
		if(th == "inlineRadio2"+pos+""){
			$(".CreateSec"+pos+"").show();
			$("#securityGrIDD"+pos+"").hide()
		}else if(th == "inlineRadio1"+pos+""){
			$("#securityGrIDD"+pos+"").show()
			$(".CreateSec"+pos+"").hide();
		}
	})
	
		$(".CreateNewSecurity").hide();
			$('[name="inlineRadioOptions"]').click(function(){
				var th = $(this).attr("id")
				console.log(th);
				if(th == "key_Old"){
					$("#keyOld").show();
					$("#KeyNew").hide()
				}else if(th == "key_Create"){
					$("#KeyNew").show()
					$("#keyOld").hide();
				}
			})
		
}

$('#createVpc').click(function(){
	
    var region = document.getElementById("regName").value;
	var cidr = document.getElementById("cidrBlk").value;
	var vpc = document.getElementById("vpcName").value;
	var tenancy = document.getElementById("selTn").innerText
	
	var data={};
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
        url: 'http://172.29.59.65:3000/vpc',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
})



$('#createSubnet').click(function(){
	alert("In Create subnet page");
	var snName = document.getElementById("nameTag").value;
	var cidrBlkSn = document.getElementById("cidrBlkSn").value;
	var snVpc = document.getElementById("selVpcSn").innerText;
	var snZone = document.getElementById("selZn").innerText;
	//console.log(snName+cidrBlkSn+snVpc+snZone+pvd_region);
	//zone = snZone;
	var data={};
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
        url: 'http://172.29.59.65:3000/subnet',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
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
        url: 'http://172.29.59.65:3000/routeTable',
        success: function(data, textStatus){
        	console.log(data);
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
        url: 'http://172.29.59.65:3000/gateWay',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
})

function createStgFunction(buttonId, Id){
	var vType = document.getElementById("selstg"+Id+"").innerText;
	var vSize = document.getElementById("stgsz"+Id+"").value;
	var vIops = document.getElementById("stgIops"+Id+"").value;
	var vName = document.getElementById("stgName"+Id+"").value
	if(vType == "Select")
		{
		document.getElementById("selstg"+Id+"").style.border="thin dashed #0099FF";
		return;
		}else if(vSize == null || vSize == "" || vSize > 16384)
			{
				$('#stgsz'+Id+'').attr("placeholder", "1-16384 GiB").val("").focus().blur();
				return;
			}else if(vType =="Magnetic" && (vSize == null || vSize == "" || vSize > 1024))
				{
					$('#stgsz'+Id+'').attr("placeholder", "1-1024 GiB").val("").focus().blur();
					return;
				}else if(vName == "" || vName == null)
				{
					$('#stgName'+Id+'').focus();
					return;
				}
	var data = {};
	data.provider = pvd_name;
	data.region = pvd_region;
	data.vType = vType;
	data.vSize = vSize;
	data.vIops = vIops;
	data.vName = vName;
	//console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: 'http://172.29.59.65:3000/createStorage',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}
function createSgpFunction(buttonId, Id){
	var sgName = document.getElementById("sgName"+Id+"").value;
	var sgFPort = document.getElementById("sgFPort"+Id+"").value;
	var sgTPort = document.getElementById("sgTPort"+Id+"").value;
	var sgCidrIp = document.getElementById("ipText"+Id+"").value;
	var cidr = document.getElementById("selci"+Id+"").innerText;
	var vpcId = document.getElementById("selvpc").innerText;
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
				}else if(cidr == "Select")
				{
					document.getElementById("selci"+Id+"").style.border="thin dashed #0099FF";
					return;
				}
	
	var data = {};
	data.provider = pvd_name;
	data.region = pvd_region;
	data.sgName = sgName;
	data.sgFPort = sgFPort;
	data.sgTPort = sgTPort;
	data.sgCidrIp = sgCidrIp;
	data.vpcId = vpcId;
	//console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: 'http://172.29.59.65:3000/createSecGroup',
        success: function(data, textStatus){
        	console.log(data);
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
	data.provider = pvd_name;
	data.region = pvd_region;
	data.keyPair = keyPair;
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: 'http://172.29.59.65:3000/createKeyPair',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}

function deployFunction(){
	alert("In deploy function");
	var result_arr = [];
	var pvName = pvd_name;
	var region = pvd_region;
	var envName = document.getElementById("sel").innerText;
	var prjName = document.getElementById("selpj").innerText;
	var vpcId = document.getElementById("selvpc").innerText;
	var subnetId = document.getElementById("selsn").innerText;
	var routeName = document.getElementById("routeName").value;
	var gateName = document.getElementById("gateWayName").value;
	if(envName == "Select")
		{
		document.getElementById("sel").style.border="thin dashed #0099FF";
		return;
		}else if(prjName == "Select")
			{
			document.getElementById("selpj").style.border="thin dashed #0099FF";
			return;
			}
	console.log(pvName+region+envName+prjName+vpcId+subnetId+routeName+gateName);
	//console.log(temp_info);	
	var ra = (Math.random() * (999 - 000) + 000);
	alert(parseInt(ra));
	result_arr.push(pvName,"create_env", region,envName,prjName,vpcId,subnetId,routeName,gateName);
	
	
	var resultObj1 = [];
	for(var i=0;i<temp_info.length;i++)
		{
			//alert(i);
			var resultObj = [];
			var stgName = document.getElementById("stgName"+i+"").value;
			//var sgName = document.getElementById("sgName"+i+"").value;
			var keyPairName = document.getElementById("keyPairName"+i+"").value;
			var count = document.getElementById("count"+i+"").value;
			var form = document.getElementById("ip"+i+"");
			var pIp=form.elements["pubIp"].value;
			var form1 = document.getElementById("rbtn"+i+"");
			var selopt = form1.elements["inlineRadioOptions"].value;
			if(selopt == "option1")
				{
				var sgName = document.getElementById("sgName"+i+"").value;
				}else{
					var sgName = document.getElementById("selsg"+i+"").innerText;
				}
			var instName = temp_info[i].node;
			var imageName = temp_info[i].image;
			var roleName = temp_info[i].role;
			console.log(stgName+sgName+keyPairName+instName+imageName+roleName);
			resultObj.push(stgName,sgName,keyPairName,instName,imageName,roleName,pIp);
			resultObj1.push(resultObj);			
		}
	console.log(result_arr);
	console.log(resultObj1);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data:  "d1="+result_arr+"&d2="+resultObj1,
        url: 'http://172.29.59.65:3000/deployTemplate',
        success: function(data, textStatus){
        	alert(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
	
	
}


