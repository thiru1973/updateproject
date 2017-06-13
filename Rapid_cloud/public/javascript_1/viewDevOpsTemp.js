$("#single_node").hide();
var _ip = "http://172.29.59.65:3000";
var deployedData;
function ViewConstru(j){
	this.jd = j;
	this.docId = document.querySelector("#deployTemplate");
	this.data = {};
	this.i = 0;
	this.dt = "deployTemplate";
}
ViewConstru.prototype = {
	init:function(){
		var _self = this;
		$.getJSON(this.jd, function(d , responce){
			_self.data = d;
			templatesData = d;
			for(_self.i ; _self.i< d.length; _self.i++){
				_self.docId.innerHTML+='<article role="devTemp" class="col-xs-12 col-md-6 col-sm-3">\
									<summary role="templateDetails" class="col-xs-12 infra-template" data-templateName="'+ d[_self.i][_self.dt][0].templateName +'">\
										<table  class="table">\
											<tr>\
												<td><b>Template: </b></td>\
												<td title="'+ d[_self.i][_self.dt][0].templateName +'">'+ d[_self.i][_self.dt][0].templateName+'</td>\
											</tr>\
											<tr>\
												<td><b>Project: </b></td>\
												<td>'+d[_self.i][_self.dt][0].projectName+'</td>\
											</tr>\
											<tr>\
												<td><b>Technology: </b></td>\
												<td>'+d[_self.i][_self.dt][0].technology+'</td>\
											</tr>\
										</table>\
										<hr>\
									</summary>\
									<nav role="devopsCycle"  class="col-xs-12">\
										<ul id="'+_self.i+'"></ul>\
									</nav>\
									<h2 class="vmAPacks col-xs-12 infra-template"  data-templateName="'+ d[_self.i][_self.dt][0].templateName +'">VM and Packages</h2>\
									<summary role="packagesDetails" class="col-xs-12 infra-template" id="'+_self.i+'_vm"  data-templateName="'+ d[_self.i][_self.dt][0].templateName +'"></summary>\
								</article>';
					_self.addDevOpsCycle(_self.i);
			}
            $('#design_1').addClass('link_Prime active');
			$('#add-cloud-details').css('background', 'grey');
            $('#preview-and-deploy').css('background', 'grey');
            $('#configure-dev-ops').css('background', 'grey');
		});
	},
	sentReq: function(ev, id){
		var getD = document.getElementById("_t"+id);
		sessionStorage.setItem("Deploy_DevOps_Template",ev.title);
		sessionStorage.setItem("Deploy_DevOps_Region",getD.innerText);
		sessionStorage.setItem("Deploy_DevOps_Provider",getD.title);
		sessionStorage.setItem("Deploy_DevOps_id",id);
		location.href= location.origin+"/deployDivOpsTemplate";
		//console.log(id);
	},
	addDevOpsCycle: function(i){
		var devCy = document.getElementById(i),
			u=0;
			if(Object.keys(this.data[i][this.dt][0].cIVMs) != ""){
				devCy.innerHTML+='<li><a href="#" onclick="vt.getVmDetails(this, '+i+')">CI<span class="" aria-hidden="true"></span></a></li>';
				  u == 0 ? $("#"+i+" li a span").click() : true ;
				u++;
			}
			/*if(Object.keys(this.data[i][this.dt][0].cTVMs) != ""){
				devCy.innerHTML+='<li><a href="#" onclick="vt.getVmDetails(this, '+i+')">CT<span class="" aria-hidden="true"></span></a></li>';
				u == 0 ? $("#"+i+" li a span").click() : true ;
				u++;
			}
			if(Object.keys(this.data[i][this.dt][0].cDVMs) != ""){
				devCy.innerHTML+='<li><a href="#" onclick="vt.getVmDetails(this, '+i+')">CD<span class="" aria-hidden="true"></span></a></li>';
				u == 0 ? $("#"+i+" li a span").click() : true ;
				u++;
			}*/
	},
	getVmDetails: function(ev, id){
		//console.log(ev.text);
		event.preventDefault();
		$("#"+id+" li a span").removeClass("arrowPointer glyphicon glyphicon-triangle-top");
		ev.firstElementChild.className += "arrowPointer glyphicon glyphicon-triangle-top";
		var devOpsTyp = "cIVMs";
		ev.text == "CI" ? devOpsTyp : true ;
		ev.text == "CT" ? devOpsTyp = "cTVMs" : true ;
		ev.text == "CD" ? devOpsTyp = "cDVMs" : true ;
		document.getElementById(id+"_vm").innerHTML="";
		var k = Object.keys(this.data[id][this.dt][0][devOpsTyp]);
		for(var g=0; g< k.length; g++){
			var p = k[g];
			var addVM = document.getElementById(id+"_vm");
			0 < g ? addVM.innerHTML+='<hr>' : true;

			var oo = this.data[id][this.dt][0][devOpsTyp][p].vmPackages
			var pack = "";
			var d = 0;
			//console.log(Object.keys(oo));
			Object.keys(oo) == "" ? pack = "--" : true;
			for(var key in oo){
				if(oo[key] == true){
					d == 0 ? pack += key+"" : pack += " + "+key;
					++d;
				}
			}
			addVM.innerHTML+='<table>\
								<tr>\
									<td class="w_table"><b>Role</b></td>\
									<td>'+this.data[id][this.dt][0][devOpsTyp][p].vmRole+'</td>\
								</tr>\
								<tr>\
									<td><b>Node</b></td>\
									<td>'+this.data[id][this.dt][0][devOpsTyp][p].vmName+'</td>\
								</tr>\
								<tr>\
									<td><b>Packages</b></td>\
									<td>'+pack+'</td>\
								</tr>\
							</table>';
			}
	}
}
var vt = new ViewConstru(_ip+"/deploydbData");
	vt.init();
(function(){
  var configureTemplateData = '';
  $.ajax(_ip+ '/deployedDevops').then(function(data){
    deployedData = data;
    data.forEach(function(element,index){
      configureTemplateData += '<tr><td>'
                                + element["deployedTemplate"]["deployTemplate"][0]["templateName"]
                                + '</td><td>'
                                + element['deployedTemplate']['deployTemplate'][0]['projectName']
                                + '</td><td>'
                                + element['deployedTemplate']['deployTemplate'][0]['technology']
                                + '</td><td><a onclick="configureDeployedData('
                                + index
                                +  ')" > Configure </a></td>'
    })
  }).then(function(){
    var configureTemplate = '<table class="table table-hover">\
                                 <thead>\
                                   <tr>\
                                     <th>Template Name</th>\
                                     <th>Project Name </th>\
                                     <th>Techonlogy</th>\
                                     <th>Action</th>\
                                   </tr>\
                                 </thead>\
                                 <tbody>'
                                   +  configureTemplateData +
                                 '</tbody>\
                               </table>';
    $('#configureTemplate').append(configureTemplate);
  })
})()
var templatesData;
var selectedTemplateDetails;
var pipelineTemplate = {
  CI1 : '<ul class="col-xs-12 pipe-block"> <li>Code Repo</li> <li>Build</li></ul>',
  CI2 : '<ul class="col-xs-12 pipe-block"> <li>Code Repo</li> <li>Build</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Unit Test</li></ul>',
  CI3 : '<ul class="col-xs-12 pipe-block"> <li>Code Repo</li> <li>Build</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Unit Test</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Code Coverage</li></ul>',
  CI4 : '<ul class="col-xs-12 pipe-block"> <li>Code Repo</li> <li>Build</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Unit Test</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Code Coverage</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>Package</li> </ul>',
  CT1 : '<ul class="col-xs-12 pipe-block"> <li>SAT</li></ul>',
  CT2 : '<ul class="col-xs-12 pipe-block"> <li>SAT</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>UAT</li></ul>',
  CT3 : '<ul class="col-xs-12 pipe-block"> <li>SAT</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>UAT</li> <li class="icon"><i class="glyphicon glyphicon-arrow-right"></i></li> <li>PAT</li></ul>',
  CD1 : '<ul class="col-xs-12 pipe-block"> <li>Deployment</li> </ul>'
};
var pipelineObject;
var deployTemplateData = {};
function getTemplateDetails(templateName){
  var templateDetails;
  templatesData.forEach(function(element){
    if(element.deployTemplate[0].templateName == templateName){
      templateDetails = element;
    }
  })
  return templateDetails
}
function updateOverview(templateDetails){
  var overviewData = ''
                   + vmOverview(templateDetails.deployTemplate[0].cIVMs)
                   + pipelineOverview(templateDetails.deployTemplate[0].pipelines)
                   + toolsOverview(templateDetails.deployTemplate[0].cIVMs);
  $('.infra-overview').html(overviewData);
}
function vmOverview(vmData){
  return '<div class="col-xs-12"> <b>Vm\'s : </b>'+ Object.keys(vmData).length +'</div>';
}
function pipelineOverview(pipelineData){
  var CIpipeline = '',
      CTpipeline = '',
      CDpipeline = '';
  var CITemplate = '',
      CTTemplate = '',
      CDTemplate = '';
  for(var i in pipelineData){
    for(var j in pipelineData[i]){
      if(pipelineData[i][j] && i == 'CI'){
        CIpipeline = j;
      }else if(pipelineData[i][j] && i == 'CT'){
        CTpipeline = j;
      }else if(pipelineData[i][j] && i == 'CD'){
        CDpipeline = j;
      }
    }
  }
  switch(CIpipeline){
    case 'CI1':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI1 + '</div>';
      break;
    case 'CI2':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI2 + '</div>';
      break;
    case 'CI3':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI3 + '</div>';
      break;
    case 'CI4':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI4 + '</div>';
      break;
    default:
      CIpipeline = '';
  }
  switch(CTpipeline){
    case 'CT1':
      CTTemplate = '<div class="col-xs-12"><b>CT</b></div><div class="col-xs-12">' + pipelineTemplate.CT1 + '</div>';
      break;
    case 'CT2':
      CTTemplate = '<div class="col-xs-12"><b>CT</b></div><div class="col-xs-12">' + pipelineTemplate.CT2 + '</div>';
      break;
    case 'CT3':
      CTTemplate = '<div class="col-xs-12"><b>CT</b></div><div class="col-xs-12">' + pipelineTemplate.CT3 + '</div>';
      break;
    default:
      CTTemplate = '';
  }
  switch(CDpipeline){
    case 'CD1':
      CDTemplate = '<div class="col-xs-12"><b>CD</b></div><div class="col-xs-12">' + pipelineTemplate.CD1 + '</div>'
      break;
    default:
      CDpipeline = '';
  }
  return '<div class="col-xs-12"><b>Pipelines</b><div>'+CITemplate + CTTemplate + CDTemplate;
}
function toolsOverview(toolsData){
  var toolList = getToolList(toolsData);
  var elements = toolList.map(function(element){
    return '<img class="tool-images" src="/images_1/'+ element.toLowerCase() +'.png" />'
  })
  return '<div class="col-xs-12"><div class="col-xs-12"><b>Tools</b></div>' + elements.join('') + '</div>';
}
function getToolList(toolsData){
  var toolList = [];
  for (var i in toolsData) {
    if (i == 0) {
      var toolWithNoVm = toolsData[i].vmPackages['CI_Data']['add_pkgs'];
      for (var j in toolWithNoVm) {
        toolList.push(Object.values(toolWithNoVm[j])[0]);
      }
      toolList.splice( 1, 0, toolsData[i].vmPackages.name);
    } else {
      toolList.push(toolsData[i].vmPackages.name);
    }
  }
  return toolList
}
function inValid(message){
  //To be changes with new design
  $('.alert-body').html(message);
  $('#alertModal').modal('show');
}
function cloudServiceData(url){
  var cloudService = [];
  $.getJSON(_ip + url)
   .then(function(data){
     data.forEach(function(data){
       cloudService.push('<option value="'+ data['cloud_name'] +'">'+ data['cloud_name'] +'</option>');
     })
     $('#cloudService').append(cloudService);
   })
}
function storageAccountData(url){
  var  storageAccount = [];
  $.getJSON(_ip + url)
   .then(function(data){
     data.forEach(function(data){
       storageAccount.push('<option value="'+ data['storagename'] +'">'+ data['storagename'] +'</option>');
     })
     $('#storageAccount').append(storageAccount);
   });
}
function classicalModel(){
  return '<form class="form-horizontal network-config-content classical-model-content">\
            <div class="form-group">\
              <div class="col-md-6 col-sm-12 padding-zero custom-btm-mrgn">\
                <label for="cloudService" class="col-xs-5 padding-zero">Cloud Service</label>\
                <div class="col-xs-5 padding-zero">\
                  <select id="cloudService" class="form-control" name="cloud_service">\
                     <option value="0">Select Cloud Service</option>'
                  +  cloudServiceData('/list_cloud_service')  +
                  '</select>\
                </div>\
                <button type="button" id="addNewCloudService" class="small-btn btn col-xs-2" data-toggle="modal" data-target="#deployDevOps">Add</button>\
              </div>\
              <div class="col-md-6 col-sm-12 padding-zero custom-btm-mrgn">\
                <label for="storageAccount" class="col-xs-5 padding-zero">Storage Account</label>\
                <div class="col-xs-5 padding-zero">\
                  <select id="storageAccount" class="form-control" name="storage_account">\
                    <option value="0">Select Storage Account</option>'
                  +  storageAccountData('/getAzureStg')  +
                  '</select>\
                </div>\
                <button type="button" id="addNewStorageAccount" class="small-btn btn col-xs-2" data-toggle="modal" data-target="#deployDevOps">Add</button>\
              </div>\
            </div>\
          </form>';
}
function resourceGroupModel(){
  return '<form class="form-horizontal network-config-content resource-model-content hidden">\
            <div class="form-group">\
              <div class="col-md-6 col-sm-12 padding-zero custom-btm-mrgn">\
                <label for="resGroup" class="col-xs-6 padding-zero">Resource Group</label>\
                <div class="col-xs-6 padding-zero">\
                  <select id="resGroup" class="form-control">\
                    <option value="0">Select Resource Group</option>\
                  </select>\
          		  </div>\
          	  </div>\
            </div>\
            <div class="form-group custom-btm-mrgn">\
              <div class="col-md-6 col-sm-12 padding-zero custom-btm-mrgn">\
                <label for="virNetwork" class="col-xs-6 padding-zero">Virtual Network</label>\
                <div class="col-xs-6 padding-zero">\
                  <select id="virNetwork" class="form-control">\
                    <option value="0">Select Virtual Network</option>\
                  </select>\
                </div>\
              </div>\
              <div class="col-md-6 col-sm-12 padding-zero custom-btm-mrgn">\
                <label for="subnet" class="col-xs-6 padding-zero">Subnet</label>\
                <div class="col-xs-6 padding-zero">\
                  <select id="subnet" class="form-control">\
                    <option value="0">Select Subnet</option>\
                  </select>\
                </div>\
              </div>\
            </div>\
          </form>';
}
function getAzureTemplate(){
  var environmentTemplate = '<div class="col-xs-12 custom-spacing">\
                               <div class="col-md-8">\
                                 <div class="col-md-4">\
                                   <label for="environment">Environment</label>\
                                 </div>\
                                 <div class="col-md-6">\
                                   <input type="text" class="form-control" id="environment" name="environment" required/>\
                                 </div>\
                               </div>\
                             </div>';
  var deploymentTemplate = '<div class="col-xs-12">\
                               <div class="col-xs-12 content-title content-title-heading custom-spacing">Deployment Model</div>\
                               <div class="col-xs-6"><label class="deploy-model custom-spacing" ><input type="radio" name="model" value="resourceModel" />Resource Model</label></div>\
                               <div class="col-xs-6"><label class="deploy-model custom-spacing"><input type="radio" name="model" value="classicalModel" checked/>Classical Model</label></div>\
                             </div>\
                             <div class="col-xs-12 custom-spacing content-title content-title-heading">Network Configuration</div>\
                             <div class="col-xs-12 custom-spacing">'
                             + resourceGroupModel()
                             + classicalModel()
                             + '</div>';
  return '<div class="cloud-details">'
         + environmentTemplate
         + deploymentTemplate
         + '</div>';
}
function getAWSTemplate(){
  var environmentTemplate = '<div class="col-md-12 ">\
                               <div class="col-md-8">\
                                 <div class="col-md-4">\
                                   <label for="environment">Environment</label>\
                                 </div>\
                                 <div class="col-md-6">\
                                   <input type="text" class="form-control" id="environment" name="environment" required/>\
                                 </div>\
                               </div>\
                             </div>';
  var networkConfigTemplate = '<div class="col-xs-12">Network Configuration</div>\
                                  <form class="form-horizontal">\
                                     <div class="form-group">\
                                       <label for="virNetwork" class="col-sm-2">VPC</label>\
                                      <div class="col-sm-2">\
                                        <select id="vpc" class="form-control col-sm-2">\
                                          <option value="0">Select VPC</option>\
                                        </select>\
                                      </div>\
                                      <label for="subnet" class="col-sm-2">Subnet</label>\
                                      <div class="col-sm-2">\
                                        <select id="subnet" class="form-control col-sm-2">\
                                          <option value="0">Select Subnet</option>\
                                        </select>\
                                      </div>\
                                      <label for="securityGroup" class="col-sm-2">Security Group</label>\
                                      <div class="col-sm-2">\
                                        <select id="securityGroup" class="form-control col-sm-2">\
                                          <option value="0">Select Security Group</option>\
                                        </select>\
                                      </div>\
                                     </div>\
                                   </form>';
  return '<div class="cloud-details">'
         + environmentTemplate
         + networkConfigTemplate
         + '</div>';
}
function cloudDetails(){
  var templateData =  selectedTemplateDetails.deployTemplate[0];
  var cloud = templateData.cloud;
  if(cloud == 'Azure'){
     var azureCloudDetailsTemplate = getAzureTemplate();
     $('#templates').append(azureCloudDetailsTemplate);
  }else if(cloud == 'AWS'){
    var awsCloudDetailsTemplate = getAWSTemplate()
    $('#templates').append(awsCloudDetailsTemplate);
  }else{
    inValid('Please select some other template as there is no support for currently selected cloud')
  }
  var overviewTemplate = '<div class="cloud-detail-overview">'
                           + '<h7 class="col-xs-12"><b>DevOps Infra : </b>' + templateData.templateName + '</h7>'
                           + '<h7 class="col-xs-12"><b>Cloud: </b>' + cloud + '</h7>'
                           + '<h7 class="col-xs-12"><b>Tools: </b>' + getToolList(templateData.cIVMs).toString() + '</h7>'
                           + '<h7 class="col-xs-12"><b>Nodes : </b>' + Object.keys(templateData.cIVMs).length + '</h7>'
                           +'</div>';
  $('.selection-overview').append(overviewTemplate);
}
function addPipelines(){
  $('.add-data').attr('id','addPipelines')
  var otherPipeline = []
  for(var i in pipelineObject){
    otherPipeline.push('<label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="'+ i.toLowerCase() +'-pipeline" value="'+ i +'">'+pipelineObject[i]+'</label>')
  }
  $('#deployModalLabel').html('Add Pipelines');
  $('.modal-body').html(otherPipeline)
}
function addTools(){
  $('.add-data').attr('id','addTools')
  var otherTools = [];
  $('#deployModalLabel').html('Add Tools');
  $('.modal-body').html(otherTools)
}
function previewAndDeploy(){
  pipelineObject = Object.assign({},pipelineTemplate);
  var data = selectedTemplateDetails.deployTemplate[0];
  var pipeline = data.pipelines;
  var deployPipeline = [];
  var toolsData = '';
  for( var i in pipeline){
    for(var j in pipeline[i]){
      if(pipeline[i][j]){
        deployPipeline.push('<label class="col-xs-12 pipeline-label"> <input type="checkbox" class="col-xs-2" name="'+ j.toLowerCase() +'-pipeline" value="'+ j +'">'+pipelineObject[j]+'</label>');
        delete pipelineObject[j];
      }
    }
  }
  getToolList(data.cIVMs).forEach(function(element){
    toolsData += '<label class="tool-label">\
                      <img class="col-xs-12" src="/images_1/'+ element +'.png">\
                      <figcaption>'+ element +'</figcaption>\
                      <input type="checkbox" name="tool" value="'+ element +'" class="col-xs-12 hidden">'+
                    '</label>';
  })
  var pipelinesTemplate = '<div class="panel panel-default">\
                             <div class="panel-heading content-title-heading">Pipelines <div class="pull-right"><a onclick="addPipelines()" data-toggle="modal" data-target="#deployDevOps">Add pipelines</a></div></div>\
                             <div class="panel-body deploy-pipelines">'
                             + deployPipeline
                             + '</div></div>';
   var toolsTemplate = '<div class="panel panel-default">\
                           <div class="panel-heading content-title-heading">Tools <div class="pull-right"><a onclick="addTools()" data-toggle="modal" data-target="#deployDevOps">Add Tools</a></div></div>\
                           <div class="panel-body deploy-tools">'
                           + toolsData
                           + '</div></div>';
   var deployTemplate = '<div class="col-xs-12 preview-deploy">'
                        + pipelinesTemplate
                        + toolsTemplate
                        + '</div>';
  $('#templates').append(deployTemplate);
}
function createNewNeworkConfig(title,id,region){
  return '<table style="width:100%;">\
            <tr>\
              <td>\
                <span>Region</span>\
                <br>\
                <input type="Text" id="regionInput" disabled="disabled" value="'+ region +'" style="width:75%;">\
              </td>\
              <td>&nbsp;</td>\
              <td>\
                <span>' + title + '</span>\
                <br>\
                <input type="Text" id="'+ id +'" style="width:75%;">\
              </td>\
              <td></td>\
              <td></td>\
            </tr>\
          </table>';
}
function deployAndExit(){
    console.log(deployTemplateData);
  $.post('http://172.29.59.62:3000/deployDevopsData',{data:JSON.stringify(deployTemplateData)})
  .then(success,error);
  function success(data){
    inValid(data);
    location.pathname = '/deployPipelines';
  }
  function error(e){
    inValid('Failed to Send Data');
  }
}
function deployAndConfigure(){
  $.post('http://172.29.59.62:3000/deployDevopsData',{data:JSON.stringify(deployTemplateData)})
  .done(function(){
    inValid('Deployed successfully. Configure the pipeline...');
    location.pathname = '/configureDevOps';
  })
  .fail(function(e){
    inValid(JSON.stringify(e));
  });
}
String.prototype.firstLetterCapital = function(){
  return this.split('_')
             .reduce(function(acc, val){
                       return acc[0].toUpperCase()
                            + acc.substr(1)
                            + ' '
                            + val[0].toUpperCase()
                            +val.substr(1);
             });
}
$('#cancelDedicated').click(function(){
  location.pathname = '/deployPipelines';
})
$('#templates').on('click', '.infra-template', function(){
  $('article').removeClass('temp-selected');
  this.parentElement.className += ' temp-selected';
  var templateName = this.attributes['data-templateName'].value;
  selectedTemplateDetails = getTemplateDetails(templateName);
  updateOverview(selectedTemplateDetails);
})
$('#cloudDetails').click(function(){
  var selectionStatus = $('.temp-selected')[0];
  if(selectionStatus){
    deployTemplateData.deployTemplate = selectedTemplateDetails.deployTemplate;
    $('.step1, .infrastructure, .infra-overview').addClass('hidden');
    $('.step2').removeClass('hidden');
    $('.step2').removeClass('hidden');
    $('.deploy-wizard1 li')[1].className = 'done';
    cloudDetails();
  } else{
    inValid('Select any template first')
  }
})
$('#backInfrastructure').click(function(){
  $('.step2').addClass('hidden');
  $('.cloud-detail-overview, .cloud-details').remove();
  $('.deploy-wizard1 li')[1].className = '';
  $('.step1, .infrastructure, .infra-overview').removeClass('hidden');
})
$('#templates').on('click', '.deploy-model', function(){
  //$('.deploy-model input').each(function () { this.checked = !this.checked; });
  if($('.deploy-model input:checked')[0].value == 'classicalModel'){
    $('.classical-model-content').removeClass('hidden');
    $('.resource-model-content').addClass('hidden')
  }else{
    $('.classical-model-content').addClass('hidden');
    $('.resource-model-content').removeClass('hidden')
  }
})
$('#previewDeploy').click(function(){
  var valid = false;
  var environment = $('#environment')[0].value;
  var networkConfigFields = $('.network-config-content:visible select');
  //var networkConfigData = {};
  $('.selection-overview').append('<div class="network-config-overview col-xs-12"><div class="col-xs-12"><b>Network Configuration</b></div></div>');
  for(var i = 0; i < networkConfigFields.length; i++){
    if(networkConfigFields[i].value && networkConfigFields[i].value != '0'){
      deployTemplateData[networkConfigFields[i].name] = networkConfigFields[i].value;
      $('.network-config-overview').append('<div class="col-xs-12 nework-config-overview-field"><b>'
                                           + networkConfigFields[i].name.firstLetterCapital()
                                           + ' : </b>'
                                           + networkConfigFields[i].value
                                           + '</div>');
      valid = true;
    } else {
      valid = false;
      break;
    }
  }
  if(environment == ''){
    valid = false;
  }
  if(valid){
    $('.step2, .cloud-details, .infra-overview').addClass('hidden');
    $('.step3').removeClass('hidden');
    $('.deploy-wizard1 li')[2].className = 'done';
    previewAndDeploy();
  } else{
    $('.network-config-overview').remove();
    inValid('Please select all fields')
  }
})
$('#backCloudDetails').click(function(){
  $('.step3').addClass('hidden');
  $('.network-config-overview').remove();
  $('.preview-deploy').remove();
  $('.deploy-wizard1 li')[2].className = '';
  $('.step2, .cloud-details').removeClass('hidden');
})
$('.modal').on('click', '#addPipelines', function(){
  var checkedPipeline = $('.popup-body input:checked');
  for( var i = 0; i < checkedPipeline.length; i++){
    checkedPipeline[i].checked = false;
    $('.deploy-pipelines').append(checkedPipeline[i].parentElement);
    delete pipelineObject[checkedPipeline[i].value];
  }
})
$('#templates').on('click', '#addNewCloudService', function(){
  $('#deployModalLabel').html('Create Cloud Service ');
  $('.add-data').attr('id','addCloudBtn');
  $('.popup-body').html(createNewNeworkConfig('	Cloud Service Name','newCloudService', selectedTemplateDetails.deployTemplate[0].region))
})
$('#templates').on('click', '#addNewStorageAccount', function(){
  $('#deployModalLabel').html('Create New Storage Account');
  $('.add-data').attr('id','addStorageBtn');
  $('.popup-body').html(createNewNeworkConfig('Account Name','newStorageAccount', selectedTemplateDetails.deployTemplate[0].region))
})
$('.modal').on('click', '#addCloudBtn', function(){
  var newCloudService = $('#newCloudService')[0].value;
  var data = {
    name: newCloudService,
    location: selectedTemplateDetails.deployTemplate[0].region,
    account: localStorage.getItem('Account'),
    project: localStorage.getItem('ProjectName'),
    product: localStorage.getItem('ProductName')
  };
  $.post( _ip + '/create_cloud_service',data)
    .then(success,error);
  function success(data){
    inValid('Cloud Service Added')
    $('#cloudService').append('<option value="' + newCloudService + '">' + newCloudService + '</option>');
  }
  function error(e){
    inValid('Failed to add Cloud Service');
  }
})
$('.modal').on('click', '#addStorageBtn', function(){
  var newStorageAccount = $('#newStorageAccount')[0].value;
  var data = {
    name: newStorageAccount,
    location: selectedTemplateDetails.deployTemplate[0].region,
    account: localStorage.getItem('Account'),
    project: localStorage.getItem('ProjectName'),
    product: localStorage.getItem('ProductName')
  };
  $.post( _ip + '/straccount',data)
    .then(success,error);
  function success(data){
    inValid('Cloud Service Added')
    $('#storageAccount').append('<option value="' + newStorageAccount + '">' + newStorageAccount + '</option>');
  }
  function error(e){
    inValid('Failed to add Storage Account');
  }
})
$('#DeployAndExit').click(function(){
  var pipelinesSelected = $('.deploy-pipelines .pipeline-label input:checked');
  //var toolsSelected = $('.deploy-tools .tool-label input:checked');
  if(pipelinesSelected.length != 0/* && toolsSelected.length != 0*/){
    deployAndExit();
  }else{
    inValid('Select Pipeline and Tools');
  }
})
$('#configure').click(function(){
  var pipelinesSelected = $('.deploy-pipelines .pipeline-label input:checked');
  var toolsSelected = $('.deploy-tools .tool-label input');
  if(pipelinesSelected.length != 0 /*&& toolsSelected.length != 0*/){
    sessionStorage.setItem('configTemplate',JSON.stringify(selectedTemplateDetails));
    deployAndConfigure();
  }else{
    inValid('Select Pipeline and Tools');
  }
})
$('#configureTemplateTab').click(function(){
  $('.overview').hide();
  $('#DevOpsStages').addClass('hidden');
  $('.line-seperator').addClass('hidden');
  $('#cloudDetails').addClass('hidden');
  $('#templates').removeClass('col-sm-7').addClass('col-xs-12');
})
$('#deployTemplateTab').click(function(){
  $('#templates').removeClass('col-xs-12').addClass('col-sm-7');
  $('.overview').show();
  $('.line-seperator').removeClass('hidden');
  $('#cloudDetails').removeClass('hidden');
  $('#DevOpsStages').removeClass('hidden');
})
function configureDeployedData(index){
  var configureData = $.extend({},deployedData[index]['deployedTemplate'])
  configureData['_id'] = deployedData[index]['_id']
  sessionStorage.setItem('configTemplate',JSON.stringify(configureData));
  location.pathname = '/configureDevOps';
}