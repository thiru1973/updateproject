
var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , manage = require('./routes/manage')
  , view = require('./routes/view')
  , project = require('./routes/project')
  , manage_node = require('./routes/manage_nodes')
  , secGroups = require('./routes/secGroup')
  , account = require('./routes/accounts')
  , resources = require('./routes/resource')
  , jenkins = require('./routes/jenkins')
  , sonar = require('./routes/sonar')
  , nexus = require('./routes/nexus')
  , monitors = require('./routes/monitors')
  , http = require('http')
  , path = require('path')
  , multer = require('multer');


var app = express();
//var monitor = require('node-monitor');// insert monitor module-plugin
//monitor.Monitor(server); //add server to monitor

// all environments
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
//POC
app.get('/oauth', view.oauth);
app.post('/authentication', view.authentication);
app.post('/gmail', view.gmail);
app.get('/oauth2callback', view.oauth2callback);
app.post('/getToken', view.getToken);
app.post('/getRoles', view.getRoles);
//New page functions
app.get('/master_2', routes.master_2);
app.get('/create_template', routes.create_template);
app.get('/assignNode', routes.assignNode);
app.get('/deployTemplate', routes.deployTemplate);
app.get('/views/index1.html', routes.index1);
app.get('/vpc', routes.vpc);
app.get('/subnet', routes.subnet);
app.get('/keyPair', routes.keyPair);
app.get('/localNetworkGateWay', routes.localNetworkGateWay);
app.get('/internetGateWay', routes.internetGateWay);
app.get('/vpnConnection', routes.vpnConnection);
app.get('/DNSZone', routes.DNSZone);
app.get('/endPoint', routes.endPoint);
app.get('/virtualNetworkGatway', routes.virtualNetworkGatway);

app.get('/securityGroup', routes.securityGroup);
app.get('/routeTable', routes.routeTable);

app.get('/myAccount', routes.myAccount);
//design devops template
app.get('/designDevOpsTemp', routes.designDevOpsTemp);

//Old page functions
app.get('/master', routes.master);
app.get('/', routes.index);
app.get('/next', routes.next);
app.get('/proj', routes.proj);
app.get('/drop_down', routes.drop_down);
app.post('/filter', routes.filter);
app.get('/create', routes.create);
app.get('/tmplt_pg', routes.tmplt_pg);
app.get('/tmplt_create', routes.tmplt_create);
app.get('/all_nodes', routes.all_nodes);

//controller for schedule VM's
app.post('/scheduleService', routes.scheduleService);

app.get('/manage', manage.manage);
app.get('/deploy', manage.deploy);
app.post('/deploy_data', manage.deploy_data);
app.get('/manage_env', manage.manage_env);
app.get('/create_vpc', manage.create_vpc);
app.post('/vpc', manage.vpc);
app.post('/subnet', manage.subnet);
app.post('/routeTable', manage.routeTable);
app.post('/gateWay', manage.gateWay);
app.post('/createStorage', manage.createStorage);
app.post('/createSecGroup', manage.createSecGroup);
app.post('/createKeyPair', manage.createKeyPair);
app.post('/deployTemplate', manage.deployTemplate);
app.post('/softwareTool', manage.softwareTool);

app.get('/actions', manage.actions);
app.get('/vpc_deploy',manage.vpc_deploy);
app.get('/subnet_deploy',manage.subnet_deploy);
app.get('/project',manage.project);
app.post('/store_template',manage.store_template);
app.get('/new_template',routes.new_template);
app.get('/manage_template',routes.manage_template);
app.get('/preview', view.preview);
app.post('/viewdata',view.viewdata);
app.post('/temp_image', routes.temp_image);
app.post('/temp_image1', routes.temp_image1);
app.post('/temp_region', routes.temp_region);
app.post('/temp_store', routes.temp_store);
app.get('/create_template2', routes.create_template2);
app.get('/nodes_details', routes.nodes_details);
app.post('/pvd_template', routes.pvd_template);
app.post('/gen_template', routes.gen_template);
app.get('/pvd_check', routes.pvd_check);
//app.get('/project_page', project.project_page);
//app.get('/project_view', project.project_view);


app.get('/gen_view', view.gen_view);
app.get('/my_view', view.my_view);
app.post('/node_store', view.node_store);
app.get('/name_check', view.name_check);
app.get('/create_org_temp', view.create_org_temp);

//app.get('/core', routes.core);

app.get('/org_temp', view.org_temp);
//app.get('/org_temp', view.org_temp);
app.get('/vpc_deploy',manage.vpc_deploy);
app.post('/filter_env',manage.filter_env);
app.post('/filter_env2',manage.filter_env2);
app.post('/popup_nodes',manage.popup_nodes);
app.post('/node_details',manage.node_details);
app.post('/node_detailsManage',manage.node_detailsManage);
app.post('/manage_env_nodes',manage.manage_env_nodes);
app.get('/cloud_service',routes.cloud_service);
app.get('/prod_stage',routes.prod_stage);
app.post('/create_cloud_service',routes.create_cloud_service);
app.get('/cloudname',routes.cloudname);
app.get('/azure_size',routes.azure_size);
app.get('/azure_image',routes.azure_image);
app.post('/cloud_project',manage.cloud_project);
app.post('/create_deploy_slot',routes.create_deploy_slot);
app.post('/filter_slot',manage.filter_slot);
app.get('/list_cloud_service',manage.list_cloud_service);

//New manage screen
//app.get('/manageEnv', manage.manageEnv);
app.get('/manageEnv', manage.manageEnv);
app.get('/loadBalance', manage.loadBalance);
app.get('/manageVolumes', manage.manageVolumes);
app.get('/securityGroupManage', manage.securityGroupManage);
app.get('/trafficManager', manage.trafficManager);
app.get('/nodeTemplates', routes.nodeTemplates);
app.get('/accountTemplates', routes.accountTemplates);

//Manage stg, sec, kp
app.get('/volumeDetails1', manage.volumeDetails1);
app.post('/keyPairDetails', manage.keyPairDetails);
app.get('/secGrpDetails', manage.secGrpDetails);
app.post('/attachVolume', manage.attachVolume);
app.get('/attachKeyPair', manage.attachKeyPair);
app.get('/attachSecGrp', manage.attachSecGrp);
app.post('/deleteSecGrp',manage.deleteSecGrp);
app.post('/deleteVol', manage.deleteVol);
app.post('/attachVol', manage.attachVol);
app.post('/azureLoad',manage.azLoadBalancer);
app.post('/straccount', manage.straccount);
app.post('/azureEndPoint', manage.azureEndPoint);
app.post('/trafficManage', manage.trafficManage);
app.post('/blobUpload', manage.blobUpload);
app.get('/getAzureStg', manage.getAzureStg);
app.get('/getSecurity', manage.getSecurity);
app.get('/getRouteTable', manage.getRouteTable);
app.get('/getInetGateWay', manage.getInetGateWay);
app.get('/getKeypair', manage.getKeypair);
//Accounts
app.get('/accounts', account.accounts);
app.get('/login', account.login);
app.post('/validate', manage.validate);
app.post('/fileupload', manage.fileupload);
app.get('/accountDetails', manage.accountDetails);
app.post('/runScript', account.runScript);
app.post('/createProject', manage.createProject);
app.post('/createProduct', manage.createProduct);
app.post('/createAccount', manage.createAccount);
app.get('/download', account.download);
app.get('/downloadKp', manage.downloadKp);
app.post('/storeAwsSub', manage.storeAwsSub);
app.post('/loadBalancerCreate', manage.loadBalancerCreate);
//resource group services
app.post('/createGroup', manage.createGroup);
app.get('/createVnet', manage.createVnet);
app.post('/createSubnet', manage.createSubnet);
app.post('/createSecGrp', manage.createSecGrp);
app.post('/createRtTable', manage.createRtTable);
app.post('/createLclNetGtWay', manage.createLclNetGtWay);
app.post('/createDns', manage.createDns);
app.post('/createEndPoint', manage.createEndPoint);
app.post('/createVnetGWay', manage.createVnetGWay);
app.get('/attachDisk', resources.attachDisk);
app.get('/getResource', manage.getResource);
app.get('/getVnet', manage.getVnet);
app.get('/getSubnet', manage.getSubnet);
app.post('/deployResource', manage.deployResource);

app.get('/multicloud', routes.multicloud);
//DevOps
app.get('/configureDevOps', routes.configureDevOps);
app.post('/devopsTemplate', resources.devopsTemplate);
app.get('/devopsTemp', resources.devopsTemp);
app.post('/saveDevopsTemplate', resources.saveDevopsTemplate);
app.get('/createDevTemp', account.createDevTemp);
app.get('/viewDevOpsTemplate', routes.viewDevOpsTemplate);
app.get('/deployPipelines', routes.deployPipelines);
app.get('/deploydbData', resources.deploydbData);
app.get('/deployDivOpsTemplate', routes.deployDivOpsTemplate);
app.get('/appTechnologies', resources.appTechnologies);
app.post('/appTools', resources.appTools);
app.get('/deployedDevops', resources.deployedDevops);
//Product Templates
app.get('/viewProductTemplate', routes.viewProductTemplate);
app.get('/deployProductTemplate', routes.deployProductTemplate);


//Resource group actions
app.post('/resGroup_action', manage.resGroup_action);
//Get the provider name
app.post('/getSubProviders', view.getSubProviders);
//Sync the vm details to datbase
app.post('/upadatevm_details', manage.upadatevm_details);
app.get('/importvm',view.importvm);
app.post('/getvms', view.getvms);
app.post('/syncVmData', view.syncVmData);

app.get('/deployStatus', view.deployStatus);
app.post('/importSubscription', view.importSubscription);

//Jenkins services
app.get('/pipelinelist', jenkins.pipelinelist);
app.post('/jenkinsJob', jenkins.jenkinsJob);
app.post('/pipelineviewdata', jenkins.pipelineviewdata);
app.get('/pipelineview', jenkins.pipelineview);
app.get('/projectTech', jenkins.projectTech);
app.post('/getBuild', jenkins.getBuild);
app.post('/buildPipe', jenkins.buildPipe);
app.post('/getBuildLog', jenkins.getBuildLog);

//sonarqube services
app.get('/sonarProject', sonar.sonarProject);
app.get('/sonarPrjList', sonar.sonarPrjList);
app.get('/sonarView', sonar.sonarView);
app.get('/nexusView', nexus.nexusView);
app.post('/nexusaf', nexus.nexusaf);
app.get('/nexusafView', nexus.nexusafView);
app.post('/nexusstatus', nexus.nexusstatus);

app.get('/monitor', monitors.monitor);
app.post('/zabbixHost', monitors.zabbixHost);
app.get('/openzabbix', monitors.openzabbix);

app.get('/uploadJson', jenkins.uploadJson);
app.get('/demoJenkins', jenkins.demoJenkins);
app.post('/uploadConfJson', jenkins.uploadConfJson);
app.post('/getDedicatedDevops', jenkins.getDedicatedDevops);
var AuthenticationContext = require('adal-node').AuthenticationContext;
var crypto = require("crypto")


var clientId = 'b25d0c71-946f-4450-9c3a-c3f112d869a7';
var clientSecret = 'j4fxNOAKv27JLGFkb7yRV1VE7/FMXaWqxkfbdom8Ic8=';
var authorityHostUrl = 'https://login.windows.net';
var tenant = '56836078-8488-41e7-bcfb-b5a9d0e5e5e3';
var authorityUrl = authorityHostUrl + '/' + tenant;
var redirectUri = 'http://172.29.59.65:3000/getAToken';
var resource = 'https://management.core.windows.net';
var templateAuthzUrl = 'https://login.windows.net/' + 
                        tenant + 
                        '/oauth2/authorize?response_type=code&client_id=' +
                        clientId + 
                        '&redirect_uri=' + 
                        redirectUri +
                        '&state=<state>&resource=' + 
                        resource;

function createAuthorizationUrl(state) {
  return templateAuthzUrl.replace('<state>', state);
}

app.post('/auth', function(req, res) {
  crypto.randomBytes(48, function(ex, buf) {
    var token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');

    res.cookie('authstate', token);
    var authorizationUrl = createAuthorizationUrl(token);
	console.log(authorizationUrl);
	res.send(authorizationUrl);
  });
});
app.get('/getAToken', function(req, res){
	res.render('getAToken');
})
app.post('/getAzureToken', function(req, res) {
	console.log(req.query.code);
	 var authenticationContext = new AuthenticationContext(authorityUrl);

	  authenticationContext.acquireTokenWithAuthorizationCode(
	    req.query.code,
	    redirectUri,
	    resource,
	    clientId, 
	    clientSecret,
	    function(err, response) {
	      var errorMessage = '';
	      if (err) {
	        errorMessage = 'error: ' + err.message + '\n';
	      }
	      errorMessage += 'response: ' + JSON.stringify(response);
		  console.log(errorMessage);
		  var d = {};
		  d.role_id = "a"
		  d.User = response.userId; 
	      res.send(d);
	    }
	  );
});
app.get('/envData', view.envData);
app.post('/nodeData', view.nodeData);
app.get('/nodeDetails', view.nodeDetails);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
