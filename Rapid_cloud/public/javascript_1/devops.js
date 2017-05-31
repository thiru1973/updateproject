/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 19th May 2015
*************************************** */

/* Global
************************************************************************** */
var _ip = "http://172.29.59.63:3000";

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
}
/* Drop-down menu -------------- End
************************************************************************** */
$(document).ready(function(){
	$("#ci_check").attr("checked","checked");
	$("#ci_check").attr("disabled", true);
	$("#ct_check, #cd_check").attr("checked", false);
	var dd = $("#ci_check, #ct_check, #cd_check")[0].checked
})
var ci = "cI", ct = "cT", cd = "cD", trueV = 1;
$("#ci_check, #ct_check, #cd_check").on('change',function(){
	var dd = $("#ci_check, #ct_check, #cd_check");
	if(this.checked == true){
		trueV++;
		this.id == "ci_check" ? $("._ciB").show() : true ;
		this.id == "ct_check" ? $("._ctB").show() : true ;
		this.id == "cd_check" ? $("._cdB").show() : true ;
		$("#ci_check, #ct_check, #cd_check").removeAttr("disabled");
	}
	else if(this.checked == false){
		console.log(Object.keys(cDT.cIVMs.vms));
		if(Object.keys(cDT.cIVMs.vms).length || Object.keys(cDT.cTVMs.vms).length || Object.keys(cDT.cDVMs.vms).length){
			alert("Do not edit 'DevOps Cycle Type' once you add VM's to DevOps.");
			window.location.reload();
			//var retVal = confirm("You will lost added VMs while Unchecking DevOps Cycle. Do you want to reset?");
				//retVal ? window.location.reload() : true ;
		}
		trueV--;
		this.id == "ci_check" ? $("._ciB").hide() : true ;
		this.id == "ct_check" ? $("._ctB").hide() : true ;
		this.id == "cd_check" ? $("._cdB").hide() : true ;
		if(trueV == 1){
			for(var i = 0; i<dd.length ; i++){
				if(dd[i].checked == true){
					$("#"+ dd[i].id).attr("disabled", "disabled");
				}
			}
		}
	}
});
$("#vmPopupClose").on('click', function(){
	$(".popDataNew, .cancelPoup, .popupData").hide();
});
function CreateDevOpsTemplate(){
	this.jsonData = {};
	this.jsonData.jsonVM = {};
	
	this.VandP = document.getElementById("vmAndPackages");
	this.infra_List_CI = document.getElementById("infra_List_CI");
	this.infra_List_CT = document.getElementById("infra_List_CT");
	this.infra_List_CD = document.getElementById("infra_List_CD");
	
	this.packages_List_CI = document.getElementById("packages_List_CI");
	this.packages_List_CT = document.getElementById("packages_List_CT");
	this.packages_List_CD = document.getElementById("packages_List_CD");
	
	this.noDEpullL = document.getElementById("noDEpullL");
	this.vmPopBut = document.getElementById("vmPopBut");
	this.t_n_Regex = /^[A-Za-z0-9_]{4,40}$/;
	this.seleCt = "Select";
	this.i = 0;
	this.VMType = "";

	this.cIVMs = {vms:{}};
	this.cTVMs = {vms:{}};
	this.cDVMs = {vms:{}};

	this.infraNodes = {}
	this.tempinfraNodes = []
	this.totalNodes = 0;
	
	this.ci_Array = [];
	this.ct_Array = [];
	this.cd_Array = [];
}
CreateDevOpsTemplate.prototype = {
	init: function(){
		this.createVMandPack();
		this.checkValidations;
		var self = this;
		$.getJSON("javascript_1/toolson.json" , function(data , responce){
			console.log(data);
			for(i=0; i< data.data.length; i++){
				if(data.data[i].devops_type == "CI"){
					self.ci_Array.push(data.data[i].tool_name);
				}else if(data.data[i].devops_type == "CT"){
					self.ct_Array.push(data.data[i].tool_name);
				}else if(data.data[i].devops_type == "CD"){
					self.cd_Array.push(data.data[i].tool_name);
				}
			}
		});
		
	},
	disableContent: function(){
		$("#t_n > #t_name").val(this.infraNodes[0].Template_name);
		$("#p_n > #p_name").val(this.infraNodes[0].Project_Name)
		this.jsonData._templateName = this.infraNodes[0].Template_name;
		this.jsonData._projectName = this.infraNodes[0].Project_Name;
		
		this.noDEpullL.innerHTML ="";
		this.totalNodes = cDT.infraNodes[0].Instances.length;
		this.tempinfraNodes = []; this.tempinfraNodesShadow = [];
			for(var i=0; i < cDT.infraNodes[0].Instances.length; i++){
				this.tempinfraNodes.push(cDT.infraNodes[0].Instances[i].node);
				this.tempinfraNodesShadow.push(cDT.infraNodes[0].Instances[i].node);
				this.noDEpullL.innerHTML +='<li id="myid'+i+'"><label>\
					<input type="checkbox" id="'+i+'" />"'+cDT.infraNodes[0].Instances[i].node+'"</label>\
				</li>';
		}
	},
	userChoiceOfCICTCD: function(){
		//this.VandP.innerHTML+=''
	},
	createVMandPack: function(){
		// clicking on add VM call popup
		this.infra_List_CI.innerHTML+='<li style="padding:0px;width:inherit"><a href="#" onclick="cDT.addVM(event,this,ci)" class="addVM">Add Infrastructure Template<i class="fa fa-plus" aria-hidden="true"></i></a></li>';
		
		this.infra_List_CT.innerHTML+='<li style="padding:0px;width:inherit"><a href="#" onclick="cDT.addVM(event,this,ct)" class="addVM">Add Infrastructure Template<i class="fa fa-plus" aria-hidden="true"></i></a></li>';
		
		this.infra_List_CD.innerHTML+='<li style="padding:0px;width:inherit"><a href="#" onclick="cDT.addVM(event,this,cd)" class="addVM">Add Infrastructure Template<i class="fa fa-plus" aria-hidden="true"></i></a></li>';
		
		var self = this;
		var template={};
			template.tname=localStorage.getItem("InfraId");
			//console.log(template);
			$.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: template,
			     url: _ip+'/pvd_template',
				 //async:false,
			     success: function(results){
					console.log(results)
					self.infraNodes = results;
					self.disableContent();
				 //temp_info = results[0].Instances;
				 },
				 error: function (xhr, status, error){
			        console.log('Failure'+error);
					alert(error);
				},
			});
	},
	addVM: function(ee, e, cmtype){
		// add a VM tile if successfully create the vm		
		ee.preventDefault();
		$("#create_Sub_POP, .popDataNew, .cancelPoup, .popupData").show();
			if(cmtype == "cI"){
				this.VMType = cmtype;
				this.vmPopBut.innerHTML='<a class="cancelPoup" title="Cancel"\ onclick="cDT.canCle(this, ci)">Cancel</a>&nbsp;\
				<button class="redButton" id="creaTeID" title="Create"\ onclick="cDT.addInfraInstances(this,ci)">Add</button>';
			}else if(cmtype == "cT"){
				this.VMType = cmtype;
				this.vmPopBut.innerHTML='<a class="cancelPoup" title="Cancel"\ onclick="cDT.canCle(this, ct)">Cancel</a>&nbsp;\
				<button class="redButton" id="creaTeID" title="Create"\ onclick="cDT.addInfraInstances(this,ct)">Add</button>';
			}else if(cmtype == "cD"){
				this.VMType = cmtype;
				this.vmPopBut.innerHTML='<a class="cancelPoup" title="Cancel"\ onclick="cDT.canCle(this, cd)">Cancel</a>&nbsp;\
				<button class="redButton" id="creaTeID" title="Create"\ onclick="cDT.addInfraInstances(this,cd)">Add</button>';
			}
		this.VMType = cmtype;
		this.noDEpullL.innerHTML = "";
		var g = 0;
			for(var i=0; i < this.tempinfraNodes.length; i++){				
				if(this.tempinfraNodes[i] != undefined){
					this.noDEpullL.innerHTML +='<li id="myid'+i+'"><label>\
					<input type="checkbox" id="'+i+'" />"'+this.tempinfraNodes[i]+'"</label>\
				</li>';
				}else{
					g++;
					if(g == this.tempinfraNodes.length){
						this.noDEpullL.innerHTML ='Not Avilable';
						document.getElementById("creaTeID").style.display = "none";
					}
				}
			}
	},
	canCle: function(button, VMType){
			if(VMType == "cI"){
				this.cIVMs.total -= 1;
			}else if(VMType == "cT"){
				this.cTVMs.total -= 1;
			}else if(VMType == "cD"){
				this.cDVMs.total -= 1;
			}
			$(".popDataNew, .cancelPoup, .popupData").hide();
	},
	addPackages: function(ee, ev, VMType, vmId, objectV){
		// add a Package tile if successfully create the vm
		ee.preventDefault();
		this.ci_Array = this.ci_Array.filter( function( item, index, inputArray ){
				   return inputArray.indexOf(item) == index;
			});
		this.ct_Array = this.ct_Array.filter( function( ie, inn, inarr ){
				   return inarr.indexOf(ie) == inn;
			});
		this.cd_Array = this.cd_Array.filter( function( ie2, inn2, inarr2 ){
				   return inarr2.indexOf(ie2) == inn2;
			});
		/*console.log(this.ci_Array);
		console.log(this.ct_Array);
		console.log(this.cd_Array);*/
		if(VMType == "cI"){
			//console.log(ev);
			var vmI = document.getElementById(vmId),
				data ='',
				vv = objectV._vmPackages = {};
				if(this.ci_Array.length == 0){
					data +='No packages available'
				}else{
					for(var i=0; i < this.ci_Array.length; i++){
					data +='<li class="addPG"><label><input type="checkbox" onchange="cDT.updatePack(this,ci,'+ev+','+i+')" name="'+this.ci_Array[i]+'" />'+this.ci_Array[i]+'</label></li>';
					vv[this.ci_Array[i]] = false;
					}
				}
			evid = "packCI"+ev;
			$("#"+evid).prepend(data);
		}else if(VMType == "cT"){
			var vmI = document.getElementById(vmId),
				data ='',
				dd = objectV._vmPackages = {};
				if(this.ct_Array.length == 0){
					data +='No packages available'
				}else{
					for(var i=0; i < this.ct_Array.length; i++){
					data +='<li class="addPG"><label><input type="checkbox" onchange="cDT.updatePack(this,ct,'+ev+','+i+')" name="'+this.ct_Array[i]+'" />'+this.ct_Array[i]+'</label></li>';
					dd[this.ct_Array[i]] = false;
					}
				}
			evid = "packCT"+ev;
			$("#"+evid).prepend(data);
		}else if(VMType == "cD"){
			var vmI = document.getElementById(vmId),
				data ='',
				bb = objectV._vmPackages = {};
				if(this.cd_Array.length == 0){
					data +='No packages available'
				}else{
					for(var i=0; i < this.cd_Array.length; i++){
					data +='<li class="addPG"><label><input type="checkbox" onchange="cDT.updatePack(this,cd,'+ev+','+i+')" name="'+this.cd_Array[i]+'" />'+this.cd_Array[i]+'</label></li>';
					bb[this.cd_Array[i]] = false;
					}
				}
			evid = "packCD"+ev;
			$("#"+evid).prepend(data);
		}
	},
	updatePack: function(ev,VMType,nodePostion, packageBox){
		//console.log(ev.checked);
		if(VMType == "cI"){			
			var civm = this.cIVMs.vms			
			var v= $('input[name="'+ev.name+'"]')
			//console.log(v);
			if(ev.checked ==  true){
				for(i=0; i < v.length; i++){					
					if(v[i].checked == false){
						v[i].disabled = true;
					}
				}
				ev.disabled = false;
			}else if(ev.checked ==  false){
				for(i=0; i < v.length; i++){
					v[i].disabled = false;
				}
			}
			civm[nodePostion]._vmPackages[ev.name] = ev.checked
		}else if(VMType == "cT"){
			var ctvm = this.cTVMs.vms
			var v= $('input[name="'+ev.name+'"]')
			//console.log(v);
			if(ev.checked ==  true){
				for(i=0; i < v.length; i++){					
					if(v[i].checked == false){
						v[i].disabled = true;
					}
				}
				ev.disabled = false;
			}else if(ev.checked ==  false){
				for(i=0; i < v.length; i++){
					v[i].disabled = false;
				}
			}
			//console.log(ctvm);
			//console.log(packageBox);
			ctvm[nodePostion]._vmPackages[ev.name] = ev.checked
		}else if(VMType == "cD"){			
			var ctvm = this.cDVMs.vms
			var v= $('input[name="'+ev.name+'"]')
			//console.log(v);
			if(ev.checked ==  true){
				for(i=0; i < v.length; i++){
					if(v[i].checked == false){
						v[i].disabled = true;
					}
				}
				ev.disabled = false;
			}else if(ev.checked ==  false){
				for(i=0; i < v.length; i++){
					v[i].disabled = false;
				}
			}
			//console.log(ctvm);
			//console.log(packageBox);
			ctvm[nodePostion]._vmPackages[ev.name] = ev.checked
		}
	},
	checkValidations: function(vmType){
		if(true){
			//Generate json data
			this.jsonData.jsonVM = {
				templateDetails:{
				_templateName : this.jsonData._templateName,
				_projectName : this.jsonData._projectName,
				_technology : this.jsonData._technology,
				//_technologyVersion: this.jsonData._technologyVersion
					},
				CI_vms:this.cIVMs, CT_vms:this.cTVMs, CD_vms:this.cDVMs
			};
			console.log(this.jsonData.jsonVM);	
			var devopsJson = this.jsonData.jsonVM;
			console.log(devopsJson);
				$.ajax({
						 type: 'POST',
						 jsonpCallback: "callback",
						 datatype: 'jsonp',
						 data:devopsJson,
						 url: _ip+'/saveDevopsTemplate',
						 success: function(results) {
							 alert("Success");
						 },
						 error: function (xhr, status, error){
							console.log('Failure');
							alert("failure");
							},
						 });

			//console.log(JSON.stringify(this.jsonData.jsonVM));
		}else{
			// throw error
		}
	},
	createTemplateActions: function(button, vmType){
		if(button.id == "cTA_Cancel"){
			history.back();
		}else if(button.id == "cTA_Create" || button.id == "cTA_CreateAndDeploy"){
			//console.log("Create Tempalte")
			var _t = $("#t_n > #t_name").val();
				this.jsonData._templateName = _t;
			var _p = $("#p_n > #p_name").val();
				this.jsonData._projectName = _p;
			var _te = $("#technology_ span").text();
				if(_te != this.seleCt){
					$("#technology_").css({"border":"solid 1px #eee"})
					$(".alert-danger").css({"display":""})
					this.jsonData._technology = _te;
				}else{
					$("#technology_").css({"border":"solid 1px #EE8484"})
					$(".alert-danger").css({"display":"block"})
					$(".ad").text("Select any of the Technology Version.");
					return false
				}
			this.checkValidations(vmType);
		}else if(button.id == "cTA_CreateAndDeploy"){
			console.log("Create and Deploy")
		}
	},
	addInfraInstances:function(ev, VMType){		
	  $("#create_Sub_POP, .popDataNew, .cancelPoup, .popupData").hide();
	  VMType == "cI" || VMType == "cT" || VMType == "cD" ? this.VMType = VMType : false;
		var imgSize = 140;
		if(VMType == "cI"){
			for(var i=0; i < cDT.infraNodes[0].Instances.length; i++){
			if(document.getElementById(i) == null){				
			}else if(document.getElementById(i).checked){
				console.log(this.totalNodes -=1);
				var data ='<li><div class="vmDetails">\
					<table>\
						  <tr>\
							<td>Role: </td>\
							<td>'+cDT.infraNodes[0].Instances[i].role+'</td>\
						  </tr\
						  <tr>\
							<td>Node: </td>\
							<td>'+cDT.infraNodes[0].Instances[i].node+'</td>\
						  </tr>\
						  <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+cDT.infraNodes[0].Instances[i].image+'</td>\
						  </tr>\
						   <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+cDT.infraNodes[0].Instances[i].os+'</td>\
						  </tr>\
						</table></div>\
						<div class="packageBox">\
							<b>Select Packages</b>\
							<ul id="packCI'+i+'"><!--<li><a href="#" onclick="cDT.addPackages(event,this,ci,'+i+',"")" class="addPG">Add Package<i class="fa fa-plus" aria-hidden="true"></i></a></li>--></ul>\
						</div>\
				</li>\ ';
				$('#infra_List_CI').prepend(data);
				this.tempinfraNodes[document.getElementById(i).id] = undefined;
				for(b in this.tempinfraNodes){
					//console.log(this.tempinfraNodes[b]);
				}
				var v = this.cIVMs.vms[i] = {}
					v._vmName = cDT.infraNodes[0].Instances[i].node;
					v._vmRole = cDT.infraNodes[0].Instances[i].role;
					this.addPackages(event,i,ci,i,v);
					}
			}
		}
		if(VMType == "cT"){
			for(var i=0; i < cDT.infraNodes[0].Instances.length; i++){
			if(document.getElementById(i) == null){
			}else if(document.getElementById(i).checked){
				console.log(this.totalNodes -=1);
				var data2 ='<li><div class="vmDetails">\
					<table>\
						  <tr>\
							<td>Role: </td>\
							<td>'+cDT.infraNodes[0].Instances[i].role+'</td>\
						  </tr\
						  <tr>\
							<td>Node: </td>\
							<td>'+cDT.infraNodes[0].Instances[i].node+'</td>\
						  </tr>\
						  <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+cDT.infraNodes[0].Instances[i].image+'</td>\
						  </tr>\
						  <tr>\
							<td colspan="2"></td>\
						  </tr>\
						</table></div>\
						<div class="packageBox">\
							<b>Select Packages</b>\
							<ul id="packCT'+i+'"></ul>\
						</div>\
				</li>\ ';
				$('#infra_List_CT').prepend(data2);
				this.tempinfraNodes[document.getElementById(i).id] = undefined;
				var v = this.cTVMs.vms[i] = {}
					v._vmName = cDT.infraNodes[0].Instances[i].node;
					v._vmRole = cDT.infraNodes[0].Instances[i].role;
					this.addPackages(event,i,ct,i,v);
					}
				}
		}
		if(VMType == "cD"){
			for(var i=0; i < cDT.infraNodes[0].Instances.length; i++){
			if(document.getElementById(i) == null){
			}else if(document.getElementById(i).checked){
				console.log(this.totalNodes -=1);
				var data3 ='<li><div class="vmDetails">\
					<table>\
						  <tr>\
							<td>Role: </td>\
							<td>'+cDT.infraNodes[0].Instances[i].role+'</td>\
						  </tr\
						  <tr>\
							<td>Node: </td>\
							<td>'+cDT.infraNodes[0].Instances[i].node+'</td>\
						  </tr>\
						  <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+cDT.infraNodes[0].Instances[i].image+'</td>\
						  </tr>\
						  <tr>\
							<td colspan="2"></td>\
						  </tr>\
						</table></div>\
						<div class="packageBox">\
							<b>Select Packages</b>\
							<ul id="packCD'+i+'"></ul>\
						</div>\
				</li>\ ';
				$('#infra_List_CD').prepend(data3);
				this.tempinfraNodes[document.getElementById(i).id] = undefined;
				var v = this.cDVMs.vms[i] = {}
					v._vmName = cDT.infraNodes[0].Instances[i].node;
					v._vmRole = cDT.infraNodes[0].Instances[i].role;
				this.addPackages(event,i,cd,i,v);
					}
				}
		}
		if(this.totalNodes == 0){
			$(".addVM").hide();
		}
	}
}
var cDT = new CreateDevOpsTemplate();
cDT.init();


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

/* Test scrip End
************************************************************************** */
var ttt = "Tic-Tac-Toe";
function Con(){
	this.arr=9;
	//this.id = document.getElementById("om");
	this.toggle = true;
	this._1stUser = [];
	this._2ndUser = [];
	this.c1 = [1,2,3];
	this.c2 = [4,5,6];
	this.c3 = [7,8,9];
	
	this.c4 = [1,5,9];
	this.c5 = [3,5,7];
	
	this.c6 = [1,4,7];
	this.c7 = [2,5,8];
	this.c8 = [3,6,9];
	
	this.conds = {
		_1 : [1,2,3],
		_2 : [4,5,6],
		_3 : [7,8,9]
	}
}
Con.prototype = {
	alertMe:function(al){
		//this.init();
	},
	con:function(e){
		//console.log(e);
		for(var j=0; j<= e.length-1; j++){
			//console.log(e[j]);
		}
	},
	checkData:function(con){
		//console.log(con.id);
		this.toggle = !this.toggle;
		this.toggle == true ? con.style.backgroundColor="#97C2F1" : con.style.backgroundColor="#FF7878";
		this.toggle == false ? this._1stUser.push(con.id) : this._2ndUser.push(con.id);
		con.removeAttribute("onclick");
		
		this._1stUser.sort();
		this._2ndUser.sort();
		
		var self = this;
		for(var j=0; j<= Object.keys(this.conds).length-1; j++){
			var o = Object.keys(this.conds)[j];
		}
		
		for (var i = 0; i < _1stUser.length; i++) {
			if (_1stUser.indexOf(c1[i]) !== -1) {
				someFlag = false;        
				console.log();
				break;
			}
		}
		
		if(this._1stUser.length-1 > 1 || this._2ndUser.length-1 > 1){
			
			if(this._1stUser.equals(this.c1) || 
				this._1stUser.equals(this.c2) || 
				this._1stUser.equals(this.c3) || 
				this._1stUser.equals(this.c4) || 
				this._1stUser.equals(this.c5) || 
				this._1stUser.equals(this.c6) || 
				this._1stUser.equals(this.c7) || 
				this._1stUser.equals(this.c8) )
			{
				alert("Red Win.");
				this.id.innerHTML="";
				this._1stUser = [];
				this._2ndUser = [];
				this.init();
			}else if(this._2ndUser.equals(this.c1) || 
					this._2ndUser.equals(this.c2) || 
					this._2ndUser.equals(this.c3)|| 
					this._2ndUser.equals(this.c4)|| 
					this._2ndUser.equals(this.c5)|| 
					this._2ndUser.equals(this.c6)|| 
					this._2ndUser.equals(this.c7)|| 
					this._2ndUser.equals(this.c8) )
			{
				alert("Blue Win.");
				this.id.innerHTML="";
				this._1stUser = [];
				this._2ndUser = [];
				this.init();
			}
		}
		
	},
	init:function(){
	for(var i=1; i <= this.arr; i++){
		var li = document.createElement("a");
			li.className="box";
		  //li.setAttribute("onclick","my.checkData(this);"); // we can write with javascript also.
			li.setAttribute("onclick","javascript:my.checkData(this)");
			li.id = i;
			//li.innerHTML=i;
			this.id.appendChild(li);
			if(i==3 || i== 6){
				var br = document.createElement("br");
					this.id.appendChild(br);
			}
		}
	}
}
var my = new Con();
my.alertMe("HI.. this me..");
