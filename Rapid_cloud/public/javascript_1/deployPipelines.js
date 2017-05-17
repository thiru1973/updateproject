var deployDataFormat = {
  "_id": "",
  "changeWizard": true,
  "deployTemplate": [
     {
        "templateName": "Sonata_Account",
        "projectName": localStorage.getItem('ProjectName'),
        "productName": localStorage.getItem('ProductName'),
        "technology": "Java",
        "cloud": "Azure",
        "pipelines": {
           "CI": {
              "CI1": false,
              "CI2": false,
              "CI3": false,
              "CI4": false
           }
        },
        "cIVMs": {
           "0": {
              "vmPackages": {
                 "CI_Data": {
                    "add_pkgs": [
                       {
                          "code_repository": "Github"
                       },
                       {
                          "build_tool": "Ant"
                       },
                       {
                          "unittest_tool": "Junit"
                       }
                    ]
                 },
                 "name": "Jenkins",
                 "type": "build_server",
                 "vm_req": true
              }
           },
           "1": {
              "vmPackages": {
                 "CI_Data": {
                    "add_pkgs": [
                       {}
                    ]
                 },
                 "name": "Sonarqube",
                 "type": "code_quality",
                 "vm_req": true
              }
           },
           "2": {
              "vmPackages": {
                 "CI_Data": {
                    "add_pkgs": [
                       {}
                    ]
                 },
                 "name": "Nexus",
                 "type": "package_manager",
                 "vm_req": true
              }
           }
        },
        "cTVMs": {},
        "cDVMs": {},
        "region": ""
     }
  ]
};
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
var toolOverviewList = ['Github','Jenkins','Ant','Junit','Sonarqube','Nexus'];
var selectedToolOverview = [];
function CIStage1(){
  deployDataFormat.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'].splice(2,1);
  delete deployDataFormat.deployTemplate[0].cIVMs[1];
  delete deployDataFormat.deployTemplate[0].cIVMs[2];
}
function CIStage2(){
  delete deployDataFormat.deployTemplate[0].cIVMs[1];
  delete deployDataFormat.deployTemplate[0].cIVMs[2];
}
function CIStage3(){
  delete deployDataFormat.deployTemplate[0].cIVMs[2];
}
function buildCIData(pipeline){
  switch(pipeline){
    case 'CI3':
      CIStage3();
      break;
    case 'CI2':
      CIStage2();
      break;
    case 'CI1':
      CIStage1();
      break;
    default:
  }
}
function buildDeployData(ciPipeline){
  buildCIData(ciPipeline);
}
function alertMessage(message){
  $('.alert-body').html(message);
  $('#alertModal').modal('show');
}
function pipelineOverview(pipelineData){
  var CIpipeline = '',
      CTpipeline = '',
      CDpipeline = '';
  var CITemplate = '',
      CTTemplate = '',
      CDTemplate = '';
  for(var i = 0 ;i < pipelineData.length; i++){
    if(pipelineData[i].value.substr(0,2) == 'CI' && pipelineData[i].checked){
      CIpipeline = pipelineData[i].value;
    }else if(pipelineData[i].value.substr(0,2) == 'CT' && pipelineData[i].checked){
      CTpipeline = pipelineData[i].value;
    }else if(pipelineData[i].value.substr(0,2) == 'CD' && pipelineData[i].checked){
      CDpipeline = pipelineData[i].value;
    }
  }
  switch(CIpipeline){
    case 'CI1':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI1 + '</div>';
      selectedToolOverview = toolOverviewList.slice(0,3);
      break;
    case 'CI2':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI2 + '</div>';
      selectedToolOverview = toolOverviewList.slice(0,4);
      break;
    case 'CI3':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI3 + '</div>';
      selectedToolOverview = toolOverviewList.slice(0,5);
      break;
    case 'CI4':
      CITemplate = '<div class="col-xs-12"><b>CI</b></div><div class="col-xs-12">' + pipelineTemplate.CI4 + '</div>';
      selectedToolOverview = toolOverviewList;
      break;
    default:
      CIpipeline = '';
      selectedToolOverview = [];
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
function toolsOverview(tools){
  var toolImages = tools.map(function(tool){
    return '<img class="" src="/images_1/'+ tool + '.png" />';
  })
  return '<div class="col-xs-12"><b>Tools</b></div><div class="col-xs-12">' + toolImages.join('') + '</div>';
}
$('#dedicatedDeploy').click(function(){
  location.pathname = '/viewDevOpsTemplate'
})
$('#commonDeploy').click(function(){
  $('.deploy-type').addClass('hidden');
  $('#dedicated-layout').removeClass('hidden');
})
$('.deploy-selection').click(function(){
  $('.deploy-type').removeClass('hidden');
  $('#dedicated-layout').addClass('hidden');
})

$('#configure').click(function(){
  var ciPipelinesSelected = $('.pipeline-label.ci input:checked');
  if(ciPipelinesSelected.length){
    var ciPipelineSelected = ciPipelinesSelected[ciPipelinesSelected.length-1].value;
    buildDeployData(ciPipelineSelected);
    sessionStorage.setItem('configTemplate',JSON.stringify(deployDataFormat));
    location.pathname = '/configureDevOps';
  }else{
    alertMessage('Select any pipelines');
  }
})

$('#ctContent input').click(function() {
   if(!$('input[name="ci4-pipeline"]:checked').val()){
     this.checked = false;
     alertMessage('Select maximum pipelines in CI pipeline');
   }
});
$('#cdContent input').click(function() {
   if(!$('input[name="ct3-pipeline"]:checked').val()){
     this.checked = false;
     alertMessage('Select maximum pipelines in CT pipeline');
   }
});
$('input[name="ci4-pipeline"]').click(function() {
  if(!$('input[name="ci4-pipeline"]:checked')[0]){
    for (var i in $('#ctContent input')){
      $('#ctContent input')[i].checked =  false;
    }
    for (var i in $('#cdContent input')){
      $('#cdContent input')[i].checked =  false;
    }
  }
});
$('input[name="ct3-pipeline"]').click(function() {
  if(!$('input[name="ct3-pipeline"]:checked')[0]){
    for (var i in $('#cdContent input')){
      $('#cdContent input')[i].checked =  false;
    }
  }
});
$('.pipeline-label input').click(function(){
  var pipelineTemplate = pipelineOverview($('.pipeline-label input'));
  var toolTemplate = toolsOverview(selectedToolOverview);
  $('.pipeline-overview').html(pipelineTemplate);
  $('.tools-overview').html(toolTemplate);
})