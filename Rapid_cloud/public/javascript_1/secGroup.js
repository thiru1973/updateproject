window.onload = function(){
	getVnet();
	getVpcName();
}
var n = 0;
var m = 0;
function selectOpt(event, idn, con){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	alert(aTex);
	for(var i=0;i<=m;i++){
		if(idd == "vnT12_0"+i)
		{
			var app = "iip0"+i;
			getPublicIp(aTex,app);
		}
	}
	for(var j=0;j<=n;j++){
		if(idd == "vnT22_0"+j)
		{
			var app = "oip0"+j;
			getPublicIp(aTex,app);
		}
	}
	$("#"+idd+" span:first").html(aImage+aTex);
	$("#"+idd+" span img").css("width", "25px");
}
function getPublicIp(value, append){	
	if(value == "My IP")
	{
	    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
	      function(json) {
	        var pubIp = json.ip;
	        document.getElementById(append).value=pubIp+"/32";
	      }
	    );
	 
	}else if(value == "Anywhere")
		{
			var Anywhere = "0.0.0.0/0"
			document.getElementById(append).value=Anywhere;
		}else{
			document.getElementById(append).value="";
			$('#ipText'+append+'').focus();
		}
}
function createVol(num){
	var id = num, nn;
	if(id ==0){
		nn = "inB1";
	}else if(id == 1){
		n++;
		nn = "outB1"
	var dd = document.getElementById(nn);
		dd.innerHTML+='<div id="r_'+n+'">\
						<div class="pull-left padBot padRit">\
							<!--<label class="labelTemp">From Port</label>-->\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="ofport0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<!--<label class="labelTemp">To Port</label>-->\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="otport0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<!--<label id="" class="labelTemp"><span> CIDR IP</span></label>-->\
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
							<!--<label class="labelTemp">&nbsp;</label>-->\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="oip0'+n+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit" style="padding-top: 0px;">\
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
				return;
	}else if(id == 2){
		m++;
		nn = "volumes1"
	var dd = document.getElementById(nn);
		dd.innerHTML+='<div id="r_'+m+'">\
							<div class="pull-left padBot padRit">\
							<!--<label class="labelTemp">From Port</label>-->\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="ifport0'+m+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<!--<label class="labelTemp">To Port</label>-->\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="itport0'+m+'" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<!--<label id="" class="labelTemp"><span> CIDR IP</span></label>-->\
							<div id="vnT12_0'+m+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="vnT12_0'+m+'Drop" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">Anywhere</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">My IP</dd></dl></li>\
									<li onclick="selectOpt(this,2)" class="Test"><dl><dt></dt><dd class="va">Custom IP</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<!--<label class="labelTemp">&nbsp;</label>-->\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="iip0'+m+'" style="border:none;width:100%;">\
							</div>\
						</div>\
					<div class="pull-left padBot padRit" style="padding-top: 0px;">\
						<span class="glyphicon glyphicon-minus-sign" onclick="removeRow(this,'+m+');" id="addRole" style="color:#999999;"></span>\
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
				return;
	}
}
function removeRow(ev, n){
	$("#r_"+n).remove();
}
function getVnet(){
	$(function(){
		$.getJSON(_ip+'/getVnet', function(data){
			var vNetwork = [];
			for(vNet=0;vNet<data.length;vNet++)
			{
				vNetwork[vNet] = data[vNet].vnetname;
			}
			var appendD = new DropdownConst();
			appendD.appendData(vNetwork,"vnT2_Drop");
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
			   appendD.appendData(vpc_Name,"vpc2_Drop");			   
		  });
	});
	
}
function createSecGroup()
{
	var pvd_region = sessionStorage.getItem("chooseRegion");
	var pvd_name = sessionStorage.getItem("chooseUrCloud");
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	if(pvd_name == "Azure")
	{
		createAzureSecGroup(pvd_name, pvd_region);
	}
	alert("Outbound"+n+"-"+m+"inbound");
	var vpcId = document.getElementById("selVpcSn").innerText;
	var sgName = document.getElementById("sgName").value;
	var data = [];
	data.push(accountName,projName,prodName,pvd_name,pvd_region,sgName,vpcId);
	var arr = [];
	for(var ib=0;ib<=m;ib++)
	{		
		var sgFPort = document.getElementById("ifport0"+ib+"").value;
		var sgTPort = document.getElementById("itport0"+ib+"").value;
		var sgCidrIp = document.getElementById("iip0"+ib+"").value;
		var cidr = document.getElementById("vnT12_0"+ib+"").innerText;
		if (sgName == "" || sgName == null)
			{
				$('#sgName').focus()
				return;
			}else if(sgFPort == "" || sgFPort == null)
				{
					$('#ifport0'+ib+'').focus();
					return;
				}else if(sgTPort == "" || sgTPort == null)
					{
						$('#itport0'+ib+'').focus();
						return;
					}else if(cidr == "Select")
					{
						document.getElementById("vnT12_0"+ib+"").style.border="thin dashed #0099FF";
						return;
					}
		var data1 = [];
		data1.push("Inbound",sgFPort,sgTPort,sgCidrIp);
		arr.push(data1);		
	}
	for(var ob=0;ob<=n;ob++)
	{		
		var sgFPort = document.getElementById("ofport0"+ob+"").value;
		var sgTPort = document.getElementById("otport0"+ob+"").value;
		var sgCidrIp = document.getElementById("oip0"+ob+"").value;
		var cidr = document.getElementById("vnT22_0"+ob+"").innerText;
		if (sgName == "" || sgName == null)
			{
				$('#sgName').focus()
				return;
			}else if(sgFPort == "" || sgFPort == null)
				{
					$('#ofport0'+ob+'').focus();
					return;
				}else if(sgTPort == "" || sgTPort == null)
					{
						$('#otport0'+ob+'').focus();
						return;
					}else if(cidr == "Select")
					{
						document.getElementById("vnT22_0"+ob+"").style.border="thin dashed #0099FF";
						return;
					}
		var data2 = [];
		data2.push("Outbound",sgFPort,sgTPort,sgCidrIp);
		arr.push(data2);		
	}
	
	console.log(data);
	console.log(arr)
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        //data: data,
		data:  "d1="+data+"&d2="+arr,
        url: _ip+'/createSecGroup',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
}
function createAzureSecGroup(pvd, region)
{
	alert(pvd+region);
	var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
	var resGp = document.getElementById("RM_name").value
	   ,rule1 = "Inbound"
	   ,ruleName1 = document.getElementById("ruleName1").value
	   ,access1 = document.getElementById("access1").innerText
	   ,protocol1 = document.getElementById("protocol1").innerText
	   ,priority1 = document.getElementById("priority1").value
	   ,prefix1 = document.getElementById("prefix1").value
	   ,rule2 = "Outbound"
	   ,ruleName2 = document.getElementById("ruleName2").value
	   ,access2 = document.getElementById("access2").innerText
	   ,protocol2 = document.getElementById("protocol2").innerText
	   ,priority2 = document.getElementById("priority2").value
	   ,prefix2 = document.getElementById("prefix2").value
	   ,sgName = document.getElementById("sgName").value
	   ,vNet = document.getElementById("vnT2_").innerText
	   ,subNet = document.getElementById("subNet").value
	   ,cidr = document.getElementById("cidr").value;
	   var data = {};
		data.accountName = accountName;data.projName = projName;data.prodName = prodName;data.provider = pvd;data.region = region;
		data.resGp = resGp;
		data.rule1 = rule1;data.ruleName1 = ruleName1;data.access1 = access1;data.protocol1 = protocol1;data.priority1 = priority1;data.prefix1 = prefix1;
		data.rule2 = rule2;data.ruleName2 = ruleName2;data.access2 = access2;data.protocol2 = protocol2;data.priority2 = priority2;data.prefix2 = prefix2;
		data.sgName = sgName;data.vNet = vNet;data.subNet = subNet;data.cidr = cidr;
		console.log(data);	
		
		$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createSecGrp',
        success: function(data, textStatus){
        	alert("Success");
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });
} 