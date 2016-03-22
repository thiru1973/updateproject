/* Writen by Om Starts here */
var _ip = "http://172.25.12.23:3000";

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
window.onload = function(){};
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
		  $(function(){
		   $.getJSON( _ip + '/manage_env', function (data){
				//console.log("1st Url Data  : "+data);
					manage.createTableData(data);
					//console.log("DATA:::::::::"+data);
				});
			});
			this.volumeSettingsData = [];
			this.securityGroupSettingsData = [];
			this.popupTitle = document.getElementById('titleOfPopup');
			this.popupExistingTitle = document.getElementById('existingData');
	}
	
	Projects.prototype.getEnvironments = function(self, id){
		//self.preventDefault();
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
				elId.innerHTML+='<dt id="EnvntID_'+enTem+'" onclick="manage.getNodes(this, '+requestId+')">'+temesArr+'<span onclick="manage.enviromentMoreLinks(this, '+enTem+')" class="glyphicon glyphicon-chevron-down arrowGray enviromentMoreLinks rotateGray"></span></dt>';
		  }
		  var elId = document.getElementById('EnvntID_'+0);
		  this.getNodes(elId, requestId);
	}
	Projects.prototype.getNodes = function(env_name, project_id){
		//console.log(env_name.innerText+"  "+project_id);
		//document.getElementById('loadBalTd').style.display="none";
		//document.getElementById('nodeTD').style.display="block";
		//document.getElementById('detailsTD').style.display="block";
		
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
							el.innerHTML+='<dt id="nodeDt_'+project_id+'_'+i+'" onclick="manage.getNodeDetails(this, '+i+', '+project_id+')">'+nodeNa+'<span onclick="manage.getNodeDetails_Manage(this, '+i+', '+project_id+')" class="glyphicon glyphicon-chevron-down arrowGray node_Details rotateGray"></span></dt>';
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
				//400/800 300/600 300/700  7 to 8 per day
			});
		}else if(ev.id =="addEndPoint"){
			document.getElementById("addEndPointID").style.display="block";
		}
	}
	Projects.prototype.enviromentMoreLinks = function(ev, i){
		function insertAfter(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
		document.getElementById("loadBalTDText").innerHTML="Load Balancing";
		document.getElementById("loadBalTd").style.display="block";
		document.getElementById("nodeTD").style.display="none";
		document.getElementById("detailsTD").style.display="none";

		var addLoadBa = document.getElementById("loadBal");
		addLoadBa.innerHTML='<td style="padding:0px;width:250px;vertical-align:top;background-color:#DDDDDD;">\
							<nav role="noDes">\
								<ul>\
									<li class="naee"><a href="#">Load Balancing</a>\
									<div style="padding:10px;float:left;width:100%;">\
										<div class="pull-left">\
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
										<button class="redButton countAlign" style="padding:7px 12px;font-size:16px;" onclick="deployFunction();">Cancel</button>\
										<br><br>\
										<br><br>\
										<br><br>\
										\
										\
										\
										<div class="pull-left">\
											<label class="labelTemp">Load Balancer DSN Name</label>\
											<div class="clickRole addStoTabWid">\
												<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Load Balancing Method</label>\
											<div id="sel" style="margin-right:10px;" class="clickRole borderNoN temp1stRowWid"><span>Select</span><ul id="sels" class="dropDown" style="display: none;"><li onclick="selectOpt(this,0)" class="One"><dl><dt></dt><dd class="va">One</dd></dl></li><li onclick="selectOpt(this,1)" class="Two"><dl><dt></dt><dd class="va">Two</dd></dl></li><li onclick="selectOpt(this,2)" class="Three"><dl><dt></dt><dd class="va">Three</dd></dl></li></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="listeConfiText">Configuration</div>\
										<div class="pull-left">\
											<label class="labelTemp">Time to Live</label>\
											<div class="clickRole">\
												<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="listeConfiText">Settings</div>\
										<div class="pull-left">\
											<label class="labelTemp">Protocol</label>\
											<div id="sel" style="margin-right:10px;" class="clickRole borderNoN temp1stRowWid"><span>Select</span><ul id="sels" class="dropDown" style="display: none;"><li onclick="selectOpt(this,0)" class="One"><dl><dt></dt><dd class="va">One</dd></dl></li><li onclick="selectOpt(this,1)" class="Two"><dl><dt></dt><dd class="va">Two</dd></dl></li><li onclick="selectOpt(this,2)" class="Three"><dl><dt></dt><dd class="va">Three</dd></dl></li></ul><span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span></div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Port</label>\
											<div class="clickRole addStoTabWid">\
												<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="pull-left">\
											<label class="labelTemp">Path</label>\
											<div class="clickRole">\
												<input type="text" id="routeName" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="pull-left">\
											<label class="labelTemp">Add EndPoints</label>\
											<div class="">\
												<textarea rows="4" cols="60"></textarea>\
											</div>\
										</div>\
										<button onclick="manage.loadBa_AdvancedPopup(this)" id="addEndPoint" class="redButton" style="margin-top:32px;margin-left:10px;">Add</button>\
										<div class="smpxDevider">&nbsp;</div>\
										<div class="pull-left">\
											<label class="labelTemp">Upload Certificate</label>\
											<div class="clickRole">\
												<input type="text" id="upload-file-Azure" placeholder="Name" style="border:none;width:100%;">\
											</div>\
										</div>\
										<button onclick="manage.loadBa_AdvancedPopup(this)" id="upload-click-handler_Azure" class="redButton" style="margin-top: 32px;margin-left:10px;">Upload</button>\
										\
										<input id="upload-box-Azure" style="visibility:hidden;height:0;" name="Photo" type="file" />\
										<br><br>\
										<button class="redButton" style="padding:7px 12px;font-size:16px;" onclick="deployFunction();">Create</button>\
										<button class="redButton countAlign" style="padding:7px 12px;font-size:16px;" onclick="deployFunction();">Cancel</button>\
										<br><br>\
									</div>\
									</li>\
								</ul>\
							</nav>\
						</td>\ ';
	}
	Projects.prototype._init = function(daaa){
		this.dataOfNd = daaa; // [object Object] i dont know why??
	}
	Projects.prototype.getNodeDetails_Manage = function(ev, i, project_id){
		function insertAfter(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
		var nodeListOptionsID = document.getElementById("nLinks_"+project_id+"_"+i);
		var nodId = document.getElementById("nodeDt_"+project_id+"_"+i);
		if(nodeListOptionsID){
			nodeListOptionsID.remove();
		}else{
			var nodeListOptions = document.createElement("ul");
			nodeListOptions.id="nLinks_"+project_id+"_"+i;
			nodeListOptions.className="nodeSettings";
			nodeListOptions.innerHTML='<li onclick="manage.nodeDetailsVolume(this, '+i+', '+project_id+')">Volumes</li>\
									   <li onclick="manage.nodeDetailsSecurityGroup(this, '+i+', '+project_id+')">Security Group</li>\
									   <li onclick="">Keypairs</li>\
									   <li onclick="">Snap Shoart</li>\
									  </ul>';
			insertAfter(nodId, nodeListOptions);
		}
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
										<button class="redButton" onclick="manage.showSecurityGroupSettings(this)">Volume Settings</button>\
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
		console.log(attachThis);
	}
	Projects.prototype.getNodeDetails = function(ev, clickedData, project_id){
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
							<td><img src="images_1/AWS_Logo.png" /></td>\
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
							</td>\
						</tr>\
						<tr>\
							<td colspan="2">\
								<div class="nodeBuT">\
				  <button class="redButton" id="this_Start_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+', '+this.dataOfNd[clickedData].region+'" onclick="manage.nodeServerEngine(this)">Start</button>\
				  \
				  <button class="redButton" id="this_Stop_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+', '+this.dataOfNd[clickedData].region+'" onclick="manage.nodeServerEngine(this)">Stop</button>\
				  \
				  <button class="redButton" id="this_Terminate_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+', '+this.dataOfNd[clickedData].region+'" onclick="manage.nodeServerEngine(this)">Terminate</button>\
				  \
				  <button class="redButton" id="this_Reboot_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+', '+this.dataOfNd[clickedData].region+'" onclick="manage.nodeServerEngine(this)">Reboot</button>\
								</div>\
							</td>\
						</tr>';
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
	}
	Projects.prototype.nodeServerEngine = function(wichOne){
		console.log(wichOne.value, wichOne.innerHTML);
	}
	Projects.prototype.createTableData = function(dataSource){
		//console.log("createTableData:::"+dataSource);
			var manageTable = document.getElementById("manageTable");
			for(var j=0;j<=dataSource.length-1;j++){
				var createTr = document.createElement("tr");
					createTr.id = dataSource[j].p_id;
					manageTable.appendChild(createTr);
				var manageTr = document.getElementById(dataSource[j].p_id);
				manageTr.innerHTML+='<td>'+dataSource[j].p_name+'</td>'
								   +'<td>'+dataSource[j].technology+'</td>'
								   +'<td>'+dataSource[j].start_date+'</td>'
								   +'<td>'+dataSource[j].team_size+'</td>'
								   +'<td><a href="#" onmouseover="disPlayPop(this)" class="redLinks">Status</a>'
								   +'<div style="position:relative">'
									+'<div id="Status_'+dataSource[j].p_id+'" class="popover fade right in" role="tooltip" style="left:48px;">'
										+'<div class="arrow" style="top:50%;"></div>'
											+'<h3 class="popover-title statusOfNodeH3 tempBg">Status of Nodes</h3>'
											+'</div>'
										+'</div>'
								   +'</td>'
								   +'<td><a href="#" onclick="manage.getEnvironments(this,'+dataSource[j].p_id+')" class="redLinks">Actions</a></td>';
					this.dataStore_For_Popup(dataSource[j].p_id);
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
	if(idd == "selvpc"){
		 	vpcId = aTex;
		 	getSubnetName(aTex);
		 }
	if(idd == "selsn"){
		 	subnetId = aTex;
		 }
	if(idd == "selci1"){
			getPublicIp(aTex,0);
		 }
	 //document.getElementById(idd).style.border="none";
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
						+"<dl>7702976730"
						+"<dt></dt>"
						+"<dd class='va'>"+name[i]+"</dd>"
						+"</dl>"
						+"</li>"
	}
	epn.write = epn;
	//console.log(epn);
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
	/*-----------------------------End Table---------------------------------------------*/
