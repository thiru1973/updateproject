/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 19th May 2015
*************************************** */

/* Global
************************************************************************** */
var _ip = "http://172.29.59.62:3000";

// Refresh for html page when change the js file.

/* Drop-down menu -----------Start
************************************************************************** */
$(document).on("click", ".clickRole", function (e){
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

/*
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
});*/

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
$(document).ready(function(){
	var type = sessionStorage.getItem("chooseUrCloud");
	if(type){
		$("#chooseUrCloud span:first").text(type);
	}
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



/* Test scrip start
************************************************************************** */
function ConSt(){
	this.id = document.getElementById("omm");
	this.cat1 = ["MG1","MG2","MG3","MG4","MG5","MG6","MG7","MG8","MG9","MG10","MG11","MG12","MG13","MG14","MG15","MG16","MG16","MG17","MG18","MG19","MG20","MG21","MG22","MG23"];
	this.cat2 = ["MG1","MG2","MG3","MG4","MG5","MG6","MG7","MG8","MG9","MG10","MG11","MG12","MG13","MG14","MG15","MG16","MG16","MG17","MG18","MG19"];
	this.cat3 = ["MG1","MG2","MG3","MG4","MG5","MG6","MG7","MG8","MG9","MG10","MG11","MG12","MG13","MG14","MG15","MG16","MG16","MG17","MG18","MG19","MG20","MG21"];
	this.id = document.getElementById("omm");
	this.looms = 2;
}
ConSt.prototype = {
	timer:function(){
		var t = new Date();
		console.log("Time:"+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds());
	},
	producTion:function(){
		return this.looms * 4
	},
	dlyOdr:function(){
		var r = this.cat1[Math.floor(Math.random() * this.cat1.length)];
		this.process(r)
		return r;
	},
	process:function(){
		
	},
	init:function(){
		//this.id.innerHTML=''
		//console.log(this.dlyOdr());
		//setInterval(this.timer, 1000);
		
	}
}
var da = new ConSt();
//da.init();


var n = 0;
function createVol(num){
	var id = num, nn;
	n++;
	if(id ==0){
		nn = "inB1";
	}else if(id == 1){
		nn = "outB1"
	var dd = document.getElementById(nn);
		dd.innerHTML+='<div id="r_'+n+'" style="border-top: solid 1px #ccc;padding-top: 25px;">\
						<div class="pull-left padBot padRit" style="height:65px;">\
							<label class="labelTemp">Rule Name</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="" id="ruleName2" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label id="" class="labelTemp"><span> Access</span></label>\
							<div id="access2'+n+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="access2_Drop'+n+'" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">Allow</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">Denay</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label id="" class="labelTemp"><span> Protocol</span></label>\
							<div id="protocol2'+n+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="protocol2_Drop'+n+'" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">TCP</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">UDP</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">Priority</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="" id="priority2" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left  padRit">\
							<label class="labelTemp">Destination Address Prefix</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="prefix2" value="Internet" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit" style="padding-top: 34px;">\
						<span class="glyphicon glyphicon-minus-sign" onclick="removeRow(this,'+n+');" id="addRole" style="color:#999999;"></span>\
						</div>\
						<div style="clear:both;">&nbsp;</div></div>';
				
	}else if(id == 2){
		nn = "volumes1"
	var dd = document.getElementById(nn);
		dd.innerHTML+='<div id="r_'+n+'" style="border-top: solid 1px #ccc;padding-top: 25px;">\
							<div class="pull-left padBot padRit" style="height:65px;">\
							<label class="labelTemp">Rule Name</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="" id="ruleName1" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label id="" class="labelTemp"><span> Access</span></label>\
							<div id="access1_'+n+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="access1_Drop_'+n+'" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">Allow</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">Denay</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label id="" class="labelTemp"><span> Protocol</span></label>\
							<div id="protocol1'+n+'" class="clickRole temp1stRowWid"><span>Select</span>\
								<ul id="protocol1_Drop'+n+'" class="dropDown" style="display: none;">\
									<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">TCP</dd></dl></li>\
									<li onclick="selectOpt(this,1)" class="Test"><dl><dt></dt><dd class="va">UDP</dd></dl></li>\
								</ul>\
								<span id="" class="glyphicon glyphicon-chevron-down pull-right"><span></span></span>\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">Priority</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="" id="priority1" style="border:none;width:100%;">\
							</div>\
						</div>\
						<div class="pull-left padBot padRit">\
							<label class="labelTemp">Source Address Prefix</label>\
							<div class="clickRole temp1stRowWid" id="">\
								<input type="text" placeholder="Ex: Name" id="prefix1" value="Internet" style="border:none;width:100%;">\
							</div>\
						</div>\
					<div class="pull-left padBot padRit" style="padding-top: 34px;">\
						<span class="glyphicon glyphicon-minus-sign" onclick="removeRow(this,'+n+');" id="addRole" style="color:#999999;"></span>\
					</div>\
					<div style="clear:both;">&nbsp;</div></div>';
	}
}
function removeRow(ev, n){
	$("#r_"+n).remove();
}