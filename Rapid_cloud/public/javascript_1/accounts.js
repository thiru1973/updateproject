/* ************************************
	Create by:Omprakash
	Created on: 30th March 2016
*************************************** */

var _ip = "http://172.29.59.65:3000";

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
	$("#createAcc").click(function(){
		var expTname = /^\w+$/;
		var acc = $("#createAccount_Input_Id").val();
		if(!expTname.test(acc)){
			$(".alert-accName").stop().slideDown();
			document.getElementById("createAccount_Input_Id").focus();
			return true;
		}else if(acc)
			{
			$.getJSON(_ip+'/accountDetails', function(data){
				console.log(data);
				for(var i =0; i < data.data4.length; i++){
					if(data.data4[i].accountid == acc){
						 $(".alert-accName").stop().slideDown();
						 document.getElementById("createAccount_Input_Id").focus();
						 return;
					}
				}
				var data = {};
				data.acc = acc;
				console.log(data);
				$.ajax({
				     type: 'POST',
					 jsonpCallback: "callback",
				     datatype: 'jsonp',
				     data: data,	 
				     url:  _ip+'/createAccount',
				     success: function(results) {
				    	console.log('Created');
						 $.getJSON(_ip+'/accountDetails', function(data){
							for(var i =0; i < data.data4.length; i++){
								var tT = document.getElementById("accounts_ID");
									tT.innerHTML+='<li onclick="account_Sub.getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data4[i].accountid+'</dd></dl></li>';
							}
						});
				     },
					 error: function (xhr, status, error){
				        console.log('Failure');
						
						},
					 });
				$("#createAccPOP").hide();
			})
		}			
	});

	
	/* End Dropdown function */
	$("#volumeDetailsPopup").hide();
	$(".close, .cancelPoup").click(function(){
		$("#volumeDetailsPopup").hide();
		$(".exVol").remove();
		//var exVolId = document.getElementById("existingVolumesID");
		//exVolId.innerHTML="";
	});
	$("#ConfigureHealthpopupClose, .cancelPoup, #subnetsPopupClose, .close").click(function(){
		$("#ConfigureHealthChecksAdvanced, #importSubPOP, #SubnetsPoup, #addInstPopUpWin, #securityGroWin, #createAccPOP, #create_Sub_POP, #create_Project_POP, #create_Product_POP").hide();
	});
	$('.createAccount').click(function(){
		$('#createAccount_Input_Id').val("");
		$('#createAccPOP').show();
	});
	$('[name="a"]').on("click", function(){
		if(this.value =="azure"){
			$(".azureD").show();
			$(".awsD").hide();
		}else if(this.value =="aws"){
			$(".azureD").hide();
			$(".awsD").show();
		}
	})
});

$(".closeAlert").click(function(){
	$(".alertS div.alert").stop().slideUp();
})

function selectOpt(event, idn, con){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(aTex+"-"+con);
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
	 /*if(con == "account"){
		 account_Sub.getDetals(aTex)
		 document.getElementById("accName").value=aTex;
	 }*/
}

function AccountsConst(){
	this._1 = [];
	this._2 = [];
	this._3 = [];
	//console.log(this._1);
	//console.log(this._2);
}
AccountsConst.prototype.getData = function(id,i,titleText,columnLength,columText,columData,accountIDReq){
	var _id  = document.getElementById(id);
	_id.innerHTML+='<table class="accountsTable">\
						<tr id="title_'+i+'">\
						<td class="titleTe" colspan="'+columnLength+'">'+titleText+' <a href="#"><span class="glyphicon glyphicon-plus-sign" onclick="account_Sub.create(this)" id="titleID_'+titleText+'" style="color:#999999;font-size:19px;position:relative;top:4px;"></span></a></td></tr>\
						<tr id="tableText_'+i+'"></tr>\
						<tr id="tableData_'+i+'"></tr>\
					</table>';

	var tT = document.getElementById("tableText_"+i)
	   ,tD = document.getElementById("tableData_"+i);

	  
	for(var q=0; q < columnLength; q++){
		tT.innerHTML+='<th>'+columText[q]+'</th>';
	}
	function insertAfter(referenceNode, newNode){
		referenceNode.parentNode.insertBefore(newNode, referenceNode);
	}
	if(columData == null){
		tD.innerHTML+='<td colspan="'+columnLength+'" style="background-color:#eee;"><div class="noAccountSelected">Select one of the account to see details.</div></td>';
	}else{
		if(columnLength == 2){
			var d=[], c = 0, len = columData.data1.length;
			this._1 = columData.data1;
			this._2 = columData.data2;
			this._3 = columData.data3;
			
			for(var i =0; i < len; i++){
				if(columData.data1[i].accountid == accountIDReq){
					var datat = document.createElement("tr");
					datat.innerHTML +='<tr><td>'+columData.data1[i].subscription_name+'</td><td><a href="#" onclick="account_Sub.viewMore(this,1,'+i+')" class="viewLink" id="'+columData.data1[i].subscription_name+'">View</a></td></tr>';
					d.push(columData.data1[i].subscription_name);
					insertAfter(tD, datat);
				}else{
					c++;					
					if(c == len){						
						var noDat = document.createElement("tr");
						noDat.innerHTML+='<td colspan="'+columnLength+'" style="background-color:#eee;"><div class="noAccountSelected">Details are not Avilable for selected Account.</div></td>';
						insertAfter(tD, noDat);
					}
					/*var noDat = document.createElement("tr");
					noDat.innerHTML+='<td colspan="'+columnLength+'" style="background-color:#eee;"><div class="noAccountSelected">Details are not Avilable for selected Account.</div></td>';
					insertAfter(tD, noDat);*/
				}
			}
			this.dropDownDat(d,"SubNameDro_ID");
		}else if(columnLength == 3){
			if(id == "acProjects"){
				var e=[], c = 0, len = columData.data2.length;
			for(var i =0; i < columData.data2.length; i++){
				if(columData.data2[i].accountid == accountIDReq){
					var datat = document.createElement("tr");
					datat.innerHTML +='<td>'+columData.data2[i].p_name+'</td>\
										<td>'+columData.data2[i].subscription_name+'</td>\
										<td><a href="#" onclick="account_Sub.viewMore(this,2,'+i+')" id="'+columData.data2[i].p_id+'" class="viewLink">View</a></td>';
					e.push(columData.data2[i].p_name);
					insertAfter(tD, datat);
					}else{
					c++;					
					if(c == len){						
						var noDat = document.createElement("tr");
						noDat.innerHTML+='<td colspan="'+columnLength+'" style="background-color:#eee;"><div class="noAccountSelected">Details are not Avilable for selected Account.</div></td>';
						insertAfter(tD, noDat);
						}
					}
				}
				this.dropDownDat(e,"ProNameDro_ID");
			}else if(id == "acProducts"){
				//this._3 = columData.data3;
				var c = 0, len = columData.data3.length;
				for(var r =0; r < columData.data3.length; r++){
				if(columData.data3[r].accountid == accountIDReq){
					var datat = document.createElement("tr");
					datat.innerHTML +='<td><a href="#" class="viewLink" onclick="account_Sub.viewProDetail(this)" id="'+columData.data3[r].p_name+'" title="'+accountIDReq+'">'+columData.data3[r].prod_name+'</a></td>\
										<td>'+columData.data3[r].p_name+'</td>\
										<td><a href="#" onclick="account_Sub.viewMore(this,3,'+i+')" id="'+columData.data3[r].prod_name+'" class="viewLink">View</a></td>';
					insertAfter(tD, datat);
				  }else{
					c++;
					if(c == len){						
						var noDat = document.createElement("tr");
						noDat.innerHTML+='<td colspan="'+columnLength+'" style="background-color:#eee;"><div class="noAccountSelected">Details are not Avilable for selected Account.</div></td>';
						insertAfter(tD, noDat);
						}
					}
				}
			}
		}
	}
}
AccountsConst.prototype.clo = function(ev){
	var i = document.getElementById("viDatPOP")
		i.id=""; i.innerHTML="";
}
AccountsConst.prototype.viewProDetail = function(ev){
	event.preventDefault();
	localStorage.setItem('Account', ev.title);
	localStorage.setItem('ProjectName', ev.id);
	localStorage.setItem('ProductName', ev.innerHTML);
	location.href = _ip+'/master_2';
}
AccountsConst.prototype.viewMore = function(ev,from,requestDat){
	if(from == 1){
	var dd = document.getElementById("pop");
		dd.innerHTML+='<div id="viDatPOP">\
					<div class="popupData" style="display:block;z-index:11;position:fixed;"></div>\
					  <div class="balance">\
						<div class="popDataNew" style="width:34%;">\
							<div class="modal-header">\
							<button type="button" id="subnetsPopuplose" onclick="account_Sub.clo(this)" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>\
							<h4 class="modal-title">Detailed Subscription View</h4>\
						  </div>\
						   <div class="modal-body" id="_subD">\
						   </div>\
						   <div style="clear:both;">&nbsp;</div>\
						  <div class="modal-footer">\
							<a class="cancelPoup" onclick="account_Sub.clo(this)">Close</a>&nbsp;\
						  </div>\
						</div>\
					</div>\
				</div>';
	var _su = document.getElementById("_subD");
		_su.innerHTML+='<table class="accountsTable">\
							<tr>\
								<th>Name</th>\
								<th>Value</th>\
							</tr>\
							<tr>\
								<td>Subscription Name</td>\
								<td>'+this._1[requestDat].subscription_name+'</td>\
							</tr>\
							<tr>\
								<td>Account ID</td>\
								<td>'+this._1[requestDat].accountid+'</td>\
							</tr>\
							<tr>\
								<td>Provider</td>\
								<td>'+this._1[requestDat].provider+'</td>\
							</tr>\
						</table>';
	}else if(from == 2){
	var _dd = document.getElementById("pop");
		_dd.innerHTML+='<div id="viDatPOP">\
					<div class="popupData" style="display:block;z-index:11;position:fixed;"></div>\
					  <div class="balance">\
						<div class="popDataNew" style="width:34%;">\
							<div class="modal-header">\
							<button type="button" id="subnetsPopuplose" onclick="account_Sub.clo(this)" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>\
							<h4 class="modal-title">Detailed Project View</h4>\
						  </div>\
						   <div class="modal-body" id="_subD">\
						   </div>\
						   <div style="clear:both;">&nbsp;</div>\
						  <div class="modal-footer">\
							<a class="cancelPoup" onclick="account_Sub.clo(this)">Close</a>&nbsp;\
						  </div>\
						</div>\
					</div>\
				</div>';
	var _pr = document.getElementById("_subD");
		_pr.innerHTML+='<table class="accountsTable">\
							<tr>\
								<th>Name</th>\
								<th>Value</th>\
							</tr>\
							<tr>\
								<td>Project Name</td>\
								<td>'+this._2[requestDat].p_name+'</td>\
							</tr>\
							<tr>\
								<td>Technology</td>\
								<td>'+this._2[requestDat].technology+'</td>\
							</tr>\
							<tr>\
								<td>Team Size</td>\
								<td>'+this._2[requestDat].team_size+'</td>\
							</tr>\
							<tr>\
								<td>Subscription Name</td>\
								<td>'+this._2[requestDat].subscription_name+'</td>\
							</tr>\
						</table>';
	}else if(from == 3){
	var dd = document.getElementById("pop");
		dd.innerHTML+='<div id="viDatPOP">\
					<div class="popupData" style="display:block;z-index:11;position:fixed;"></div>\
					  <div class="balance">\
						<div class="popDataNew" style="width:34%;">\
							<div class="modal-header">\
							<button type="button" id="subnetsPopuplose" onclick="account_Sub.clo(this)" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>\
							<h4 class="modal-title">Detailed Product View</h4>\
						  </div>\
						   <div class="modal-body" id="_subD">\
						   </div>\
						   <div style="clear:both;">&nbsp;</div>\
						  <div class="modal-footer">\
							<a class="cancelPoup" onclick="account_Sub.clo(this)">Close</a>&nbsp;\
						  </div>\
						</div>\
					</div>\
				</div>';
	var _pr = document.getElementById("_subD");
		_pr.innerHTML+='<table class="accountsTable">\
							<tr>\
								<th>Name</th>\
								<th>Value</th>\
							</tr>\
							<tr>\
								<td>Product Name</td>\
								<td>'+this._3[requestDat].prod_name+'</td>\
							</tr>\
							<tr>\
								<td>Account ID</td>\
								<td>'+this._3[requestDat].accountid+'</td>\
							</tr>\
							<tr>\
								<td>Technology</td>\
								<td>'+this._3[requestDat].technology+'</td>\
							</tr>\
						</table>';
	}
}
AccountsConst.prototype.dropDownDat = function(data, idOfDropdown){
	for(var i =0; i < data.length; i++){
		var tT = document.getElementById(idOfDropdown);
			tT.innerHTML+='<li onclick="selectOpt(this)" class="Dev"><dl><dt></dt><dd class="va">'+data[i]+'</dd></dl></li>';		
	}
}
AccountsConst.prototype.create = function(ev){
	ev.id == "titleID_Subscriptions" ? $('#create_Sub_POP').show() : $('#create_Sub_POP').hide();
	ev.id == "titleID_Projects" ? $('#create_Project_POP').show() : $('#create_Project_POP').hide();
	ev.id == "titleID_Products" ? $('#create_Product_POP').show() : $('#create_Product_POP').hide();
}
AccountsConst.prototype.getDetals = function(accId){
	$.getJSON(_ip+'/accountDetails', function(data){
		console.log(data);
		var _subid  = document.getElementById("acSubscriptions"),
			_subd  = document.getElementById("SubNameDro_ID");
			_sub  = document.getElementById("ProNameDro_ID");
			
			_subid.innerHTML='';
			_subd.innerHTML='';
			_sub.innerHTML='';
		
		account_Sub.getData("acSubscriptions","1","Subscriptions",2,SubscriptionsColumnText,data,accId);
		
		//*********************************************************// for Projects
		var _prid  = document.getElementById("acProjects");
			_prid.innerHTML='';
			
		account_Proj.getData("acProjects","2","Projects",3,ProjectColumnText,data,accId);
		
		//*********************************************************// for Products
		var _prid  = document.getElementById("acProducts");
			_prid.innerHTML='';
			
		account_Prod.getData("acProducts","3","Products",3,ProductColumnText,data,accId);
		
	});
}
AccountsConst.prototype.getAccounts = function(event, idn){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(aTex+"-"+con);
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
	 
		 this.getDetals(aTex)
		 console.log(aTex);
		 document.getElementById("accName").value=aTex;
		 document.getElementById("accName1").value=aTex;
	 
}
var SubscriptionsColumnText = ["Subscription Name", "Action"]
	,ProjectColumnText = ["Project Name", "Subscription Name", "Action"]
	,ProductColumnText = ["Product Name", "Project Name", "Action"]

	,account_Sub = new AccountsConst()
	,account_Proj = new AccountsConst()
	,account_Prod = new AccountsConst();

	account_Sub.getData("acSubscriptions","1","Subscriptions",2,SubscriptionsColumnText,null,"");
	account_Proj.getData("acProjects","2","Projects",3,ProjectColumnText,null,"");
	account_Prod.getData("acProducts","3","Products",3,ProductColumnText,null,"");

	//function a_Proj(){}
	//a_Proj.prototype = AccountsConst.prototype;

	//var account_Proj = new a_Proj;
	//account_Proj.getData("acProjects","2","Projects",3,ProjectColumnText,null);
var account = "account";
$(function(){
	$.getJSON(_ip+'/accountDetails', function(data){
		console.log(data);
		for(var i =0; i < data.data4.length; i++){
			var tT = document.getElementById("accounts_ID");
				tT.innerHTML+='<li onclick="account_Sub.getAccounts(this,'+i+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data4[i].accountid+'</dd></dl></li>';
		}
	})
});

/*-----------------------------End Table---------------------------------------------*/


//Add project function
function createProject(){
	var expTname = /^\w+$/;
	var accName = document.getElementById("typeDro").innerText
		,pName = document.getElementById("pName").value
		,subName = document.getElementById("sel").innerText
		,projDate = document.getElementById("pDate").value
		,pjTech = document.getElementById("sela").innerText;
	
	if(!expTname.test(pName)){
		$(".alert-accName").stop().slideDown();
		document.getElementById("pName").focus();
		return;
	}else if(pName){
		$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
			console.log(data);
			for(var i =0; i < data.data2.length; i++){
				if(data.data2[i].p_name == pName){
					 $(".alert-accName").stop().slideDown();
					 document.getElementById("pName").focus();
					 return;
				}
			}validateProj();
		})
		}
			function validateProj(){
							if(subName == "Select")
							{
								document.getElementById("sel").style.border="thin dashed #E24B4B";
								return;
							}else if(projDate == "" || projDate == null)
								{document.getElementById("pDate").focus();return;}
							else if(pjTech == "Select")
								{document.getElementById("sela").style.border="thin dashed #E24B4B";return;}
							
							console.log(accName+pName+subName+projDate+pjTech);
							
							var data = {};
							data.accName = accName;
							data.pName = pName;
							data.subName = subName;
							data.projDate = projDate;
							data.pjTech = pjTech;
							$.ajax({
							     type: 'POST',
								 jsonpCallback: "callback",
							     datatype: 'jsonp',
							     data: data,	 
							     url:  _ip+'/createProject',
							     success: function(results) {
							    	 alert(results);
							    	 $("#create_Project_POP").hide();
							    	 var acnt = document.getElementById("typeDro").innerText;
							    	 account_Sub.getDetals(acnt);
							     },
								 error: function (xhr, status, error){
							        console.log('Failure');
									alert("failure");
									},
								 });
					}
}
function createProduct(){
	var expTname = /^\w+$/;
	var accName = document.getElementById("typeDro").innerText
		,pdName = document.getElementById("pdName").value
		,pjName = document.getElementById("sel12").innerText
		,pdDate = document.getElementById("pdDate").value
		,pdTech = document.getElementById("sela12").innerText;	
	if(!expTname.test(pdName)){
		$(".alert-accName").stop().slideDown();
		document.getElementById("pdName").focus();
		return;
	}else if(pdName){
		$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
			console.log(data);
			for(var i =0; i < data.data3.length; i++){
				if(data.data3[i].prod_name == pdName){
					 $(".alert-accName").stop().slideDown();
					 document.getElementById("pdName").focus();
					 return;
				}
			}validateProd();
		})
		}
	function validateProd()
	{
		if(pjName == "Select"){document.getElementById("sel12").style.border="thin dashed #E24B4B";return;}
		else if(pdDate == "" || pdDate == null){document.getElementById("pdDate").focus();return}
		else if(pdTech == "Select"){document.getElementById("sela12").style.border="thin dashed #E24B4B";return;}	
		console.log(accName+pdName+pjName+pdDate+pdTech);	
		var data = {};
		data.accName = accName;
		data.pdName = pdName;
		data.pjName = pjName;
		data.pdDate = pdDate;
		data.pdTech = pdTech;
		
		$.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: data,	 
		     url:  _ip+'/createProduct',
		     success: function(results) {
		    	 alert(results);
		    	 $("#create_Product_POP").hide();
		    	 var acnt = document.getElementById("typeDro").innerText;
		    	 account_Sub.getDetals(acnt);
		     },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
			 });
	}
}

function validateSubscriptionForm(){
	var azureSub = document.getElementById("azureSub").value
	    ,userName = document.getElementById("userName").value
	    ,password = document.getElementById("password").value
	    ,subId = document.getElementById("subId").value;
	
	if(azureSub){
		$(function(){
				$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
					for(var i =0; i < data.data1.length; i++){
						console.log("number"+i);
						if(data.data1[i].subscription_name == azureSub){
							alert("name already exists");
							document.getElementById("azureSub").focus();
							return false;
						}
					}
				});
		});
		        var cond = formvalidate();
			return cond;
	}else{document.getElementById("azureSub").focus();return false;}
	function formvalidate(){
		if(userName == "" || userName == null)
			{document.getElementById("userName").focus();return false;}
		else if(password == "" || password == null)
			{document.getElementById("password").focus();return false;}
		else if(subId == "" || subId == null)
			{document.getElementById("subId").focus();return false;}
		else{return true;}
	}			
}
function addAwsSubscription(){
	var awsSub = document.getElementById("awsSub").value
	    ,accName = document.getElementById("accName").value
	    ,accKey = document.getElementById("accKey").value
	    ,secKey = document.getElementById("secKey").value;
	
	if(awsSub){
		$(function(){
				$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
					for(var i =0; i < data.data1.length; i++){
						if(data.data1[i].subscription_name == awsSub){
							alert("name already exists");
							document.getElementById("awsSub").focus();
							return false;
						}
					}
				});
		});
		        var cond = awsformvalidate();
			if(cond == true){
				saveAwsCredentials(accName,awsSub,accKey,secKey);
				}
	}else{document.getElementById("awsSub").focus();return false;}
	function awsformvalidate(){
		if(accKey == "" || accKey == null)
			{document.getElementById("accKey").focus();return false;}
		else if(secKey == "" || secKey == null)
			{document.getElementById("secKey").focus();return false;}
		else{return true;}
	}
}
function saveAwsCredentials(accName, awsSub, accKey, secKey){
	//console.log(accName+awsSub+accKey+secKey);
	var awsData = {};
	awsData.accName = accName;
	awsData.awsSub = awsSub;
	awsData.accKey = accKey;
	awsData.secKey = secKey;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: awsData,	 
	     url: _ip+'/storeAwsSub',
	     success: function(results) {
		 alert(results);
		 $('#create_Sub_POP').hide();
		 },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	});
}

function importSub(){
	 $('#create_Sub_POP').hide();
	$('#importSubPOP').show();	
}
function importSubscription(){
	var accName = document.getElementById("typeDro").innerText
	    ,user = document.getElementById("user_Id").value
		,pwd = document.getElementById("password_Id").value;
	if(accName == "Select"){alert("Please select account");return;}
	else if(user == "" || user == null){document.getElementById("user_Id").focus();return false;}
	else if(pwd == "" || user == null){document.getElementById("password_Id").focus();return false;}
	var data = {};
	data.accName = accName;
	data.user = user;
	data.pwd = pwd;
	$.ajax({
	  type: 'POST',
	  data: data,	 
	  url: _ip+'/importSubscription'
	})
	.done(function(data){
		alert(data);
	})
	.fail(function(err){
		alert(err);
	})
}

function accountSetting(){
	var accName = document.getElementById("typeDro").innerText;
	if(accName == "Select"){alert("Please select account");return;}
	location.href=_ip+"/accSetting"+"?data="+accName;
}
