
var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , manage = require('./routes/manage')
  , view = require('./routes/view')
  , project = require('./routes/project')
  , manage_nodes = require('./routes/manage_nodes')
  , secGroups = require('./routes/secGroup')
  , account = require('./routes/accounts')
  , resources = require('./routes/resource')
  , http = require('http')
  , path = require('path')
  , multer = require('multer');


var app = express();


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

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
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
app.get('/list_cloud_service',manage.list_cloud_service)

//New manage screen
//app.get('/manageEnv', manage.manageEnv);
app.get('/manageEnv', manage.manageEnv);
app.get('/loadBalance', manage.loadBalance);
app.get('/manageVolumes', manage.manageVolumes);
app.get('/securityGroupManage', manage.securityGroupManage);
app.get('/trafficManager', manage.trafficManager);
app.get('/nodeTemplates', routes.nodeTemplates);
app.get('/accountTemplates', routes.accountTemplates);

//Mange stg, sec, kp
app.get('/volumeDetails', manage.volumeDetails);
app.post('/keyPairDetails', manage.keyPairDetails);
app.get('/secGrpDetails', manage.secGrpDetails);
app.post('/attachVolume', manage.attachVolume);
app.get('/attachKeyPair', manage.attachKeyPair);
app.get('/attachSecGrp', manage.attachSecGrp);
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
app.get('/devopsTemplate', resources.devopsTemplate);
app.get('/devopsTemp', resources.devopsTemp);
app.post('/saveDevopsTemplate', resources.saveDevopsTemplate);

var url = "http://172.29.59.65:3001/add";
//Outside service
/*http.get(url, function(response) {
	var finalData = '';
	  response.on("data", function (data) {
	    finalData += data.toString();
	  });
	  response.on("end", function() {
	    console.log(finalData.length);
	    console.log(finalData.toString());
	  });

	});*/

http.createServer(app).listen(app.get('port'), "172.29.59.65", function(){
//http.createServer(app).listen(app.get('port'), "172.29.59.44", function(){
  console.log('Express server listening on port ' + app.get('port'));
  process.exit();
});
