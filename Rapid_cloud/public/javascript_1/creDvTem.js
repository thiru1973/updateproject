/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 28th November 2016
*************************************** */

var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	
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
$(document).on("click", function (){
	$(".dropDown").slideUp();
});	

function selectOpt(ev, idn){
	event.stopPropagation();
	$(ev).parent(".dropDown").slideUp();
	
	var aImage = ev.getElementsByTagName("dt")[0].innerHTML;
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	var v = ev.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(idd);
	if(idd == "selvpc"){vpcId = aTex;getSubnetName(aTex);getSecurity(aTex);getRouteTable(aTex);getInetGWay(aTex);getKeyPair();}
	if(idd == "selsn"){subnetId = aTex;}
	if(idd == "selOs"){populate_image(aTex);}
	
	document.getElementById(idd).style.border="none";
	$("#"+idd+" span:first").html(aImage+aTex);
	$("#"+idd+" span img").css("width", "25px");
}
function repItem(ev){
	$(".tickIcon").hide();
	$(".repositoryList li").css("border", "solid 1px #bbb");
	$(ev).parent().parent().css("border", "solid 1px #424143");
	$(ev).parent().find(".tickIcon").show();
	//console.log(ev)
}

$(document).ready(function(){
	$("#ci_check").attr("checked","checked");
	$("#ci_check").attr("disabled", true);
	$("#ct_check, #cd_check").attr("checked", false);
	
	$(".techChekBut").removeClass("techChekBut_Selected");
	$(".ci").addClass("techChekBut_Selected");
	
	var dd = $("#ci_check, #ct_check, #cd_check")[0].checked;
	//$("header, #leftNavigation").hide();
	var ci = "cI", ct = "cT", cd = "cD", trueV = 1;
	$("#ci_check, #ct_check, #cd_check").on('change',function(){
		//console.log(dd);
		var dd = $("#ci_check, #ct_check, #cd_check");
		
		if(this.checked == true){
			trueV++;
			this.id == "ci_check" ? ($("._ciB").show(), $(".ci").addClass("techChekBut_Selected")) : true ;
			this.id == "ct_check" ? ($("._ctB").show(), $(".ct").addClass("techChekBut_Selected")) : true ;
			this.id == "cd_check" ? ($("._cdB").show(), $(".cd").addClass("techChekBut_Selected")) : true ;
			$("#ci_check, #ct_check, #cd_check").removeAttr("disabled");
		}
		else if(this.checked == false){
			trueV--;
			this.id == "ci_check" ? ($("._ciB").hide(), $(".ci").removeClass("techChekBut_Selected")) : true ;
			this.id == "ct_check" ? ($("._ctB").hide(), $(".ct").removeClass("techChekBut_Selected")) : true ;
			this.id == "cd_check" ? ($("._cdB").hide(), $(".cd").removeClass("techChekBut_Selected")) : true ;
			if(trueV == 1){
				for(var i = 0; i<dd.length ; i++){
					if(dd[i].checked == true){
						$("#"+ dd[i].id).attr("disabled", "disabled");
					}
				}
			}
		}
	});

});

	var techData = [{
		0:{
			valueOfkey:".NET",
			imageOfkey:"dotNet_i.jpg"
		},
		1:{
			valueOfkey:"Node JS",
			imageOfkey:"nodejs_i.jpg"
		},
		2:{
			valueOfkey:"Java",
			imageOfkey:"java_i.jpg"
		}
	}];
var ci = "cI", ct = "cT", cd = "cD", trueV = 1;
var TempalteData
function StepsOfDev(techD){
	this.tec = techD;
	this.st = document.getElementById("stepsOfDevOps");
	this.nM = document.getElementById("navMe");
	this.tn = document.getElementById("t_na");
	this.tech = document.getElementById("techDiv");
	//this.totalSteps = ["Details","DevOps Cycle","Add VM","Add Packages"];
	this.totalSteps = ["Details","DevOps Cycle","Add VM and Package"];
	this.step = 1;
	this.infraNodes = {}
	
	this.infra_List_CI = document.getElementById("infra_List_CI");
	this.infra_List_CT = document.getElementById("infra_List_CT");
	this.infra_List_CD = document.getElementById("infra_List_CD");
	this.noDEpullL = document.getElementById("noDEpullL");
	this.vmPopBut = document.getElementById("vmPopBut");
	this.tempinfraNodes = []
	
	this.t_n_Regex = /^[A-Za-z0-9_]{4,40}$/;
	this.seleCt = "Select";
	this.i = 0;
	this.VMType = "";

	this.cIVMs = {vms:{}};
	this.cTVMs = {vms:{}};
	this.cDVMs = {vms:{}};

	this.cIVMs = {};
	this.cTVMs = {};
	this.cDVMs = {};

	this.infraNodes = {}
	this.totalNodes = 0;
	
	this.ci_Array = [];
	this.ct_Array = [];
	this.cd_Array = [];
	
	this.toolsonJson = {}
	this.filterObject = {}
	
	this.selectedTools = [];
	this.templateDetails = {};
	
	this.jsonData = {};
	this.jsonData.jsonVM = {};
}
StepsOfDev.prototype = {
	stateCheck:{},
	init:function(){
		this.createVMandPack();
		this.checkValidations;
		this.tn.value=localStorage.getItem("InfraId");
		for(var i=0, b=1; i<this.totalSteps.length; i++, b++){
			this.st.innerHTML+='<span class="countNum st'+b+'">'+b+'</span>\
			<span class="countLable st'+b+'">'+this.totalSteps[i]+'</span>';
			if(i != this.totalSteps.length-1){
				this.st.innerHTML+='<span class="st'+b+' glyphicon glyphicon-arrow-right" aria-hidden="true"></span>';
			}
			this.stateCheck[this.totalSteps[i]]=false;
		}
		var self = this;
		$.getJSON(_ip+'/devopsTemplate' , function(data , responce){
			console.log(data);
			self.toolsonJson = data;
			for(i=0; i< data.length; i++){
				if(data[i].devops_type == "CI"){
					self.ci_Array.push(data[i].tool_name);
					//console.log(self.ci_Array);
				}else if(data[i].devops_type == "CT"){
					self.ct_Array.push(data[i].tool_name);
				}else if(data[i].devops_type == "CD"){
					self.cd_Array.push(data[i].tool_name);
				}
			}
		});
		
		this.customRapidWithImg("","", this.tech);
		
		for(var i=0; i < devT.infraNodes[0].Instances.length; i++){
			this.tempinfraNodes.push(devT.infraNodes[0].Instances[i].node);
			this.tempinfraNodesShadow.push(devT.infraNodes[0].Instances[i].node);
			this.noDEpullL.innerHTML +='<li id="myid'+i+'"><label>\
				<input type="checkbox" id="'+i+'" />"'+devT.infraNodes[0].Instances[i].node+'"</label>\
			</li>';
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
	addVM: function(ee, e, cmtype){
		// add a VM tile if successfully create the vm
		ee.preventDefault();
		$("#create_Sub_POP, .popDataNew, .cancelPoup, .popupData").show();
			if(cmtype == "cI"){
				this.VMType = cmtype;
				this.vmPopBut.innerHTML='<a class="cancelPoup" title="Cancel"\ onclick="devT.canCle(this, ci)">Cancel</a>&nbsp;\
				<button class="redButton" id="creaTeID" title="Create"\ onclick="devT.addInfraInstances(this,ci)">Add</button>';
			}else if(cmtype == "cT"){
				this.VMType = cmtype;
				this.vmPopBut.innerHTML='<a class="cancelPoup" title="Cancel"\ onclick="devT.canCle(this, ct)">Cancel</a>&nbsp;\
				<button class="redButton" id="creaTeID" title="Create"\ onclick="devT.addInfraInstances(this,ct)">Add</button>';
			}else if(cmtype == "cD"){
				this.VMType = cmtype;
				this.vmPopBut.innerHTML='<a class="cancelPoup" title="Cancel"\ onclick="devT.canCle(this, cd)">Cancel</a>&nbsp;\
				<button class="redButton" id="creaTeID" title="Create"\ onclick="devT.addInfraInstances(this,cd)">Add</button>';
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
	createVMandPack: function(){
		// clicking on add VM call popup
		this.infra_List_CI.innerHTML+='<li style="padding:0px;width:inherit"><a href="#" onclick="devT.addVM(event,this,ci)" class="addVM">Add Infrastructure Template<i class="fa fa-plus" aria-hidden="true"></i></a></li>';
		
		this.infra_List_CT.innerHTML+='<li style="padding:0px;width:inherit"><a href="#" onclick="devT.addVM(event,this,ct)" class="addVM">Add Infrastructure Template<i class="fa fa-plus" aria-hidden="true"></i></a></li>';
		
		this.infra_List_CD.innerHTML+='<li style="padding:0px;width:inherit"><a href="#" onclick="devT.addVM(event,this,cd)" class="addVM">Add Infrastructure Template<i class="fa fa-plus" aria-hidden="true"></i></a></li>';
		
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
	disableContent: function(){
		$("#t_n > #t_name").val(this.infraNodes[0].Template_name);
		$("#p_n > #p_name").val(this.infraNodes[0].Project_Name);
		this.jsonData._templateName = this.infraNodes[0].Template_name;
		sessionStorage.setItem('t_n',this.infraNodes[0].Template_name);
		sessionStorage.setItem('p_n',this.infraNodes[0].Project_Name);
		this.jsonData._projectName = this.infraNodes[0].Project_Name;
		
		this.noDEpullL.innerHTML ="";
		this.totalNodes = devT.infraNodes[0].Instances.length;
		this.tempinfraNodes = []; this.tempinfraNodesShadow = [];
		/*
		var teDrop = document.getElementById("technology_N_Drop");
		//console.log(devT.infraNodes[0].Instances.length);
		//console.log(devT.infraNodes[0].Instances);
		if(devT.infraNodes[0].Instances[0].os == "Ubuntu" || devT.infraNodes[0].Instances[0].os == "Centos"){
			teDrop.innerHTML='<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">Java</dd></dl></li>\
			<li onclick="selectOpt(this,1)" class="Dev"><dl><dt></dt><dd class="va">Node.js</dd></dl></li>';
		}else{
			teDrop.innerHTML='<li onclick="selectOpt(this,0)" class="Dev"><dl><dt></dt><dd class="va">.NET</dd></dl></li>';
		}*/
		for(var i=0; i < devT.infraNodes[0].Instances.length; i++){
			this.tempinfraNodes.push(devT.infraNodes[0].Instances[i].node);
			this.tempinfraNodesShadow.push(devT.infraNodes[0].Instances[i].node);
			this.noDEpullL.innerHTML +='<li id="myid'+i+'"><label>\
				<input type="checkbox" id="'+i+'" />"'+devT.infraNodes[0].Instances[i].node+'"</label>\
			</li>';
		}
	},
	customRapidWithImg:function(arryCon, arryImg, toAdd){
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
				 async:false,
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
		
		if(devT.infraNodes[0].Instances[0].os == "Ubuntu" || devT.infraNodes[0].Instances[0].os == "Centos"){
			var dd='<ul>';
				dd+='<li class="techLi" onclick="repItem(this)"><section class="techImg"><img src="/images_1/'+this.tec[1][0].imageOfkey+'" title="'+this.tec[1][1].valueOfkey+'"/></section>\
									<section class="techRadBut">&nbsp;</section></li>\
				\
				<li class="techLi" onclick="repItem(this)"><section class="techImg"><img src="/images_1/'+this.tec[2][0].imageOfkey+'" title="'+this.tec[2][1].valueOfkey+'"/></section>\
					<section class="techRadBut">&nbsp;</section></li>';
			dd+='</ul>';
			toAdd.innerHTML+=dd;
		}else{
			var dd='<ul>';
				dd+='<li class="techLi" onclick="repItem(this)"><section class="techImg"><img src="/images_1/'+this.tec[0][0].imageOfkey+'" title="'+this.tec[0][0].valueOfkey+'"/></section>\
									<section class="techRadBut">&nbsp;</section></li>';
			dd+='</ul>';
			toAdd.innerHTML+=dd;
		}
		//console.log(this.tec[0]);
		//console.log(Object.keys(this.tec[0]));
		this.navMe();
	},
	navMe:function(){
		this.nM.innerHTML='<button id="cTA_Create" onclick="devT.netPre(this);" disabled class="">Back</button>\
		<button id="cTA_Create" onclick="devT.netPre(this);">Next</button>';
		//console.log(this.stateCheck);
		$(".st1").addClass('ac');
		$(".natvu > div").hide();
		$(".natvu div.dev1").show();
	},
	netPre:function(ev){
		ev.innerText == "Back" ? this.step-- : false;
		ev.innerText == "Next" ? this.step++ : false;
		$("#stepsOfDevOps span").removeClass('ac');
		for(var j=1; j<=this.step; j++){
			$(".st"+j).addClass('ac');
		}
		$(".dev"+this.step).css('display','block');
		$(".natvu > div").hide();
		$(".dev"+this.step).show();
		
		if(1 <= this.step){
			this.nM.innerHTML='<button id="cTA_Create" onclick="devT.netPre(this);" class="">Back</button>\
			<button id="cTA_Create" onclick="devT.netPre(this);">Next</button>';
		}
		if(this.step == 1){
			this.nM.innerHTML='<button id="cTA_Create" onclick="devT.netPre(this);" disabled class="">Back</button>\
		<button id="cTA_Create" onclick="devT.netPre(this);">Next</button>';
		}
		if(this.step === this.totalSteps.length){
			this.nM.innerHTML='<button id="cTA_Create" onclick="devT.netPre(this);" class="">Back</button>\
		<button id="cTA_Create" onclick="devT.createTemplateActions(this);"">Submit</button>';
		}
		console.log(this.step);
	},
	addInfraInstances:function(ev, VMType){
	  $("#create_Sub_POP, .popDataNew, .cancelPoup, .popupData").hide();
	  VMType == "cI" || VMType == "cT" || VMType == "cD" ? this.VMType = VMType : false;
		var imgSize = 140;
		if(VMType == "cI"){
			for(var i=0; i < devT.infraNodes[0].Instances.length; i++){
			if(document.getElementById(i) == null){
			}else if(document.getElementById(i).checked){
				//console.log(this.totalNodes -=1);
				var data ='<li><div class="vmDetails">\
					<table>\
						  <tr>\
							<td>Role: </td>\
							<td>'+devT.infraNodes[0].Instances[i].role+'</td>\
						  </tr\
						  <tr>\
							<td>Node: </td>\
							<td>'+devT.infraNodes[0].Instances[i].node+'</td>\
						  </tr>\
						  <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+devT.infraNodes[0].Instances[i].image+'</td>\
						  </tr>\
						   <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+devT.infraNodes[0].Instances[i].os+'</td>\
						  </tr>\
						</table></div>\
						<div class="packageBox">\
							<b>Select Packages</b>\
							<ul id="packCI'+i+'"><!--<li><a href="#" onclick="devT.addPackages(event,this,ci,'+i+',"")" class="addPG">Add Package<i class="fa fa-plus" aria-hidden="true"></i></a></li>--></ul>\
						</div>\
				</li>\ ';
				$('#infra_List_CI').prepend(data);
				
				console.log(this.tempinfraNodes);
				
				this.tempinfraNodes[document.getElementById(i).id] = undefined;
				for(b in this.tempinfraNodes){
					//console.log(this.tempinfraNodes[b]);
				}
				var v = this.cIVMs[i] = {}
					v._vmName = devT.infraNodes[0].Instances[i].node;
					v._vmRole = devT.infraNodes[0].Instances[i].role;
					this.addPackages(event,i,ci,i,v);
				}
			}
		}
		if(VMType == "cT"){
			for(var i=0; i < devT.infraNodes[0].Instances.length; i++){
			if(document.getElementById(i) == null){
			}else if(document.getElementById(i).checked){
				//console.log(this.totalNodes -=1);
				var data2 ='<li><div class="vmDetails">\
					<table>\
						  <tr>\
							<td>Role: </td>\
							<td>'+devT.infraNodes[0].Instances[i].role+'</td>\
						  </tr\
						  <tr>\
							<td>Node: </td>\
							<td>'+devT.infraNodes[0].Instances[i].node+'</td>\
						  </tr>\
						  <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+devT.infraNodes[0].Instances[i].image+'</td>\
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
				var v = this.cTVMs[i] = {}
					v._vmName = devT.infraNodes[0].Instances[i].node;
					v._vmRole = devT.infraNodes[0].Instances[i].role;
					this.addPackages(event,i,ct,i,v);
					}
				}
		}
		if(VMType == "cD"){
			for(var i=0; i < devT.infraNodes[0].Instances.length; i++){
			if(document.getElementById(i) == null){
			}else if(document.getElementById(i).checked){
				//console.log(this.totalNodes -=1);
				var data3 ='<li><div class="vmDetails">\
					<table>\
						  <tr>\
							<td>Role: </td>\
							<td>'+devT.infraNodes[0].Instances[i].role+'</td>\
						  </tr\
						  <tr>\
							<td>Node: </td>\
							<td>'+devT.infraNodes[0].Instances[i].node+'</td>\
						  </tr>\
						  <tr>\
							<td>Image: </td>\
							<td style="vertical-align: top;">'+devT.infraNodes[0].Instances[i].image+'</td>\
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
				var v = this.cDVMs[i] = {}
					v._vmName = devT.infraNodes[0].Instances[i].node;
					v._vmRole = devT.infraNodes[0].Instances[i].role;
				this.addPackages(event,i,cd,i,v);
					}
				}
		}
		if(this.totalNodes == 0){
			$(".addVM").hide();
		}
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
			var _te = $("#technology_ span").text();
			this.technologyNa = _te;
			
		/*console.log(this.ci_Array);
		console.log(this.ct_Array);
		console.log(this.cd_Array);*/
		if(VMType == "cI"){
			//console.log(ev);
			var vmI = document.getElementById(vmId),
				data ='',
				vv = objectV._vmPackages = {};
				//console.log(this.ci_Array.length);
				
				if(this.ci_Array.length == 0){
					data +='No packages available'
				}else{
					for(var i=0; i < this.ci_Array.length; i++){
					data +='<li class="addPG"><label><input type="checkbox" onchange="devT.updatePack(this,ci,'+ev+','+i+')" name="'+this.ci_Array[i]+'" />'+this.ci_Array[i]+'</label></li>';
					vv[this.ci_Array[i]] = false;
					
					var _te = $("#technology_ span").text();
					console.log(_te);
					for(var k=0; k < this.toolsonJson.length; k++){
						//console.log(this.toolsonJson.data[k]);
						if(this.toolsonJson[k].devops_type == "CI" && 
							this.toolsonJson[k].tool_name == this.ci_Array[i])
							{
							//console.log(this.toolsonJson.data[k]);
							vv[this.ci_Array[i]+"_Data"] = {
								_endpoints: this.toolsonJson[k].endpoints,
								_img: this.toolsonJson[k].image,
								_runList: this.toolsonJson[k].runlist,
								_os: this.toolsonJson[k].OS,
								_version: this.toolsonJson[k].version
							};
						}
					}
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
					data +='<li class="addPG"><label><input type="checkbox" onchange="devT.updatePack(this,ct,'+ev+','+i+')" name="'+this.ct_Array[i]+'" />'+this.ct_Array[i]+'</label></li>';
					dd[this.ct_Array[i]] = false;					
					
						var _te = $("#technology_ span").text();
						console.log(_te);
						for(var k=0; k < this.toolsonJson.data.length; k++){
							//console.log(this.toolsonJson.data[k]);
							if(this.toolsonJson.data[k].devops_type == "CT" && 
								this.toolsonJson.data[k].tool_name == this.ct_Array[i])
								{
								//console.log(this.toolsonJson.data[k]);
								dd[this.ct_Array[i]+"_Data"] = {
									_endpoints: this.toolsonJson.data[k].endpoints,
									_img: this.toolsonJson.data[k].image,
									_runList: this.toolsonJson.data[k].runlist,
									_os: this.toolsonJson.data[k].OS,
									_version: this.toolsonJson.data[k].version
								};
							}
						}
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
					data +='<li class="addPG"><label><input type="checkbox" onchange="devT.updatePack(this,cd,'+ev+','+i+')" name="'+this.cd_Array[i]+'" />'+this.cd_Array[i]+'</label></li>';
					bb[this.cd_Array[i]] = false;
					
						var _te = $("#technology_ span").text();
						console.log(_te);
						for(var k=0; k < this.toolsonJson.data.length; k++){
							//console.log(this.toolsonJson.data[k]);
							if(this.toolsonJson.data[k].devops_type == "CD" && 
								this.toolsonJson.data[k].tool_name == this.ci_Array[i])
								{
								//console.log(this.toolsonJson.data[k]);
								bb[this.ci_Array[i]+"_Data"] = {
									_endpoints: this.toolsonJson.data[k].endpoints,
									_img: this.toolsonJson.data[k].image,
									_runList: this.toolsonJson.data[k].runlist,
									_os: this.toolsonJson.data[k].OS,
									_version: this.toolsonJson.data[k].version
								};
							}
						}
					}
				}
			evid = "packCD"+ev;
			$("#"+evid).prepend(data);
		}
	},
	updatePack: function(ev,VMType,nodePostion, packageBox){
		//console.log(ev.checked);
		if(VMType == "cI"){
			var civm = this.cIVMs
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
			var ctvm = this.cTVMs
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
			var cdvm = this.cDVMs
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
			cdvm[nodePostion]._vmPackages[ev.name] = ev.checked
		}
	},
	checkValidations: function(vmType){
		if(true){
			//Generate json data
			this.jsonData.jsonVM = {
			};			
				//this.templateDetails._templateName = this.jsonData._templateName,
				//this.templateDetails._projectName = this.jsonData._projectName,
				this.templateDetails._templateName = this.jsonData._templateName,
				this.templateDetails._projectName = this.jsonData._projectName,
				this.templateDetails._technology = this.jsonData._technology,
				this.templateDetails._tool_name = this.technologyNa,
				this.templateDetails._region = "Central US",
				this.templateDetails._provider = "Azure",
				 // _vm:[this.cIVMs] no difference if add this in a array or not.
				this.templateDetails.cIVMs=this.cIVMs,
				this.templateDetails.cTVMs=this.cTVMs,
				this.templateDetails.cDVMs=this.cDVMs
				this.templateDetails = {
					_templateName : sessionStorage.getItem('t_n'),
					_projectName : sessionStorage.getItem('p_n'),
					_technology : sessionStorage.getItem('tech'),
					_tool_name : sessionStorage.getItem('tech'),
					
					cIVMs:this.cIVMs,
					cTVMs:this.cTVMs,
					cDVMs:this.cDVMs
				}
					
			var mydata = [this.templateDetails]
			var tempDetails = JSON.stringify(mydata);
			var ci = JSON.stringify(this.cIVMs);
			var ct = JSON.stringify(this.cTVMs);
			var cd = JSON.stringify(this.cDVMs);
				
			var CI_vms = JSON.stringify(this.cIVMs)
			var CT_vms = JSON.stringify(this.cTVMs)
			var CD_vms = JSON.stringify(this.cDVMs)
			//var json2 =[{"Jenkins":false,"Sonarqube":false,"Nexus":false}];
			var devopsJson = this.jsonData.jsonVM
			//console.log(tempDetails);
				$.ajax({
           type: 'POST',
           jsonpCallback: "callback",
           //dataType: 'json',
           data:"&d1="+tempDetails,
           url: _ip+'/saveDevopsTemplate',
           success: function(results) {
			   console.log(results);
             //location.pathname = 'viewDevOpsTemplate';
           },
           error: function (xhr,error){
            console.log('Failure'+xhr+error);
            },
         });

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
			this.technologyNa = _te;
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
			
			
			if(Object.keys(this.cIVMs).length != 0){
				for(b in this.cIVMs){
				  if(typeof(JSON.parse(b))== 'number'){
				    var a = Object.keys(this.cIVMs[b]._vmPackages);
            //console.log(a.length);
            var q = 0;
            for(var t=0; t < a.length; t++){
              //console.log(a[t]);
              //console.log(this.cIVMs[b]._vmPackages[a[t]]);
              var packNa = this.cIVMs[b]._vmPackages[a[t]];
              if(packNa == true){
                //addpackDe(this.toolsonJson.data[i].tool_name,t)
              }else{
                q++
                a.length == q ? alert("Select atleast one package in each VM.") : true;
              }
            }
				  }
					//console.log(Object.keys(this.cIVMs[b]._vmPackages));

				}
			}

			this.checkValidations(vmType);
			//tools_for_Deploy.filterObjectData();
		}else if(button.id == "cTA_CreateAndDeploy"){
			//console.log("Create and Deploy")
		}
	}
}
var devT = new StepsOfDev(techData);
	devT.init();

	
function repItem(ev){
	var ii = $(ev).find("img").attr("title");
	//console.log(ii);
	$(".techLi .techRadBut").removeClass("techRadBut_Selected");
	$(ev).find(".techRadBut").addClass("techRadBut_Selected");
  sessionStorage.setItem('tech',ii);
	//document.cookie = "Technology="+ii+";expires=Fri, Dec 02 2016 14:44:30 GMT+0530";
}

var ee = function(){
    this.keys = [];
    this.values = {};
    this.m = {}
};
ee.prototype.set = function(a, b, c) {
    this.keys.push(a);
};
;

// eagerly waiting 686 742
// normal ex
// 8500 200 220
// 8500250022
// 531049813
// 986
// 25,000/-

// A watched pot never boils
// If something takes time to do, it doesn’t help to constantly check on it. You just have to give it time.
