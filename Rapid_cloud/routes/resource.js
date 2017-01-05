var spawn = require("child_process").spawn,child;
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://172.29.59.100/test';

exports.createGroup = function(req,res){
	/*MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {
		    
		    console.log('Connection established to', url);    
		    var collection = db.collection('resourcegroup');
			
			var list1 = {rg_id : 1, userName : "test@rapiddirectory.onmicrosoft.com", pwd : "Boron12#4", resGrpName : "TestRG1", region : "West US"};
		    collection.insert([list1], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
		      }
		      db.close();
		    });
		  } 
		});*/
	var retVal = executeScript("resource.ps1");
	res.send(retVal);	
}
exports.createVnet = function(req,res){
	var retVal = executeScript("VNet.ps1");
	res.send(retVal);
}
exports.createSubnet = function(req,res){
	var retVal = executeScript("subnet.ps1");
	res.send(retVal);
}
exports.createSecGrp = function(req,res){
	var retVal = executeScript("securityGroup.ps1");
	res.send(retVal);
}
exports.createRtTable = function(req,res){
	var retVal = executeScript("route.ps1");
	res.send(retVal);
}
exports.createLclNetGtWay = function(req,res){
	var retVal = executeScript("localNetGWay.ps1");
	res.send(retVal);
}
exports.createDns = function(req, res){
	var retVal = executeScript("dns.ps1");
	res.send(retVal);
}
exports.createEndPoint = function(req, res){
	var retVal = executeScript("endpoint.ps1");
	res.send(retVal);
}
exports.createVnetGWay = function(req,res){
	var retVal = executeScripts("VNetGWay.ps1");
	res.send(retVal);
}

exports.attachDisk = function(req,res){
	var retVal = executeScript("stg.ps1");
	res.send(retVal);
}
function executeScript(scriptName){
	var cmd = 'C:\\Users\\sangamesh.b\\Desktop\\scripts\\'+scriptName;
	child = spawn("powershell.exe", [cmd]);
	child.stdout.on("data",function(data){
	   console.log("Powershell Data: " + data);
	});
	child.stderr.on("data",function(data){
	    console.log("Powershell Errors: " + data);
	    return data;
	});
	child.on("exit",function(){
	   console.log("Powershell Script finished");
	   return "Script finished";
	});
	child.stdin.end(); //end input
}

exports.devopsTemplate = function(req,res){
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('devops_tools');									
					instance.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{								
								res.send(result);
							}
					 db.close();					
					});					
				}		 
			});	
}

exports.devopsTemp = function(req, res){
	res.render("devopsTemp");
}

exports.saveDevopsTemplate = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var dt = Obj.deployTemplate;
	var dt_obj = JSON.parse(dt);
	console.log(dt_obj);
	
	MongoClient.connect(url, function (err, db){
		  if (err){
					console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					//var DB_data = {obj:{"templateDetails":{"_templateName":"testazure_980","_projectName":"Demo_proj","_technology":"Java","_tool_name":"Java"},"CI_vms":{"vms":{"0":{"_vmName":"Medium","_vmRole":"WebServer","_vmPackages":{"Jenkins":false,"Sonarqube":false,"Nexus":false}},"1":{"_vmName":"Medium","_vmRole":"ApplicationServer","_vmPackages":{"Jenkins":true,"Sonarqube":true,"Nexus":false}}}},"CT_vms":{"vms":{}},"CD_vms":{"vms":{}}}};
					var DB_data = {deployTemplate:dt_obj};
					var instance=db.collection('devops_template_save');
					instance.insert([DB_data], function (err, result){
		      				if (err) {
		        				console.log(err);
		     				} else {
		        		console.log('Inserted values sucess fully');
						res.send("Saved DevOps template");
		      			}
		      			db.close();
		    			});
				}
			});
}

exports.deploydbData = function(req, res){
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('devops_template_save');									
					instance.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							console.log(result);
								res.send(result);
							}
					 db.close();					
					});					
				}
		});
};

//Create Project data

exports.createProject = function(req, res){
	res.render("create_project");
}