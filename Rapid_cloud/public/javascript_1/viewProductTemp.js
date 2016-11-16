/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 30th Oct 2016
*************************************** */

$("#single_node").hide();
var _ip = "http://172.29.59.62:3000";
function ViewConstru(j){
	this.jd = j;
	this.docId = document.querySelector("[role='devOpsTemplate']");
	this.data = {};
	this.i = 0;
	this.dt = "deployTemplate";
}
ViewConstru.prototype = {
	init:function(){
		var _self = this;
		$.getJSON(this.jd, function(d , responce){
			_self.data = d;
			for(_self.i ; _self.i< d.length; _self.i++){
				_self.docId.innerHTML+='<article role="devTemp">\
									<summary role="templateDetails">\
										<table>\
											<tr>\
												<td><b>Template: </b></td>\
												<td>'+d[_self.i][_self.dt][0]._templateName+'</td>\
											</tr>\
											<tr>\
												<td><b>Project: </b></td>\
												<td>'+d[_self.i][_self.dt][0]._projectName+'</td>\
											</tr>\
											<tr>\
												<td><b>Technology: </b></td>\
												<td>'+d[_self.i][_self.dt][0]._technology+'</td>\
											</tr>\
										</table>\
										<hr>\
									</summary>\
									<nav role="devopsCycle" style="display:none;">\
										<ul id="'+_self.i+'"></ul>\
									</nav>\
									<h2 class="vmAPacks">Product Details</h2>\
									<summary role="packagesDetails" class="en" id="'+_self.i+'_vm">\
									<!--<summary role="packagesDetails" class="en" id="'+_self.i+'_vm" onmouseover="vt.showActions(this,'+_self.i+')">-->\
									</summary>\
									<div class="popupData" style="display:none;" id="tr_'+_self.i+'"></div>\
									<actions class="actioniTems" id="ac_'+_self.i+'">\
										<span style="display:none;" id="_t'+_self.i+'" title="'+d[_self.i][_self.dt][0]._provider+'">'+d[_self.i][_self.dt][0]._region+'</span>\
										<button class="redButton" title='+d[_self.i][_self.dt][0]._templateName+' onclick="vt.sentReq(this, '+_self.i+');">Deploy</button>\
										<button class="redButton" onclick="vt.sentReq(this, '+_self.i+',"");">Edit & Upgrade</button>\
										<button class="redButton" onclick="vt.sentReq(this, '+_self.i+',"");">Copy & Create New</button>\
									</actions>\
								</article>';
					_self.addDevOpsCycle(_self.i);
			}
		});
	},
	sentReq: function(ev, id){
		var getD = document.getElementById("_t"+id);
		sessionStorage.setItem("Deploy_DevOps_Template",ev.title);
		sessionStorage.setItem("Deploy_DevOps_Region",getD.innerText);
		sessionStorage.setItem("Deploy_DevOps_Provider",getD.title);
		sessionStorage.setItem("Deploy_DevOps_id",id);
		location.href= location.origin+"/deployProductTemplate";
		//console.log(id);
	},
	addDevOpsCycle: function(i){
		var devCy = document.getElementById(i),
			u=0;
			if(Object.keys(this.data[i][this.dt][0].cIVMs) != ""){
				devCy.innerHTML+='<li><a href="#" onclick="vt.getVmDetails(this, '+i+')">CI<span class="" aria-hidden="true"></span></a></li>';
				u == 0 ? $("#"+i+" li a span").click() : true ;
				u++;
			}
			if(Object.keys(this.data[i][this.dt][0].cTVMs) != ""){
				devCy.innerHTML+='<li><a href="#" onclick="vt.getVmDetails(this, '+i+')">CT<span class="" aria-hidden="true"></span></a></li>';
				u == 0 ? $("#"+i+" li a span").click() : true ;
				u++;
			}
			if(Object.keys(this.data[i][this.dt][0].cDVMs) != ""){
				devCy.innerHTML+='<li><a href="#" onclick="vt.getVmDetails(this, '+i+')">CD<span class="" aria-hidden="true"></span></a></li>';
				u == 0 ? $("#"+i+" li a span").click() : true ;
				u++;
			}
	},
	getVmDetails: function(ev, id){
		//console.log(ev.text);
		event.preventDefault();
		$("#"+id+" li a span").removeClass("arrowPointer glyphicon glyphicon-triangle-top");
		ev.firstElementChild.className += "arrowPointer glyphicon glyphicon-triangle-top";

		var devOpsTyp = "cIVMs";
		ev.text == "CI" ? devOpsTyp : true ;
		ev.text == "CT" ? devOpsTyp = "cTVMs" : true ;
		ev.text == "CD" ? devOpsTyp = "cDVMs" : true ;
		document.getElementById(id+"_vm").innerHTML="";

		var k = Object.keys(this.data[id][this.dt][0][devOpsTyp]);

		for(var g=0; g< k.length; g++){
			var p = k[g];
			var addVM = document.getElementById(id+"_vm");
			0 < g ? addVM.innerHTML+='<hr>' : true;
			
			var oo = this.data[id][this.dt][0][devOpsTyp][p]._vmPackages
			var pack = "";
			var d = 0;
			//console.log(Object.keys(oo));
			Object.keys(oo) == "" ? pack = "--" : true;
			for(var key in oo){
				if(oo[key] == true){
					d == 0 ? pack += key+"" : pack += " + "+key;
					++d;
				}
			}
			addVM.innerHTML+='<table>\
								<tr>\
									<td class="w_table"><b>Role</b></td>\
									<td>'+this.data[id][this.dt][0][devOpsTyp][p]._vmRole+'</td>\
								</tr>\
								<tr>\
									<td><b>Node</b></td>\
									<td>'+this.data[id][this.dt][0][devOpsTyp][p]._vmName+'</td>\
								</tr>\
								<tr>\
									<td><b>Packages</b></td>\
									<td>'+pack+'</td>\
								</tr>\
							</table>';
			}
	}
}
var vt = new ViewConstru("http://172.29.59.62:3000/deploydbData");
	vt.init();

$(document).on("mouseenter", ".en", function(){
	$(this).parent().find(".popupData, .actioniTems").show();
}).mouseleave(function(){
	$(".popupData, .actioniTems").hide();
});

$(document).on("mouseleave", ".popupData", function(){
	$(".popupData, .actioniTems").hide();
});

