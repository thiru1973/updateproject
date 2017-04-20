var data = [
           	{
           		"technology": "Java",
           		"pipelines": [
           			{
           				"name": "Build",
           				"tool": "Ant",
           				"configuration": {
           					"Targets": "textarea",
           					"Build File": "textarea",
           					"Properties": "textarea",
           					"Java options": "textarea"
           				}
           			},
           			{
           				"name": "Build",
           				"tool": "Maven",
           				"configuration": {
           					"goals": "textarea",
           					"POM": "textarea",
           					"properties": "textarea",
           					"jvm options": "textarea",
           					"global_settingsfile": "textarea"
           				}
           			},
           			{
           				"name": "Unit Test",
           				"tool": "Junit",
           				"configuration": {
           					"Targets": "textarea",
           					"Build File": "textarea",
           					"Properties": "textarea",
           					"Java options": "textarea",
           					"test report xml": "textarea"
           				}
           			},
           			{
           				"name": "Unit Test",
           				"tool": "junit-maven",
           				"configuration": {
           					"goals": "textarea",
           					"POM": "textarea",
           					"properties": "textarea",
           					"jvm options": "textarea",
           					"global_settingsfile": "textarea",
           					"test report xml": "textarea"
           				}
           			},
           			{
           				"name": "Code Analysis",
           				"tool": "Sonarqube",
           				"configuration": {
           					"task to run": "textarea",
           					"path to project properties": "textarea",
           					"analysis properties": "textarea",
           					"additional arguments": "textarea",
           					"jvm options": "textarea"
           				}
           			},
           			{
           				"name": "Package",
           				"tool": "Nexus",
           				"configuration": {
           					"Targets": "textarea",
           					"Build File": "textarea",
           					"Properties": "textarea",
           					"Java options": "textarea",
           					"path to packages": "textarea"
           				}
           			},
           			{
           				"name": "Unit Test",
           				"tool": "maven",
           				"configuration": {
           					"goals": "textarea",
           					"POM": "textarea",
           					"properties": "textarea",
           					"jvm options": "textarea",
           					"global_settingsfile": "textarea",
           					"path to packages": "textarea"
           				}
           			}
           		]
           	},
           	{
           		"technology": ".NET",
           		"pipelines": [
           			{
           				"name": "Build",
           				"tool": "MSBuild",
           				"configuration": {
           					"msbuildfile": "textarea",
           					"commandlineargs": "textarea"
           				}
           			},
           			{
           				"name": "Unit Test",
           				"tool": "mstest",
           				"configuration": {
           					"testfiles": "textarea",
           					"testcategories": "textarea",
           					"resultfilename": "textarea",
           					"commandlineargs": "textarea",
           					"testreportTRX": "textarea"
           				}
           			},
           			{
           				"name": "Code Analysis",
           				"tool": "Sonarqube",
           				"configuration": {
           					"projectkey": "textarea",
           					"projectname": "textarea",
           					"projectversion": "textarea",
           					"additionalarguments": "textarea",
           					"windowsbatchcommand": "textarea"
           				}
           			},
           			{
           				"name": "Package",
           				"tool": "MSBuild",
           				"configuration": {
           					"msbuildfile": "textarea",
           					"commandlineargs": "textarea",
           					"path to packages": "textarea"
           				}
           			}
           		]
           	},
           	{
           		"technology": "Nodejs",
           		"pipelines": [
           			{
           				"name": "Build",
           				"tool": "mocha",
           				"configuration": {
           					"script": "textarea"
           				}
           			},
           			{
           				"name": "Unit Test",
           				"tool": "Istanbul",
           				"configuration": {
           					"script": "textarea"
           				}
           			},
           			{
           				"name": "Code Analysis",
           				"tool": "Sonarqube",
           				"configuration": {
           					"task to run": "textarea",
           					"path to project properties": "textarea",
           					"analysis properties": "textarea",
           					"additional arguments": "textarea",
           					"jvm options": "textarea"
           				}
           			}
           		]
           	}
           ];
var configTemplateData = JSON.parse(sessionStorage.getItem('configTemplate'));
var changeWizard = configTemplateData.changeWizard;
if(changeWizard){
  $('.configure-wizard li')[0].remove();
  $('.configure-wizard li')[1].remove();
  delete configTemplateData.changeWizard;
}
var pipe = ['Build','Unit Test','Code Analysis','Package'];
var select = configTemplateData['deployTemplate'][0]['cIVMs'];
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
function configDetails(data,name,tool){
  var configDetails;
  data.pipelines.forEach(item => {
		if(item.name == name && item.tool == tool) configDetails = item.configuration
	});
	return configDetails
}
function inValid(message){
   $('.alert-body').html(message);
   $('#alertModal').modal('show');
 }
var tools;
 data.forEach(function(element){
  if(element.technology == 'Java'){
    tools =  element;
  }
});
var list = getToolList(select).slice(2)
function textArea(name){
  var label = '<label for="' + name + '" class="col-xs-4 padding-zero">'+ name+ '</label>';
	var field = '<textarea class="form-control col-xs-8" rows="1" name="' + name + '" placeholder="' + name + ' ..."required></textarea>';
	var formField = '<div class="form-group col-xs-12">'
								+ label
								+ field
								+ '</div>';
  return formField;
}
var opt = list.map(function(e,i){
  return configDetails(tools,pipe[i],e)
})
var form = opt.map(function(e){
  var eachStage =[];
  for(var i in e){
    eachStage.push(textArea(i))
  }
  return eachStage
})
var tabs = '',content= '';
form.forEach(function(e,i){
  var active = '';
  if(i == 0) active = 'active'
  tabs+= '<li role="presentation" class="'+ active +'"><a href="#'+ pipe[i].replace(' ','') +'" aria-controls="'+ pipe[i] +'" role="tab" data-toggle="tab">'+ pipe[i] +'</a></li>';
  content += '<div role="tabpanel" class="pipeline-data tab-pane '+ active +'" id="'+ pipe[i].replace(' ','') +'" data-stage="'+ pipe[i] +'">'+ e.reduce(function(a,e){ return a+e},'')+'</div>';
})
var configureForms = '<div><ul class="nav nav-tabs full-width-tab" role="tablist">'+tabs + '</ul><div class="tab-content">'+ content + '</div></div>'

$('#configTemplate').append(configureForms);
$('[role=presentation]')[0].className+=' active';

function readConfigFieldData(field){
  var configFieldData = {};
  for(var i=0;i < field.length;i++){
    var stage = field[i].parentElement.parentElement.attributes['data-stage'].value
    if(!configFieldData[stage] ){
  		configFieldData[stage] = {};
  	}
    if(field[i].value){
  		configFieldData[stage][field[i].name]= field[i].value
  	} else {
  	  configFieldData = false;
  		break;
  	}
  }
  return configFieldData
}
$('#configure').click(function(){
  var field = $('.pipeline-data textarea');
  var configFieldData = readConfigFieldData(field);
  if(configFieldData){
    var i = 0;
    for(var name in configFieldData){
      for(var j=0;j<tools['pipelines'].length; j++){
        if(tools['pipelines'][j]['name'] == name && tools['pipelines'][j]['tool'] == list[i]){
          for(var configName in configFieldData[name]){
            tools['pipelines'][j]['configuration'][configName] = configFieldData[name][configName]
          }
        }
      }
      i++;
    }
    inValid('Success');
    console.log(tools);
  }else{
    inValid('Please fill all the fields for each stage');
  }
})


