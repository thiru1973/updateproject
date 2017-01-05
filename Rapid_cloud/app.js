
var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , manage = require('./routes/manage')
  , view = require('./routes/view')
  , project = require('./routes/project')
  , manage_nodes = require('./routes/manage_nodes')
  , poc = require('./routes/poc')
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
app.get('/authentication', poc.authentication);

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
app.post('/popup_nodes',manage.popup_nodes);
app.post('/node_details',manage.node_details);
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
app.post('/testscript', routes.testscript);

//New manage screen
app.get('/manageEnv', manage.manageEnv);

//Mange stg, sec, kp
app.post('/volumeDetails', manage.volumeDetails);
app.post('/keyPairDetails', manage.keyPairDetails);
app.post('/secGrpDetails', manage.secGrpDetails);
app.post('/attachVolume', manage.attachVolume);
app.get('/attachKeyPair', manage.attachKeyPair);
app.get('/attachSecGrp', manage.attachSecGrp);
app.post('/azureLoad',manage.azLoadBalancer);
app.post('/straccount', manage.straccount);
app.post('/azureEndPoint', manage.azureEndPoint);
app.post('/trafficManage', manage.trafficManage);
app.post('/blobUpload', manage.blobUpload);
app.get('/getAzureStg', manage.getAzureStg);

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

//resource group services
app.get('/createGroup', resources.createGroup);
app.get('/createVnet', resources.createVnet);
app.get('/createSubnet', resources.createSubnet);
app.get('/createSecGrp', resources.createSecGrp);
app.get('/createRtTable', resources.createRtTable);
app.get('/createLclNetGtWay', resources.createLclNetGtWay);
app.get('/createDns', resources.createDns);
app.get('/attachDisk', resources.attachDisk)


//DevOps
app.get('/devopsTemplate', resources.devopsTemplate);
app.get('/devopsTemp', resources.devopsTemp);
app.post('/saveDevopsTemplate', resources.saveDevopsTemplate);

//Product Templates

app.get('/viewProductTemplate', routes.viewProductTemplate);
app.get('/deployProductTemplate', routes.deployProductTemplate);

//Devops
app.get('/setup', routes.setup);
app.get('/devops', routes.devops);
app.get('/devopsDetails', routes.devopsDetails);
app.get('/viewDevOpsTemplate', routes.viewDevOpsTemplate);
//app.get('/deployDivopsTemplate', routes.deployDivopsTemplate);
app.get('/deploydbData', resources.deploydbData);
app.get('/create_devOps_template', account.create_devOps_template);
app.get('/createDevTemp', account.createDevTemp);


//Create Project
app.get('/createProject', resources.createProject);
//app.get('/gitAuth', project.gitAuth);
app.post('/repoLogin', project.repoLogin);
app.post('/repoWebhook', project.repoWebhook);
app.get('/attach_devops', project.attach_devops);

var url = "http://172.29.59.65:3001/add";

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

http.createServer(app).listen(app.get('port'), "172.29.59.62", function(){
  console.log('Express server listening on port ' + app.get('port'));
});
