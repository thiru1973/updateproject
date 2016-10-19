$(document).ready(function(){
	$(".alert").hide();	
	$("[role='profileLinks']").hide();
	$("[role='aboutProject']").click(function(){
		$(".arrowRed").toggleClass('rotate', 1000).promise().done(function(){
			$("[role='profileLinks']").stop().slideToggle();
		});
	});
	
	/* $("[role='naviGation'] ul li dl").hide();
	$("[role='naviGation'] ul li:first-child dl").addClass("show").show();
	
	$("[role='naviGation'] ul li").click(function(event){
		event.stopPropagation();
		//closeOldmenu();
		console.log("Li clicked");
		$(this).children("dl").stop().slideToggle();
		$(this).children("a").toggleClass("activeTab");
		$(this).children("a").find(".arrowGray").toggleClass("rotateGray");
		$(this).children("dl").toggleClass("show");
	}); */
	function closeOldmenu(){
		$(".arrowGray").removeClass("rotateGray");
		$(".show").stop().slideUp();
		$(".show").removeClass();
		$(".activeTab").removeClass();
		console.log("Closed Tab");
	}	
	
	/* $("[role='naviGation'] ul li dl dt").click(function(event){
		event.stopPropagation();
		$("[role='naviGation'] ul li dl dt").removeClass("activeLink");
		$(this).addClass("activeLink");
	}); */
	
	$(window).on("load resize",function(e){
		var h = $('[role="header"]').outerHeight(true);
				$('[role="contentArea"] header').height(h-25);
	});
	
	$(".link_Prime").hover(function(){
		$(this).find(".howMe").stop().css({display:"block"});
	},function(){
		$(this).find(".howMe").stop().css({display:"none"});
	});
});
$(document).on('click', 'li#Templates', function(){ 
	
});

var menU = {
	open:true,
	close:0,	
	primaryLins:{
		level_1:["Dashboard","Design","Deploy","Manage","Monitor","Projects"],
		level_2:["Templates","Node","Blueprint","Networks","Load Balancer"],
		level_5:["Setup Devops"],
		
		level_1_Icons:["fa-tachometer","fa-paint-brush","fa-desktop","fa-hourglass-half","fa-eye","fa-th-list"],
		//Dashboard:{1:"Templates", 2:"Node", 3:"Blueprint", 4:"Networks", 5:"Load Balancer"},
		Design:{1:"Option 1", 2:"Option 2", 3:"Option 3"},
	},
	createParentView: function(){
		var navv = document.getElementById("navDiv"), i;
		for(i=0; i<= this.primaryLins.level_1.length-1; i++ ){
			navv.innerHTML+='<li class="link_Prime" id='+this.primaryLins.level_1[i]+'>\
							<ul class="howMe" id="link_'+i+'"></ul>\
							<i class="fa fa-2x '+this.primaryLins.level_1_Icons[i]+'"></i><span class="myTe">'+this.primaryLins.level_1[i]+'</span></li>';
		}
		this.createSubView();
	},
	createSubView:function(){
		var subL0 = document.getElementById("link_1");
		for(i=0; i<= this.primaryLins.level_2.length-1; i++ ){
			subL0.innerHTML+='<li id='+this.primaryLins.level_2[i]+'>'+this.primaryLins.level_2[i]+'</li>';
		}
		this.createSubView1();
	},
	
	createSubView1:function(){
		var subL1 = document.getElementById("link_5");
		for(i=0; i<= this.primaryLins.level_5.length-1; i++ ){
			subL1.innerHTML+='<li id='+this.primaryLins.level_5[i]+'>'+this.primaryLins.level_5[i]+'</li>';
		}
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
						<br>\
						<img src="images_1/profile_pic.png" />\
						<br>\
						<h1>Andrew  <span class="glyphicon glyphicon-chevron-down arrowRed"></span></h1>\
						<br>\
					  </section>\
					  <menu role="profileLinks">\
						<ul>\
							<li>My Account</li>\
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
menU.aboutProject();

$('#Templates').click(function(){
	//alert("Hello");
	location.href = "http://172.29.59.62:3000/master_2";
});

$('#Manage').click(function(){
	//alert("Manage function");
	location.href = "http://172.29.59.62:3000/manageEnv"
});
$('#Dashboard').click(function(){
	location.href = "http://172.29.59.62:3000/accounts"
})

$('#Setup').click(function(){
	location.href = "http://172.29.59.62:3000/createProject"
})











