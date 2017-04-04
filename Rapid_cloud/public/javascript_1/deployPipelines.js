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
function CIStage1(){
  delete deployDataFormat.deployTemplate[0].cIVMs[0]['vmPackages']['CI_Data']['add_pkgs'][2]
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
    alert('Select any pipelines');
  }
})