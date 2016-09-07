

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

$('#Templates').click(function(){
	$("#view_temp").show();
	//$("#single_node").hide();
});
var accountName,projName,prodName;
function getStorageData(){
	accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
	//console.log(accountName+projName+prodName);
	 var theDiv = document.getElementById("data");
		theDiv.innerHTML += accountName+">>"+projName+">>"+prodName; 
}

var myTemplate_images = [];
$(function(){		
		$.getJSON( "http://172.29.59.62:3000/my_view", function( data ) {	
		              var result=data;
		              var tempName = [], region = [], tempType = [], nodes = [], cloud = [];
		              getStorageData();
		              var acc = localStorage.getItem("Account");
		              var prj = localStorage.getItem("ProjectName");
				for(var j=0;j<result.length;j++)
					{		
					if(result[j].Account_Name == acc && result[j].Project_Name == prj)
						{
							//console.log(j);
							//console.log(result[j].Template_name);
							tempName[j] = result[j].Template_name;
							region[j] = result[j].Region;
							tempType[j] = result[j].Template_type;
							nodes[j] = (result[j].Instances).length;
							cloud[j] = result[j].Cloud;
						}else{console.log("No");}
					}
				
				 for(var j=0;j<cloud.length;j++)
				 {
				    if(cloud[j] == "AWS")
				    	{
				    		myTemplate_images.push("AWS_Logo.png");
				    	}
				    else
				    	{
				    		myTemplate_images.push("Windows_Azure_Logo.png");
				    	}
				 }	
				
				assign_myTemplate(tempName,region,tempType,nodes,cloud);
				myTemp_details(result);
			});
});	
		
$(function(){
		$.getJSON( "http://172.29.59.62:3000/gen_view", function( data ) {	
			var result1=data;
			//console.log(data);
			var tempName1 = [], region1 = [], tempType1 = [], nodes1 = [];
			var stg = localStorage.getItem("Account");
			var prj = localStorage.getItem("ProjectName");
			for(var k=0;k<result1.length;k++)
				{	
				//console.log(k);
				if(result1[k].Account_Name == stg && result1[k].Project_Name == prj)
					{
						//console.log(k);
						//console.log(result1[k].Template_name);
						tempName1[k] = result1[k].Template_name;
						region1[k] = result1[k].Region;
						tempType1[k] = result1[k].Template_type;
						nodes1[k] = (result1[k].Template_Role).length;
					}else{console.log("no")}
				}
			//console.log(tempName1+tempName1.length);
			assign_generic(tempName1,region1,tempType1,nodes1);
			generic_details(result1);			
		});
});

function assign_myTemplate(tempName,region,tempType,nodes,cloud){
	var qu = document.querySelector("[role='template']");
	for(var i=0;i<=tempName.length-1;i++){
		if(tempName[i] != undefined){
						qu.innerHTML+=
						            "<div id='gen_div' class='col-xs-12 col-sm-4 col-md-4 col-lg-3 "+tempType[i]+" '>"
									+"<article class='flip'>"
									+"<div class='card'>"
									+"<div class='face front'>"
									+"<figure><img src='images_1/"+ myTemplate_images[i] +"' /></figure>"
									+"<summary>"+ tempName[i] +"</summary>"
									+"<ul>"
									+"<li>Cloud: "+cloud[i]+"</li>"
									+"<li>Region: "+region[i]+"</li>"
									+"<li>Type: <span>"+tempType[i]+"</span></li>"
									+"<li>Node: "+nodes[i]+"</li>"
									+"</ul></div>"
									+"<div class='face back' id='"+tempName[i]+"'><span class='"
									+"glyphicon glyphicon-remove-circle closeTemplate'></span>Nodes:<input class='inPut' value='"+nodes[i]+"' type='text' disabled='disabled' /><br><br><b>Role Deatails</b>" +
											"<table border='0' class='my_info'><thead><tr><th>Node </th><th>Role </th></tr></thead><tbody></tbody></table>"
									+"<br><input type='button' value='Modify'/>&nbsp;<input type='button' value='Deploy' onclick='pvdSpec_function("+tempName[i]+")' />"
									+"&nbsp<input type='button' value='Add DevOps' title='"+tempName[i]+"' onclick='addDevOps(this)'/>"
									+"</div></div></article>";
						}
	}
	var i=1;
	$('.flip').click(function(event){
		//console.log(this);
		event.stopPropagation();
		$(this).css({"z-index":i++});
		$('.card').removeClass('flipped');
		$(this).find('.card').addClass('flipped');
		//return false;
	});
	$(".closeTemplate").click(function(event){
		//console.log(this);
		event.stopPropagation();
		$('.card').removeClass('flipped');
		//$(".card").removeClass();
	})
}
$('#Templates').click(function(){
	$("[role='template']").show();
});

function pvdSpec_function(myT){	
	var template = myT.id;
	//alert("Disabled the functions....!");
	console.log(myT);
	location.href="//172.29.59.62:3000/deployTemplate"+"?data="+"multi"+"?data2="+template;
}	

$('#manageEnv').click(function(){
	location.href="//172.29.59.62:3000/manageEnv";
})
function addDevOps(ev){	
	localStorage.setItem("InfraId",ev.title)
	location.pathname="/devopsTemp"
}

function myTemp_details(result){
	for (var i=0;i<result.length;i++)
	{	
		var tr;
		var tag=result[i].Template_name;
		var te_nodes1=result[i].Instances;
		for(var k=0;k<te_nodes1.length;k++)
			{				
				tr = $('<tr/>');
	            tr.append("<td>" + te_nodes1[k].node + "</td>");
	            tr.append("<td>" + te_nodes1[k].role + "</td>");			           
	            $('div#'+tag+" "+'table.my_info').append(tr);
			}
	}
}

function assign_generic(tempName1,region1,tempType1,nodes1,cloud1){
	var qu1 = document.querySelector("[role='template']");
	var img=["generic_Template.png"];
	for(var i=0;i<=tempName1.length-1;i++){
		if(tempName1[i] != undefined){
			//console.log(tempName1[i]);
				qu1.innerHTML+=
				            "<div id='gen_div' class='col-xs-12 col-sm-4 col-md-4 col-lg-3 "+tempType1[i]+" '>"
							+"<article class='flip'>"
							+"<div class='card'>"
							+"<div class='face front'>"
							+"<figure><img src='images_1/"+ img[0] +"' /></figure>"
							+"<summary>"+ tempName1[i] +"</summary>"
							+"<ul>"
							+"<li>Type: <span>"+tempType1[i]+"</span></li>"
							+"<li>Roles: "+nodes1[i]+"</li>"
							+"</ul></div>"
							+"<div class='face back' id='"+tempName1[i]+"'><span class='"
							+"glyphicon glyphicon-remove-circle closeTemplate'></span>Roles:<input class='inPut' value='"+nodes1[i]+"' type='text' disabled='disabled'/><br><br><b>Role Details</b>"+
							"<table border='0' class='gen_info'><thead><tr><th>Role </th></tr></thead><tbody></tbody></table>"
							+"<br><input type='button' value='Modify' />&nbsp;<input type='button' onclick='genereic_function("+tempName1[i]+")' value='Deploy' />"
							+"</div></div></article>";
				}
		}

		var i=1;
		$('.flip').click(function(event){
			//console.log(this);
			event.stopPropagation();
			$(this).css({"z-index":i++});
			$('.card').removeClass('flipped');
			$(this).find('.card').addClass('flipped');
			//return false;
		});
		$(".closeTemplate").click(function(event){
			//console.log(this);
			event.stopPropagation();
			$('.card').removeClass('flipped');
			//$(".card").removeClass();
		})
}

function genereic_function(genT){
	//alert("Disabled the functions....!");
	var genTemplate = genT.id
	location.href ="http://172.29.59.62:3000/assignNode"+"?data="+genTemplate;
}

function generic_details(result1){
	for (var i=0;i<result1.length;i++)
	{	
		var tr;
		var tag=result1[i].Template_name;
		var te_nodes1=result1[i].Template_Role;
		for(var k=0;k<te_nodes1.length;k++)
			{				
				tr = $('<tr/>');	           
	            tr.append("<td>" + te_nodes1[k].role + "</td>");			           
	            $('div#'+tag+" "+'table.gen_info').append(tr);
			}
	}
}

$('input#search').keyup(function() {
 
	var filter = $(this).val();
	var count = 0;
	$('div#gen_div').each(function(){		
		var style = $(this).css('display');
		if(style == "block")
		{						
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {        	
	            $(this).fadeOut();
	        } else {        	
	            $(this).show();            
	        }
		}     
    });	
});

$('button#create_temp').click(function(){
	location.href="http://172.29.59.62:3000/create_template"
});

var fadeSpped="speed";

function aTemp(){
	document.getElementById("search").value="";
	var showThis = document.querySelectorAll(".My, .Generic, .System");
	$(showThis).stop().show(fadeSpped);
}

function mTemp(){
	document.getElementById("search").value="";
	var hideThis = document.querySelectorAll(".Generic, .System");
	var showThis = document.querySelectorAll(".My");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}
function gTemp(){
	document.getElementById("search").value="";
	var hideThis = document.querySelectorAll(".My, .System");
	var showThis = document.querySelectorAll(".Generic");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}

function sTemp(){
	document.getElementById("search").value="";
	var hideThis = document.querySelectorAll(".My, .Generic");
	var showThis = document.querySelectorAll(".System");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}
function aTemp1(){
	document.getElementById("search1").value="";
	var showThis = document.querySelectorAll(".AWS, .Azure");
	$(showThis).stop().show(fadeSpped);
}

function mTemp1(){
	document.getElementById("search1").value="";
	var hideThis = document.querySelectorAll(".Azure");
	var showThis = document.querySelectorAll(".AWS");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}
function gTemp1(){
	document.getElementById("search1").value="";
	var hideThis = document.querySelectorAll(".AWS");
	var showThis = document.querySelectorAll(".Azure");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}

$(document).ready(function(){	
	$("#single_node").hide();	
	$("[name='filter']").parent().addClass("normalOp");
	$("[value='ATemplates']").parent().addClass("selectedOp");
	$("[name='filter']").click(function(){
		$(".selectedOp").removeClass().addClass("normalOp");
		$(this).parent().addClass("selectedOp");
		var valu = $(this).val();
		console.log(valu);
		valu == "ATemplates"?aTemp():false;
		valu == "MTemplates"?mTemp():false;
		valu == "GTemplates"?gTemp():false;
		valu == "STemplates"?sTemp():false;
	});	
	$("[name='filter1']").parent().addClass("normalOp");
	$("[value='ATemplates']").parent().addClass("selectedOp");
	$("[name='filter1']").click(function(){
		$(".selectedOp").removeClass().addClass("normalOp");
		$(this).parent().addClass("selectedOp");
		var valu = $(this).val();
		console.log(valu);
		valu == "ATemplates"?aTemp1():false;
		valu == "MTemplates"?mTemp1():false;
		valu == "GTemplates"?gTemp1():false;		
	});
});













