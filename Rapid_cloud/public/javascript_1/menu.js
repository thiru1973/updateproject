/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 19th May 2015
*************************************** */
$(document).ready(function(){
	localStorage.setItem("Theme", "Futuristic");
	if(localStorage.getItem("Theme") == "Classic"){
		var th = document.getElementById("myTheme");
			th.href="css_1/style.css";
			$('#classic').attr('checked', true);
			
			var themeOne = new LayOut1();
				themeOne.aboutProject();
				
	}else if(localStorage.getItem("Theme") == "Futuristic"){
		var th = document.getElementById("myTheme");
			th.href="theme/theme1.css";
			$('#futuristic').attr('checked', true);
			
		// Menu
			var nav = document.getElementById("themeNav"),
				theme2 = new LayOut();
				theme2.aboutProject();
	}
	$(".alert").hide();
	//$("[role='profileLinks']").hide();
	
	/*$("[role='aboutProject']").click(function(){
		$(".arrowRed").toggleClass('rotate', 1000).promise().done(function(){
			$("[role='profileLinks']").stop().slideToggle();
		});
	});*/
	/*
	 * $("[role='naviGation'] ul li dl").hide(); $("[role='naviGation'] ul
	 * li:first-child dl").addClass("show").show();
	 * 
	 * $("[role='naviGation'] ul li").click(function(event){
	 * event.stopPropagation(); //closeOldmenu(); console.log("Li clicked");
	 * $(this).children("dl").stop().slideToggle();
	 * $(this).children("a").toggleClass("activeTab");
	 * $(this).children("a").find(".arrowGray").toggleClass("rotateGray");
	 * $(this).children("dl").toggleClass("show"); });
	 */
	function closeOldmenu(){
		$(".arrowGray").removeClass("rotateGray");
		$(".show").stop().slideUp();
		$(".show").removeClass();
		$(".activeTab").removeClass();
		console.log("Closed Tab");
	}	
	
	/*
	 * $("[role='naviGation'] ul li dl dt").click(function(event){
	 * event.stopPropagation(); $("[role='naviGation'] ul li dl
	 * dt").removeClass("activeLink"); $(this).addClass("activeLink"); });
	 */
	
	$(window).on("load resize",function(e){
		var h = $('[role="header"]').outerHeight(true);
				$('[role="contentArea"] header').height(h-25);
	});

	$(".link_Prime").hover(function(){
		$(this).find(".howMe").stop().css({display:"block"});
	},function(){
		$(this).find(".howMe").stop().css({display:"none"});
	});
	
	$("#Networks").hover(function(){
		$(this).find("#link_1_0").stop().css({display:"block"});
	},function(){
		$(this).find("#link_1_0").stop().css({display:"none"});
	});
	
	
	//$(".container").append().html("<p>All new content. <em>You bet!</em></p>");
	/*var i = $('[role="contentArea"]')
		i.prepend("<div class='userName'>Jason Statham | <a href='/login' class='userNa'>SignOut</a></div>");*/
	var uName = sessionStorage.getItem("User");
	if(uName != null){
	var i = $('[role="contentArea"]')
		i.prepend("<div class='userName'>"+uName+" | <a href='/oauth' class='userNa'>SignOut</a></div>");
	}else{
		location.href = location.origin+"/oauth";
	}
	var accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	var theDiv = document.getElementById("data");
	theDiv ? theDiv.innerHTML += accountName+">>"+projName+">>"+prodName : false;
	
});
$(document).on('click', 'li#Templates', function(){ 
	
});
function themeChange(ev){
	var th = document.getElementById("myTheme");
	if(ev.value == "Classic"){
		localStorage.setItem("Theme", ev.value);
		//var li = document.createElement("link");
		//li.id=ev.value
		//li.rel="stylesheet";
		location.reload();
		
		th.href="css_1/style.css";
		//document.getElementsByTagName("head")[0].appendChild(li);
		
	}else if(ev.value == "Futuristic"){
		localStorage.setItem("Theme", ev.value);
		location.reload();
		//var li = document.createElement("link");
			//li.rel="stylesheet";
			//li.id=ev.value
				th.href="theme/theme1.css"
				//document.getElementsByTagName("head")[0].appendChild(li);
	}
}
function LayOut1(){
	this.open = true;
	this.close = 0;
}
LayOut1.prototype = {
	primaryLins:{
		level_1:["Dashboard","Design","Deploy","Manage","Monitor"],
		level_2:["Networks","Templates","Node","Blueprint","Load Balancer"],
		level_2_1:["VPC","Subnet","Security Gruop","Route Table","Key Pair","Local Network Gate Way","Internet Gate Way","DNS Zone","End Points","Virtual Network Gateway"],
		//level_2_2:["View Templates","Create Templat"],
		
		level_1_Icons:["fa-tachometer","fa-paint-brush","fa-desktop","fa-hourglass-half","fa-eye","fa-th-list"],
		// Dashboard:{1:"Templates", 2:"Node", 3:"Blueprint", 4:"Networks",
		// 5:"Load Balancer"},
		Design:{1:"Option 1", 2:"Option 2", 3:"Option 3"},
	},
	createParentView: function(){
		var navv = document.getElementById("navDiv"), i;
		for(i=0; i<= this.primaryLins.level_1.length-1; i++ ){
			navv.innerHTML+='<li class="link_Prime" id='+this.primaryLins.level_1[i]+'>\
							<ul class="howMe" id="link_'+i+'"></ul>\
							<i class="fa fa-2x '+this.primaryLins.level_1_Icons[i]+'"></i>\
								<span class="myTe">'+this.primaryLins.level_1[i]+'</span></li>';
		}
		this.createSubView();
		//this.pagNav();
	},
	createSubView:function(){
		var subL1 = document.getElementById("link_1");
		for(i=0; i<= this.primaryLins.level_2.length-1; i++ ){
			subL1.innerHTML+='<li id='+this.primaryLins.level_2[i]+'>\
							<ul class="howMe1" id="link_1_'+i+'"></ul>\
							<span class="myTe">'+this.primaryLins.level_2[i]+'</span>\
							</li>';
		}
		this.createSubView3();
	},
	createSubView3:function(){
		var subL0 = document.getElementById("link_1_0");
		for(i=0; i<= this.primaryLins.level_2_1.length-1; i++ ){
			subL0.innerHTML+='<li id='+"3rd"+this.primaryLins.level_2_1[i]+'>'+this.primaryLins.level_2_1[i]+'</li>';
		}
	},
	pagNav:function(){
		$('#Design').click(function(){location.href = location.origin+"/vpc";});
		$('#Networks').click(function(){location.href = location.origin+"/vpc";});
		$('#Templates').click(function(){location.href = location.origin+"/master_2";});
		$('#Manage').click(function(){location.href = location.origin+"/manageEnv"});
		$('#3rdVPC').click(function(){location.href = location.origin+"/vpc"});
		$('#3rdSubnet').click(function(){location.href = location.origin+"/subnet"});
		$('#3rdKey').click(function(){location.href = location.origin+"/keyPair"});
		
		$('#3rdVPN').click(function(){location.href = location.origin+"/vpnConnection"});
		$('#3rdLocal').click(function(){location.href = location.origin+"/localNetworkGateWay"});
		$('#3rdInternet').click(function(){location.href = location.origin+"/internetGateWay"});
		
		$('#3rdSecurity').click(function(){location.href = location.origin+"/securityGroup"});
		$('#3rdRoute').click(function(){location.href = location.origin+"/routeTable"});
	},
	lnav: document.getElementById("leftNavigation"),
	aboutProject:function(){
		this.lnav.innerHTML+='<div class="header-sec">\
							<header role="header">\
								<a href="#"> <img src="images_1/RapidCloud_Logo.png" /> </a> <span class="header-txt"> Manage, Govern and Optimize your Cloud Environments</span>\
								<img src="images_1/Sonata_Logo.png" class="second-logo"/>\
								<ul>\
									<li><span class="glyphicon glyphicon-bell"></span></li>\
									<li><span class="glyphicon glyphicon-envelope"></span></li>\
									<li><span class="glyphicon glyphicon-question-sign"></span></li>\
									<li><span class="glyphicon glyphicon-cog"></span></li>\
								</ul>\
							</header>\
						</div>\
					<div id="menuBox">\
					  <a href="#" class="moreMenu" onclick="menU.moreMenu(this)"><i class="fa fa-bars fa-2x"></i></a>\
					  <section role="aboutProject">\
						<!-- <br>\
						<img src="images_1/profile_pic.png" />\
						<br> -->\
						<h1>Andrew  <span class="glyphicon glyphicon-chevron-down arrowRed"></span></h1>\
						<br>\
					  </section>\
					  <menu role="profileLinks">\
						<ul>\
							<li><a href="/myAccount">My Account</a></li>\
							<li>Sign Out</li>\
						</ul>\
					  </menu>\
					  <nav role="naviGation">\
						<ul id="navDiv"></ul>\
					  </nav></div>';
		this.createParentView();
	},
	moreMenu:function(ev){
		if(this.open){
			this.lnav.style.width="5.66667%"
			$('[role="contentArea"]').css("width", "94.333333%");
			$(".link_Prime span.myTe").css("display", "none");
			this.open = false;
		}else{
			this.lnav.style.width="";
			$('[role="contentArea"]').css("width", "");
			$(".link_Prime span.myTe").css("display", "");
			this.open = true;
		}
	},
	openMenu:function(){
		var lnav = document.getElementById("leftNavigation");
			lnav.style.display="block";
	},
	assignIcons:function(){
	}
}
///////////////////////////////////////// Theme2
function LayOut(){
	this.open = true;
	this.close = 0;
	this.menu = [];
}
LayOut.prototype = {
	getRoles: function(){
		
		var data = {};
		data.roleId  = sessionStorage.getItem("role");
		//data.roleId = 'u';
		var self = this;
		$.ajax({
			 type: 'POST',
			 jsonpCallback: "callback",
			 datatype: 'jsonp',
			 data: data,
			 async: false,
			 url: 'http://172.29.59.65:3000/getRoles',
			 success: function(results) {
				 //console.log(results);
				 for(var i =0;i<results.length;i++)
				 {
					 self.menu.push(results[i].perm_name);
				 }
			 },
			 error: function (xhr, status, error){
				console.log('Failure');
				alert("failure");
				},
		   });
		   this.createParentView();
	},
	primaryLins:{
		deployPrime:["Infrastructure","DevOps Template","Product Template"],
		
		designPrime:["Infrastructure Template","DevOps Template","Product Template"],
			//level_1designPrime:["View","Create","Deploy"],
			level_1designPrime:["View","Deploy","Node"],
			level_2desPrime:["View","Deploy","","Design"],
		level_1:self.menu,
		//level_1:["Accounts","Design","Deploy","Manage","Monitor", "Test Ops"],
								//level_2:["Networks","Templates","Node","Blueprint","Load Balancer"],
								level_2:["Networks","Templates"],
														level_2_2:["View Templates","Create Templat"],
										  level_2a:["Node", "Templates"],
														level_2a1:["Single Node"],
														level_2a2:["Account Templates"],
		level_2_1:["VPC","Subnet","Security Gruop","Route Table","VPN Connection","Key Pair","Local Network Gate Way","Internet Gate Way","DNS Zone","End Points","Virtual Network Gateway"],
		

		level_1_Icons:["fa-tachometer","fa-paint-brush","fa-desktop","fa-hourglass-half","fa-eye","fa-th-list"],
		// Dashboard:{1:"Templates", 2:"Node", 3:"Blueprint", 4:"Networks",
		// 5:"Load Balancer"},
		Design:{1:"Option 1", 2:"Option 2", 3:"Option 3"},
	},
	createParentView: function(){
		var th = $("#themeNav").parent();
			$(th).prepend("<ul id='designLin'></ul>");
		
		var dl = document.getElementById("designLin") || false;
			
		for(d=0; d<= this.primaryLins.designPrime.length-1; d++ ){
			dl.innerHTML+='<li class="link_Prime" id="design_'+d+'">\
								'+this.primaryLins.designPrime[d]+'\
							</li>';
		}
		
		var navv = document.getElementById("navDiv"), i;
		for(i=0; i<= this.menu.length-1; i++ ){
			navv.innerHTML+='<li class="link_Prime" id='+this.menu[i]+'>\
							<ul class="howMe" id="link_'+i+'"></ul>\
							<i class="fa fa-2x '+this.primaryLins.level_1_Icons[i]+'"></i>\
								<span class="myTe">'+this.menu[i]+'</span></li>';
		}
		this.createSubView();
		this.pagNav();this.activeTab();
	},
	createSubView:function(elementId){
		var subL0_1 = document.getElementById("themeNav"),
			dl = document.getElementById("designLin") || false;
		if(subL0_1 === null){
			return false;
		}else{
			for(i=0; i<= this.primaryLins.level_2.length-1; i++ ){
			subL0_1.innerHTML+='<li id='+this.primaryLins.level_2[i]+'>\
							<span class="myTe">'+this.primaryLins.level_2[i]+'</span>\
							</li>';
			}
		}
		var pt = location.pathname;
		if(pt === "/nodeTemplates" || pt === "/accountTemplates" || pt === "/assignNode"){
			$("#link_1_0").hide();
			subL0_1.innerHTML="";
			for(i=0; i<= this.primaryLins.level_2a.length-1; i++ ){
			subL0_1.innerHTML+='<li id=p'+i+this.primaryLins.level_2a[i]+'>\
							<span class="myTe">'+this.primaryLins.level_2a[i]+'</span>\
							</li>';
			}
		}else if(pt === "/create_devOps_template" || pt==="/createDevTemp"){
			$("#link_1_0, #themeNav").hide();
			dl.innerHTML="";
			for(d=0; d<= this.primaryLins.designPrime.length-1; d++ ){
				dl.innerHTML+='<li class="link_Prime" id="creDevTem'+d+'">\
									'+this.primaryLins.designPrime[d]+'\
								</li>';
			}
			$("#Design, #creDevTem1").addClass("active");
		}
		else if(pt === "/vpc"){
			//$("#Templates").hide();
		}
		/*
		else if(pt === "/viewProductTemplate" || pt === "/deployProductTemplate"){
			$("#link_1_0").hide();
			subL0_1.style="margin-bottom:5px;"
			subL0_1.innerHTML="";
			for(i=0; i<= this.primaryLins.level_1designPrime.length-1; i++ ){
			subL0_1.innerHTML+='<li id=viewProTe'+i+'>\
							<span class="myTe">'+this.primaryLins.level_1designPrime[i]+'</span>\
							</li>';
			}
		}*/
		else if(pt === "/viewDevOpsTemplate"|| pt === "/configureDevOps"){
			$("#link_1_0").hide();
			subL0_1.style="margin-bottom:5px;"
			subL0_1.innerHTML="";
			for(i=0; i<= this.primaryLins.level_1designPrime.length-1; i++ ){
			subL0_1.innerHTML+='<li id=viewDevTe'+i+'>\
							<span class="myTe">'+this.primaryLins.level_1designPrime[i]+'</span>\
							</li>';
			}
		}
		
		this.createSubView3();
	},
	createSubView3:function(){
		var subL0 = document.getElementById("link_1_0"),
			subL0_1 = document.getElementById("themeNav"),
			dl = document.getElementById("designLin") || false;
		for(i=0; i<= this.primaryLins.level_2_1.length-1; i++ ){
			if(this.primaryLins.level_2_1[i] == "Key Pair" || this.primaryLins.level_2_1[i] == "Internet Gate Way" || this.primaryLins.level_2_1[i] == "VPN Connection"){
				subL0.innerHTML+='<li role="forAWS" id='+"3rd"+this.primaryLins.level_2_1[i]+'>'+this.primaryLins.level_2_1[i]+'</li>';
			}
			else if(this.primaryLins.level_2_1[i] == "Local Network Gate Way" || this.primaryLins.level_2_1[i] == "DNS Zone" || this.primaryLins.level_2_1[i] == "Virtual Network Gateway"){
				subL0.innerHTML+='<li role="forAzure" id='+"3rd"+this.primaryLins.level_2_1[i]+'>'+this.primaryLins.level_2_1[i]+'</li>';
			}
			else{
				subL0.innerHTML+='<li id='+"3rd"+this.primaryLins.level_2_1[i]+'>'+this.primaryLins.level_2_1[i]+'</li>';
			}
		}
		var pt = location.pathname;
		if(pt === "/create_template" || pt === "/addData"){
			var subL0 = document.getElementById("link_1_0");
				subL0.innerHTML="";
			for(i=0; i<= this.primaryLins.level_2_2.length-1; i++ ){
				subL0.innerHTML+='<li id='+"3rd"+[i]+this.primaryLins.level_2_2[i]+'>'+this.primaryLins.level_2_2[i]+'</li>';
			}
			//$("#themeNav").css("margin-bottom", "6px");
		}else if(pt === "/nodeTemplates"){
			subL0.innerHTML="";
			$("#link_1_0").hide();
			/*for(i=0; i<= this.primaryLins.level_2a1.length-1; i++ ){
				subL0.innerHTML+='<li id='+"3rd"+[i]+this.primaryLins.level_2a1[i]+'>'+this.primaryLins.level_2a1[i]+'</li>';
			}*/
		}else if(pt === "/master_2" || pt === "/deployDivOpsTemplate" || pt === "/deployProductTemplate" || pt==="/deployTemplate" || pt === "/nodeTemplates"){
			dl.innerHTML="";
			for(d=0; d<= this.primaryLins.deployPrime.length-1; d++ ){
				dl.innerHTML+='<li class="link_Prime" id="deploy'+d+'">\
									'+this.primaryLins.deployPrime[d]+'\
								</li>';
				}
			subL0.innerHTML="";
			$("#link_1_0").hide();
			subL0.style="margin-bottom:-6px;"
			subL0_1.innerHTML="";
			for(i=0; i<= this.primaryLins.level_1designPrime.length-1; i++ ){
			subL0_1.innerHTML+='<li id=depInfra'+i+'>\
							<span class="myTe">'+this.primaryLins.level_1designPrime[i]+'</span>\
							</li>';
			}
			//$("#design_0, #deploy0, #depInfra0").addClass("active");
		}else if(pt === "/viewDevOpsTemplate" || pt === "/viewProductTemplate" || pt === "/configureDevOps"){
			dl.innerHTML="";
			for(d=0; d<= this.primaryLins.deployPrime.length-1; d++ ){
				dl.innerHTML+='<li class="link_Prime" id="deploy'+d+'">\
									'+this.primaryLins.deployPrime[d]+'\
								</li>';
				}
			subL0.innerHTML="";
			$("#link_1_0").hide();
			subL0.style="margin-bottom:-6px;"
			subL0_1.innerHTML="";
			for(i=0; i<= this.primaryLins.level_2desPrime.length-1; i++ ){
			subL0_1.innerHTML+='<li id=depInfra'+i+'>\
							<span class="myTe">'+this.primaryLins.level_2desPrime[i]+'</span>\
							</li>';
			}
		}
	},
	activeTab:function(){
		var pt = location.pathname;
			pt === "/viewDevOpsTemplate" ? $("#depInfra0, #Deploy, #deploy1").addClass("active") : false;
			pt === "/configureDevOps" ? $("#depInfra0, #Deploy, #deploy1").addClass("active") : false;
			pt === "/deployDivOpsTemplate" ? $("#depInfra1, #Deploy, #deploy1").addClass("active") : false;
			
			pt === "/viewProductTemplate" ? $("#depInfra0, #Deploy, #deploy2").addClass("active") : false;
			pt === "/deployProductTemplate" ? $("#depInfra1, #Deploy, #deploy2").addClass("active") : false;
			//pt === "/viewProductTemplate" || pt === "/deployProductTemplate" ? $("#design_2, #viewProTe0, #Deploy").addClass("active") : false;
		
			pt === "/accounts" ? $("#Accounts").addClass("active") : false;
		
			pt === "/vpc" ? $("#3rdVPC, #design_0, #Networks, #Design, #design_0").addClass("active") : false;
			pt === "/subnet" ? $("#3rdSubnet, #design_0, #Networks, #Design").addClass("active") : false;
			pt === "/keyPair" ? $("#3rdKey, #design_0, #Networks, #Design").addClass("active") : false;
			
			pt === "/localNetworkGateWay" ? $("#3rdLocal, #Networks, #Design").addClass("active") : false;
			pt === "/internetGateWay" ? $("#3rdInternet, #Networks, #Design").addClass("active") : false;
			
			pt === "/vpnConnection" ? $("#3rdVPN, #Networks, #Design").addClass("active") : false;
			pt === "/DNSZone" ? $("#3rdDNS, #Networks, #Design").addClass("active") : false ;
			pt === "/endPoint" ? $("#3rdEnd, #Networks, #Design").addClass("active") : false ;
			pt === "/virtualNetworkGatway" ? $("#3rdVirtual, #Networks, #Design").addClass("active") : false;
			
			pt === "/securityGroup" ? $("#3rdSecurity, #Networks, #Design").addClass("active") : false;
			pt === "/routeTable" ? $("#3rdRoute, #Networks, #Design").addClass("active") : false ;
			pt === "/deployTemplate" ? $("#Templates, #Deploy, #3rd0View, #design_0, #deploy0, #depInfra1").addClass("active") : false ;
		  (pt === "/master_2") ? $("#Templates, #Deploy, #3rd0View, #design_0, #deploy0, #depInfra0").addClass("active") : false ;
		  (pt === "/designDevOpsTemp" && location.search=="") ? $("#Design, #design_1").addClass("active") : false ;
		  /*(pt === "/master_2" && location.search=="?design")
		     ? (function(){
		          $("#Design, #deploy1").addClass("active");
		          $('#view_temp section ul li:nth-child(2)')[0].click();
		          $('#view_temp section')[0].remove();
		          $('#view_temp header,#themeNav ').remove();
		        })()
		     : false ;*/
			pt === "/create_template" ? $("#Templates, #Design, #3rd1Create").addClass("active") : false ;
			pt === "/addData" ? $("#Templates, #Design, #3rd2addData").addClass("active") : false ;
			pt === "/manageEnv" ? $("#Manage").addClass("active") : false ;
			
			pt === "/nodeTemplates" ? $("#p0Node, #3rd0Single, #Deploy","#design_0").addClass("active") : false ;
			pt === "/accountTemplates" ? $("#p1Templates, #3rd0Single, #Deploy").addClass("active") : false ;
			pt === "/assignNode" ? $("#p1Templates, #3rd0Single, #Deploy").addClass("active") : false ;
	},
	pagNav:function(){
		$("#design_1").click(function(){location.href = location.origin+"/designDevOpsTemp";});
		
		$("#deploy0").click(function(){location.href = location.origin+"/master_2";});
		$("#deploy1, #depInfra0").click(function(){location.href = location.origin+"/viewDevOpsTemplate";});
		$("#depInfra2").click(function(){location.href = location.origin+"/nodeTemplates";});
		$("#deploy2").click(function(){location.href = location.origin+"/viewProductTemplate";});
		$("#deploy3").click(function(){location.href = location.origin+"/nodeTemplates";});
		
		$('#depDevTe0').click(function(){location.href = location.origin+"/viewDevOpsTemplate";});
		$('#depDevTe1').click(function(){location.href = location.origin+"/viewDevOpsTemplate";});
		$('#depDevTe2').click(function(){location.href = location.origin+"/viewDevOpsTemplate";});
		
		$('#creDevTem0').click(function(){location.href = location.origin+"/vpc";});
		$('#creDevTem1').click(function(){location.href = location.origin+"/create_devOps_template";});
		//$('#creDevTem2').click(function(){location.href = location.origin+"/viewProductTemplate";});
		
		
		$('#Accounts').click(function(){location.href = location.origin+"/accounts";});
		
		$('#Design').click(function(){location.href = location.origin+"/vpc";});
		$('#Networks').click(function(){location.href = location.origin+"/vpc";});
		$('#Templates').click(function(){location.href = location.origin+"/create_template";});
		//$('#DevOps').click(function(){location.href = location.origin+"/designDevOpsTemp";});
		$('#Manage').click(function(){location.href = location.origin+"/manageEnv"});
		$('#3rdVPC').click(function(){location.href = location.origin+"/vpc"});
		$('#3rdKey').click(function(){location.href = location.origin+"/keyPair"});
		
		$('#3rdVPN').click(function(){location.href = location.origin+"/vpnConnection"});
		$('#3rdLocal').click(function(){location.href = location.origin+"/localNetworkGateWay"});
		$('#3rdInternet').click(function(){location.href = location.origin+"/internetGateWay"});
		
		$('#3rdDNS').click(function(){location.href = location.origin+"/DNSZone"});
		$('#3rdEnd').click(function(){location.href = location.origin+"/endPoint"});
		$('#3rdVirtual').click(function(){location.href = location.origin+"/virtualNetworkGatway"});
		
		$('#3rdSubnet').click(function(){location.href = location.origin+"/subnet"});
		$('#3rdSecurity').click(function(){location.href = location.origin+"/securityGroup"});
		$('#3rdRoute').click(function(){location.href = location.origin+"/routeTable"});
		
		$('#3rd0View').click(function(){location.href = location.origin+"/master_2"});
		$('#3rd1Create').click(function(){location.href = location.origin+"/create_template"});
		$('#3rd2addData').click(function(){location.href = location.origin+"/addData"});
		
		//$('#Deploy, #p0Node').click(function(){location.href = location.origin+"/nodeTemplates"});
		$('#Deploy, #p0Node').click(function(){location.href = location.origin+"/master_2"});
		$('#p1Templates').click(function(){location.href = location.origin+"/accountTemplates"});
	},
	lnav: document.getElementById("leftNavigation"),
	aboutProject:function(){
		this.lnav.innerHTML+='<div class="header-sec">\
							<header role="header">\
								<a href="#"> <img src="images_1/RapidCloud_Logo.png" /> </a> <span class="header-txt"> Manage, Govern and Optimize your Cloud Environments</span>\
								<img src="images_1/Sonata_Logo.png" class="second-logo"/>\
								<ul>\
									<li><span class="glyphicon glyphicon-bell"></span></li>\
									<li><span class="glyphicon glyphicon-envelope"></span></li>\
									<li><span class="glyphicon glyphicon-question-sign"></span></li>\
									<li><span class="glyphicon glyphicon-cog"></span></li>\
								</ul>\
							</header>\
						</div>\
					<div id="menuBox">\
					  <a href="#" class="moreMenu" onclick="menU.moreMenu(this)"><i class="fa fa-bars fa-2x"></i></a>\
					  <section role="aboutProject" style="display:none;">\
						<!-- <br>\
						<img src="images_1/profile_pic.png" />\
						<br> -->\
						<h1>Andrew <span class="glyphicon glyphicon-chevron-down arrowRed"></span></h1>\
					  </section>\
					  <menu role="profileLinks">\
						<ul>\
							<!-- <li><a href="/myAccount">My Account</a></li>\
							<li><a href="/login">Sign Out</a></li>-->\
						</ul>\
					  </menu>\
					  <nav role="naviGation">\
						<ul id="navDiv"></ul>\
					  </nav></div>';
		//this.createParentView();
		this.getRoles();
	},
	moreMenu:function(ev){
		if(this.open){
			this.lnav.style.width="5.66667%"
			$('[role="contentArea"]').css("width", "94.333333%");
			$(".link_Prime span.myTe").css("display", "none");
			this.open = false;
		}else{
			this.lnav.style.width="";
			$('[role="contentArea"]').css("width", "");
			$(".link_Prime span.myTe").css("display", "");
			this.open = true;
		}
	},
	openMenu:function(){
		var lnav = document.getElementById("leftNavigation");
			lnav.style.display="block";
	},
	assignIcons:function(){
	}
}
/*
function theme(ev, themeNum){
	if(themeNum == 1){
		menU.aboutProject();
	}else if(themeNum == 2){
		
	}
}*/
/*
var lnav = document.getElementById("bg");
	lnav.innerHTML +="<div style='position:fixed; top:0px; right:0px;background-color:#fff'>" +
			"<a href='#' onclick='theme(this,1)'>UI One</a> | " +
			"<a href='#' onclick='theme(this,2)'>UI Two</a></div>";
*/

$('#Design').click(function(){location.href = location.origin+"/vpc";});
$('#Networks').click(function(){location.href = location.origin+"/vpc";});
$('#Templates').click(function(){location.href = location.origin+"/master_2";});
$('#Manage').click(function(){location.href = location.origin+"/manageEnv"});
$('#3rdVPC').click(function(){location.href = location.origin+"/vpc"});
$('#3rdSubnet').click(function(){location.href = location.origin+"/subnet"});
$('#3rdKey').click(function(){location.href = location.origin+"/keyPair"});

$('#3rdVPN').click(function(){location.href = location.origin+"/vpnConnection"});
$('#3rdLocal').click(function(){location.href = location.origin+"/localNetworkGateWay"});
$('#3rdInternet').click(function(){location.href = location.origin+"/internetGateWay"});

$('#3rdDNS').click(function(){location.href = location.origin+"/DNSZone"});
$('#3rdEnd').click(function(){location.href = location.origin+"/endPoint"});
$('#3rdVirtual').click(function(){location.href = location.origin+"/virtualNetworkGatway"});

$('#3rdSecurity').click(function(){location.href = location.origin+"/securityGroup"});
$('#3rdRoute').click(function(){location.href = location.origin+"/routeTable"});

//$(document).on('#Test', click function(){alert("fd"); location.href = "http://172.23.8.11"});


$(document).on("click", "#Test", function (){
	window.open("http://172.23.8.11", "_blank");
});

// hideMenu


$("#cTA_Next").click(function(){
	var paTh = location.pathname;
	if(sessionStorage.getItem("chooseUrCloud") == "AWS"){
		console.log("aws");
		paTh == "/vpc" ? location.href = location.origin+"/subnet" : true;
		paTh == "/subnet" ? location.href = location.origin+"/securityGroup" : true;
		paTh == "/securityGroup" ? location.href = location.origin+"/routeTable" : true;
		paTh == "/routeTable" ? location.href = location.origin+"/vpnConnection" : true;
		paTh == "/vpnConnection" ? location.href = location.origin+"/keyPair" : true;
		paTh == "/keyPair" ? location.href = location.origin+"/internetGateWay" : true;
		paTh == "/internetGateWay" ? location.href = location.origin+"/endPoint" : true;
	}else if(sessionStorage.getItem("chooseUrCloud") == "Azure"){
		console.log("Azure");
		paTh == "/vpc" ? location.href = location.origin+"/subnet" : true;
		paTh == "/subnet" ? location.href = location.origin+"/securityGroup" : true;
		paTh == "/securityGroup" ? location.href = location.origin+"/routeTable" : true;
		paTh == "/routeTable" ? location.href = location.origin+"/localNetworkGateWay" : true;
		paTh == "/localNetworkGateWay" ? location.href = location.origin+"/DNSZone" : true;
		paTh == "/DNSZone" ? location.href = location.origin+"/endPoint" : true;
		paTh == "/endPoint" ? location.href = location.origin+"/virtualNetworkGatway" : true;		
	}
});