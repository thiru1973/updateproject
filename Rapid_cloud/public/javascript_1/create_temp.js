function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  ieVer = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  if(ieVer){
	  (function populateStorage() {
		  localStorage.setItem('bgcolor', '#DDDDDD');
		  localStorage.setItem('font', 'Segoe UI');
		}());
		currentColor = localStorage.getItem('bgcolor');
		document.getElementById("bg").style.backgroundColor = currentColor;
  }
}

$('#Templates1').click(function(){
	location.href="http://172.29.59.63:3000/master_2"
});

function modify(){
	$(".alertS div.alert").stop().hide();
	$(".alert-success").stop().slideDown();
}
function deploy(){
	$(".alertS div.alert").stop().hide();
	$(".alert-danger").stop().slideDown();	
}
function hideAlerts(){
	$(".alertS div.alert").stop().hide();	 
}
$(".closeError").click(function(){
	$(".alertS div.alert").stop().slideUp();
	//location.href="http://172.29.59.63:3000/master_2"
});
$(".closeMsg").click(function(){
	$(".alertS div.alert").stop().slideUp();
	//location.href="http://172.29.59.63:3000/master_2"
});
$(".warning").click(function(){
	$(".alertS div.alert").stop().slideUp();
});
$(document).ready(function(){
	$(".alert").hide();	
	$("[role='profileLinks']").hide();
	$("[role='aboutProject']").click(function(){
		$(".arrowRed").toggleClass('rotate', 1000).promise().done(function(){
			$("[role='profileLinks']").stop().slideToggle();
		});
	});
	
	$("[role='naviGation'] ul li dl").hide();
	$("[role='naviGation'] ul li:first-child dl").addClass("show").show();
	
	$("[role='naviGation'] ul li").click(function(event){
		event.stopPropagation();
		//closeOldmenu();
		console.log("Li clicked");
		$(this).children("dl").stop().slideToggle();
		$(this).children("a").toggleClass("activeTab");
		$(this).children("a").find(".arrowGray").toggleClass("rotateGray");
		$(this).children("dl").toggleClass("show");
	});
	function closeOldmenu(){
		$(".arrowGray").removeClass("rotateGray");
		$(".show").stop().slideUp();
		$(".show").removeClass();
		$(".activeTab").removeClass();
		console.log("Closed Tab");
	}	
	
	$("[role='naviGation'] ul li dl dt").click(function(event){
		event.stopPropagation();
		$("[role='naviGation'] ul li dl dt").removeClass("activeLink");
		$(this).addClass("activeLink");
	});
	
	$('[data-toggle="tooltip_Role"]').tooltip({title: "Subnet Help content comes here..", placement: "right"});
	$('[data-toggle="tooltip_RoleAtt"]').tooltip({title: "Subnet Help content comes here..", placement: "right"});
	$('[data-toggle="tooltip_OperatingSys"]').tooltip({title: "Subnet Help content comes here..", placement: "right"});

});

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
var roleImg=["database.png","database.png","database.png"];
//var attImg=["empty.png"];
var osImg=["windows.png","windows.png","windows.png"];

var projects = ["CloudOps","DevOps","Demoproj"];
var products = ["CloudOps","DevOps","demoprod"];

DropdownConst.prototype.appendData = function(name,appentoWhat){
	console.log(appentoWhat);
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


DropdownConst.prototype.cre = function(){
	var re = document.getElementById(this.addId);
	//console.log(this.dataSt);
	re.innerHTML+="<ul id='"+this.addId+"s' class='dropDown'></ul>";
	var ulI = document.getElementById(this.addId+"s");
	for(var i=0;i<=this.dataSt.length-1;i++){
		ulI.innerHTML +="<li onclick='selectOpt(this,"+i+")' class='"+this.dataSt[i]+"'>"
						+"<dl>"
						//+"<dt><img src='images_1/"+ this.imageArray[0] +"'></dt>"
						+"<dt></dt>"
						+"<dd class='va'>"+this.dataSt[i]+"</dd>"
						+"</dl>"
						+"</li>"
	}
}
DropdownConst.prototype.preView = function(){
	var prId = document.getElementById("previewTemp")
	prId.innerHTML+="<li class='templateConta"+i+"'><div class='preImages'>"
				 +"<span class='firstIcon'><img src='images/' /></span><span>+</span>"
				 +"<span class='secondIcon'><img src='images/' /></span>"
				 +"</div>"
				 +"<div class='preData'><ul>"
				 +"<li>Role:<span class='rolePre'></span> </li>"
				 +"<li>Role Attribute: <span class='roleAt'></span></li>"
				 +"<li>OS: <span class='os'></span></li>"
				 +"</ul></div></li>";
}
DropdownConst.prototype.addHelp = function(){
	console.log(this.addId);
	if(this.addId == "roleHel"){
		var addId = document.getElementById(this.addId);
		addId.innerHTML+=' <a href="#" data-toggle="tooltip_Role" title="" data-original-title=""><span class="infoSignColor glyphicon glyphicon-info-sign"></span></a>';
	}else if(this.addId == "roleAtHel"){
		var addId = document.getElementById(this.addId);
		addId.innerHTML+=' <a href="#" data-toggle="tooltip_RoleAtt" title="" data-original-title=""><span class="infoSignColor glyphicon glyphicon-info-sign"></span></a>';
	}else if(this.addId == "operHel"){
		var addId = document.getElementById(this.addId);
		addId.innerHTML+=' <a href="#" data-toggle="tooltip_OperatingSys" title="" data-original-title=""><span class="infoSignColor glyphicon glyphicon-info-sign"></span></a>';
	}
}
function selectOpt(ev, idn){
	var aImage = ev.getElementsByTagName("dt")[0].innerHTML;
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	 var v = ev.parentNode;
	 var vb = v.parentNode;
	 var idd = vb.id;
	 var roleAt;
	 //alert(idd);
	 var dId = idd.charAt(idd.length - 1);
	 //alert(dId);
	 console.log(norole);
	 for (var i=0;i<norole.length;i++)
		 {		 		
		 			for(var j=0;j<idDt.length;j++)
		 				{
		 					 if(aTex == idDt[j].name && idd == "sel"+norole[i]+"")
		 							{	
										//document.getElementById("sell0").innerText="";
		 								roleAt = idDt[j].subrole;
		 								addValues(roleAt,"sell"+norole[i]+"s",norole[i])
		 							}
		 				}	 		
		 }
	 document.getElementById(idd).style.border="none";
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");	
}
function addValues(data, toWhat, pos){
		console.log(pos);
		$("#sell"+pos+" > span:first-child").text("Select");
		var appendD = new DropdownConst();
		appendD.appendData(data,toWhat);
}

function dataUpDate(ev){
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	$(".proJetName").text(aTex);
}
function dataUpDate1(ev){
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	$(".proJetType").text(aTex);
}
function dataUpDate2(ev){
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	$(".projectTech").text(aTex);
}
function closeRole(ev){
	
	if(count == 0){
		$(".alertS div.alert").stop().hide();
		$(".alert-danger").stop().slideDown();		
		return;
	}
	count--;
	var evv = ev.parentNode;
	var ev = evv.parentNode;
	ev.remove();
	var i = ev.id;
	var delRoleNo = i.charAt(i.length-1);
	//alert(delRoleNo);
	for(var j = 0;j<norole.length;j++) 
	{
        if(norole[j] == delRoleNo) 
        {
            norole.splice(j, 1);
        }
    }
	console.log(norole);
	$("."+i).remove();
}

window.onload = function(){
	data();
	getStorageData();
}
function getStorageData(){
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	console.log(accountName+projName+prodName);
	//var theDiv = document.getElementById("data");
	//theDiv.innerHTML += accountName+">>"+projName+">>"+prodName; 
}
//var idArr=[];
//var osArr=[];
var idArr = ["Database", "WebServer", "ApplicationServer", "Integration", "TestServer", "BuildServer", "ProxyServer", "MailServer", "ApacheSolrServer","CachingServer", "NATServer","RDPServer","CMTool","RepoManager"];
var osArr = ["Ubuntu", "Debian", "SUSE", "CentOS", "RHEL(AWS)", "Windows","Debian"];
var idDt;
function data(){
	$(function(){		
		   $.getJSON('http://172.29.59.63:3000/org_temp', function(data) {			
			   console.log(data);
			   idDt = data[0].types;			  
			   /*for(var j=0;j<=idDt.length-1;j++){
				   var dd = data[0].types[j].name;				   
				   idArr.push(dd);
			   }*/
			   
			   /*var os = data[1].types;			  
			   for(var d=0; d<os.length-1; d++){				   
				   var oss = data[1].types[d].name;				  
				   osArr.push(oss);
			   }*/			   
			   //roleAt = data[0].types[1].subrole;
			   //var opeSys = data[0].types[2].subrole;		  
		   });
		   
		   $.getJSON('http://172.29.59.63:3000/project', function(data){
			   var proje = data;
			   var pj_Na=[], pr_Na=[], tec_ngy=[];
			   for(var d=0; d<=proje.length-1; d++){				   			   
				    pj_Na [d] = data[d].p_name;
				    pr_Na [d] = data[d].account;
				    tec_ngy [d] = data[d].technology;				   
			   }

			   objectData(projects, products, tec_ngy);
		   })
		});
}

function objectData(pj_Na, pr_Na, tec_ngy){
	/* Role */
	var role = new DropdownConst("div","roleID","","templateConta","","","");
	role.createCon();
	var role = new DropdownConst("div","pullL","pull-left","roleID","","","").createCon();
	var role = new DropdownConst("label","roleHel","labelTemp","pullL","Role","","");
	role.createCon();
	role.addHelp();
	var role = new DropdownConst("div","sel0","clickRole forWid","pullL","Select","",roleImg,idArr);
	role.createCon();
	role.cre();
	var role = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sel0","","","").createCon();

	var roleAt1 = ["Java","asp"];
	/* Role Attribute */
	var roleAttri = new DropdownConst("div","roleAtID","","templateConta","","","");
	roleAttri.createCon();
	var roleAttri = new DropdownConst("div","pullLi","pull-left","roleAtID","","","").createCon();
	var roleAttri = new DropdownConst("label","roleAtHel","labelTemp","pullLi","Role Attribute","","");
	roleAttri.createCon();
	roleAttri.addHelp();
	var roleAttri = new DropdownConst("div","sell0","clickRole forWid","pullLi","Select","","",roleAt1);
	roleAttri.createCon();
	roleAttri.cre();
	var roleAttri = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sell0","","","").createCon();
	
	/* Operating System */
	var operatingSys = new DropdownConst("div","oSys","","templateConta","","","");
	operatingSys.createCon();
	var operatingSys = new DropdownConst("div","pullLii","pull-left","oSys","","","").createCon();
	var operatingSys = new DropdownConst("label","operHel","labelTemp","pullLii","Operating System","","");
	operatingSys.createCon();
	operatingSys.addHelp();
	var operatingSys = new DropdownConst("div","selll0","clickRole forWid","pullLii","Select","",osImg,osArr);
	operatingSys.createCon();
	operatingSys.cre();
	var operatingSys = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","selll0","","","").createCon();

	/* Project Name	
	var projectName = new DropdownConst("div","pnameId","","templateConta1","","","");
	projectName.createCon();
	var projectName = new DropdownConst("div","pullLiii","pull-left","pnameId","","","").createCon();
	var projectName = new DropdownConst("label","","labelTemp","pullLiii","Project Name","","").createCon();
	var projectName = new DropdownConst("div","sellll","clickRole forWid1","pullLiii","Select","","",pj_Na);
	projectName.createCon();
	projectName.cre();
	var projectName = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sellll","","","").createCon();*/
	
	/* Product Name
	var productName = new DropdownConst("div","pdname","","templateConta1","","","");
	productName.createCon();
	var productName = new DropdownConst("div","pullLiiii","pull-left","pdname","","","").createCon();
	var productName = new DropdownConst("label","","labelTemp","pullLiiii","Product Name","","").createCon();
	var productName = new DropdownConst("div","selllll","clickRole forWid1","pullLiiii","Select","","",pr_Na);
	productName.createCon();
	productName.cre();
	var productName = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","selllll","","","").createCon();*/
	/* Technology */
	/*var technology = new DropdownConst("div","tname","","templateConta1","","","");
	technology.createCon();
	var technology = new DropdownConst("div","pullLiiiii","pull-left","tname","","","").createCon();
	var technology = new DropdownConst("label","","labelTemp","pullLiiiii","Technology","","").createCon();
	var technology = new DropdownConst("div","sellllll","clickRole forWid1","pullLiiiii","Select","","",tec_ngy);
	technology.createCon();
	technology.cre();
	var technology = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sellllll","","","").createCon();*/
	
	/* Remove buttons */
	var docV = document.getElementById("templateConta");
	docV.innerHTML+="<div class='pull-right'>"
				+"<span class='glyphicon glyphicon-minus-sign closeRow' onclick='closeRole(this)' style='font-size:25px;' ></span>"
				+"</div>";
	
	/* Create Template */
	$(document).ready(function(){
		var i =0;
		$(".clickRole").click(function(){		
			$(this).find(".dropDown").slideToggle();
			//$(".card").removeClass();
		});
	});
	/*$(".clickRole").click(function(e){		
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
	});*/
}

/* New Row */
var s=0;
var norole=[0];
var count = 0;
function createTem(eve)
{
	console.log("s="+s);
	count++,s++;
	norole.push(s);
	
	var refId = document.getElementById("roleAdded");
	var creAl = document.createElement("div");
	creAl.id="templateConta"+s;
	creAl.setAttribute('style', 'float:left;width:100%;');
	creAl.setAttribute('class', 'row');
	refId.appendChild(creAl);
	
	var role = new DropdownConst("div","roleID"+s,"","templateConta"+s,"","","");
	role.createCon();
	var role = new DropdownConst("div","pullL"+s,"pull-left","roleID"+s,"","","").createCon();
	var role = new DropdownConst("label","","labelTemp","pullL"+s,"","","").createCon();
	var role = new DropdownConst("div","sel"+s,"clickRole forWid newClickRole"+s,"pullL"+s,"Select","",roleImg,idArr);	role.createCon();
	role.cre();
	//role.preView();
	var role = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sel"+s,"","","").createCon();

	var roleAt1 = ["Java","asp"];
	/* Role Attribute */
	var roleAttri = new DropdownConst("div","roleAtID"+s,"","templateConta"+s,"","","");
	roleAttri.createCon();
	var roleAttri = new DropdownConst("div","pullLi"+s,"pull-left","roleAtID"+s,"","","").createCon();
	var roleAttri = new DropdownConst("label","","labelTemp","pullLi"+s,"","","").createCon();
	var roleAttri = new DropdownConst("div","sell"+s,"clickRole forWid newClickRole"+s,"pullLi"+s,"Select","","",roleAt1);
	roleAttri.createCon();
	roleAttri.cre();
	var roleAttri = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sell"+s,"","","").createCon();

	/* Operating System */
	var operatingSys = new DropdownConst("div","oSys"+s,"","templateConta"+s,"","","");
	operatingSys.createCon();
	var operatingSys = new DropdownConst("div","pullLii"+s,"pull-left","oSys"+s,"","","").createCon();
	var operatingSys = new DropdownConst("label","","labelTemp","pullLii"+s,"","","").createCon();
	var operatingSys = new DropdownConst("div","selll"+s,"clickRole forWid newClickRole"+s,"pullLii"+s,"Select","",osImg,osArr);
	operatingSys.createCon();
	operatingSys.cre();
	var operatingSys = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","selll"+s,"","","").createCon();

	/* Remove buttons */
	var docV = document.getElementById("templateConta"+s);
	docV.innerHTML+="<div class='pull-right'>"
				+"<span class='glyphicon glyphicon-minus-sign closeRow' onclick='closeRole(this)' style='font-size:25px;' ></span>"
				+"</div>";

		/*code for dropdown click*/
		$(document).on("click",".newClickRole"+s,function(){
			$(this).find(".dropDown").slideToggle();
		});
		//return i;	
	/*$(".clickRole").click(function(e){		
		e.stopPropagation();
		if ($(this).find(".dropDown").css('display') == 'block'){
			$(this).find(".dropDown").slideUp();
		}else{
			$(".dropDown").slideUp();
			$(this).find(".dropDown").slideDown();
		}
	});*/ 
}


var select_result = [];
function saveTemplateInformation(buttonId){
	var id=buttonId;
	var str="Select";
	console.log(norole);
	for(var i=0;i<norole.length;i++)
		{
					var x1 = document.getElementById("sel"+norole[i]).innerText;
					var y1 = document.getElementById("sell"+norole[i]).innerText;
					var z1 = document.getElementById("selll"+norole[i]).innerText;
					if(x1 == str )
					{
						document.getElementById("sel"+norole[i]).style.border="thin dashed #E24B4B";
						return;
					}else if(y1 == str)
						{
							document.getElementById("sell"+norole[i]).style.border="thin dashed #E24B4B";
							return;
						}else if(z1 == str)
							{
								document.getElementById("selll"+norole[i]).style.border="thin dashed #E24B4B";
								return;
							}
			}
		
	//var pj_name = document.getElementById("sellll").innerText;
	//var pd_name = document.getElementById("selllll").innerText;
	var pj_name = localStorage.getItem("ProjectName");
	//var tc_gy = document.getElementById("sellllll").innerText;
	var tm_name = document.getElementById("t_name").value;
	var tm_desc = document.getElementById("t_desc").value;
	var expTname = /^\w+$/;
	var expDesc =  /^[A-Za-z\d\s\.\()]+$/;
	
	/*if(pj_name == str)
		{
		document.getElementById("sellll").style.border="thin dashed #E24B4B";
		return;
		}else if(pd_name == str)
			{
			document.getElementById("selllll").style.border="thin dashed #E24B4B";
			return;
			}else if(tc_gy == str)
			{
			document.getElementById("sellllll").style.border="thin dashed #E24B4B";
			return;
			}else*/ if(!expTname.test(tm_name)){
				$(".alert-warning").stop().slideDown();
				document.getElementById("t_name").focus();
				return;
			}else if(!expDesc.test(tm_desc))
					{
					 $(".description").stop().slideDown();
					 document.getElementById("t_desc").focus();
					 return;
					}
	var a = Math.floor(100000 + Math.random() * 900000)
	a = a.toString().substring(0, 3);
	var te_name=pj_name+"_"+tm_name+"_"+a;
	alert("Template saved with "+te_name+" name!!!!!!!!");
	saveTemplateFunction(id,te_name,tm_desc);
}
function saveTemplateFunction(id, te_name,tm_desc){
	//alert(id);
	console.log(tm_desc);
	for(var i=0;i<norole.length;i++)
	{
				var x1 = document.getElementById("sel"+norole[i]).innerText;
				var y1 = document.getElementById("sell"+norole[i]).innerText;
				var z1 = document.getElementById("selll"+norole[i]).innerText;
				var role_info={};
				role_info.role=x1;
				role_info.roleAttr=y1;
				role_info.os=z1;
				select_result.push(role_info);
	}
	var ary1=JSON.stringify(select_result); 
	var acName = localStorage.getItem("Account")
	    ,pjName = localStorage.getItem("ProjectName")
	    ,pdName = localStorage.getItem("ProductName");
	console.log(ary1);
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: "d1="+ary1+"&d2="+te_name+"&d3="+acName+"&d4="+pjName+"&d5="+pdName+"&d6="+tm_desc,
	     url: 'http://172.29.59.63:3000/node_store',
	     success: function(results) {
	    	 if(id == "save_exit")
	    	 {
		    	 location.href="http://172.29.59.63:3000/assignNode"+"?data="+te_name;
	    	 }else if(id == "create_exit")
	    	 		 {
				    	 $(".alert-success").stop().slideDown();
				    	 location.href="http://172.29.59.63:3000/master_2"
	    	 		 }
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
		 });
}


