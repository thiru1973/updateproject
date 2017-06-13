/* ************************************
	Create by: Omprakash Ramanadham	
*************************************** */
var _ip = "http://172.29.59.65:3000";

$(document).ready(function(){
	var i =0;
	/* Start Dropdown function */
	function dataUpDate(e){
		event.stopPropagation();
		$(e).parent(".dropDown").slideUp();
	}
	$(document).on("click", function () {
		$(".dropDown").slideUp();
	});
	$(document).on("click",".clickRole",function(e){
	e.stopPropagation();
	if ($(this).find(".dropDown").css('display') == 'block'){
		$(this).find(".dropDown").slideUp();
	}else{
		$(".dropDown").slideUp();
		$(this).find(".dropDown").slideDown();
	}
	});
	$(".proDiv ,.popupData").hide();
	$(".popData").hide();
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
	
	$(".cancelPoup, .close").click(function(){
		$("#status").hide();
	});
	
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	/*var theDiv = document.getElementById("data");
	theDiv.innerHTML += accountName+">>"+projName+">>"+prodName;*/
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
						sessionStorage.setItem("Provider", results[0].provider);
			    	 },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
			   });
});
$(".closeAlert").click(function(){
	$(".alertS div.alert").stop().slideUp();
	//location.href="http://172.29.59.65:3000/master_2"
});
window.onload = function(){
	showEnvironment();
};
window.onclick=function(){
	$(".popUpHide").hide();
}


function disPlayPop(a){
	var popHeight = $(a).parent().children("div").children("div.popover").height();
	var topPost=-popHeight/2 - 8;
	$(".popover").css({'top':topPost+'px'});

	//$(a).hide(); // Getting hide this a element only
	//$("."+a.className).hide(); // Getting hide all a class elements in a document

	$(".popUpHide").hide();
	var cl  = $(a).parent().children("div").children("div.popover");
	cl.show();
	cl.addClass("popUpHide");
}
Element.prototype.remove = function(){
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function(){
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
/*$(document).ready(function(){
	$('[role="header"] ul li').mouseover(function(){
		$('[role="header"] ul li span').css("color","#fff")
	});
});*/

var account = "account";
$(function(){
	$.getJSON(_ip+'/accountDetails', function(data){
		for(var i =0; i < data.data4.length; i++){
			var tT = document.getElementById("accounts_ID");
				tT.innerHTML+='<li onclick="getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data4[i].accountid+'</dd></dl></li>';
		}
	})
});
/*$(function(){
	$.getJSON(_ip+'/accountDetails', function(data){
		for(var i =0; i < data.data2.length; i++){
			var tT = document.getElementById("pro_ID");
				tT.innerHTML+='<li onclick="getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data2[i].p_name+'</dd></dl></li>';
		}
	})
});*/
var trIDs = [];
function getAccounts(event, idn){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(aTex);
	
	/*$(function(){
		   $.getJSON( _ip + '/accountDetails', function (data){
					console.log(data);
					var d = [];
					for(var bb=0; bb <= data.data3.length-1; bb++){
						if(aTex == data.data3[bb].accountid){
							console.log(aTex);
							d.push(data.data3[bb])
						}
					}
					if(trIDs.length !== 0){
						for(var tt=0; tt<= trIDs.length-1; tt++){
							document.getElementById(trIDs[tt]).remove();
							if(document.getElementById("dataOf"+trIDs[tt]))
							{
								document.getElementById("dataOf"+trIDs[tt]).remove();
							}
						}
					}
					manage.createTableData(d);
					console.log(d);
				});
			});*/
			
	
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
		 //this.getDetals(aTex)	 
}
function showEnvironment(){
	$(function(){
		   $.getJSON( _ip + '/accountDetails', function (data){
					console.log(data);
					var d = [];
					var accountName = localStorage.getItem("Account");
					for(var bb=0; bb <= data.data3.length-1; bb++){
						if(accountName == data.data3[bb].accountid){
							console.log(accountName);
							d.push(data.data3[bb])
						}
					}
					if(trIDs.length !== 0){
						for(var tt=0; tt<= trIDs.length-1; tt++){
							document.getElementById(trIDs[tt]).remove();
							if(document.getElementById("dataOf"+trIDs[tt]))
							{
								document.getElementById("dataOf"+trIDs[tt]).remove();
							}
						}
					}
					manage.createTableData(d);
					console.log(d);
				});
			});
}
/* ---------------------------------------------
		These common actions(Hide, Show, Hide and Show toggle) we can use all pages.
	------------------------------------------------*/
	function HideAndShow_Constructor(clickedElement,hideAndShowElement){
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
var manageAct = new HideAndShow_Constructor("liNkaction1","action1");
		manageAct.defaultHide();
		manageAct.toggleHandS();
/* ---------------------END------------------------*/
		/*---------- Table ------------------*/
	function Projects(){
			this.volumeSettingsData = [];
			this.securityGroupSettingsData = [];
			this.popupTitle = document.getElementById('titleOfPopup');
			this.popupExistingTitle = document.getElementById('existingData');
			//this.trIDs = [];
	}
	Projects.prototype.getEnvironments = function(self, id){
		//self.preventDefault();
		console.log(id);
		this.id = id;
		var sel = this;
		createEle(id, sel)
		function createEle(id, sel){
			function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
		var getExis = document.getElementById("dataOf"+id);
		if(getExis){
			getExis.parentNode.removeChild(getExis);
			//getExis.innerHTML="";
			//getExis.id="";
			return false;
			}
			var manageTable = document.getElementById(id);
			var crTr = document.createElement("tr");
				crTr.id ="dataOf"+id;
			insertAfter(manageTable, crTr);
			crTr.innerHTML+="<table><tr class='action1'>\
								</tr>\
								<tr class='action1'>\
									<td style='padding:5px 0px;' colspan='7'>\
										<table style='width:100%;'>\
											<tr>\
												<td style='padding:0px;width:160px;vertical-align: top;background-color: #666666;'>\
													<nav role='tempLates'>\
														<ul>\
															<li class='naee'><a href='#'>Environments</a>\
															  <dl id='envir_"+manageTable.id+"'>\
															  </dl>\
															</li>\
														</ul>\
													</nav>\
												</td>\
												<td style='display:none' id='loadBalTd'>\
													<nav role='noDes'>\
														<ul>\
															<li class='naee' id='loadBal'>\
															  <a href='#' id='loadBalTDText'>Load Balancer</a>\
															</li>\
														</ul>\
													</nav>\
												</td>\
												<td style='padding:0px;width:250px;vertical-align:top;background-color: #DDDDDD;' id='nodeTD'>\
													<nav role='noDes'>\
														<ul>\
															<li class='naee' id='singleTd'><a href='#' id='singleTDText'>Nodes</a>\
																<dl id='node_"+manageTable.id+"'>\
																</dl>\
															</li>\
														</ul>\
													</nav>\
												</td>\
												<td style='padding:0px;vertical-align:top;background-color:#EEEEEE;' id='detailsTD'>\
													<table id='nodeDetails_"+manageTable.id+"'>\
													</table>\
												</td>\
											</tr>\
										</table>\
									</td>\
								</tr>\
								</tr></table>";
			sel.getJsonDataOfEnviro(id);
		}
	}
	Projects.prototype.getJsonDataOfEnviro = function(requestId){
			var data = {};	data.id = requestId;
			var self = this;
			 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip +'/filter_env',
				success: function(data, textStatus){
					console.log(data);
					self.environmentList(data, requestId);
					//self.createPopupStatus(data, requestId);
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	}
	Projects.prototype.environmentList = function(requestData, requestId){
		var elId = document.getElementById('envir_'+requestId);
			//console.log(requestId);
			//elId ? f(requestId) : elId;
			//console.log(requestData);
			//console.log("Inside fun"+requestId);
			
			for(var enTem = 0; enTem < requestData.length;enTem++){
				//console.log(requestData.length);
			var dt = document.createElement("dt");
			var temesArr = requestData[enTem].env_name;
				elId.innerHTML+='<dt id="EnvntID_'+enTem+'" onclick="manage.getNodes(this, '+requestId+')">'+temesArr+'<span onclick="manage.enviromentMoreLinks(this, '+enTem+', '+requestId+')" class="glyphicon glyphicon-chevron-down arrowGray enviromentMoreLinks rotateGray"></span></dt>';
		  }
		  var elId = document.getElementById('EnvntID_'+0);
		  this.getNodes(elId, requestId);		  
	}
	var node_details = [];
	Projects.prototype.getNodes = function(env_name, project_id){		
		//console.log(env_name.innerText+"  "+project_id);
		document.getElementById('loadBalTd').style.display="none";
		document.getElementById('nodeTD').style.display="block";
		document.getElementById('detailsTD').style.display="block";
		
		var elId = document.getElementById('envir_'+project_id);
		var liArray = elId.getElementsByTagName("dt");
			for (var i = 0; i < liArray.length; i++)
				{
					liArray[i].className = "";
					env_name.className ="activeLink";
				}
		var data = {};
		data.env_name = env_name.innerText ;
		data.proj_id = project_id ;
		var self =  this;
		//console.log(data);
		 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip+'/node_details',
				success: function(data, textStatus) {
					console.log(data);
					node_details = data;
					manage._init(data);
					var el = document.getElementById('node_'+project_id);
					el.innerHTML="";
					var nodeDat = [];
					for(var i = 0; i < data.length; i++){
						var dt = document.createElement("dt"),
							typeInst = data[i].inst_type,
							nodeNa = data[i].role,
							cloud = data[i].prov_id,
							vpcNa = data[i].vpc_name;
							var dd = JSON.stringify(nodeDat);
							el.innerHTML+='<dt id="nodeDt_'+project_id+'_'+i+'" onclick="manage.getNodeDetails(this, '+i+', '+project_id+')">'+nodeNa+'<span onclick="manage.getNodeDetails_Manage(this, '+i+', '+project_id+')" title="'+cloud+'" class="glyphicon glyphicon-chevron-down arrowGray node_Details rotateGray"></span></dt>';
							self.getNodeDetails("", 0, project_id);
					}
			 },
			 error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	}
	Projects.prototype.loadBa_AdvancedPopup = function(ev){
		if(ev.id == "aviSubNetPop"){
			document.getElementById("SubnetsPoup").style.display="block";
		}else if(ev.id == "configHeAd"){
			document.getElementById("ConfigureHealthChecksAdvanced").style.display="block";
		}else if(ev.id =="addInstPop"){
			document.getElementById("addInstPopUpWin").style.display="block";
		}else if(ev.id =="securityGro"){
			document.getElementById("securityGroWin").style.display="block";
		}else if(ev.id =="upload-click-handler"){
			$("#upload-box").click();
			$("#upload-box").change(function(){
				$("#UploadCertifInput").val($(this).val());
			});
		}else if(ev.id =="upload-click-handler_Azure"){
			$("#upload-box-Azure").click();
			$("#upload-box-Azure").change(function(){
				$("#upload-file-Azure").val($(this).val());
			});
		}else if(ev.id =="addEndPoint"){
			document.getElementById("addEndPointID").style.display="block";
		}
	}
	Projects.prototype.disPlayLoadBalancer = function(){
		//document.getElementById("loadBalTDText").innerHTML="Load Balancing";
		document.getElementById("loadBalTd").style.display="block";
		document.getElementById("nodeTD").style.display="none";
		document.getElementById("detailsTD").style.display="none";
		
		var addLoadBa = document.getElementById("loadBal");
		addLoadBa.innerHTML='<td style="padding:0px;width:250px;vertical-align:top;background-color:#DDDDDD;">\
							<nav role="noDes">\
								<ul>\
									<li class="naee"><a href="#">Load Balancing</a>\
									<div style="padding:10px;float:left;width:100%;">\
										<!--<div class="pull-left">\
											<label class="labelTemp">Load Balancer Name</label>\
											<div class="clickRole">\
												<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="pull-left col-md-8 col-xs-12 nopadding">\
											<div class="listeConfiText">Listener Configuration</div>\
											<div class="pull-left">\
												<label class="labelTemp">Load Balancer Protocol</label>\
												<div id="sel" style="margin-right:10px;" class="clickRole borderNoN temp1stRowWid"><span>Select</span><ul id="sels" class="dropDown" style="display: none;"><li onclick="selectOpt(this,0)" class="One"><dl><dt></dt><dd class="va">One</dd></dl></li><li onclick="selectOpt(this,1)" class="Two"><dl><dt></dt><dd class="va">Two</dd></dl></li><li onclick="selectOpt(this,2)" class="Three"><dl><dt></dt><dd class="va">Three</dd></dl></li></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div>\
											</div>\
											<div class="pull-left">\
												<label class="labelTemp">Load Balancer Port</label>\
												<div class="clickRole">\
													<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
												</div>\
											</div>\
											<div style="clear:both;">&nbsp;</div>\
											<div class="pull-left">\
												<label class="labelTemp">Instance Protocol</label>\
												<div id="sel" style="margin-right:10px;" class="clickRole borderNoN temp1stRowWid"><span>Select</span><ul id="sels" class="dropDown" style="display: none;"><li onclick="selectOpt(this,0)" class="One"><dl><dt></dt><dd class="va">One</dd></dl></li><li onclick="selectOpt(this,1)" class="Two"><dl><dt></dt><dd class="va">Two</dd></dl></li><li onclick="selectOpt(this,2)" class="Three"><dl><dt></dt><dd class="va">Three</dd></dl></li></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div>\
											</div>\
											<div class="pull-left">\
												<label class="labelTemp">Instance Port</label>\
												<div class="clickRole">\
													<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
												</div>\
											</div>\
										</div>\
										<div class="pull-left col-md-4 col-xs-12 nopadding">\
											<div class="listeConfiText">Available Subnets</div>\
											<table>\
											  <tr>\
												 <th>Subnet Name</th>\
												 <th>Actions</th>\
											  </tr>\
											  <tr>\
												 <td>Subnet 1</td>\
												 <td><span class="glyphicon glyphicon-remove-circle detachIcon poinTer"></span></td>\
											  </tr>\
											  <tr>\
												 <td>Subnet 1</td>\
												 <td><span class="glyphicon glyphicon-remove-circle detachIcon poinTer"></span></td>\
											  </tr>\
											  <tr>\
												 <td><button id="aviSubNetPop" onclick="manage.loadBa_AdvancedPopup(this)" class="redButton">Add more</button></td>\
												 <td></td>\
											  </tr>\
											</table>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="pull-left">\
											<label class="labelTemp">Security Groups</label>\
											<div id="sel" class="clickRole borderNoN temp1stRowWid"><span>Select</span><ul id="sels" class="dropDown" style="display: none;"><li onclick="selectOpt(this,0)" class="One"><dl><dt></dt><dd class="va">One</dd></dl></li><li onclick="selectOpt(this,1)" class="Two"><dl><dt></dt><dd class="va">Two</dd></dl></li><li onclick="selectOpt(this,2)" class="Three"><dl><dt></dt><dd class="va">Three</dd></dl></li></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div>\
										</div>\
										<button onclick="manage.loadBa_AdvancedPopup(this)" id="securityGro" class="redButton" style="margin-top: 32px;margin-left:10px;">Create New</button>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="listeConfiText">Configure Health Checks</div>\
										<div class="pull-left">\
											<label class="labelTemp">Ping Protocol</label>\
											<div id="sel" style="margin-right:10px;" class="clickRole borderNoN temp1stRowWid"><span>Select</span><ul id="sels" class="dropDown" style="display: none;"><li onclick="selectOpt(this,0)" class="One"><dl><dt></dt><dd class="va">One</dd></dl></li><li onclick="selectOpt(this,1)" class="Two"><dl><dt></dt><dd class="va">Two</dd></dl></li><li onclick="selectOpt(this,2)" class="Three"><dl><dt></dt><dd class="va">Three</dd></dl></li></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Ping Port</label>\
											<div class="clickRole" style="margin-right:10px;">\
												<input type="text" id="routeName" placeholder="Number" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Ping Path</label>\
											<div class="clickRole">\
												<input type="text" id="routeName" placeholder="Path Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<button onclick="manage.loadBa_AdvancedPopup(this)" id="configHeAd" class="redButton" style="margin-top: 32px;margin-left:10px;">Advanced</button>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="pull-left">\
											<label class="labelTemp">Upload Certificate</label>\
											<div class="clickRole">\
												<input type="text" id="UploadCertifInput" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<button onclick="manage.loadBa_AdvancedPopup(this)" id="upload-click-handler" class="redButton" style="margin-top: 32px;margin-left:10px;">Upload</button>\
										\
										<input id="upload-box" style="visibility:hidden;height:0;" name="Photo" type="file" />\
										\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="pull-left">\
											<label class="labelTemp">Add Instances</label>\
											<div class="">\
												<textarea rows="4" cols="60"></textarea>\
											</div>\
										</div>\
										<button onclick="manage.loadBa_AdvancedPopup(this)" id="addInstPop" class="redButton" style="margin-top: 32px;margin-left:10px;">Add</button>\
										<br><br><br><br>\
										<label><input type="checkbox">Create Internal Load Balancer</label>\
										<br><br>\
										<button class="redButton" style="padding:7px 12px;font-size:16px;" onclick="deployFunction();">Create</button>\
										<button class="redButton countAlign" style="padding:7px 12px;font-size:16px;" onclick="manage.CancelFun(this);">Cancel</button>\
										<br><br>\
										<br><br>\
										<br><br>-->\
										\
										\
										\
										<div class="pull-left">\
											<label class="labelTemp">Load Balancer Name</label>\
											<div class="clickRole addStoTabWid">\
												<input type="text" id="lbName" placeholder="Must be unique" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="listeConfiText">Configuration</div>\
										<div class="pull-left">\
										<label class="labelTemp">EP Name</label>\
										<div class="clickRole addStoTabWid">\
											<input type="text" id="epName" placeholder="Name" style="border:none;width:100%;">\
										</div>\
										</div>\
										<div class="pull-left">\
										<label class="labelTemp">Protocol</label>\
											<div class="clickRole" style="margin-right:10px">\
											<input type="text" id="protocol" placeholder="Like http,tcp" value = "TCP" style="border:none;width:100%;">\
										    </div>\
										</div>\
										<div class="pull-left">\
										<label class="labelTemp">Public Port</label>\
										<div class="clickRole" style="margin-right:10px">\
											<input type="number" id="PPort" onchange="assignport(this.value)" placeholder="Public Port" style="border:none;width:100%;">\
										</div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Local Port</label>\
											<div class="clickRole" style="margin-right:10px">\
												<input type="number" id="LPort" placeholder="Local Port" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="listeConfiText">Settings</div>\
										<div class="pull-left">\
											<label class="labelTemp">LB Set Name</label>\
											<div class="clickRole addStoTabWid">\
												<input type="text" id="lbsname" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Path</label>\
											<div class="clickRole">\
												<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<input id="upload-box-Azure" style="visibility:hidden;height:0;" name="Photo" type="file" />\
										<br><br>\
										<button class="redButton" style="padding:7px 12px;font-size:16px;" onclick="loadBalancer();">Create</button>\
										<button class="redButton countAlign" style="padding:7px 12px;font-size:16px;" onclick="deployFunction();">Cancel</button>\
										<br><br>\
									</div>\
									</li>\
								</ul>\
							</nav>\
						</td>\ ';
	}
	Projects.prototype.traficManagerDetails = function(){
		//document.getElementById("loadBalTDText").innerHTML="Load Balancing";
		document.getElementById("loadBalTd").style.display="block";
		document.getElementById("nodeTD").style.display="none";
		document.getElementById("detailsTD").style.display="none";
		var addLoadBa = document.getElementById("loadBal");
		addLoadBa.innerHTML='<td style="padding:0px;width:250px;vertical-align:top;background-color:#DDDDDD;">\
							<nav role="noDes">\
								<ul>\
									<li class="naee"><a href="#">Traffic Manager</a>\
									<div style="padding:10px;float:left;width:100%;">\
										<div class="pull-left">\
											<label class="labelTemp">Profile Name</label>\
											<div class="clickRole addStoTabWid">\
												<input type="text" id="pfName" placeholder="Any Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Domain Name</label>\
											<div class="clickRole addStoTabWid">\
												<input type="text" id="dmName" placeholder="Any Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="pull-left">\
											<label id="" class="labelTemp"><span>Load Balanacer Method</span></label>\
											<div id="typeo11" class="clickRole addStoTabWid"><span>Select</span>\
												<ul id="ba_Me_ID" class="dropDown" style="display: none;">\
												<li onclick="selectOpt(this,0)" class="Dev"><dl><dt style="padding:0px;"></dt><dd class="va">Performance</dd></dl></li>\
												<li onclick="selectOpt(this,1)" class="Dev"><dl><dt style="padding:0px;"></dt><dd class="va">RoundRobin</dd></dl></li>\
												<li onclick="selectOpt(this,2)" class="Dev"><dl><dt style="padding:0px;"></dt><dd class="va">Failover</dd></dl></li>\
												</ul>\
												<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="listeConfiText">Configuration</div>\
										<div class="pull-left" style="visibility:hidden;height:0;">\
										<label class="labelTemp">Monitor Port</label>\
										<div class="clickRole addStoTabWid">\
											<input type="text" id="epName" placeholder="Name" style="border:none;width:100%;">\
										</div>\
										</div>\
										<div class="pull-left">\
											<label id="" class="labelTemp"><span>Monitor Protocol</span></label>\
											<div id="typeDro12" class="clickRole addStoTabWid"><span>Select</span>\
												<ul id="as_ID" class="dropDown" style="display: none;">\
												<li onclick="selectOpt(this,0)" class="Dev"><dl><dt style="padding:0px;"></dt><dd class="va">Http</dd></dl></li>\
												<li onclick="selectOpt(this,1)" class="Dev"><dl><dt style="padding:0px;"></dt><dd class="va">Https</dd></dl></li>\
												</ul>\
												<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
											</div>\
										</div>\
										<div class="pull-left" >\
										<label class="labelTemp">Monitor Port</label>\
										<div class="clickRole" style="margin-right:10px">\
											<input type="number" id="mPort" placeholder="Public Port" style="border:none;width:100%;">\
										</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<input id="upload-box-Azure" style="visibility:hidden;height:0;" name="Photo" type="file" />\
										<button class="redButton" style="padding:7px 12px;font-size:16px;" onclick="trafficManager(\''+this.dataOfNd[0].cloud_name+'\');">Create</button>\
										<button class="redButton countAlign" style="padding:7px 12px;font-size:16px;">Cancel</button>\
									</div>\
									</li>\
								</ul>\
							</nav>\
						</td>\ ';
		this.dropDownMenu();
	}
	Projects.prototype.uploadBlobToStorage = function(){
		document.getElementById("loadBalTd").style.display="block";
		document.getElementById("nodeTD").style.display="none";
		document.getElementById("detailsTD").style.display="none";
		
		var addLoadBa = document.getElementById("loadBal");
		addLoadBa.innerHTML='<td style="padding:0px;width:250px;vertical-align:top;background-color:#DDDDDD;">\
					<nav role="noDes">\
					<form id="uploadForm1" enctype="multipart/form-data" action="/blobUpload" method="post" onsubmit="return validateBlobForm()">\
					<ul>\
						<li class="naee"><a href="#">Upload Blob File</a>\
						<div style="padding:10px;float:left;width:100%;">\
								<div class="pull-left">\
								<label class="labelTemp">Container Name</label>\
								<div class="clickRole addStoTabWid">\
									<input type="text" id="cName" name="cName" placeholder="Any Name" style="border:none;width:100%;">\
								</div>\
							    </div>\
			                    <div class="pull-left">\
								<label class="labelTemp">Blob Name</label>\
								<div class="clickRole addStoTabWid">\
									<input type="text" id="bName" name="bName" placeholder="Any Name" style="border:none;width:100%;">\
								</div>\
							    </div>\
								<div class="pull-left">\
								<label class="labelTemp">Upload Blob File</label>\
								<div class="clickRole addStoTabWid">\
									<input type="file" name="bfile" id="file" placeholder="" style="border:none;width:100%;">\
								</div></div>\
								<div class="smpxDevider">&nbsp;</div>\
								<input type="submit" style="padding:7px 12px;font-size:16px;background-color:#E24B4B;" value="Upload" name="submit">\
						</div>\
						</li>\
					</ul>\
				</nav>\
			</td>\ ';
			this.dropDownMenu();
	}
	function validateBlobForm(){
		alert("hi");
		var exp = /^\w+$/;
		var contName = document.getElementById("cName").value 
		    ,blobName = document.getElementById("bName").value;
		if(!exp.test(contName)){
			alert("Enetr the container Name");
			document.getElementById("cName").focus();
			return false;
		}else if(!exp.test(blobName)){
			alert("Enter the blob Name");
			document.getElementById("bName").focus();
			return false;
		}else{return true;}
	}
	
	
	
	function trafficManager(obj){
		alert(obj);
		var expTname = /^\w+$/;
		var cldService = obj
		    ,pfName = document.getElementById("pfName").value
		    ,dmName = document.getElementById("dmName").value
		    ,lbMethod = document.getElementById("typeo11").innerText
		    ,mnProtocol = document.getElementById("typeDro12").innerText
		    ,mPort = document.getElementById("mPort").value;
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
		
		
		console.log(cldService,pfName,dmName,lbMethod,mnProtocol,mPort);
		var data = {};
		data.cldService = cldService;
		data.pfName = pfName;
		data.dmName = dmName;
		data.lbMethod = lbMethod;
		data.mnProtocol = mnProtocol;
		data.mPort = mPort;
		/*$.ajax({
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
	        });*/
	}
	
	
	Projects.prototype.enviromentMoreLinks = function(ev, i, project_id){
		function insertAfter(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
		event.stopPropagation();
		var envOptionsID = document.getElementById("envLinks_"+project_id+"_"+i);
		var nodId = document.getElementById("EnvntID_"+i);
		if(envOptionsID){
			envOptionsID.remove();
		}else{
			// Load Balanacer and Traffic Manager are commented because moved to new pages.
			var nodeListOptions = document.createElement("ul");
			nodeListOptions.id="envLinks_"+project_id+"_"+i;
			nodeListOptions.className="nodeSettings";
			nodeListOptions.innerHTML='\
			<!--<li onclick="manage.disPlayLoadBalancer(this)">Load Balanacer</li>\
			<li onclick="manage.traficManagerDetails(this, '+i+', '+project_id+')">Traffic Manager</li>-->\
			<li onclick="manage.uploadBlobToStorage(this, '+i+', '+project_id+')">Upload Blob To Azure</li>\
			</ul>';
			insertAfter(nodId, nodeListOptions);
		}
	}
	Projects.prototype._init = function(daaa){
		this.dataOfNd = daaa; // [object Object] i dont know why??
	}
function assignport(port)
{
	document.getElementById("LPort").value=port;
}
	
function loadBalancer(){
	console.log("Inside Load Balanacer");
	var expTname = /^\w+$/;
	var LbName = document.getElementById("lbName").value,
	    protocol = document.getElementById("protocol").value,
	    locPort = document.getElementById("LPort").value,
	    pubPort = document.getElementById("PPort").value,
	    epName = document.getElementById("epName").value,
	    lbSet = document.getElementById("lbsname").value,
	    cldService = node_details[0].cloud_name;
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
	data.cldService = cldService;
	data.LbName = LbName;
	data.protocol = protocol;
	data.locPort = locPort;
	data.pubPort = pubPort;
	data.epName = epName;
	data.lbSet = lbSet;
	data.cldService = cldService;
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
	
	Projects.prototype.getNodeDetails_Manage = function(ev, i, project_id){
		event.stopPropagation();
		function insertAfter(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
		var nodeListOptionsID = document.getElementById("nLinks_"+project_id+"_"+i);
		var nodId = document.getElementById("nodeDt_"+project_id+"_"+i);
		console.log("prov_id: "+ev.title);
		if(nodeListOptionsID){
			nodeListOptionsID.remove();
		}else{
			if(ev.title == "AWS"){
				var nodeListOptions = document.createElement("ul");
				nodeListOptions.id="nLinks_"+project_id+"_"+i;
				nodeListOptions.className="nodeSettings";
				nodeListOptions.innerHTML='<!--<li onclick="manage.nodeDetailsVolume(this, '+i+', '+project_id+')">Volumes</li>\
										   <li onclick="manage.nodeDetailsSecurityGroup(this, '+i+', '+project_id+')">Security Group</li>-->\
										   <li onclick="manage.addScript(this, '+i+', '+project_id+')">Add Script</li>\
										   <!--<li onclick="">Keypairs</li>\
										   <li onclick="">Snap Shoart</li>-->\
										  </ul>';
				insertAfter(nodId, nodeListOptions);
			}else if(ev.title == "Azure"){
				var nodeListOptions = document.createElement("ul");
				nodeListOptions.id="nLinks_"+project_id+"_"+i;
				nodeListOptions.className="nodeSettings";
				nodeListOptions.innerHTML='\
				<li onclick="manage.addScript(this, '+i+', '+project_id+')">Add Script</li>\
				<li onclick="manage.endPoints_Azure(this, '+i+', '+project_id+')">End points</li>\</ul>';
				insertAfter(nodId, nodeListOptions);
			}
			
		}
	}
	Projects.prototype.endPoints_Azure = function(ev, i, project_id){
		var nodeDe = document.getElementById('nodeDetails_'+project_id);
			nodeDe.width="70%";
		nodeDe.innerHTML='<tr>\
				            <td colspan=""><div class="detailsDiv">End Points</div></td>\
				           </tr>\
							<tr>\
								<td>\
									<div class="pull-left">\
										<label class="labelTemp">End Point Name</label>\
										<div class="clickRole" style="margin-right:10px">\
											<input type="text" id="endpoint" placeholder="Name" style="border:none;width:100%;">\
										</div>\
									</div>\
									<div class="pull-left">\
										<label class="labelTemp">Local Port</label>\
										<div class="clickRole" style="margin-right:10px">\
											<input type="number" id="lclPort" placeholder="Port Number" onchange="setpbPort(this.value);" style="border:none;width:100%;">\
										</div>\
									</div>\
									<div class="pull-left">\
										<label class="labelTemp">Public Port</label>\
										<div class="clickRole" style="margin-right:10px">\
											<input type="number" id="pbPort" placeholder="Port Number" style="border:none;width:100%;">\
										</div>\
									</div>\
							  </td>\
							</tr>\
							 <tr>\
							  <td colspan="">\
								<div>\
									<button class="redButton" onclick="createAzureEndpoints(\''+this.dataOfNd[i].cloud_name+'\', \''+this.dataOfNd[i].role+'\')">Create</button>\
									<button class="redButton" onclick="">Cancel</button>\
								</div>\
				            </td>\
							</tr>';
		this.dropDownMenu();
	}
	/*==================Create End Point==================*/
	function setpbPort(num){
		document.getElementById("pbPort").value = num;
	}
	function createAzureEndpoints(cldSrvName,vmName){
		var endpoint = document.getElementById("endpoint").value
		    ,lclPort = document.getElementById("lclPort").value
		    ,pbPort = document.getElementById("pbPort").value;
		var exp = /^\w+$/;
		if(!exp.test(endpoint)){
			alert("Name not valid");
			document.getElementById("endpoint").focus();
			return;
		}else if(lclPort == "" || lclPort == null){
			alert("Should not be empty");
			document.getElementById("lclPort").focus();
			return;
		}else if(pbPort == "" || pbPort == null){
			alert("Should not be empty");
			document.getElementById("pbPort").focus();
			return;
		}
		console.log(endpoint+lclPort+pbPort);
		var data = {};
		data.cldSrvName = cldSrvName;
		data.vmName = vmName;
		data.endpoint = endpoint;
		data.lclPort = lclPort;
		data.pbPort = pbPort;
		$.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: data,	 
		     url:  _ip+'/azureEndPoint',
		     success: function(results) {
		    	 alert(results);
		     },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
			 });
		
	}
	
	Projects.prototype.addScript = function(ev, i, project_id){
		var nodeDe = document.getElementById('nodeDetails_'+project_id);
			nodeDe.width="70%";
		nodeDe.innerHTML='<tr>\
				            <td colspan=""><div class="detailsDiv">Add Script</div></td>\
				           </tr>\
							<tr>\
								<td>\
								<div class="col-xs-12 custom-spacing">\
								   <div class="col-md-8">\
									 <div class="col-md-4">\
									   <label for="scriptname">Script Name</label>\
									 </div>\
									 <div class="col-md-6">\
									   <input type="text" class="form-control" id="scriptname" name="scriptname" required/>\
									 </div></div>\
									 <label><input type="radio" name="script" value="Once" checked/>Once</label>\
									 <label><input type="radio" name="script" value="Daily"/>\Daily</label>\
									 <select id="hr"></select><label>hr</label>\
									 <select id="min"></select><label>mn</label>\
								 </div>\
							  </td>\
							</tr>\
							<tr>\
								<td><textarea name="textarea" id="scriptdata" placeholder="Your script here.." class="pastYourScript" rows="10" style="width:100%"></textarea>\
							  </td>\
							</tr>\
							 <tr>\
							  <td colspan="">\
								<div>\
									<button class="redButton" onclick="addScriptFunction();">Run Script</button>\
								</div>\
				            </td>\
							</tr>';
		for(var i = 0; i < 24; i++)
			{
			  $('#hr').append("<option value='"+i+"'>"+i+"</option>");
			}
		for(var j = 0; j < 60; j++){
			$('#min').append("<option value='"+j+"'>"+j+"</option>");
		}
		this.dropDownMenu();
	}
	function addScriptFunction(){
		var type = $('[name="script"]:checked').val();
		var scriptName = document.getElementById("scriptname").value;
		var scriptData = document.getElementById("scriptdata").value
			,hr = document.getElementById("hr").value
			,min = document.getElementById("min").value		
		var data = {};
		data.scriptName = scriptName;
		data.scriptData = scriptData;
		data.type = type;
		data.hr = hr;
		data.min = min;
		
		console.log(data);
		$.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: data,	 
		     url:  _ip+'/runScript',
		     success: function(results) {
				 alert(results);
		    	 /*if(results == "Success")
		    		 {window.open(_ip+'/download');}
		    	 else{alert(results);}*/
		     },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
			 });
	}
	
	Projects.prototype.nodeDetailsVolume = function(ev, i, project_id){
		var data = {};
		this.indexOfNode = i;
		data.inst_id = this.dataOfNd[i].inst_id;
		var self = this;

		$.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/volumeDetails',
			success: function(data, textStatus){
				self.volumeSettingsData = data;
				self.popupTitle.innerHTML="Create New Volume";
				self.popupExistingTitle.innerHTML="Existing Volumes";
				var nodeDe = document.getElementById('nodeDetails_'+project_id);
				nodeDe.innerHTML='<tr>\
					               <td colspan=""><div class="detailsDiv">Volume Details</div></td>\
					              </tr>\
								<tr>\
									<td>\
									<table>\
									   <tbody id="volumeDetails_'+self.indexOfNode+'_'+project_id+'">\
										<tr>\
										  <th>Name</th>\
										  <th>Type</th>\
										  <th>Size</th>\
										  <th>Status</th>\
										  <th>Detach</th>\
										</tr>\
									  </tbody>\
									</table>\
								  </td>\
								</tr>\
								 <tr>\
								  <td colspan="">\
									<div>\
										<button class="redButton" onclick="manage.showVolumeSettings(this)">Volume Settings</button>\
									</div>\
					               </td>\
								</tr>';
				var getvolmeDetID = document.getElementById("volumeDetails_"+self.indexOfNode+"_"+project_id);
				if(data.length == 0){
					getvolmeDetID.innerHTML+="<tr><td colspan='5' style='text-align:center;'>No Volumes</td></tr>";
				}else{
					for(var g=0; g<data.length; g++){
						if(data[g].status == "detached"){
							//return true;
							console.log("detached");
						}else{
						getvolmeDetID.innerHTML+='<tr>\
							  <td>'+data[g].volume_name+'</td>\
							  <td>'+data[g].volume_type+'</td>\
							  <td>'+data[g].volume_size+'</td>\
							  <td>'+data[g].status+'</td>\
							  <td><a href="#" title='+data[g].volume_id+' onclick="manage.detachAndDelete(this)"><span class="glyphicon glyphicon-remove-circle detachIcon"></span></a></td>\
							</tr>';
							}
					}
				}
		 },
		 error: function (xhr, status, error){
			   console.log('Failure');
			},
		  });
	}
	Projects.prototype.detachAndDelete = function(ev, vname){
		console.log(ev.title);
		//ev.preventDefault();
	}
	Projects.prototype.showVolumeSettings = function(ev){
		var nodeList = this.volumeSettingsData;
		console.log(nodeList);
		document.getElementById("securityGrCreatBlock").style.display="none";
		document.getElementById("volumeCereatBlock").style.display="block";
		if(nodeList == ""){
			var exVolId = document.getElementById("existingVolumesID");
			for(var g=0; g<nodeList.length; g++){
				exVolId.innerHTML+='<tr class="exVol">\
							<td colspan="5">No Volumes</td>\
						</tr>';
			}
			document.getElementById("volumeDetailsPopup").style.display="block";
		}else{
			var exVolId = document.getElementById("existingVolumesID");
			for(var g=0; g<nodeList.length; g++){
				exVolId.innerHTML+='<tr class="exVol">\
							<td>'+nodeList[g].volume_name+'</td>\
							<td>'+nodeList[g].volume_type+'</td>\
							<td>'+nodeList[g].volume_size+'</td>\
							<td>'+nodeList[g].iops+'</td>\
							<td><button class="redButton" id="" title="'+nodeList[g].volume_name+'" onclick="manage.attachExisThis(this)">Attach</button></td>\
						</tr>';
			}
			document.getElementById("volumeDetailsPopup").style.display="block";
		}
		
	}
	Projects.prototype.nodeDetailsSecurityGroup = function(ev, i, project_id){
		var data = {};
		this.indexOfNode = i;
		data.inst_id = this.dataOfNd[i].inst_id;
		var self = this;
		$.ajax({
			type: 'POST',
			jsonpCallback: "callback",
			datatype: 'jsonp',
			data: data,
			url: _ip+'/secGrpDetails',
			success: function(data, textStatus){
				console.log(data);
				self.securityGroupSettingsData = data;
				self.popupTitle.innerHTML="Create New Security Group";
				self.popupExistingTitle.innerHTML="Existing Security Groups";
				var nodeDe = document.getElementById('nodeDetails_'+project_id);
				nodeDe.innerHTML='<tr>\
					               <td colspan=""><div class="detailsDiv">Security Group Details</div></td>\
					              </tr>\
								<tr>\
									<td>\
									<table>\
									   <tbody id="securityDetails_'+self.indexOfNode+'_'+project_id+'">\
										<tr>\
										  <th>Name</th>\
										  <th>Type</th>\
										  <th>Size</th>\
										  <th>Status</th>\
										  <th>Detach</th>\
										</tr>\
									  </tbody>\
									</table>\
								  </td>\
								</tr>\
								 <tr>\
								  <td colspan="">\
									<div>\
										<button class="redButton" onclick="manage.showSecurityGroupSettings(this)">SecGroup Settings</button>\
									</div>\
					               </td>\
								</tr>';
				var getvolmeDetID = document.getElementById("securityDetails_"+self.indexOfNode+"_"+project_id);
				if(data.length == 0){
					getvolmeDetID.innerHTML+="<tr><td colspan='5' style='text-align:center;'>No Security Group</td></tr>";
				}else{
					for(var g=0; g<data.length; g++){
						if(data[g].status == "detached"){
							//return true;
							console.log("detached");
						}else{
						getvolmeDetID.innerHTML+='<tr>\
							  <td>'+data[g].sg_name+'</td>\
							  <td>'+data[g].cidr+'</td>\
							  <td>'+data[g].to_port+'</td>\
							  <td>'+data[g].status+'</td>\
							  <td><a href="#" title='+data[g].sg_name+' onclick="manage.detachAndDelete(this)"><span class="glyphicon glyphicon-remove-circle detachIcon"></span></a></td>\
							</tr>';
							}
					}
				}
		 },
		 error: function (xhr, status, error){
			   console.log('Failure');
			},
		  });
	}
	function fortCheckFunction(valuee, Id){
	//alert(value+""+Id);
	if(valuee < 0 || valuee > 65535)
		{
			$('#'+Id+'').val("");
		}
}
function createSgpFunction(buttonId, Id){
	var sgName = document.getElementById("sgName"+Id+"").value;
	var sgFPort = document.getElementById("sgFPort"+Id+"").value;
	var sgTPort = document.getElementById("sgTPort"+Id+"").value;
	var sgCidrIp = document.getElementById("ipText"+Id+"").value;
	var cidr = document.getElementById("selci"+Id+"").innerText;
	//var vpcId = document.getElementById("selvpc").innerText;
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
	//data.provider = pvd_name;
	//data.region = pvd_region;
	data.sgName = sgName;
	data.sgFPort = sgFPort;
	data.sgTPort = sgTPort;
	data.sgCidrIp = sgCidrIp;
	//data.vpcId = vpcId;
	console.log(data);
	/* $.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/createSecGroup',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            }); */
}
var cidrIp = ["Anywhere", "My IP", "Custom IP"];
function getPublicIp(valuee, append){
	console.log(valuee+"="+append);
	if(valuee == "My IP")
	{
	    $.getJSON("http://jsonip.com/?callback=?", function (data) {
	        document.getElementById("ipText1").value=data.ip+"/32";
		});
		//$.getJSON("https://api.ipify.org?format=jsonp&callback=?",
	      //function(json) {
	        
	      //}
	    //);
	}else if(valuee == "Anywhere")
		{
			var Anywhere = "0.0.0.0/0"
			document.getElementById("ipText1").value=Anywhere;
		}else{
			document.getElementById("ipText1").value="";
			$('#ipText'+append+'').focus();
		}
}
	Projects.prototype.showSecurityGroupSettings = function(ev){
		var nodeList = this.securityGroupSettingsData;
		console.log(nodeList);
		document.getElementById("securityGrCreatBlock").style.display="block";
		document.getElementById("volumeCereatBlock").style.display="none";
		var i = 1;
		var createNeGr = document.getElementById("securityGrCreatBlock");
		createNeGr.innerHTML="<div style='' class='securityGr' id='securityGrIDD"+i+"'><div class='operatingSys'><div class='pull-left'><label class='labelTemp'>Name</label><div class='clickRole addStoTabWid'><input type='text' id='sgName"+i+"' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>From Port</label><div class='clickRole addStoTabWid'><input id='sgFPort"+i+"' type='number' min='0' placeholder='0 - 65535' onchange='fortCheckFunction(this.value, this.id)' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'>To Port</label><div class='clickRole addStoTabWid'><input id='sgTPort"+i+"' type='number' min='0' placeholder='0 - 65535' onchange='fortCheckFunction(this.value, this.id)' style='border:none;width:100%;'></div></div></div>"
					  +"<div class='roleID'><div class='pull-left'><label class='labelTemp'>CIDR IP</label><div id='selci"+i+"' class='clickRole addStoTabWid'><span>Select</span><ul id='selsci"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div></div>"
					  +"<div class='operatingSys'><div class='pull-left'><label class='labelTemp'></label><div class='clickRole addStoTabWid'><input id='ipText"+i+"' type='text' style='border:none;width:100%;'></div></div><div style='padding:22px 0 0 0px;float:left;'><button class='redButton pull-left countAlign' id='secGroup1' onclick='createSgpFunction(this.id, 1)'>Create</button></div></div>"
					  +"</div>";
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
						$(document).on("click", function(){
							$(".dropDown").slideUp();
						});
						
		var appendD = new DropdownConst();
			//appendD.appendData(volumeType,"selsstg"+i+"");
			appendD.appendData(cidrIp,"selsci"+i+"");
		if(nodeList == ""){
			var exVolId = document.getElementById("existingVolumesID");
			for(var g=0; g<nodeList.length; g++){
				exVolId.innerHTML+='<tr class="exVol">\
							<td colspan="5">No Volumes</td>\
						</tr>';
			}
			document.getElementById("volumeDetailsPopup").style.display="block";
		}else{
			var exVolId = document.getElementById("existingVolumesID");
			for(var g=0; g<nodeList.length; g++){
				exVolId.innerHTML+='<tr class="exVol">\
							<td>'+nodeList[g].sg_name+'</td>\
							<td>'+nodeList[g].cidr+'</td>\
							<td>'+nodeList[g].to_port+'</td>\
							<td>'+nodeList[g].status+'</td>\
							<td><button class="redButton" id="" title="'+nodeList[g].sg_id+'" onclick="manage.attachExisThis(this)">Attach</button></td>\
						</tr>';
			}
			document.getElementById("volumeDetailsPopup").style.display="block";
		}
	}
	Projects.prototype.attachExisThis = function(ev){
		var attachThis = ev.title;
		//console.log(attachThis);attachVolume
		var data= {};
		data.attachVol = attachThis;
		$.ajax({
	        type: 'POST',
	   	 	jsonpCallback: "callback",
	        datatype: 'jsonp',
	        data: data,
	        url: _ip+'/attachVolume',
	        success: function(data, textStatus){
	        	console.log(data);
	        	},
	        	 error: function (xhr, status, error){
	                 console.log('Failure');
	         		alert("failure");
	         		},
	            });
		
	}
	Projects.prototype.getNodeDetails = function(ev, clickedData, project_id){
		event.stopPropagation();
		var elId = document.getElementById('node_'+project_id);
		var liArray = elId.getElementsByTagName("dt");
			for (var i = 0; i < liArray.length; i++)
				{
					liArray[i].className = "";
					ev.className ="activeLink";
				}
		var nodeDe = document.getElementById('nodeDetails_'+project_id);
		//console.log("getNodeDetails:::::"+this.dataOfNd);
		var ifNull ="--"
		var clodSer = this.dataOfNd[clickedData].cloud_service ? this.dataOfNd[clickedData].cloud_service : ifNull ;
					nodeDe.innerHTML='<tr>\
							<td><img src="images_1/'+this.dataOfNd[clickedData].prov_id+'_Logo.png" /></td>\
							<td>\
								<table>\
									<tr>\
										<td>Type:</td>\
										<td>'+this.dataOfNd[clickedData].inst_type+'</td>\
									</tr>\
									<tr>\
										<td>Role:</td>\
										<td>'+this.dataOfNd[clickedData].role+'</td>\
									</tr>\
									<tr>\
										<td>VPC: </td>\
										<td>'+this.dataOfNd[clickedData].vpc_name+'</td>\
									</tr>\
									<tr>\
									<td>Region: </td>\
									<td>'+this.dataOfNd[clickedData].region+'</td>\
								</tr>\
								</table>\
							</td>\
						</tr>\
						<tr>\
							<td colspan="2" style="text-align:center;">\
							  <p class="statusOfNode">\
								<span class="st">Status: </span>\
								<span class="statusText">&nbsp;&nbsp;<span class="'+this.dataOfNd[clickedData].status+'"></span>'+this.dataOfNd[clickedData].status+'</span>\
							  </p>\
							  <div class="nodeScheduleBox">\
								<button class="redButton" id="Start_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+','+this.dataOfNd[clickedData].p_name+','+this.dataOfNd[clickedData].type+'" onclick="manage.nodeSchedule(this)">ScheduleStop</button>\
								<input type="date" id="user_date" name="date">\
								<select id="user_hr"></select>\
								<select id="user_min"></select>\
								<button class="redButton" id="Start_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+','+this.dataOfNd[clickedData].p_name+','+this.dataOfNd[clickedData].type+'" onclick="manage.nodeSchedule(this)">ScheduleStart</button>\
								</div>\
							</td>\
						</tr>\
						<tr>\
							<td colspan="2">\
							<div class="nodeBuT" style="border-top:solid 1px #ccc;">\
							<button class="redButton" id="this_Start_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+','+this.dataOfNd[clickedData].p_name+','+this.dataOfNd[clickedData].type+'" onclick="manage.nodeServerEngine(this)">Start</button>\
							\
							<button class="redButton" id="this_Stop_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+','+this.dataOfNd[clickedData].p_name+','+this.dataOfNd[clickedData].type+'" onclick="manage.nodeServerEngine(this)">Stop</button>\
							\
							<button class="redButton" id="this_Terminate_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+','+this.dataOfNd[clickedData].p_name+','+this.dataOfNd[clickedData].type+'" onclick="manage.nodeServerEngine(this)">Terminate</button>\
							\
							<button class="redButton" id="this_Reboot_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+','+this.dataOfNd[clickedData].p_name+','+this.dataOfNd[clickedData].type+'" onclick="manage.nodeServerEngine(this)">Reboot</button>\
							</div>\
							</td>\
						</tr>\
						<div class="col-xs-12">\
						<div class="col-xs-12 content-title content-title-heading custom-spacing">Add Software<button id="'+this.dataOfNd[clickedData].public_ip+','+this.dataOfNd[clickedData].role+'" class="redButton pull-right" onclick="manage.deployTools(this)">Add</button>\</div>\
						<div class="roleID"><div class="pull-left"><label class="labelTemp">Role</label><div id="selrole" class="clickRole borderNoN"><span>Select</span><ul id="selroles" class="dropDown"></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div></div></div>\
						<div class="roleID"><div class="pull-left"><label class="labelTemp">Software</label><div id="selsoft" class="clickRole borderNoN"><span>Select</span><ul id="selsoftws" class="dropDown"></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div></div></div>\
						</div>';
			this.getroles();
				
			var _StatusOfNode = this.dataOfNd[clickedData].status;
			if(_StatusOfNode == "stopped"){						
				var _start = document.getElementById("this_Start_"+this.dataOfNd[clickedData].inst_id);
				var _stop = document.getElementById("this_Stop_"+this.dataOfNd[clickedData].inst_id).disabled = true;
				var _termi = document.getElementById("this_Terminate_"+this.dataOfNd[clickedData].inst_id);
				var _reboot = document.getElementById("this_Reboot_"+this.dataOfNd[clickedData].inst_id).disabled = true;
				
			}else if(_StatusOfNode == "running"){
				var _start = document.getElementById("this_Start_"+this.dataOfNd[clickedData].inst_id).disabled = true;
				var _stop = document.getElementById("this_Stop_"+this.dataOfNd[clickedData].inst_id);
				var _termi = document.getElementById("this_Terminate_"+this.dataOfNd[clickedData].inst_id);
				var _reboot = document.getElementById("this_Reboot_"+this.dataOfNd[clickedData].inst_id);
				
			}else if(_StatusOfNode == "terminated"){						
				var _start = document.getElementById("this_Start_"+this.dataOfNd[clickedData].inst_id).disabled = true;
				var _stop = document.getElementById("this_Stop_"+this.dataOfNd[clickedData].inst_id).disabled = true;
				var _termi = document.getElementById("this_Terminate_"+this.dataOfNd[clickedData].inst_id).disabled = true;
				var _reboot = document.getElementById("this_Reboot_"+this.dataOfNd[clickedData].inst_id).disabled = true;
			}

		//console.log("re::::"+ JSON.stringify(re));
		//console.log("nodeNa++++  "+nodeNa);
			for(var i = 0; i < 24; i++)
			{
			  $('#user_hr').append("<option value='"+i+"'>"+i+"</option>");
			}
			for(var j = 0; j < 60; j++){
				$('#user_min').append("<option value='"+j+"'>"+j+"</option>");
			}
	},
	Projects.prototype.getroles = function(){
		$(function(){		
		   $.getJSON('http://172.29.59.65:3000/org_temp', function(data) {
			   
			   var idArr = [];
			   
			   idDt = data[0].types;			  
			   for(var j=0;j<=idDt.length-1;j++){
				   var dd = data[0].types[j].name;				   
				   idArr.push(dd);
			   }
			   var appendD = new DropdownConst();
			   	 appendD.appendData(idArr,"selroles");			   			  
		   });
		 
		});
	}
	Projects.prototype.deployTools = function(tData){
		var tool = $('[name="model"]:checked').val();
		var tD = tData.id;
		var tdata = tD.split(",")
		var data = {};
		data.pip = tdata[0];
		data.name = tdata[1];
		data.sName = document.getElementById("selsoft").innerText;
		console.log(data);
		$.ajax({
		  type: 'POST',
		  data:data,
		  url: _ip+'/softwareTool'
		})
		.done(function(data){
			console.log(data);
		})
		.fail(function(err){
			console.log(err);
		})
		
	},
	Projects.prototype.nodeSchedule = function(data){
		var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		
		var scheduleData = data.value
			,arrData = scheduleData.split(",")
			,accName = document.getElementById("typeDro1").innerText
			,user_hr = document.getElementById("user_hr").value
			,user_min = document.getElementById("user_min").value
			,user_date = document.getElementById("user_date").value;
			
		var scData = {};
		scData.inst_id = arrData[0];
		scData.region = arrData[1];
		scData.pvd = arrData[2];
		scData.cldsrvc = arrData[3];
		scData.role = arrData[4];
		scData.projName = arrData[5];
		scData.action = data.innerHTML;
		scData.user_hr = user_hr;
		scData.user_min = user_min;
		scData.user_date = user_date;
		console.log(scData);
		$.ajax({
	        type: 'POST',
	   	 	jsonpCallback: "callback",
	        datatype: 'jsonp',
	        data: scData,
	        url: _ip+'/scheduleService',
	        success: function(data, textStatus){
	        	alert(data);	        	
	        	},
	        	 error: function (xhr, status, error){	                 
	         		alert("failure");
	         		},
	            });
		 
	}
	Projects.prototype.nodeServerEngine = function(wichOne){
		//console.log(wichOne.value, wichOne.innerHTML);
		var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		var inst_id = wichOne.value;
		var arr =inst_id.split(",");		
		var action = wichOne.innerHTML;
		if(arr[6] == "resGroup"){
			manage.resNodeAction(arr,action);
		}else{
		//var accName = document.getElementById("typeDro1").innerText;
		var data = {};
		data.accName = accountName;
		data.projName = projName;
		data.inst_id = arr[0];
		data.action = action;
		data.region = arr[1];
		data.pvd = arr[2];
		data.cldsrvc = arr[3];
		data.role = arr[4];
		console.log(data);
		$.ajax({
	        type: 'POST',
	   	 	jsonpCallback: "callback",
	        datatype: 'jsonp',
	        data: data,
	        url: _ip+'/manage_env_nodes',
	        success: function(data, textStatus){
	        	//alert(data);
	        	if(data != "Success"){$(".alert-warning").stop().slideDown();}
	        	else{$(".alert-success").stop().slideDown();}
	        	},
	        	 error: function (xhr, status, error){
	                 console.log('Failure');
	         		alert("failure");
	         		},
	            });
		}
	}
	Projects.prototype.resNodeAction = function(arr,action){
		//console.log("inside"+arr,action);
		var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		var data = {};
		data.accName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.inst_id = arr[0];
		data.action = action;
		data.region = arr[1];
		data.pvd = arr[2];
		data.resGroup = arr[3];
		data.role = arr[4];
		console.log(data);
		$.ajax({
	        type: 'POST',
	   	 	jsonpCallback: "callback",
	        datatype: 'jsonp',
	        data: data,
	        url: _ip+'/resGroup_action',
	        success: function(data, textStatus){
	        	alert(data);
	        	/*if(data != "Success"){$(".alert-warning").stop().slideDown();}
	        	else{$(".alert-success").stop().slideDown();}*/
	        	},
	        	 error: function (xhr, status, error){
	                 console.log('Failure');
	         		alert("failure");
	         		},
	            });
		
	}
	Projects.prototype.createTableData = function(dataSource){
		console.log(dataSource);
				trIDs = [];
			for(var j=0;j<=dataSource.length-1;j++){
				var createTr = document.createElement("tr");
					createTr.id = dataSource[j].pd_id;
					trIDs.push(dataSource[j].pd_id);
					manageTable.appendChild(createTr);
				var manageTr = document.getElementById(dataSource[j].pd_id);
					manageTr.innerHTML+='<td>'+dataSource[j].p_name+'</td>'
								+'<td>'+dataSource[j].prod_name+'</td>'
								+'<td>'+dataSource[j].technology+'</td>'
								+'<td>'+dataSource[j].start_date+'</td>'
								// +'<td>'+dataSource[j].team_size+'</td>'
								   +'<td><a href="#" onmouseover="disPlayPop(this)" class="redLinks">Status</a>'
								   +'<div style="position:relative">'
									+'<div id="Status_'+dataSource[j].pd_id+'" class="popover fade right in" role="tooltip" style="left:48px;">'
										+'<div class="arrow" style="top:50%;"></div>'
											+'<h3 class="popover-title statusOfNodeH3 tempBg">Status of Nodes</h3>'
											+'</div>'
										+'</div>'
								   +'</td>'
								   +'<td><a href="#" onclick="manage.getEnvironments(this,'+dataSource[j].pd_id+')" class="redLinks">Actions</a></td>';
					this.dataStore_For_Popup(dataSource[j].pd_id);
					//manage.getEnvironments("",dataSource[j].p_id); //it is for default display of all data.
					}					
		//this.createPopupStatus(dataSource);
	}
	Projects.prototype.dataStore_For_Popup = function(project_Id){
		var data = {};	data.id = project_Id;
			var self = this;
			 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip+'/filter_env',
				success: function(data, textStatus){
					if(data == ""){
						var statusPo = document.getElementById("Status_"+project_Id);
							statusPo.innerHTML+='<div class="arrow" style="top:50%;"></div>'
												+'<div style="padding:10px">No Environments Data</div>';
					}else{						
						self.createPopupStatus(data, project_Id)
					}
				},error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	}
	Projects.prototype.createPopupStatus = function(dataSource, project_Id){
		for(var j=0; j<=dataSource.length-1; j++){
			var _template_Name = dataSource[j].env_name;
			var statusPo = document.getElementById("Status_"+project_Id);
			statusPo.innerHTML+='<h3 class="popover-title">Template: <b>'+_template_Name+'</b></h3>'
								+'<div class="popover-content">'
								 +'<ul class="statusNodes" id="Sta_Temp_'+_template_Name+'">'
									
								  +'</ul>'
								+'</div>';
		  this.createPopupStatusNodes(_template_Name, project_Id, j);
		}
	}
	Projects.prototype.CancelFun = function(ev){
		
	}
	Projects.prototype.deploymentStatus = function(){
		$.ajax({
			  type: 'GET',
			  url: _ip+'/deployStatus'
			})
			.done(function(data){
				console.log(data);
				$('#depStatus').html("<b>Status : "+data[0].status+"</b></br><b>Time : "+data[0].time+"</b>");
				//$('#depStatus').html("<b>"+data[0].time+"</b>");
				
			})
			.fail(function(err){
				console.log(err);
			})
		$("#status").show();
	}
	Projects.prototype.createPopupStatusNodes = function(_template_Name, project_Id, j){
		var data = {};
		data.env_name = _template_Name ;
		data.proj_id = project_Id ;
		var self =  this;		
		 $.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip+'/node_details',
				success: function(data, textStatus){
					console.log("Node Status:::::::::"+data);
					//manage._init(data);
					/* var el = document.getElementById('node_'+project_Id);
					el.innerHTML="";
					var nodeDat = []; */
					for(var i = 0; i < data.length; i++){
						var dt = document.createElement("dt"),
							_roLe = data[i].role,
							_StaTus = data[i].status;
							var statusN = document.getElementById("Sta_Temp_"+_template_Name);
							statusN.innerHTML+='<li><span class="'+_StaTus+'"></span>'+_roLe+'</li>';
						}
			 },
			 error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	}
	var manage = new Projects();
	//manage.appendMyData();

/* Writen by Om End here */

/* Writen by Sangamesh Starts here */

var node_info;
function selectOpt(event, idn){	
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(idd);
	if(idd == "selci1"){getPublicIp(aTex,0);}
	if(idd == "typeDro12"){setMonitorPort_AzureTraffic(aTex);}
	if(idd == "selrole"){getsoftware(aTex);} 
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
}
function setMonitorPort_AzureTraffic(val){
	alert(val);
	if(val == "Http"){document.getElementById("mPort").value ="80";}
	else if(val == "Https"){document.getElementById("mPort").value = "443";}
	else{alert("Something went wrong");}
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
function getsoftware(sw){
	//alert(sw);
	var sftw = [];
	$.ajax({
		  type: 'GET',
		  url: _ip+'/org_temp'
		})
	.done(function(data){
		var roles = data[0].types;
		for(var i=0;i<roles.length;i++){
			if(roles[i].name == sw){
				console.log(roles);
				sftw = roles[i].subrole;
				console.log(sftw)
				var appendD = new DropdownConst();
			   	 appendD.appendData(sftw,"selsoftws");
			}
		}
	})
}
function iopsFunction(value,Id){
	var vType = document.getElementById("selstg0").innerText;
	
	if(vType == "General Purpose SSD")
		{	
			if(value >= 1 && value <= 3333)
				{
					var iops=value*3;
					document.getElementById("stgIops0").value=iops;
				}else{
					document.getElementById("stgIops0").value="10000";
				}
		}else if(vType == "Magnetic")
			{
				document.getElementById("stgIops0").value="NA";
			}
}

function createStgFunction(){
	var vType = document.getElementById("selstg0").innerText;
	var vSize = document.getElementById("stgsz0").value;
	var vIops = document.getElementById("stgIops0").value;
	var vName = document.getElementById("stgName0").value
	if(vType == "Select")
		{
		document.getElementById("selstg0").style.border="thin dashed #0099FF";
		return;
		}else if(vSize == null || vSize == "" || vSize > 16384)
			{
				$('#stgsz0').attr("placeholder", "1-16384 GiB").val("").focus().blur();
				return;
			}else if(vType =="Magnetic" && (vSize == null || vSize == "" || vSize > 1024))
				{
					$('#stgsz0').attr("placeholder", "1-1024 GiB").val("").focus().blur();
					return;
				}else if(vName == "" || vName == null)
				{
					$('#stgName0').focus();
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
        url: _ip+'/createStorage',
        success: function(data, textStatus){
        	console.log(data);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		 alert("failure");
         		},
            });
}

Projects.prototype.dropDownMenu = function(){
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
	$("#createAcc").click(function(){
		console.log("Input Value Account: "+$("#createAccount_Input_Id").val());
		$("#createAccPOP").hide();
	});
	/* End Dropdown function */
}
	/*-----------------------------End Table---------------------------------------------*/


// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


function updatevmsFunc(){
	//alert("get vm function");
	var accountName = localStorage.getItem("Account")
	    ,projName = localStorage.getItem("ProjectName")
	    ,prodName = localStorage.getItem("ProductName");
		var data = {};
		data.accName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.Provider = sessionStorage.getItem("Provider");
		console.log(data);
		$.ajax({
	        type: 'POST',
	   	 	jsonpCallback: "callback",
	        datatype: 'jsonp',
	        data: data,
	        url: _ip+'/upadatevm_details',
	        success: function(data, textStatus){
	        	alert(data);
				location.href="//172.29.59.65:3000/importvm"
				/*$(".popupData, .proDiv").show(); 
				        var int = setInterval(hideme, 1*60000); 
				        
				        var i = 1*60000/1000;  
				        var count = 0; 
				        setInterval(function (){ 
				                console.log(i--); 
				                if(i%60 == 0){ 
				                         
				                }				                
				         }, 1000);
						function hideme(){
								$(".deployText, #loadingImg").hide();
								
								//$(".popupData, .proDiv").hide();
								console.log(int);
								window.clearInterval(int);
							}*/
	        	},
	        	 error: function (xhr, status, error){
	                 console.log('Failure');
	         		alert("failure");
	         		},
	            });
}
