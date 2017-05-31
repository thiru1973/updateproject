var CryptoJS = require('crypto-js');
var crypto = require('crypto');
var fs=require('fs');
var http = require('http');
var express = require('express');
var app     = express();
//var zerorpc = require("zerorpc");
var path = require("path");

var region_name=[];
var os=[];
var newarr=[];
var m = 0;

var result1=[];
var result2=[];
var result3=[];
var result4=[];
var result5=[];
var result6=[];
var result7=[];

var i=0;

var dec;
var dec2;
var access_key;
var secret_key;
//var url = 'mongodb://172.29.59.62:27017/test';
var url = 'mongodb://172.29.59.100:27017/test';
var cloudurl = "http://172.29.93.97:5000/users/";

var pg = require("pg");

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";

var AWS = require('aws-sdk');
var HttpProxyAgent = require('https-proxy-agent');

var Agent = require('tunnel-agent').httpsOverHttps;
var agent = new Agent({proxy: 'http://172.26.42.65:8080'});
var proxy = require('proxy-agent');

var pg = require("pg");
//var conString = "pg://postgres:admin@localhost:5432/Rapid";

var MongoClient = require('mongodb').MongoClient;
var result1=[];

var region1;
var os;
var client_pg = new pg.Client(conString);
exports.master = function(req,res){
	res.render('master');
};

////devops template pages
exports.deployDivOpsTemplate = function(req, res){
	res.render("deployDivOpsTemplate");
} 

exports.viewProductTemplate = function(req, res){ 
res.render('viewProductTemplate');
 }
 
exports.deployProductTemplate = function(req, res){ 
res.render('deployProductTemplate');
 }
///////////
/* New Pages*/
exports.master_2 = function(req,res){
	res.render('master_2');
};
exports.designDevOpsTemp = function(req,res){
	res.render('designDevOpsTemp');
};
exports.create_template = function(req,res){
	res.render('create_template');
};

exports.assignNode = function(req,res){
	res.render('assignNode');
};

exports.deployTemplate = function(req, res){
	res.render('deployTemplate');
}
exports.index1 = function(req, res){
	res.render('index1');
}

exports.myAccount = function(req, res){
	res.render('myAccount');
}
exports.vpc = function(req, res){
	res.render('vpc');
}
exports.subnet = function(req, res){
	res.render('subnet');
}
exports.keyPair = function(req, res){
	res.render('keyPair');
}
exports.localNetworkGateWay = function(req, res){
	res.render('localNetworkGateWay');
}
exports.internetGateWay = function(req, res){
	res.render('internetGateWay');
}
exports.DNSZone = function(req, res){ res.render('DNSZone'); }
exports.endPoint = function(req, res){ res.render('endPoint'); }
exports.virtualNetworkGatway = function(req, res){ res.render('virtualNetworkGatway'); }
exports.vpnConnection = function(req, res){ res.render('vpnConnection'); }
exports.securityGroup = function(req, res){
	res.render('securityGroup');
}
exports.routeTable = function(req, res){
	res.render('routeTable');
}
exports.multicloud = function(req, res){
	res.render('multiCloud');
}

exports.accountTemplates = function(req,res){
	res.render('accountTemplates');
};

exports.nodeTemplates = function(req, res){
	res.render('nodeTemplates');
}
exports.viewDevOpsTemplate = function(req,res){
res.render('viewDevOpsTemplate');

};
exports.deployPipelines = function(req,res){
res.render('deployPipelines');

};

exports.configureDevOps = function(req,res){
  res.render('configureDevOps');
};

//packages Tab

exports.packages = function(req,res){
  res.render('packages');
};
exports.packagesDeployProducts = function(req,res){
  res.render('packagesDeployProducts');
};
exports.pkgMngEnv = function(req,res){
  res.render('pkgMngEnv');
};
exports.pkgTrafficMngr = function(req,res){
  res.render('pkgTrafficMngr');
};
exports.pkgLoadBlncr = function(req,res){
  res.render('pkgLoadBlncr');
};

//monitoring Tab
exports.monitoring = function(req,res){
  res.render('monitoring');
};
exports.deployAppMonitoring = function(req,res){
  res.render('deployAppMonitoring');
};
exports.manageInfrMonitoring = function(req,res){
  res.render('manageInfrMonitoring');
};
exports.manageAppMonitoring = function(req,res){
  res.render('manageAppMonitoring');
};

//organization

exports.organization = function(req,res){
  res.render('organization');
};

//dashboard Tab
exports.dashInfrastructure = function(req,res){
  res.render('dashInfrastructure');
};
exports.dashApplication = function(req,res){
  res.render('dashApplication');
};

/* exports.cloudopsHeader = function(req,res){
  res.render('cloudopsHeader');
};

exports.cloudopsLeftnav = function(req,res){
  res.render('cloudopsLeftnav');
};
exports.rapidFooter = function(req,res){
  res.render('rapidFooter');
};
 exports.cloudopsMaster = function(req,res){
  res.render('cloudopsMaster');
}; */

exports.designEnviron = function(req,res){
  res.render('designEnviron');
};

/*Old page functions*/
exports.index = function(req, res){
  res.render('index');
};

exports.create_template2 = function(req, res){
	  res.render('create_template2');
	};

exports.drop_down=function(req,res){	
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('instance');
					var region=db.collection('region');						
					db.eval("filter_tab()", function(error, result) {			            
						var len=result.length;
						var ele;	
						//console.log(result);
						for(var i=0;i<len;i++)
						{
							region_name[i]=result[i].region_name;
							os[i]=result[i].os_type;		
						}
						   newarr = region_name.filter(function(elem, pos) {
								return region_name.indexOf(elem) == pos;
							})
						  newarr2 = os.filter(function(elem, pos) {
								return os.indexOf(elem) == pos;
							})
						res.send(newarr.toString()+"~"+newarr2.toString());
					});	 
				}
			});	
};
exports.next=function(req,res){
	var pid=req.query.prov_id;
	console.log(pid);
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('instance');									
					instance.find({"prov_id": pid}).toArray(function(err,result){
					if(err){
							throw err
							}
						else{						
								res.render('next_page', {data : result});
							}
					 db.close();					
					});					
				}		 
			});	
};
exports.all_nodes=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('instance');									
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

exports.proj = function(req, res){
	  res.render('proj_det');
	};
	
exports.filter = function(req, res){
		var result=JSON.stringify(req.body);
		var Obj = JSON.parse(result);	
		var region1=Obj.region;
		var pname=Obj.pname;		
		console.log(region1+" "+pname);
		res.setHeader("Access-Control-Allow-Origin", "*");
		MongoClient.connect("mongodb://172.29.59.100:27017/test", function(err, db) {

			if(err) { return console.dir(err); }
			   else {
			     console.log("We are connected");
			  var instance = db.collection('instance');
			  var region = db.collection('region');		  
			 region.findOne(({$and: [{"region_name": region1},{"prov_id": pname}]}), function(err, result){
			  //region.findOne(({$and: [{"prov_id": pname}]}), function(err, result){
			  if(err){
			  throw(err);
			  }
			  else{		 
			 var newr = result.inst_name;
			 instance.find({ "inst_id": { "$in": newr } }).toArray(function(err, resultn){
			  if(err){
			  throw(err);
			  }
			  else{
				  	//console.log(resultn);
				  	res.send(resultn);
			  		}
			  });
			 }
			  });			  
			   }
			   //db.close();
			 });				
	};

exports.tmplt_pg=function(req, res){
	var str=req.query.data;	
	var arr = str.split(",");
	var arr1=[];
	var j=0;
	for(var i=0;i<arr.length;i++) {
	    if( i % 7 == 0)
	    	{
	    		arr1[j]=arr[i];
	    		j++;
	    	}
	}
	console.log(arr1);
	res.render('template', {data : arr1});	
};

exports.tmplt_create=function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var nodes=req.query.data;
	console.log(nodes);
	var tname=req.query.tmp_name;
	var roles=req.query.roles;
	var n_date=Date();
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {    
		    console.log('Connection established to');    
			var collection=db.collection('single_node_information');
		    var DB_data = {instances : nodes, Provider_Name : 'AWS', Region : 'US East(N.Virginia)',
		    	 Created : n_date};

		    collection.insert([DB_data], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted values sucess fully');
		      }
		      db.close();
		    });
		  } 
		});
	res.end("Node is saved");
};
	
exports.create = function(req,res){	
		res.setHeader("Access-Control-Allow-Origin", "*");
		 var id = req.query.prov_id;
		 var cre_date = req.query.dt;
		 var proj_id = req.query.proj_id;
		 var proj_name = req.query.proj_name;
		 var len=id.length;		 
		 if(len<=3)
			 {			
				 console.log(id);
				 var cloud = "lled";
				 var arr = [id, proj_name, cloud];
				 var prov_name="azure";
				 
				 client_pg.connect();
				  client_pg.query("INSERT INTO azure_details(prov_name,prov_id,date,proj_id,proj_name,status,region) values($1, $2, $3, $4, $5, $6, $7)", [prov_name, id, cre_date, proj_id, proj_name, 'running', 'west-us']);
				 
				 //var client = new zerorpc.Client();
				 //client.connect("tcp://172.29.93.87:4242");
				 var data = {arr1 : arr};
					var data1 = JSON.stringify(data);
					http.get(url+data1, function(response) {
					var finalData = '';
					  response.on("data", function (data) {
						finalData += data.toString();
					  });
					  response.on("end", function() {
						console.log(finalData.toString());
					  });
					});	
				 //client.invoke("sendazure1", arr, function(error, res, more) {console.log(res);});
			 }
		 else{			 
			 console.log("you are in aws");
		 }

};

exports.new_template = function(req, res){
	res.render('template2');
}

exports.manage_template = function(req, res){
	res.render('manage_template');
}

exports.temp_region=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pname=Obj.pname;
	console.log(pname);	
	var region_name1=[];
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var region1=db.collection('region');	
										
					region1.find({"prov_id": pname}).toArray(function(err,result){
					if(err){
							throw err
							}
						else{									
									/*var len=result.length;								
									for(var i=0;i<len;i++)
									{
										region_name1[i]=result[i].region_name;											
									}*/
									//console.log(region_name1);
									/*var newarr2=[];									
									newarr2 = region_name1.filter(function(elem, pos) {
										return region_name1.indexOf(elem) == pos;
									})*/									
									//res.send(region_name1);	
									res.send(result);
							}
					 db.close();						
					});	
				   }
		});
};

exports.temp_image=function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pname=Obj.provider;
	var os=Obj.os;
	console.log(pname+os);
	/*var region;	
	if(Obj.provider != "Azure")
		{
			region=Obj.region;
		}else{ region="all";}
	var version=Obj.version;
	var ver = version.split("/");
	var attribute=Obj.attribute;*/
	var image1=[];	
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');	
					var image=db.collection('Images');
					var token = new RegExp(os, 'i');
					//var token1 = new RegExp(attribute, 'i');
					//var token2 = new RegExp(version, 'i');
					image.find({$and: [{"prov_id": pname},{"Image_name":{$all:[token]}}]}).toArray(function(err,result){
						if(err){
							throw err
							}
						else{
							var len=result.length;													
							for(var i=0;i<len;i++)
							{
								image1[i]=result[i].Image_name;								
							}	
								//console.log(image1);
								res.send(image1);
							}
					 db.close();					
					});					
				}		 
			});	
};
exports.temp_image1=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pname=Obj.provider;
	var os=Obj.os;
	console.log(req.body);
	var region;	
	if(Obj.provider != "Azure")
		{
			region=Obj.region;
		}else{ region="All";}
	var image1=[];	
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');	
					var image=db.collection('Images1');
					var token = new RegExp(os, 'i');
					image.find({$and: [{"prov_id": pname},{"region":region},{"Image_name":{$all:[token]}}]}).toArray(function(err,result){
						if(err){
							throw err
							}
						else{
							var len=result.length;													
							for(var i=0;i<len;i++)
							{
								image1[i]=result[i].Image_name+"~"+result[i].id;								
							}	
								//console.log(image1);
								res.send(image1);
							}
					 db.close();					
					});					
				}		 
			});	
};
var res_store=[];
exports.temp_store=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);	
	var Obj = JSON.parse(result);	
	var d1 = Obj.d1;
	var d1_obj = JSON.parse(d1);	
	var d2 = Obj.d2, d3 = Obj.d3, d4 = Obj.d4, d5 = Obj.d5, d6 = Obj.d6;
	res_store = d2.split(",");
	var p_name = res_store[0];		
	var t_region = res_store[1];
	var t_vms = res_store[2]
	var t_name = res_store[3];
	var c_date = Date();
	var t_type = "My Template"
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {    
		    console.log('Connection established to');    
			var collection=db.collection('pvd_template_information');
		    var DB_data = {Template_name:t_name, Account_Name : d3, Project_Name : d4, Product_Name : d5, Template_type:t_type, Instances : d1_obj, Cloud : p_name, Region : t_region, VMSs: t_vms,
		    		Created_at : c_date, Template_Desc:d6};
//			var DB_data = {Template_name:t_name, Account_Name : d3, Project_Name : d4, Product_Name : d5, Template_type:t_type, Instances : d1_obj, Cloud : p_name, VMSs: t_vms,
//		    		Created_at : c_date};
			console.log(DB_data);
		    collection.insert([DB_data], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted values sucess fully');
		      }
		      db.close();
		    });
		  } 
		});	

	res.send("success");	
}

exports.nodes_details=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('instance');	
					var list=[1,2,3,4,5,6,7,8,9,10];
					instance.find({"inst_id": { "$in": list }}).toArray(function(err,result){
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

exports.pvd_template = function(req, res){
	//console.log(req.body);
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);	
	var Obj1 = JSON.parse(result);
	var g_tname = Obj1.tname;
	console.log(g_tname);
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					//var template=db.collection('generic_template_information');
					var template=db.collection('pvd_template_information');
					template.find({"Template_name": g_tname}).toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							//console.log(result);
							res.send(result);
							}
					 db.close();					
					});					
				}		 
			});	
}
exports.gen_template = function(req, res){
	//console.log(req.body);
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);	
	var Obj1 = JSON.parse(result);
	var g_tname = Obj1.tname;	
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var template=db.collection('generic_template_information');					
					template.find({"Template_name": g_tname}).toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							//console.log(result);
							res.send(result);
							}
					 db.close();					
					});					
				}		 
			});	
}

exports.pvd_check=function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function(err, db){
		if (err){
			console.log('Unable to connect to the MongoDB server. Error:',err);
		}
		else{
			console.log('Connection established to');
			var gts=db.collection('pvd_template_information');
			gts.find().toArray(function(err, result){
				if (err)
					{
					console.log('Unable to connect to the MongoDB server. Error:',err);
					}
				else{
					res.send(result);					
				}
				db.close();
			});
		}
	});
}

exports.cloud_service = function(req,res){
	res.render('cloud_service');
};

client_pg.connect();
exports.create_cloud_service = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var name=Obj.name
	    ,location = Obj.location
	    ,Account = Obj.account
	    ,Project = Obj.project
	    ,Product = Obj.product;
	
	console.log(name+location);
	var arr=["Azure","create_cloud_service",name,location,Account,Project,Product];
	console.log(arr);
	//var client = new zerorpc.Client();
	//client.connect("tcp://172.29.93.97:4242");
	var data = {arr1 : arr};
	var data1 = JSON.stringify(data);
	http.get(cloudurl+data1, function(response) {
	var finalData = '';
	  response.on("data", function (data) {
		finalData += data.toString();
	  });
	  response.on("end", function() {
		console.log(finalData.toString());
	  });
	});	
	 //client.invoke("assign", arr, function(error, res, more) {});
	
	 setTimeout(function() {
	 client_pg.query("Select message from exception", function(err,result){
		 if(err){
				throw err;
			}
		 var rows = result.rows;
		 console.log(rows);
		 if(rows.length == 0)
			 {
			 console.log("Empty");
			 res.send("Success");
			 }
		 else{
		 var message = rows[0].message; 
		 console.log(rows[0].message);
		 res.send(message);
		 }
	 });
	 }, 3000);
};

exports.prod_stage = function(req,res){
	res.render('prod_stage');
};

exports.cloudname = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	client_pg.query("SELECT cloud_name FROM cloudservice", function(err, result){
		if(err){
		throw err;
		}
		var cloud_rows = result.rows;
		console.log(cloud_rows[0].cloud_name);
		var cloud_len = cloud_rows.length;
		console.log(cloud_rows);
		console.log(cloud_len);
		var cloud_name = [];
		for (var i=0;i<cloud_len;i++)
			{
			cloud_name[i] = cloud_rows[i].cloud_name;
			}
		//console.log(p_name.length);
		//var rows = result.rows;
		res.send(cloud_name.toString());
		 });	 
};

exports.azure_size=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('instance');									
					instance.find({"prov_id": "Azure"}).toArray(function(err,result){
					if(err){
							throw err
							}
						else{	
							   
							    var size_len = result.length;
							    var sizes = [];
							    for (var i=0;i<size_len;i++)
								{
								sizes[i] = result[i].inst_type;
								}
							    
								res.send(sizes.toString());
							}
					db.close();					
					});					
				}		 
			});	
};

exports.azure_image=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('Image_VM');									
					instance.find({"provider": "Azure"}).toArray(function(err,result){
					if(err){
							throw err
							}
						else{	
							   
							    var image_len = result.length;
							    console.log(image_len);
							    var images = [];
							    for (var i=0;i<image_len;i++)
								{
								images[i] = result[i].name;
								}
							    
								res.send(images.toString());
							    
								//res.send(sizes.toString());
							}
					db.close();					
					});					
				}		 
			});	
};

exports.create_deploy_slot = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	

	var cloud=Obj.cloud;
	var size=Obj.size;
	var image=Obj.image;
	var slot=Obj.slot;
	var deploy=Obj.deploy;
	var arr=["azure","create_deploy",cloud,size,image,slot,deploy];
	//var client = new zerorpc.Client();
	//client.connect("tcp://172.29.59.61:4242");
	var data = {arr1 : arr};
	var data1 = JSON.stringify(data);
	http.get(cloudurl+data1, function(response) {
	var finalData = '';
	  response.on("data", function (data) {
		finalData += data.toString();
	  });
	  response.on("end", function() {
		console.log(finalData.toString());
	  });
	});	
	 //client.invoke("assign", arr, function(error, res, more) {});
	 res.send("Created");
};

var spawn = require("child_process").spawn,child;
exports.scheduleService = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	var reqResult = req.body
		,cloudSer = reqResult.cldsrvc
		,region = reqResult.region
		,instName = reqResult.inst_id
		,role = reqResult.role
		,provider = reqResult.pvd
		,action = reqResult.action
		,user_hr = reqResult.user_hr
		,user_min = reqResult.user_min
		,user_date = reqResult.user_date;
	var dt = user_date.split("-");
		
	var scdtime = '00 '+user_min+' '+user_hr+' '+dt[2]+' '+"*"+' '+"*"+' ';
	
	if(provider == "Azure"){
    var loc = './scripts/'+provider+"_"+action+'.ps1'
    	,scheduleLoc = './scheduleScripts/'+cloudSer+"_"+role+"_"+action+'.ps1'
    	,fileName = cloudSer+"_"+role+"_"+action+'.ps1';
	}else{
		var loc = './scripts/'+provider+"_"+action+'.ps1'
    	,scheduleLoc = './scheduleScripts/'+instName+"_"+region+"_"+action+'.ps1'
    	,fileName = instName+"_"+region+"_"+action+'.ps1';
	}
    fs.readFile(loc, function(err,data){
		if(err){
			return err;
			}else{
				fs.writeFile(scheduleLoc, data, function (err) {
        			if(err) {
           				return err;
        			} else {
            				var op = createJob(fileName,scdtime);
            				var obj = {"data" : op};
            				res.send(obj);
        					}
    				});
			}
		    });
    
    function createJob(scLoc,scd){
    	console.log(scLoc+"="+scd);
    	var cronJob = cron.job(scd, function(){
    		console.log(scLoc);
    		var script_path = 'C:\\Users\\sangamesh.b\\Desktop\\release-2\\Rapid_cloud\\scheduleScripts\\'+scLoc;
    		console.log(script_path);
    		child = spawn("powershell.exe", [script_path]);
	    	child.stdout.on("data",function(data){
	    	   console.log("Powershell Data: " + data);
	    	});
	    	child.stderr.on("data",function(data){
	    	    console.log("Powershell Errors: " + data);
	    	    //res.send(data);
	    	});
	    	child.on("exit",function(){
	    	   console.log("Powershell Script finished");
	    	   //res.send("Script finished");
	    	});
	    	child.stdin.end(); //end input
    	});
    	cronJob.start();
    	return "OK";
    }
    //res.send("Success");
};

