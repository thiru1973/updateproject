var spawn = require("child_process").spawn,child;
var mongodb = require('mongodb');
var pg = require("pg");
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://172.29.59.100/test';

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();
exports.createGroup = function(req,res){
	var account = "Rezopia_Acc",
	    project = "Rezopa_proj",
	    resourceGroup = "TestRG1",
		region = "West US";
		
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
		});
	var retVal = executeScript("resource.ps1");*/
	//client_pg.query("INSERT INTO resources(Account,project,resourceGroup,region) values($1, $2, $3, $4)", [account, project, resourceGroup, region]);	
	//res.send("retVal");
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
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
         if (err) {
                   console.log('Unable to connect to the mongoDB server. Error:', err);
                } else {
                console.log('Connection established');
                var instance=db.collection('devops_tools');                            
                instance.find({cloud : req.body.cloud, devops_type : req.body.devops_type, technology : req.body.technology}).toArray(function(err,result){
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
	res.render("devops");
}

 exports.saveDevopsTemplate = function(req,res){
   //console.log(req.body.data);  
    //var result=JSON.stringify(req.body.data);
     var Obj = JSON.parse(req.body.data);
    //console.log('type',typeof Obj);
    //console.log(Obj);

     console.log(Obj.deployTemplate[0].templateName);
      //var d1 = Obj.d1;
     //var dt_obj = JSON.parse(d1);
     //console.log(dt_obj[0]._templateName);
     var temp_name = (Obj.deployTemplate[0].templateName.replace(/[0-9]/g, ''));
     var a = Math.floor(100000 + Math.random() * 900000)
     a = a.toString().substring(0, 5);
     var dev_tempName = temp_name+"DevOps"+"_"+a;
     console.log(dev_tempName);
     Obj.deployTemplate[0].templateName = dev_tempName;
     //console.log(dt_obj);
     MongoClient.connect(url, function (err, db){
        if (err){
        console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
           console.log('Connection established');
           //var DB_data = {obj:{"templateDetails":{"_templateName":"testazure_980","_projectName":"Demo_proj","_technology":"Java","_tool_name":"Java"},"CI_vms":{"vms":{"0":{"_vmName":"Medium","_vmRole":"WebServer","_vmPackages":{"Jenkins":false,"Sonarqube":false,"Nexus":false}},"1":{"_vmName":"Medium","_vmRole":"ApplicationServer","_vmPackages":{"Jenkins":true,"Sonarqube":true,"Nexus":false}}}},"CT_vms":{"vms":{}},"CD_vms":{"vms":{}}}};
           //var DB_data = {deployTemplate:Obj};
           var instance=db.collection('devops_template_save');
           instance.insert(Obj, function (err, result){
           if (err) {
              console.log(err);
              } else {
              console.log('Inserted values successfully');
              res.send("success");
              }
              db.close();
              });
        }
     });
     //res.send(req.body.data);
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
								res.send(result);
							}
					 db.close();					
					});					
				}
		});
};
exports.appTechnologies = function(req, res){

   MongoClient.connect(url, function (err, db) {
        if (err) {
                  console.log('Unable to connect to the mongoDB server. Error:', err);
               } else {
               console.log('Connection established');
               var instance=db.collection('application_technologies');
               instance.find().toArray(function(err,result){
               if(err){
                     throw err
                     }
                  else{
                        res.send(result);
                       // console.log(result);
                     }
                db.close();
               });
            }
      });
};

exports.appTools = function(req, res){
//var result = "Node.js";
   var result=req.body.technology;
    MongoClient.connect(url, function (err, db) {
         if (err) {
                   console.log('Unable to connect to the mongoDB server. Error:', err);
                } else {
                console.log('Connection established');
                var instance=db.collection('app_devops_tools');
                instance.find({technology : result}).toArray(function(err,result){
                if(err){
                      throw err
                      }
                   else{
                         res.send(result);
                         //console.log(result);
                      }
                 db.close();
                });
             }
       });
 };