/* ************************************
	Create by:Omprakash
	Created on: 30th March 2016
*************************************** */

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

function AccountsConst(){}
AccountsConst.prototype.getData = function(id,i,titleText,columnLength,columText,columData){
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
	if(columData == null){
		tD.innerHTML+='<td colspan="'+columnLength+'" style="background-color:#EEEEEE;"><div class="noAccountSelected">Select one of the account to see details.</div></td>';
	}else{
		for(var q=0; q < columnLength; q++){
			tD.innerHTML+='<td>1</td>';
		}
	}
}
AccountsConst.prototype.create = function(ev){
	ev.id == "titleID_Subscriptions" ? $('#create_Sub_POP').show() : $('#create_Sub_POP').hide();
	ev.id == "titleID_Projects" ? $('#create_Project_POP').show() : $('#create_Project_POP').hide();
	ev.id == "titleID_Products" ? $('#create_Product_POP').show() : $('#create_Product_POP').hide();
}
var SubscriptionsColumnText = ["Subscription Name", "Action"]
	,ProjectColumnText = ["Project Name", "Subscription Name", "Action"]
	,ProductColumnText = ["Product Name", "Project Name", "Action"]

	,account_Sub = new AccountsConst()
	//account_Proj = new AccountsConst(),
	,account_Prod = new AccountsConst();

	account_Sub.getData("acSubscriptions","1","Subscriptions",2,SubscriptionsColumnText,null);
	account_Prod.getData("acProducts","3","Products",3,ProductColumnText,null);

	function a_Proj(){}
	a_Proj.prototype = AccountsConst.prototype;

	var account_Proj = new a_Proj;
		account_Proj.getData("acProjects","2","Projects",3,ProjectColumnText,null);
		
			
		
/*-----------------------------End Table---------------------------------------------*/
