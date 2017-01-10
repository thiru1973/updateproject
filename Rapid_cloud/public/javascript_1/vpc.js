/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 19th May 2015
*************************************** */

/* Global
************************************************************************** */
var _ip = "http://172.29.59.65:3000";

// Refresh for html page when change the js file.

/* Drop-down menu -----------Start
************************************************************************** */

$(".clickRole").click(function(e){
		e.stopPropagation();
		if ($(this).find(".dropDown").css('display') == 'block'){
			$(this).find(".dropDown").slideUp();
		}else{
			$(".dropDown").slideUp();
			$(this).find(".dropDown").slideDown();
		}
});
$(".closeAlert").click(function(){
		$(this).parent().hide()
});
$(".addStoTab").click(function(event){
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

function selectOpt(event, idn, con){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
	 
	 if(idd === "chooseUrCloud"){
		 getRegion(aTex);
		 if(aTex == "Azure"){
			 $("[role='forAzure']").css("display","inline-block");
			 $("[role='forAWS']").css("display","none");
		 }else if(aTex == "AWS"){
			 $("[role='forAzure']").css("display","none");
			 $("[role='forAWS']").css("display","inline-block");
		 }
		 sessionStorage.setItem(idd,aTex);
	 }
	 if(idd === "chooseRegion"){
		 sessionStorage.setItem(idd,aTex);
	 }
}
$(document).ready(function(){
	var type = sessionStorage.getItem("chooseUrCloud");

	if(type == "Azure"){
			 $("[role='forAzure']").css("display","inline-block");
			 $("[role='forAWS']").css("display","none");
		}else if(type == "AWS"){
			 $("[role='forAzure']").css("display","none");
			 $("[role='forAWS']").css("display","inline-block");
	 }
	$('[role="tab"]').click(function (e){
		e.preventDefault();
		console.log($(this).attr('[aria-controls]'));
	});
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");

	var data = {};
	data.account = accountName;
	data.project = projName;
		$.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: data,	 
			     url: 'http://172.29.59.65:3000/getSubProviders',
			     success: function(results) {	
						console.log(results);
						for(var i=0;i<results.length;i++)
						{
							//roLee[i] = results[i].provider;
							var tT = document.getElementById("sels");
								tT.innerHTML+='<li onclick="selectOpt(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+results[i].provider+'</dd></dl></li>';					
			
						}
						//addProvider(roLee);
			    	 },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
			   });

	// Subnet Single and Public
	$('#vpcs_check, #vpcp_check').on('change', function(){
		console.log(this.id);
		this.id == "vpcp_check" ? $('.publicAndPrivateSubnet').show() : false ;
		this.id == "vpcs_check" ? $('.publicAndPrivateSubnet').hide() : false ;
	})
	
})
/* Drop-down menu -------------- End
 * 
************************************************************************** */

$(".showadvancedOpt").on("click", function(){
	$(".advancedOpt").toggle();
});

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
	var epn = document.getElementById(appentoWhat);
	//console.log(epn);
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
}

function getRegion(cloud){
	var data = {};
    data.pname = cloud;
    var region_name1=[];
	   $.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/temp_region',
	     success: function(results) {
	    	 for(var i=0;i<results.length;i++)
				{
					region_name1[i]=results[i].region_name;											
				}
	    	 var appendD = new DropdownConst();
	    	 appendD.appendData(region_name1,"chooseRegion_Drop");
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });   
}

function createVpc()
{	
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var pvd_name = document.getElementById("chooseUrCloud").innerText;
	if(pvd_name == "Azure")
	{
		createResourceGp(pvd_name);
	}else{
	var region = document.getElementById("chooseRegion").innerText;
	var cidr = document.getElementById("cidrBlk").value;
	var vpc = document.getElementById("vpcName").value;
	var tenancy = document.getElementById("hardwareTen").innerText;
	
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
	console.log(data);
	
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/vpc',
        success: function(data, textStatus){
        	console.log(data);
			alert("Success");
			document.getElementById("cTA_CreateAndDeploy").disabled=true;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
	}
}

function createResourceGp(pvd)
{
	var pvd_name = pvd;
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var region = document.getElementById("chooseRegion").innerText;
	var cidr = document.getElementById("cidrBlk").value;
	var vpc = document.getElementById("vpcName").value;
	var resGrp = document.getElementById("RM_name").value;
	if(cidr == "" || cidr == null)
		{
			document.getElementById("cidrBlk").style.border="thin dashed #0099FF";
			return;
		}else if(vpc == "" || vpc == null)
			{
			document.getElementById("vpcName").style.border="thin dashed #0099FF";
			return;
			}
			
	var data={};
	data.accountName = accountName;
	data.projName = projName;
	data.prodName = prodName;
	data.region = region;
	data.cidr = cidr;
	data.vpc = vpc;
	data.provider = pvd_name;
	data.resGrp = resGrp;
	console.log(data);
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createGroup',
        success: function(data, textStatus){
        	alert("Success");
			sessionStorage.setItem("resourceGroup",resGrp);
			document.getElementById("cTA_CreateAndDeploy").disabled=true;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}

/*var n = 0;
function createVol(num){
	var id = num, nn;
	n++;
	if(id ==0){
		nn = "inB1";
	}else if(id == 1){
		nn = "outB1"
	var dd = document.getElementById(nn);
		dd.innerHTML+='<div id="r_'+n+'" style="border-top: solid 1px #ccc;padding-top: 25px;">\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">From Port</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="ofport0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">To Port</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="otport0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label id="" class="labelTemp"><span> CIDR IP</span></label>\
							<div id="vnT22_0'+n+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="vnT22_0'+n+'Drop" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">Anywhere</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">My IP</dd></dl></li>\
									<li onclick="selectOpt(this,2)" class="Test"><dl><dt></dt><dd class="va">Custom IP</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">&nbsp;</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="oip0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit" style="padding-top: 34px;">\
						<span class="glyphicon glyphicon-minus-sign" onclick="removeRow(this,'+n+');" id="addRole" style="color:#999999;"></span>\
						</div>\
						<div style="clear:both;">&nbsp;</div></div>';
						
					$(".clickRole").click(function(e){
						e.stopPropagation();
						if ($(this).find(".dropDown").css('display') == 'block'){
							$(this).find(".dropDown").slideUp();
						}else{
							$(".dropDown").slideUp();
							$(this).find(".dropDown").slideDown();
						}
						});
						$(".closeAlert").click(function(){
								$(this).parent().hide()
						});
						$(".addStoTab").click(function(event){
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
						function selectOpt(event, idn, con){
							var aImage = event.getElementsByTagName("dt")[0].innerHTML;
							var inn = event.getElementsByTagName("dd")[0];
							var aTex = $(inn).text();
							var v = event.parentNode;
							var vb = v.parentNode;
							var idd = vb.id;
							 $("#"+idd+" span:first").html(aImage+aTex);
							 $("#"+idd+" span img").css("width", "25px");
							 
							 if(idd === "chooseUrCloud"){
								 if(aTex == "Azure"){
									 $("[role='forAzure']").css("display","inline-block");
									 $("[role='forAWS']").css("display","none");
								 }else if(aTex == "AWS"){
									 $("[role='forAzure']").css("display","none");
									 $("[role='forAWS']").css("display","inline-block");
								 }
								 sessionStorage.setItem(idd,aTex);
							 }
						}
	
				return;
	}else if(id == 2){
		nn = "volumes1"
	var dd = document.getElementById(nn);
		dd.innerHTML+='<div id="r_'+n+'" style="border-top: solid 1px #ccc;padding-top: 25px;">\
							<div class="pull-left padBot padRit">\
							<label class="labelTemp">From Port</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="ifport0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">To Port</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="itport0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label id="" class="labelTemp"><span> CIDR IP</span></label>\
							<div id="vnT22_0'+n+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="vnT22_0'+n+'Drop" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">Anywhere</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">My IP</dd></dl></li>\
									<li onclick="selectOpt(this,2)" class="Test"><dl><dt></dt><dd class="va">Custom IP</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">&nbsp;</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="oip0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
					<div class="pull-left padBot padRit" style="padding-top: 34px;">\
						<span class="glyphicon glyphicon-minus-sign" onclick="removeRow(this,'+n+');" id="addRole" style="color:#999999;"></span>\
					</div>\
					<div style="clear:both;">&nbsp;</div></div>';
		
						$(".clickRole").click(function(e){
							e.stopPropagation();
							if ($(this).find(".dropDown").css('display') == 'block'){
								$(this).find(".dropDown").slideUp();
							}else{
								$(".dropDown").slideUp();
								$(this).find(".dropDown").slideDown();
							}
					});
					$(".closeAlert").click(function(){
							$(this).parent().hide()
					});
					$(".addStoTab").click(function(event){
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
					function selectOpt(event, idn, con){
						var aImage = event.getElementsByTagName("dt")[0].innerHTML;
						var inn = event.getElementsByTagName("dd")[0];
						var aTex = $(inn).text();
						var v = event.parentNode;
						var vb = v.parentNode;
						var idd = vb.id;
						 $("#"+idd+" span:first").html(aImage+aTex);
						 $("#"+idd+" span img").css("width", "25px");
						 
						 if(idd === "chooseUrCloud"){
							 if(aTex == "Azure"){
								 $("[role='forAzure']").css("display","inline-block");
								 $("[role='forAWS']").css("display","none");
							 }else if(aTex == "AWS"){
								 $("[role='forAzure']").css("display","none");
								 $("[role='forAWS']").css("display","inline-block");
							 }
							 sessionStorage.setItem(idd,aTex);
						 }
					}
				return;
	}
}
function removeRow(ev, n){
	$("#r_"+n).remove();
}
*/