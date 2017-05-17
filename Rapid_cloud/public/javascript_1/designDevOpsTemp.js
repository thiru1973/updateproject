var _ip = "http://172.29.59.65:3000";
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
});
var accountName,projName,prodName;
function getStorageData(){
	accountName = localStorage.getItem("Account")
	,projName = localStorage.getItem("ProjectName")
	,prodName = localStorage.getItem("ProductName");
}


var myTemplate_images = [];
$(function(){
		$.getJSON( _ip+"/my_view", function( data ) {
		              var result=data;
		              var tempName = [], region = [], tempType = [], nodes = [], cloud = [], desc1 = [];
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
							desc1[j] = result[j].Template_Desc;
						}
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

				assign_myTemplate(tempName,region,tempType,nodes,cloud,desc1);
				myTemp_details(result);
			});
});


function assign_myTemplate(tempName,region,tempType,nodes,cloud,desc1){
	var qu = document.querySelector(".stage-infrastructure");
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
									//+"<li>Desc: "+desc1[i]+"</li>"
									+"</ul></div>"
									+"<div class='face back' id='"+tempName[i]+"'><span class='"
									+"glyphicon glyphicon-remove-circle closeTemplate'></span>Nodes:<input class='inPut' value='"+nodes[i]+"' type='text' disabled='disabled' /><br><br><b>Role Deatails</b>"
									+"<table border='0' class='my_info'><thead><tr><th>Node </th><th>Role </th></tr></thead><tbody></tbody></table>"
									+"</div></div></article></div>";
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
	location.href="//172.29.59.65:3000/deployTemplate"+"?data="+"multi"+"?data2="+template;
}

$('#manageEnv').click(function(){
	location.href="//172.29.59.65/manageEnv";
})
function addDevOps(ev){
	localStorage.setItem("InfraId",ev.title)
	location.pathname="/createDevTemp"
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


function disable(){
	if(sessionStorage.getItem("role") == "u"){
		var elems = document.getElementsByClassName("but");
		//console.log(elems);
		for(var i = 0; i < elems.length; i++) {
			elems[i].disabled = true;
		}
	}
}
function genereic_function(genT){
	//alert("Disabled the functions....!");
	var genTemplate = genT.id
	location.href =_ip+"/assignNode"+"?data="+genTemplate;
}


$('button#create_temp').click(function(){
	location.href=_ip+"/create_template"
});



var designDevOpsData = {
  deployTemplate : [
    {
      'templateName': '',
      'projectName': '',
      'technology': '',
      'cloud': '',
      'pipelines': {},
      'cIVMs' : {
        '0': {
          'vmPackages': {
            'CI_Data': {
              'add_pkgs': []
            }
          }
        }
      },
      'cTVMs' : {},
      'cDVMs' : {}
    }
  ]
};
var templateData;
var finalToolData = [];
var toolDataForVm;

function getDataFromEndPoint(type,url,dtype,data){
  return $.ajax({
    type:type,
    url: _ip+url,
    dataType: dtype,
    data: data
  });
}

function DevOpsDetails(templateDetails){
   designDevOpsData.deployTemplate[0].templateName = templateDetails.Template_name;
   designDevOpsData.deployTemplate[0].projectName = templateDetails.Project_Name;
   designDevOpsData.deployTemplate[0].productName = templateDetails.Product_Name;
   designDevOpsData.deployTemplate[0].accountName = templateDetails.Account_Name;
   designDevOpsData.deployTemplate[0].cloud = templateDetails.Cloud;
   designDevOpsData.deployTemplate[0].region = templateDetails.Region;
   getDataFromEndPoint('GET','/appTechnologies','json')
     .then(function(data){
       var technologyTemplate = '';
       data.forEach(function(element){
         technologyTemplate = technologyTemplate + '<label><img class="col-xs-12" src="/images_1/'+ element.image +'">'+
           '<figcaption >'+element.technology+'</figcaption>'+
           '<input type="radio" name="technology" value="'+ element.technology +'" class="col-xs-12"/>'+
         '</label>';
       });
       var devOpsTemplate = '<label class="dev-chain"><img class="col-xs-12" src="/images_1/ci.jpg">\
                               <figcaption >Continues Integration</figcaption>\
                               <input type="checkbox" name="ci" val="CI"  class="col-xs-12 disabled" disabled checked/>\
                             </label>\
                             <label class="dev-chain"><img class="col-xs-12" src="/images_1/ct.jpg">\
                               <figcaption >Continues Testing</figcaption>\
                               <input type="checkbox" name="ct" val="CT" class="col-xs-12" onclick="devChainCT()"/>\
                             </label>\
                             <label class="dev-chain"><img class="col-xs-12" src="/images_1/cd.jpg">\
                               <figcaption >Continues Delivery</figcaption>\
                               <input type="checkbox" name="cd" val="CD"  class="col-xs-12" onclick="devChainCD()"/>\
                             </label>';
       var overviewTemplate = '<div class="col-xs-12 col-sm-3 col-md-3 selection-overview pull-right ">\
                                 <div class="panel panel-default">\
                                  <div class="panel-heading">Selection Overview</div>\
                                  <div class="panel-body selection-overview-body">\
                                    <h5><b>Infrastructure</b></h5> \
                                    <h7><b>DevOps Infra Selected : </b>' + templateDetails.Template_name + '</h7><br>\
                                    <h7><b>Cloud : </b>' + templateDetails.Cloud + '</h7><br>\
                                    <h7><b>Nodes : </b>' + templateDetails.VMSs + '</h7><br> \
                                  </div></div></div>';
       var devOpsDetailTemplate = '<div class="stage-devops"><div class="col-xs-12 col-sm-9 col-md-9 ">\
                                    <div class="panel panel-default">\
                                     <div class="panel-heading">Technology or Enterprise Application</div>\
                                     <div class="panel-body">'+technologyTemplate+'</div>\
                                    </div>\
                                    <div class="panel panel-default">\
                                     <div class="panel-heading">DevOps Type</div>\
                                     <div class="panel-body">' + devOpsTemplate + '</div>\
                                    </div>\
                                   </div>'
                                    +'</div>'
                                   + overviewTemplate;
       $('.templates').append(devOpsDetailTemplate);
       // $('.templateCreateButtons').children().remove();
     })
}

function choosePipeline(devOpsDetail,technology){
  designDevOpsData.deployTemplate[0].technology = technology;
  var devopslist = '';
  var pipelineTemplate = '<div class="stage-pipeline col-xs-12 col-sm-9 col-md-9 ">'+ciTemplate(devOpsDetail[0])+ctTemplate(devOpsDetail[1])+cdTemplate(devOpsDetail[2])+'<div>'
  function ciTemplate(ci){
    if(ci){
      designDevOpsData.deployTemplate[0].pipelines.CI = {
        'CI1':false,
        'CI2':false,
        'CI3':false,
        'CI4':false
      };
      devopslist = devopslist +  'Continuous Integration';
      return ' <div class="panel panel-default"> <div class="panel-heading">Choose CI Pipeline</div> <div class="panel-body ci-pipeline-body"><label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ci1-pipeline"   value="CI1"> <ul class="col-xs-10 pipe-block"> <li>Code Repo</li> <li>Build</li> </ul> </label> <label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ci2-pipeline"   value="CI2"> <ul class="col-xs-10 pipe-block"> <li>Code Repo</li> <li>Build</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Unit Test</li> </ul> </label> <label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ci3-pipeline"   value="CI3"> <ul class="col-xs-10 pipe-block"> <li>Code Repo</li> <li>Build </li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Unit Test</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Code Coverage</li> </ul> </label> <label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ci4-pipeline"  value="CI4"> <ul class="col-xs-10 pipe-block"> <li>Code Repo</li> <li>Build</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Unit Test</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Code Coverage</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Package</li> </ul> </label> </div></div>'
    }else{
      return '';
    }
  }
  function ctTemplate(ct){
    if(ct){
      designDevOpsData.deployTemplate[0].pipelines.CT = {
        'CT1':false,
        'CT2':false,
        'CT3':false
      };
      devopslist = devopslist +  ', Continuous Testing';
      return '<div class="panel panel-default"> <div class="panel-heading">Choose CT Pipeline(CT can be selected only after package is done in CI)</div> <div class="panel-body ct-pipeline-body"><label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ct1-pipeline" value="CT1"> <ul class="col-xs-10 pipe-block"> <li>SAT</li> </ul> </label> <label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ct2-pipeline"  value="CT2"> <ul class="col-xs-10 pipe-block"> <li>SAT</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>UAT</li> </ul> </label> <label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="ct3-pipeline"  value="CT3"> <ul class="col-xs-10 pipe-block"> <li>SAT</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>UAT</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>PAT</li> </ul> </label></div></div>'
    }else{
      return '';
    }
  }
  function cdTemplate(cd){
    if(cd){
      designDevOpsData.deployTemplate[0].pipelines.CD = {
        'CD1':false
      };
      devopslist = devopslist +  ', Continues Delivery';
      return '<div class="panel panel-default"> <div class="panel-heading">Choose CD Pipeline( CD can be selected only after selecting CT)</div> <div class="panel-body cd-pipeline-body"><label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="cd-pipeline" value="CD1"> <ul class="col-xs-10 pipe-block"> <li>Deployment</li> </ul> </label></div></div>'
    }else{
      return '';
    }
  }
  $('.selection-overview-body').append('<div class="devdetail-overview"><h5><b>DevOps Details</b></h5><h7><b>Technology : </b>' + technology + '</h7><br><h7><b>DevOps Type : </b>' + devopslist + '</h7></div>')
  $('.stage-devops').addClass('hidden');
  $('.templates').append(pipelineTemplate);

}

function codeRepository(pipelineSelected){
  pipelineSelected.forEach(function(pipeline){
    pipeline.forEach(function(element){
      if(element){
        designDevOpsData.deployTemplate[0].pipelines[element.slice(0,2)][element] = true;
      }
    });
  });
  var codeRepository = '';
  //getDataFromEndPoint('GET','/appTechnologies','json')
  // .then(function(data){
     toolData[0]['CI_tools'][0].scm_tools.forEach(function(element){
       codeRepository = codeRepository + '<label><img class="col-xs-12 '+element.name +'" src="/images_1/'+ element.image +'">'+
         '<figcaption >'+element.name+'</figcaption>'+
         '<input type="radio" name="scm" value="'+ element.name +'" class="col-xs-12"/>'+
       '</label>';
     });
     var codeRepositoryTemplate = '<div class="stage-code-repository col-xs-12 col-sm-9 col-md-9 ">\
                                        <div class="panel panel-default">\
                                          <div class="panel-heading">Choose Code Repository</div>\
                                          <div class="panel-body">'
                                          + codeRepository
                                          + '</div></div></div>';
     if(pipelineSelected[0][pipelineSelected[0].length-1]){
       var switchCase = pipelineSelected[0][pipelineSelected[0].length-1];
     }else if(pipelineSelected[0][pipelineSelected[0].length-2]){
       var switchCase = pipelineSelected[0][pipelineSelected[0].length-2];
     }else if(pipelineSelected[0][pipelineSelected[0].length-3]){
       var switchCase = pipelineSelected[0][pipelineSelected[0].length-3];
     }else{
       var switchCase = pipelineSelected[0][pipelineSelected[0].length-4];
     }
     switch(switchCase) {
       case 'CI1':
         var secondWizard = '<ol class="track-progress design-wizard2  col-xs-12 col-sm-9 col-md-9 "> <li class="done"> <span>Code Repository</span> </li><!-- --><li> <span>Build Server</span> </li><!-- --><li> <span>Build Tool</span> </li></ol>';
         break;
       case 'CI2':
         var secondWizard = '<ol class="track-progress design-wizard2  col-xs-12 col-sm-9 col-md-9 "> <li class="done"> <span>Code Repository</span> </li><!-- --><li> <span>Build Server</span> </li><!-- --><li> <span>Build Tool</span> </li><!-- --><li> <span>Unit Test</span> </li></ol>';
         break;
       case 'CI3':
         var secondWizard = '<ol class="track-progress design-wizard2  col-xs-12 col-sm-9 col-md-9 "> <li class="done"> <span>Code Repository</span> </li><!-- --><li> <span>Build Server</span> </li><!-- --><li> <span>Build Tool</span> </li><!-- --><li> <span>Unit Test</span> </li><!-- --><li> <span>Code Coverage</span> </li></ol>';
        break;
       default:
           var secondWizard = '<ol class="track-progress design-wizard2  col-xs-12 col-sm-9 col-md-9 "> <li class="done"> <span>Code Repository</span> </li><!-- --><li> <span>Build Server</span> </li><!-- --><li> <span>Build Tool</span> </li><!-- --><li> <span>Unit Test</span> </li><!-- --><li> <span>Code Coverage</span> </li><!-- --><li> <span>Package</span> </li> </ol>';
     }
    /* if(pipelineSelected[0] == CI1){
     }else if()*/
     $('.templates').append(secondWizard + codeRepositoryTemplate);
  // });

}

function buildServer(codeRepo){
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'][0] = {'code_repository': codeRepo};
  var serverTools = '';
  //newVM = templateData.Instances;
  //console.log(newVM)
  //getDataFromEndPoint('GET','/appTechnologies','json')
  // .then(function(data){
     toolData[0]['CI_tools'][0].build_server.forEach(function(element){
       serverTools = serverTools + '<label><img class="col-xs-12 '+element.name +'" src="/images_1/'+ element.image +'">'+
         '<figcaption >'+element.name+'</figcaption>'+
         '<input type="radio" name="buildServer" value="'+ element.name +'" class="col-xs-12"/>'+
       '</label>';
     });
     var serverToolsTemplate = '<div class="panel panel-default">\
                                  <div class="panel-heading">Choose Build Server</div>\
                                  <div class="panel-body">'
                                  + serverTools
                                  + '</div></div>';
     var vmTemplate = '';
     templateData.Instances.forEach(function(element,index){
       vmTemplate = vmTemplate + '<label class="col-xs-12"><input type="radio" name="buildVm"' + 'data-node="'+element.node +'" ' + 'value="'+index +'" ' + 'data-role="'+element.role +'" />'
       + element.node + ' ( ' + element.role + ' ) </label>';
     });
     var vmTemplate = '<div class="panel panel-default">\
                         <div class="panel-heading">Choose VM( Build server requires a VM, please select VM)</div>\
                         <div class="panel-body">'
                         + vmTemplate
                         + '</div></div>';

     finalToolData.push(document.getElementsByClassName(codeRepo)[0]);
     $('.selection-overview-body').append('<div class="tools-overview"><h5><b> Tools </b></h5><h7 class="code-repo-overview"><b>Code Repository: </b>' + codeRepo + '</h7><br></div>')
     $('.templates').append('<div class="stage-build-server col-xs-12 col-sm-9 col-md-9" >' + serverToolsTemplate+vmTemplate + '</div>');
   //});
}

function buildTool(buildServer,vmData,VMData){
  /*var VMData = {
                   "_id": "58be5af46ede0acc0ad6900c",
                   "tool_name": "Jenkins",
                   "OS": "Centos",
                   "os_version": "7.1",
                   "endpoints": "'8080'",
                   "runlist": "'role[centjen]'",
                   "devops_type": "CI",
                   "cloud": "Azure",
                   "version": "1.6581-1",
                   "standard_vm": "'Medium'",
                   "process_vms": "3",
                   "technology": "Java",
                   "image": "'5112500ae3b842c8b9c604889f8753c3__OpenLogic-CentOS-71-20150605'"
                 };*/
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmName'] = templateData.Instances[vmData].node;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmRole'] = templateData.Instances[vmData].role;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmOs'] = templateData.Instances[vmData].os;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['name'] = buildServer;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['type'] = 'build_server';
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['vm_req'] = true;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['endpoints'] = VMData.endpoints;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['img'] = VMData.image;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['runList'] = VMData.runlist;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['os'] = VMData.OS;
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['version'] = VMData.version;
  var buildTools = '';
  //getDataFromEndPoint('GET','/appTechnologies','json')
   //.then(function(data){
     toolData[0]['CI_tools'][0].build_tool.forEach(function(element){
       buildTools = buildTools + '<label><img class="col-xs-12 '+element.name +'" src="/images_1/'+ element.image +'">'+
         '<figcaption >'+element.name+'</figcaption>'+
         '<input type="radio" name="buildTool" value="'+ element.name+'" class="col-xs-12"/>'+
       '</label>';
     });
     var buildToolsTemplate = '<div class="panel panel-default">\
                                 <div class="panel-heading">Choose Build Tool</div>\
                                 <div class="panel-body">'
                                 + buildTools
                                 + '</div></div>';
     finalToolData.push(document.getElementsByClassName(buildServer)[0]);
     $('.tools-overview').append('<div class="build-server-overview"><h7><b>Build Server: </b>' + buildServer + ' ['+ templateData.Instances[vmData].node + ' - '+ templateData.Instances[vmData].role +' ]' +'</h7><br></div>');
     $('.templates').append('<div class="stage-build-tool col-xs-12 col-sm-9 col-md-9">' + buildToolsTemplate + '</div>');
   //});
}

function unitTest(buildTool){
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'][1] = {'build_tool': buildTool};
  var unitTestTools = '';
  //getDataFromEndPoint('GET','/appTechnologies','json')
   //.then(function(data){
     toolData[0]['CI_tools'][0].unit_test.forEach(function(element){
       unitTestTools = unitTestTools + '<label><img class="col-xs-12 '+element.name +'" src="/images_1/'+ element.image +'">'+
         '<figcaption >'+element.name+'</figcaption>'+
         '<input type="radio" name="unitTest" value="'+ element.name+'" class="col-xs-12"/>'+
       '</label>';
     });
     var unitTestToolsTemplate = '<div class="panel panel-default">\
                                  <div class="panel-heading">Choose Unit Test Tool</div>\
                                  <div class="panel-body">'
                                  + unitTestTools
                                  + '</div></div>';
     /*var vmTemplate = '';
     newVM.forEach(function(element,index){
       vmTemplate = vmTemplate + '<label class="col-xs-12"><input type="radio" name="unitVm"' + 'data-node="'+element.node +'" ' + 'value="'+index +'" ' + 'data-role="'+element.role +'" />'
       + element.node + ' ( ' + element.role + ' ) </label>';
     });
     var vmTemplate = '<div class="panel panel-default">\
                         <div class="panel-heading">Choose VM( Unit Test requires a VM, please select VM)</div>\
                         <div class="panel-body">'
                         + vmTemplate
                         + '</div></div>';*/
     finalToolData.push(document.getElementsByClassName(buildTool)[0]);
     $('.tools-overview').append('<div  class="build-tool-overview"><h7><b>Build Tool: </b>' + buildTool + '</h7><br></div>')
     $('.templates').append('<div class="stage-unit-test col-xs-12 col-sm-9 col-md-9" >' + unitTestToolsTemplate /*+vmTemplate */ + '</div>');
   //});
}

function codeCoverage(unitTest){
  designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'][2] = {'unittest_tool': unitTest};
  var codeCoverageTools = '';
  //getDataFromEndPoint('GET','/appTechnologies','json')
  // .then(function(data){
     toolData[0]['CI_tools'][0].code_quality.forEach(function(element){
       codeCoverageTools = codeCoverageTools + '<label><img class="col-xs-12 '+element.name +'" src="/images_1/'+ element.image +'">'+
         '<figcaption >'+element.name+'</figcaption>'+
         '<input type="radio" name="codeCoverage" value="'+ element.name+'" class="col-xs-12"/>'+
       '</label>';
     });
     var codeCoverageToolsTemplate = '<div class="panel panel-default">\
                                  <div class="panel-heading">Choose Code Coverage</div>\
                                  <div class="panel-body">'
                                  + codeCoverageTools
                                  + '</div></div>';
     var vmTemplate = '';
     templateData.Instances.forEach(function(element,index){
       vmTemplate = vmTemplate + '<label class="col-xs-12"><input type="radio" name="coverageVm"' + 'data-node="'+element.node +'" ' + 'value="'+index +'" ' + 'data-role="'+element.role +'" />'
       + element.node + ' ( ' + element.role + ' ) </label>';
     });
     var vmTemplate = '<div class="panel panel-default">\
                         <div class="panel-heading">Choose VM( Code Coverage requires a VM, please select VM)</div>\
                         <div class="panel-body">'
                         + vmTemplate
                         + '</div></div>';
     finalToolData.push(document.getElementsByClassName(unitTest)[0]);
     $('.tools-overview').append('<div class="unit-test-overview"><h7><b>Unit Test Tool: </b>' + unitTest + '</h7><br></div>')
     $('.templates').append('<div class="stage-code-coverage col-xs-12 col-sm-9 col-md-9" >' + codeCoverageToolsTemplate+vmTemplate + '</div>');
   //});
}

function package(codeCoverage,vmData,VMData){
  /*var VMData = {
                   "_id": "58be5af46ede0acc0ad69011",
                   "tool_name": "Sonarqube",
                   "OS": "Centos",
                   "os_version": "7.1",
                   "endpoints": "'9000,9002,9009'",
                   "runlist": "'role[sonar_role]'",
                   "devops_type": "CI",
                   "cloud": "Azure",
                   "version": "2.11.2-06",
                   "standard_vm": "Medium",
                   "process_vms": "3",
                   "technology": "Java",
                   "image": "'5112500ae3b842c8b9c604889f8753c3__OpenLogic-CentOS-71-20150605'"
                 };*/
  designDevOpsData.deployTemplate[0].cIVMs[1]= {
    'vmPackages': {
      'CI_Data': {}
    }
  };
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmName'] = templateData.Instances[vmData].node;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmRole'] = templateData.Instances[vmData].role;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmOs'] = templateData.Instances[vmData].os;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['name'] = codeCoverage;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['type'] = 'code_quality';
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['vm_req'] = true;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['endpoints'] = VMData.endpoints;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['img'] = VMData.image;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['runList'] = VMData.runlist;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['os'] = VMData.OS;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['version'] = VMData.version;
  designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['add_pkgs'] = [{}];
  var packageTools = '';
  //getDataFromEndPoint('GET','/appTechnologies','json')
   //.then(function(data){
     toolData[0]['CI_tools'][0].package_tool.forEach(function(element){
       packageTools = packageTools + '<label><img class="col-xs-12 '+element.name +'" src="/images_1/'+ element.image +'">'+
         '<figcaption >'+element.name +'</figcaption>'+
         '<input type="radio" name="package" value="'+ element.name +'" class="col-xs-12"/>'+
       '</label>';
     });
     var codeCoverageToolsTemplate = '<div class="panel panel-default">\
                                  <div class="panel-heading">Choose Packaging Tool</div>\
                                  <div class="panel-body">'
                                  + packageTools
                                  + '</div></div>';
     var vmTemplate = '';
     templateData.Instances.forEach(function(element,index){
       vmTemplate = vmTemplate + '<label class="col-xs-12"><input type="radio" name="packageVm"' + 'data-node="'+element.node +'" ' + 'value="'+index +'" ' + 'data-role="'+element.role +'" />'
       + element.node + ' ( ' + element.role + ' ) </label>';
     });
     var vmTemplate = '<div class="panel panel-default">\
                         <div class="panel-heading">Choose VM( Packaging Tool requires a VM, please select VM)</div>\
                         <div class="panel-body">'
                         + vmTemplate
                         + '</div></div>';
     finalToolData.push(document.getElementsByClassName(codeCoverage)[0]);
     $('.tools-overview').append('<div  class="code-coverage-overview"><h7><b>Code Coverage Tool: </b>' + codeCoverage + ' ['+ templateData.Instances[vmData].node + ' - '+ templateData.Instances[vmData].role +' ]'  + '</h7><br></div>')
     $('.templates').append('<div class="stage-package-tool col-xs-12 col-sm-9 col-md-9" >' + codeCoverageToolsTemplate+vmTemplate + '</div>');
   //});
}

function previewSave(data,title,vmData,VMData){
  switch(title){
    case 'Build Tool':
      designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'].push({'build_tool': data});
      break;
    case 'Unit Test':
      designDevOpsData.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'].push({'unittest_tool': data});
      break;
    case 'Code Coverage':
      designDevOpsData.deployTemplate[0].cIVMs[1]= {
        'vmPackages': {
          'CI_Data': {}
        }
      };
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmName'] = templateData.Instances[vmData].node;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmRole'] = templateData.Instances[vmData].role;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmOs'] = templateData.Instances[vmData].os;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['name'] = data;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['type'] = 'code_quality';
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['vm_req'] = true;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['endpoints'] = VMData.endpoints;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['img'] = VMData.image;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['runList'] = VMData.runlist;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['os'] = VMData.OS;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['version'] = VMData.version;
      designDevOpsData.deployTemplate[0].cIVMs[1]['vmPackages']['CI_Data']['add_pkgs'] = [{}];
      break;
    default:
      /*var VMData = {
                       "_id": "58be5af46ede0acc0ad69017",
                       "tool_name": "Nexus",
                       "OS": "Ubuntu",
                       "os_version": "14.04",
                       "endpoints": "'8081'",
                       "runlist": "role[nexusrole]",
                       "devops_type": "CI",
                       "cloud": "Azure",
                       "version": "2.11.2-06",
                       "standard_vm": "Medium",
                       "process_vms": "3",
                       "technology": "Java",
                       "image": "'b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu-14_04_3-LTS-amd64-server-20151217-en-us-30GB'"
                     };*/
      designDevOpsData.deployTemplate[0].cIVMs[2]= {
        'vmPackages': {
          'CI_Data': {}
        }
      };
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmName'] = templateData.Instances[vmData].node;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmRole'] = templateData.Instances[vmData].role;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmOs'] = templateData.Instances[vmData].os;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['name'] = data;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['type'] = 'package_manager';
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['vm_req'] = true;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['CI_Data']['endpoints'] = VMData.endpoints;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['CI_Data']['img'] = VMData.image;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['CI_Data']['runList'] = VMData.runlist;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['CI_Data']['os'] = VMData.OS;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['CI_Data']['version'] = VMData.version;
      designDevOpsData.deployTemplate[0].cIVMs[2]['vmPackages']['CI_Data']['add_pkgs'] = [{}];
  }
  finalToolData.push(document.getElementsByClassName(data)[0]);
  var toolList = '';
  finalToolData.forEach((e)=>{
    toolList = toolList + '<li class="tool-preview"><img src="'+e.src +'" /></li>';
  });
  if(vmData)
    $('.tools-overview').append('<div  class="preview-save-overview"><h7><b>'+ title + ': </b>' + data + ' ['+ templateData.Instances[vmData].node + ' - '+ templateData.Instances[vmData].role +' ]'  + '</h7></div>');
  else
	$('.tools-overview').append('<div  class="preview-save-overview"><h7><b>'+ title + ': </b>' + data + '</h7></div>');
  $('.templates').append('<div class="stage-preview-save"><ol class="track-progress col-xs-12 col-sm-9 col-md-9">'+ toolList+'</ol></div>')
}

$('.devstage-cancel').click(function(){
  location.href = _ip + '/accounts';
})

$('#stageInfra').click(function(){
  designDevOpsData.deployTemplate[0].templateName = undefined;
  $('.stage-devops').remove();
  $('.selection-overview').remove();
  $('.stage-infrastructure').removeClass('hidden');
  $('.step2').addClass('hidden');
  $('.step1').removeClass('hidden disabled');
  $('.design-wizard1 li')[1].className = '';
  //location.href = _ip + '/designDevOpsTemp';
})

$('#stageDevOps').click(function(){
  var template = {};
  template.tname = $('.flipped summary').html() ;
  if(template.tname ){
    $(this).addClass('disabled');
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
    $('.design-wizard1 li')[1].className = 'done';
    getDataFromEndPoint('POST','/pvd_template','json',template)
      .then(function(data){
        $('.stage-infrastructure').addClass('hidden');
        templateData = data[0];
        DevOpsDetails(data[0])
      })
  }else{
    inValid('Select Some tile');
  }
})

$('#backStageDevOps').click(function(){
  designDevOpsData.deployTemplate[0].pipelines = {};
  $('.stage-devops').removeClass('hidden');
  $('.stage-pipeline').remove();
  $('.step2').removeClass('hidden');
  $('.step3').addClass('hidden');
  $('.design-wizard1 li')[2].className = '';
  $('.devdetail-overview').remove();
})

$('#stagePipeline').click(function(){
  var technology = $('[name="technology"]:checked').val();
  $.post( _ip + '/appTools', {'technology':technology})
    .then(function(data){
      toolData = data;
    }).then(function(){
      var ci = $('[name="ci"]')[0],
          ct = $('[name="ct"]')[0],
          cd = $('[name="cd"]')[0];
      var devOps = [ci.checked,ct.checked,cd.checked];
      if(technology){
        $('.step3').removeClass('hidden');
        $('.step2').addClass('hidden');
        $('.design-wizard1 li')[2].className = 'done';
        choosePipeline(devOps,technology);
      }else{
        inValid('Select any Technology');
      }
    })
})

$('#backStagePipeline').click(function(){
  for(var i in designDevOpsData.deployTemplate[0].pipelines){
    //console.log(i)
    for (var j in designDevOpsData.deployTemplate[0].pipelines[i]){
      designDevOpsData.deployTemplate[0].pipelines[i][j] = false;
    }
  }
  $('.stage-pipeline').removeClass('hidden');
  $('.design-wizard1 li')[3].className = '';
  $('.stage-code-repository').remove();
  $('.design-wizard2').remove();
  $('.step3').removeClass('hidden');
  $('.step4').addClass('hidden');
})

$('#stageCodeRepo').click(function(){
  var ciOption1 = $('input[name="ci1-pipeline"]:checked').val();
  var ciOption2 = $('input[name="ci2-pipeline"]:checked').val();
  var ciOption3 = $('input[name="ci3-pipeline"]:checked').val();
  var ciOption4 = $('input[name="ci4-pipeline"]:checked').val();
  var ciSelected = [ciOption1,ciOption2,ciOption3,ciOption4];
  var ctOption1 = $('input[name="ct1-pipeline"]:checked').val();
  var ctOption2 = $('input[name="ct2-pipeline"]:checked').val();
  var ctOption3 = $('input[name="ct3-pipeline"]:checked').val();
  var ctSelected = [ctOption1,ctOption2,ctOption3];
  var cdSelected = $('input[name="cd-pipeline"]:checked').val();
  var pipelineStage = $('.stage-pipeline .panel').length
  if(pipelineStage == 3){
     if((ciOption1 || ciOption2 || ciOption3 || ciOption4) && (ctOption1 || ctOption2 || ctOption3) && cdSelected) valid();
     else inValid('Select any option in CI, CT & CD Pipelines');
  }else if(pipelineStage == 2){
     if((ciOption1 || ciOption2 || ciOption3 || ciOption4) && (ctOption1 || ctOption2 || ctOption3)) valid();
     else inValid('Select any option in CI & CT Pipelines');
  }else{
     if(ciOption1 || ciOption2 || ciOption3 || ciOption4) valid();
     else inValid('Select any option in CI Pipeline');
  }
  function valid(){
    var pipelineSelected = [ciSelected,ctSelected,[cdSelected]];
    $('.stage-pipeline').addClass('hidden');
    $('.design-wizard1 li')[3].className = 'done';
    $('.step3').addClass('hidden');
    $('.step4').removeClass('hidden');
    $.post( "http://172.29.59.65:3000/devopsTemplate", {'cloud':designDevOpsData.deployTemplate[0].cloud,'technology':designDevOpsData.deployTemplate[0].technology,'devops_type' : 'CI'})
      .then(function(data){
        toolDataForVm = data;
      }).then(codeRepository(pipelineSelected));
  }
})

$('#backStageCodeRepo').click(function(){
  $('.stage-code-repository').removeClass('hidden');
  $('.stage-build-server').remove();
  $('.tools-overview').remove();
  $('.design-wizard2 li')[1].className = '';
  $('.step4').removeClass('hidden');
  $('.step4-2').addClass('hidden');
  finalToolData.pop();
})

$('#stageBuildServer').click(function(){
  var codeRepo = $('input[name="scm"]:checked').val();
  if(codeRepo){
    $('.step4').addClass('hidden');
    $('.step4-2').removeClass('hidden');
    $('.design-wizard2 li')[1].className = 'done';
    $('.stage-code-repository').addClass('hidden');
    buildServer(codeRepo);
  }else inValid('Select any Code Repository')
})

$('#backStageBuildServer').click(function(){
  if($('.design-wizard2 li').length == 3){
    $('#backStageBuildServer').addClass('hidden');
    $('#stagePreviewSave').addClass('hidden');
    $('.design-wizard2 li')[2].className = '';
    $('.stage-build-tool').remove();
    $('.build-server-overview').remove();
    $('.stage-build-server').removeClass('hidden');
    $('#backStageCodeRepo').removeClass('hidden');
    $('#stageBuildTool').removeClass('hidden');
    finalToolData.pop();
  }else{
    $('.stage-build-server').removeClass('hidden');
    $('.stage-build-tool').remove();
    $('.build-server-overview').remove();
    $('.design-wizard2 li')[2].className = '';
    $('.step4-2').removeClass('hidden');
    $('.step4-3').addClass('hidden');
    finalToolData.pop();
  }
})

$('#stageBuildTool').click(function(){
  var buildServer = $('input[name="buildServer"]:checked').val();
  var buildVm = $('input[name="buildVm"]:checked').val();
  if(buildServer){
    if(buildVm){
      var vmOS = templateData.Instances[buildVm].os;
      var toolData = getCIData(vmOS,buildServer);
      if(toolData.OS){
        if($('.design-wizard2 li').length == 3){
          $('#backStageCodeRepo').addClass('hidden');
          $('#stageBuildTool').addClass('hidden');
          $('#backStageBuildServer').removeClass('hidden');
          $('#stagePreviewSave').removeClass('hidden');
          $('.stage-build-server').addClass('hidden');
          $('.design-wizard2 li')[2].className = 'done';
        }else{
          $('.step4-2').addClass('hidden');
          $('.step4-3').removeClass('hidden');
          $('.stage-build-server').addClass('hidden');
          $('.design-wizard2 li')[2].className = 'done';
        }
        buildTool(buildServer,buildVm,toolData);
      }else inValid('This Vm isn\'t compatible. Select Some other Vm');
    }else inValid('Build Server requires a VM, Please select VM');
  }else inValid('Select any Build Server');
})

$('#backStageBuildTool').click(function(){
  if($('.design-wizard2 li').length == 4){
    $('#stagePreviewSave').addClass('hidden');
    $('#backStageBuildTool').addClass('hidden');
    $('#backStageBuildServer').removeClass('hidden');
    $('#stageUnitTest').removeClass('hidden');
    $('.stage-build-tool').removeClass('hidden');
    $('.stage-unit-test').remove();
    $('.build-tool-overview').remove();
    $('.design-wizard2 li')[3].className = '';
  }if($('.design-wizard2 li').length == 3){
    //$('.stage-preview-save').remove();
    $('.build-tool-overview').remove();
    $('.design-wizard1 li')[4].className = '';
    $('.stage-build-tool').removeClass('hidden');
    //$('.design-wizard2').removeClass('hidden');
    $('#stage6').addClass('hidden');
    $('.stage-preview-save').remove();
    $('.preview-save-overview').remove();
    finalToolData.pop();
    $('#backStageBuildTool').addClass('hidden');
    $('#stagePreviewSave').removeClass('hidden');
    $('#backStageBuildServer').removeClass('hidden');
  }else{
    $('.stage-build-tool').removeClass('hidden');
    $('.stage-unit-test').remove();
    $('.build-tool-overview').remove();
    $('.design-wizard2 li')[3].className = '';
    $('.step4-3').removeClass('hidden');
    $('.step4-4').addClass('hidden');
    finalToolData.pop();
  }
})

$('#stageUnitTest').click(function(){
  var buildTool = $('input[name="buildTool"]:checked').val()
  if(buildTool){
    if($('.design-wizard2 li').length == 4){
      $('.stage-build-tool').addClass('hidden');
      $('#backStageBuildServer').addClass('hidden');
      $('#stageUnitTest').addClass('hidden');
      $('#stagePreviewSave').removeClass('hidden');
      $('#backStageBuildTool').removeClass('hidden');
      $('.design-wizard2 li')[3].className = 'done';
      unitTest(buildTool);
    }else{
      $('.step4-3').addClass('hidden');
      $('.step4-4').removeClass('hidden');
      $('.stage-build-tool').addClass('hidden');
      $('.design-wizard2 li')[3].className = 'done';
      unitTest(buildTool);
    }
  }else inValid('Select any Build Tool');
})

$('#backStageUnitTest').click(function(){
  if($('.design-wizard2 li').length == 5){
    $('.stage-unit-test').removeClass('hidden');
    $('.stage-code-coverage').remove();
    $('.unit-test-overview').remove();
    $('.design-wizard2 li')[4].className = '';
    $('.step4-4').removeClass('hidden');
    $('.step4-5').addClass('hidden');
    $('#stagePreviewSave').addClass('hidden');
  }if($('.design-wizard2 li').length == 4){
    //$('.stage-preview-save').remove();
    $('.stage-unit-test').removeClass('hidden');
    //$('.design-wizard2').removeClass('hidden');
    $('.design-wizard1 li')[4].className = '';
    $('#stage6').addClass('hidden');
    $('.unit-test-overview').remove();
    finalToolData.pop();
    $('.stage-preview-save').remove();
    $('.preview-save-overview').remove();
    $('#backStageUnitTest').addClass('hidden');
    $('#stagePreviewSave').removeClass('hidden');
    $('#backStageBuildTool').removeClass('hidden');
  }else{
    $('.stage-unit-test').removeClass('hidden');
    $('.stage-code-coverage').remove();
    $('.unit-test-overview').remove();
    $('.design-wizard2 li')[4].className = '';
    $('.step4-4').removeClass('hidden');
    $('.step4-5').addClass('hidden');
    finalToolData.pop();
  }
})

$('#stageCodeCoverage').click(function(){
  var unitTest = $('input[name="unitTest"]:checked').val();
  if(unitTest){
    //newVM.splice($('[name="unitVm"]:checked')[0].value,1);
    if($('.design-wizard2 li').length == 5){
      $('.step4-4').addClass('hidden');
      $('.step4-5').removeClass('hidden');
      $('#stagePackage').addClass('hidden');
      $('#stagePreviewSave').removeClass('hidden');
      $('.stage-unit-test').addClass('hidden');
      $('.design-wizard2 li')[4].className = 'done';
      codeCoverage(unitTest);
    }else{
      $('.step4-4').addClass('hidden');
      $('.step4-5').removeClass('hidden');
      $('.stage-unit-test').addClass('hidden');
      $('.design-wizard2 li')[4].className = 'done';
      codeCoverage(unitTest);
    }
  }else inValid('Select any Unit Test Tool');
})

$('#backStageCodeCoverage').click(function(){
  if($('.design-wizard2 li').length == 5){
    //$('.stage-code-coverage').remove();
    //$('.code-coverage-overview').remove();
    //$('.design-wizard2').removeClass('hidden');
    $('.stage-code-coverage').removeClass('hidden');
    $('#backStageCodeCoverage').addClass('hidden');
    $('#stage6').addClass('hidden');
    $('.stage-preview-save').remove();
    $('.preview-save-overview').remove();
    finalToolData.pop();
    $('#backStageUnitTest').removeClass('hidden');
    $('#stagePreviewSave').removeClass('hidden');
    $('.design-wizard1 li')[4].className = '';
  }else{
    $('.stage-code-coverage').removeClass('hidden');
    $('.stage-package-tool').remove();
    $('.code-coverage-overview').remove();
    $('.design-wizard2 li')[5].className = '';
    $('.step4-5').removeClass('hidden');
    $('.step4-6').addClass('hidden');
    finalToolData.pop();
  }

})

$('#stagePackage').click(function(){
  var codeCoverage = $('input[name="codeCoverage"]:checked').val();
  var coverageVm = $('input[name="coverageVm"]:checked').val();
  if(codeCoverage){
    if(coverageVm){
      var vmOS = templateData.Instances[coverageVm].os;
      var toolData = getCIData(vmOS,codeCoverage);
      if(toolData.OS){
        $('.step4-5').addClass('hidden');
        $('.stage-preview-save').remove();
        $('.preview-save-overview').remove();
        $('.step4-6').removeClass('hidden');
        $('.stage-code-coverage').addClass('hidden');
        $('.design-wizard2 li')[5].className = 'done';
        package(codeCoverage,coverageVm,toolData);
      }else inValid('This Vm isn\'t compatible. Select Some other Vm');
    }else inValid('Code coverage requires a VM, Please select VM')
  }else inValid('Select any Code Coverage Tool');
})

$('#backStagePackage').click(function(){
  $('.stage-package-tool').removeClass('hidden');
  $('.stage-preview-save').remove();
  $('.preview-save-overview').remove();
  //$('.design-wizard2').removeClass('hidden');
  $('.step4-6').removeClass('hidden');
  $('.step5').addClass('hidden');
  $('.design-wizard1 li')[4].className = '';
  finalToolData.pop();
})

$('#stagePreviewSave').click(function(){
  if($('.design-wizard2 li').length == 5){
    var codeCoverage = $('input[name="codeCoverage"]:checked').val();
    var coverageVm = $('input[name="coverageVm"]:checked').val();
    if(codeCoverage){
      if(coverageVm){
        var vmOS = templateData.Instances[coverageVm].os;
        var toolData = getCIData(vmOS,codeCoverage);
        if(toolData.OS){
          $('#backStageUnitTest').addClass('hidden');
          $('#stage6').removeClass('hidden');
          $('#backStageCodeCoverage').removeClass('hidden');
          $('#stagePreviewSave').addClass('hidden');
          $('.design-wizard1 li')[4].className = 'done';
          $('.stage-code-coverage').addClass('hidden');
          previewSave(codeCoverage,'Code Coverage',coverageVm,toolData);
        }else inValid('This Vm isn\'t compatible. Select Some other Vm');
      }else inValid('Code coverage requires a VM, Please select VM');
    }else inValid('Select any Code Coverage Tool');
  }else if($('.design-wizard2 li').length == 4){
    var unitTest = $('input[name="unitTest"]:checked').val();
    if(unitTest){
      $('.stage-unit-test').addClass('hidden');
      //$('.design-wizard2').addClass('hidden');
      $('#backStageBuildTool').addClass('hidden');
      $('#stagePreviewSave').addClass('hidden');
      $('#backStageUnitTest').removeClass('hidden');
      $('.design-wizard1 li')[4].className = 'done';
      $('#stage6').removeClass('hidden');
      previewSave(unitTest,'Unit Test');
    }else inValid('Select any Unit Test Tool');
  }else if($('.design-wizard2 li').length == 3){
    var buildTool = $('input[name="buildTool"]:checked').val();
    if(buildTool){
      $('.stage-build-tool').addClass('hidden');
      //$('.design-wizard2').addClass('hidden');
      $('#backStageBuildServer').addClass('hidden');
      $('#stagePreviewSave').addClass('hidden');
      $('#backStageBuildTool').removeClass('hidden');
      $('.design-wizard1 li')[4].className = 'done';
      $('#stage6').removeClass('hidden');
      previewSave(buildTool,'Build Tool');
    }else inValid('Select any Build Tool');
  }else{
    var packageVm = $('input[name="packageVm"]:checked').val();
    var package = $('input[name="package"]:checked').val();
    if(package){
      var packageVm = $('input[name="packageVm"]:checked').val();
      if(packageVm){
        var vmOS = templateData.Instances[packageVm].os;
        var toolData = getCIData(vmOS,package);
        if(toolData.OS){
          $('.step4-6').addClass('hidden');
          $('.step5').removeClass('hidden');
          $('.stage-package-tool').addClass('hidden');
          $('.design-wizard1 li')[4].className = 'done';
          previewSave(package,'Packaging',packageVm,toolData);
        }else inValid('This Vm isn\'t compatible. Select Some other Vm');
      }else inValid('Packaging requires a VM, Please select VM');
    }else inValid('Select any Packaging Tool');
  }
})

$('#stage6').click(function(){
console.log(designDevOpsData);
  $.post( _ip + '/saveDevopsTemplate',{data:JSON.stringify(designDevOpsData)})
  .then(success,error);
  function success(data){
    inValid(data);
    location.pathname = '/viewDevOpsTemplate';
  }
  function error(e){
    inValid('Failed to Send Data');
  }
})

$('.templates').on('click','.stage-pipeline .ct-pipeline-body input', function() {
   if(!$('input[name="ci4-pipeline"]:checked').val()){
     this.checked = false;
     inValid('Select maximum pipelines in CI pipeline');
   }
});
$('.templates').on('click','.stage-pipeline .cd-pipeline-body input', function() {
   if(!$('input[name="ct3-pipeline"]:checked').val()){
     this.checked = false;
     inValid('Select maximum pipelines in CT pipeline');
   }
});
$('.templates').on('click','.ci-pipeline-body input[name="ci4-pipeline"]', function() {
  if(!$('input[name="ci4-pipeline"]:checked')[0]){
    for (var i in $('.ct-pipeline-body input')){
      $('.ct-pipeline-body input')[i].checked =  false;
    }
    for (var i in $('.cd-pipeline-body input')){
      $('.cd-pipeline-body input')[i].checked =  false;
    }
  }
});
$('.templates').on('click','.ct-pipeline-body input[name="ct3-pipeline"]', function() {
  if(!$('input[name="ct3-pipeline"]:checked')[0]){
    for (var i in $('.cd-pipeline-body input')){
      $('.cd-pipeline-body input')[i].checked =  false;
    }
  }
});

function devChainCD(){
  if($('input[name="cd"]')[0].checked){
     $('input[name="ct"]')[0].checked = true;
  }
}
function devChainCT(){
  if(!$('input[name="ct"]')[0].checked){
     $('input[name="cd"]')[0].checked = false;
  }
}
function inValid(message){
  $('.alert-body').html(message);
  $('#alertModal').modal('show');
}
function getCIData(vmOS,toolName){
  var CIData = {};
  toolDataForVm.forEach(function(element){
    if(element.OS == vmOS && element.tool_name == toolName){
      CIData = element;
    }
  });
  return CIData;
}