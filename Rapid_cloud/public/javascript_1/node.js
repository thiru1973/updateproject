var qu1 = document.querySelector("[role='template1']");
var myTemplate_images1 = [];
var inst_type = [];
var cloud = [];
var vcpu= [];
var ram = [];
var storage = [];
var pvd_aws = [];
var pvd_azure =[];
var inst_id = [];

window.onload = function(){
	get_aws_region();
	get_azure_region();
	getDetails();
	
}

function get_aws_region(){
	var data = {};
	var pvd_id = "AWS";
	data.pname = pvd_id;
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: 'http://172.29.59.65:3000/temp_region',
        success: function(data, textStatus){
        	
        	pvd_aws = data;
        	//console.log(pvd_aws);
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
}

function get_azure_region(){
	var data = {};
	var pvd_id = "Azure";
	data.pname = pvd_id;
	$.ajax({
        type: 'POST',
   	 	jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
        url: 'http://172.29.59.65:3000/temp_region',
        success: function(data, textStatus){
        	pvd_azure = data;
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
}


function getDetails(){
//$('#Node').click(function(){
	//$("#view_temp").hide();
	//$("#single_node").show();
	//$("[role='template1']").show();
	var aws_count = 0, azure_count = 0;
	$.getJSON( "http://172.29.59.65:3000/all_nodes", function( data ) {
		for(var i=0;i<data.length;i++)
			{
				inst_type[i] = data[i].inst_type;
				cloud[i] = data[i].prov_id;
				vcpu[i] = data[i].vcpu;
				ram[i] = data[i].memory_gib;
				storage[i] = data[i].storage;
				inst_id[i] = data[i].inst_id;
			}		
		 for(var j=0;j<inst_type.length;j++)
		 {
		    if(cloud[j] == "AWS")
		    	{
		    		myTemplate_images1.push("AWS_Logo.png");
		    		aws_count = aws_count+1;
		    		
		    	}
		    else
		    	{
		    		myTemplate_images1.push("Windows_Azure_Logo.png");
		    		azure_count = azure_count+1;
		    	}
		 }		
			show_nodes();
			assign_region(inst_id, aws_count, azure_count);
			
	});		
//});
}

function show_nodes(){	
	$(qu1).empty();
	for(var i=0;i<=inst_type.length-1;i++){		
	qu1.innerHTML+=
	            "<div  id='node_div' class='col-xs-12 col-sm-4 col-md-4 col-lg-3 "+cloud[i]+" '>"
				+"<article class='flip'>"
				+"<div class='card'>"
				+"<div class='face front'>"
				+"<figure><img src='images_1/"+ myTemplate_images1[i] +"' /></figure>"
				+"<summary>"+ inst_type[i] +"</summary>"
				+"<ul>"
				+"<li>Cloud: "+cloud[i]+"</li>"				
				+"<li>Type: <span>"+inst_type[i]+"</span></li>"				
				+"</ul></div>"
				+"<div class='face back' id='"+inst_type[i]+"'><span class='"
				+"glyphicon glyphicon-remove-circle closeTemplate'></span>"/*"Node:<input class='inPut' value='"+inst_type[i]+"' type='text' disabled='disabled' />"*/ 
				+"<div id='noDEpullL' class='pull-left'><span></span>"
				+"<label id='' class='labelTemp'><span>Region </span>"
				+"<a href='#' data-toggle='tooltip' title='' data-original-title=''><span class='infoSignColor glyphicon glyphicon-info-sign'></span></a>"
				+"</label>"
				+"<div id='sel"+inst_id[i]+"' class='clickRole borderNoN'><span>Select</span><ul id='sels"+inst_id[i]+"' class='dropDown'><li onclick='selectOpt(this,0)' class='Dev'><dl><dt></dt><dd class='va'>Dev</dd></dl></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span>"
				+"</div></div>"
				+"<table>"
				+"<tr><th>Node Details</th></tr>" 
				+"<tr><th>VCPU:</th><td> "+vcpu[i]+"</td></tr>"				
				+"<tr><th>RAM:</th><td> "+ram[i]+" </td></tr>"
				+"<tr><th>Storage:</th><td> "+storage[i]+" </td></tr>"
				+"</table>"
				+"<br><input id = '"+inst_type[i]+'~'+cloud[i]+'~'+inst_id[i]+"'type='button' name='Node_deploy' value='Deploy' onclick='nodeDeploy_function(this.id)' />"
				+"</div></div></article>";
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
	
		/*$(".clickRoleSing").click(function(){
			$(this).find(".dropDown").slideToggle();
		})*/
		$(".clickRole").click(function(){
			$(this).find(".dropDown").slideToggle();
		})
}


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
		//creAl.innerHTML="<span style='color: red' > * </span >";
		creAl.id=addId;
		creAl.className=addClass;
		apch.appendChild(creAl);
	}
};

DropdownConst.prototype.appendData = function(name,appentoWhat){	
	var epn = document.getElementById(appentoWhat);
	//console.log(epn);
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
	re.innerHTML+="<ul id='"+this.addId+"s' class='dropDown'>"
			+"</ul>"
	var ulI = document.getElementById(this.addId+"s");
	for(var i=0;i<=this.dataSt.length-1;i++){
		ulI.innerHTML +="<li onclick='selectOpt(this,"+i+")' class='"+this.dataSt[i]+"'>"
						+"<dl>"
						+"<dt></dt>"
						+"<dd class='va'>"+this.dataSt[i]+"</dd>"
						+"</dl>"
						+"</li>"
						
	}
};

function selectOpt(ev, idn){	
	var aImage = ev.getElementsByTagName("dt")[0].innerHTML;
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	 var v = ev.parentNode;
	 var vb = v.parentNode;
	 var idd = vb.id
	 console.log(idd);	 
	 document.getElementById(idd).style.border="none";
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
}

function assign_region(inst_id, aws, azure){
	//console.log(inst_id+aws+azure);
	//console.log(pvd_aws[0].region_name);
	//console.log(pvd_azure);
	var reg1 = [], reg2 = [];
	//Loop to get the aws regions and store it in reg1 = [] variable
	for(var i=0;i<pvd_aws.length;i++){
		reg1[i] = pvd_aws[i].region_name;
		}
	//Loop to append the region data to all aws instances 
	for(var j=0;j<aws;j++){
		var appendD = new DropdownConst();
   	 	appendD.appendData(reg1,"sels"+j+"");
	}
	//Loop to get azure regions and store it in reg2 = [] variable
	for(var k=0;k<pvd_azure.length;k++){
		reg2[k] = pvd_azure[k].region_name;
	}
	for(var l=aws;l<aws+azure;l++){
		var appendD = new DropdownConst();
		appendD.appendData(reg2,"sels"+l+"");
	}
	
}
$('input#search1').keyup(function() {
    
	var filter1 = $(this).val();	
	var count = 0;
	$('div#node_div').each(function(){
		var style1 = $(this).css('display');
		if(style1 == "block")
		{		
			count++;
			if ($(this).text().search(new RegExp(filter1, "i")) < 0) {        	
	            $(this).fadeOut();
	        } else {        	
	            	$(this).show();            
	        		}
		}		
    });	
});



function nodeDeploy_function(value){
	var att = value.split('~');
	//alert(att[0]);
	console.log(att[2]);
	var str1 = "sel"
	var id = str1.concat(att[2]);
	console.log(id);
	var region = document.getElementById(id).innerText;
	if(region == "Select"){
		document.getElementById(id).style.border="thin dashed #0099FF";
		return;
	}
	location.href="//172.29.59.65:3000/deployTemplate"+"?data="+"single"+"?data2="+att[0]+"?data3="+att[1]+"?data4="+region;

}