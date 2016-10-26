/* ************************************
	Create by: Sernapally Anurag
	Created on: 3rd August, 2016
*************************************** */

/* Global
************************************************************************** */
var _ip = "http://172.29.59.62:3000";

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


/* Fetch Repository Credentials -------------- Begin
************************************************************************** */
var obj={}

$(".buttonSave").click(function(){
	var userName = document.getElementById("user_name").value;
	var pass = document.getElementById("pass").value;
	var oauth = document.getElementById("o_token").value;
	//alert(pass+oauth);
	var data = {};
	
	data.username = userName;
	data.password = pass;
	data.token = oauth;
	
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: _ip+'/repoLogin',
        success: function(data, textStatus){
			console.log(data);
			var cwh = document.getElementById("creatWebHooks");
			
				for(var i=0; i<data.length; i++){
					cwh.innerHTML+='<li style="padding:0px;width:inherit"><input type="radio" id="'+data[i]+'" name="repositories" onchange="check(this)" /> '+data[i]+'</li>';
					//obj[data[i]] = false;
				}
				console.log(obj);
			},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
});

function check(ev){	
	//obj[ev.id] == false ? obj[ev.id] = true : obj[ev.id] = false;
	obj.repName = ev.id;
	console.log(obj.repName)
}

/* Fetch Repository Credentials -------------- End
************************************************************************** */


/* Create Webhooks Pop-up -------- Begin
************************************************************************** */

$(".popupData").hide();
	$(".popData").hide();
	$(".buttonEvents").click(function(){		
		$(".popupData").show();
		$(".popData").show();
	});
	
	$(".close, .cancelPoup").click(function(){
		$(".popupData").hide();
		$(".popData").hide();
		$("#createAccPOP").hide();
	})

	
$(".popupData").hide();
	$(".popData1").hide();
	$(".selectRepos").click(function(){
    $(".popupData").show();
	$(".popData1").show();
	});
	
	$(".close, .cancelPoup").click(function(){
		$(".popupData").hide();
		$(".popData1").hide();
		$(".popDataClsrv").hide();
		$("#createAccPOP").hide();
	})
	

$("#addRepo").click(function(){
	
	//var selectedRepos = document.getElementById("checkbox");
	console.log(obj);
	var ar_data = [];
	var data = obj;
	//for(i in obj){
		//console.log(obj[i] === false);
		//if(obj[i] === true){
			//console.log(Object.key(obj))
			//ar_data.push(i);
			//console.log(i);
		//}
	//}
	//console.log(ar_data)
	//data.ar_data;
	//console.log(data.length);
	
	$.ajax({
		type: 'POST',
		jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
		url: _ip+'/repoWebhook',
		 success: function(data, textStatus){
			console.log(data);
		 },
		  error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
	});
	
});
	
	
/* Create Webhooks Pop-up -------- End
************************************************************************** */
