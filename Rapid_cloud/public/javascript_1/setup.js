/**
 * New node file
 */
_ip = "http://172.29.59.62:3000";
$(document).ready(function(){

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
});
var account = "account";
var globalData;
var gdata = [];
$(function(){
	$.getJSON('http://172.29.59.62:3000/accountDetails', function(data){
		console.log(data);
		globalData = data;
		for(var i =0; i < data.data4.length; i++){
			var tT = document.getElementById("accounts_ID");
				tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+data.data4[i].accountid+'</dd></dl></li>';
		}
	})
})

function selectOpt(event, idn, con){
	var aImage = event.getElementsByTagName("dt")[0].innerHTML;
	var inn = event.getElementsByTagName("dd")[0];
	var aTex = $(inn).text();
	var v = event.parentNode;
	var vb = v.parentNode;
	var idd = vb.id;
	//alert(idd);
	if(idd == "typeDro1"){showProject(aTex);}
	if (idd == "typeDro2"){accEnv(aTex);}
	if (idd == "typeDro4"){showEnvNodes(aTex);}
	if (idd == "typeDro5"){devData(aTex);}
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
}


function showProject(value){
	for(var i =0; i < globalData.data2.length; i++){
		if(globalData.data2[i].accountid == value){
			var tT = document.getElementById("Project_ID");
			tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+globalData.data2[i].p_name+'</dd></dl></li>';
			}
		}
}

function accEnv(requestId){
	var val = requestId;
	var data = {};	data.id = val;
	console.log(data);
	 $.ajax({
		type: 'POST',
		jsonpCallback: "callback",
		datatype: 'jsonp',
		data: data,
		url: _ip +'/filter_env',
		success: function(data, textStatus){
			console.log(data);
			for (var i=0; i<data.length; i++){				
					var tT = document.getElementById("Environment_ID")
					tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].env_name+'</dd></dl></li>';				
			}
		},
		error: function (xhr, status, error){
		   console.log('Failure');
		},
	  });
}

function showEnvNodes(enName){
	var envName = enName;
	var prName = document.getElementById("typeDro2").innerText;
	//alert(envName+prName);
	var data = {};
	data.env_name = envName;
	data.proj_id = prName ;
	var self = this;
	$.ajax({
		type: 'POST',
		jsonCallback: "callback",
		datatype: "jsonp",
		data: data,
		url: _ip+'/node_details',
		success: function(data, textStatus){
			console.log(data);
			gdata = data;
			for (var i=0; i<data.length; i++){				
				var tT = document.getElementById("ft_ID1")
				tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].role+'</dd></dl></li>';				
				var tT = document.getElementById("ft_ID2")
				tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].role+'</dd></dl></li>';
				//var tT = document.getElementById("ft_ID3")
				//tT.innerHTML+='<li onclick="selectOpt(this,0,'+account+')" class="Dev"><dl><dt></dt><dd class="va">'+data[i].role+'</dd></dl></li>';
			}
		},
		error: function(xhr, status, error){
			console.log('Failure');
		},
	});
	
}

function devData(techName){
	//alert(techName);
	console.log(gdata);
	for(var i=0; i<gdata.length; i++){
		
		
	}
}

function deployDevops(){
	//alert("Inside function");
	var data ={};
	data.a = "devops";
	$.ajax({
		type: 'POST',
		jsonCallback: "callback",
		datatype: "jsonp",
		data: data,
		url: _ip+'/testscript',
		success: function(data){
			console.log(data);
			location.href="//172.29.59.62:3000/devops";
		},
		error: function(xhr, status, error){
			console.log('Failure');
		},
	});
	
}
		