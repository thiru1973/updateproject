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
			return;
		}else if(acc != null)
			{
			$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
				console.log(data);
				for(var i =0; i < data.data4.length; i++){
					if(data.data4[i].accountid == acc){
						 $(".alert-accName").stop().slideDown();
						 document.getElementById("createAccount_Input_Id").focus();
						 return;
					}
				}
			})
			}
		var data = {};
		data.acc = acc;
		/*$.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: data,	 
		     url:  _ip+'/createAccount',
		     success: function(results) {
		    	 alert(results);
		     },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
			 });
		$("#createAccPOP").hide();*/
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
		$("#ConfigureHealthChecksAdvanced, #SubnetsPoup, #addInstPopUpWin, #securityGroWin, #createAccPOP, #create_Sub_POP, #create_Project_POP, #create_Product_POP").hide();
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
	 if(con == "account"){
		 account_Sub.getDetals(aTex)
		 document.getElementById("accName").value=aTex;
	 }
}

function AccountsConst(){}
AccountsConst.prototype.getData = function(id,i,titleText,columnLength,columText,columData,accountIDReq){
	//alert(accountIDReq);
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
			var d=[];
			for(var i =0; i < columData.data1.length; i++){
				//if(columData.data1[i].accountid == accountIDReq || accountIDReq.toLowerCase()){	
				if(columData.data1[i].accountid == accountIDReq){
					console.log(columData.data1);
					
					var datat = document.createElement("tr");
					datat.innerHTML +='<tr><td>'+columData.data1[i].subscription_name+'</td><td><a href="#" onclick="account_Sub.viewMore(this)" class="viewLink" id="'+columData.data1[i].subscription_id+'">View</a></td></tr>';
					d.push(columData.data1[i].subscription_name);
					insertAfter(tD, datat);
				}//else{alert("No datas");return;}
			}
			this.dropDownDat(d,"SubNameDro_ID");
			
		}else if(columnLength == 3){
			if(id == "acProjects"){
				var e=[];
				for(var i =0; i < columData.data2.length; i++){
				//if(columData.data2[i].accountid == accountIDReq || accountIDReq.toLowerCase()){
				if(columData.data2[i].accountid == accountIDReq){
					var datat = document.createElement("tr");
					datat.innerHTML +='<td>'+columData.data2[i].p_name+'</td>\
										<td>'+columData.data2[i].subscription_name+'</td>\
										<td><a href="#" onclick="account_Sub.viewMore(this)" id="'+columData.data2[i].p_id+'" class="viewLink">View</a></td>';
					e.push(columData.data2[i].p_name);
					insertAfter(tD, datat);
					}//else{alert("No data");return}
				}
				this.dropDownDat(e,"ProNameDro_ID");
			}else if(id == "acProducts"){				
				for(var r =0; r < columData.data3.length; r++){					
				//if(columData.data3[r].accountid == accountIDReq || accountIDReq.toLowerCase()){
					if(columData.data3[r].accountid == accountIDReq){
					var datat = document.createElement("tr");
					datat.innerHTML +='<td>'+columData.data3[r].prod_name+'</td>\
										<td>'+columData.data3[r].p_name+'</td>\
										<td><a href="#" onclick="account_Sub.viewMore(this)" id="'+columData.data3[i].prod_name+'" class="viewLink">View</a></td>';
					insertAfter(tD, datat);
				  }//else{alert("No data");return;}
				}
				
			}
			
		}
	}	
}
AccountsConst.prototype.viewMore = function(ev){
	console.log(ev.id);
	
}
AccountsConst.prototype.dropDownDat = function(data, idOfDropdown){
	for(var i =0; i < data.length; i++){
		var tT = document.getElementById(idOfDropdown);
			tT.innerHTML+='<li onclick="selectOpt(this)" class="Dev"><dl><dt></dt><dd class="va">'+data[i]+'</dd></dl></li>';
		console.log(i);
	}
}
AccountsConst.prototype.create = function(ev){
	ev.id == "titleID_Subscriptions" ? $('#create_Sub_POP').show() : $('#create_Sub_POP').hide();
	ev.id == "titleID_Projects" ? $('#create_Project_POP').show() : $('#create_Project_POP').hide();
	ev.id == "titleID_Products" ? $('#create_Product_POP').show() : $('#create_Product_POP').hide();
}
AccountsConst.prototype.getDetals = function(accId){
	alert(accId);
	$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
		//console.log(data);
		
		var _subid  = document.getElementById("acSubscriptions"),
			_subd  = document.getElementById("SubNameDro_ID");
			_subid.innerHTML='';
			_subd.innerHTML='';
		
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
	$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
		console.log(data);
		for(var i =0; i < data.data4.length; i++){
			var tT = document.getElementById("accounts_ID");
				tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data4[i].accountid+'</dd></dl></li>';
		}
	})
})

/*-----------------------------End Table---------------------------------------------*/

//Add project function
function createProject(){
	var accName = document.getElementById("typeDro").innerText
		,pName = document.getElementById("pName").value
		,subName = document.getElementById("sel").innerText
		,projDate = document.getElementById("pDate").value
		,pjTech = document.getElementById("sela").innerText;
	
	alert(accName+pName+subName+projDate+pjTech);
	
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
function createProduct(){
	var accName = document.getElementById("typeDro").innerText
		,pdName = document.getElementById("pdName").value
		,pjName = document.getElementById("sel12").innerText
		,pdDate = document.getElementById("pdDate").value
		,pdTech = document.getElementById("sela12").innerText;
	
	alert(accName+pdName+pjName+pdDate+pdTech);
	
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
function checkAccountName(value){
	alert(value);
	$.getJSON('http://172.29.59.65:3000/accountDetails', function(data){
		console.log(data);
		for(var i =0; i < data.data4.length; i++){
			if(data.data4[i].accountid == value){
				 $(".alert-accName").stop().slideDown();
			}
		}
	})
}

