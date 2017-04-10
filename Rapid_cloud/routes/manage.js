var http = require('http');
var express = require('express');
var pg = require("pg");
//var zerorpc = require("zerorpc");
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
var fs=require('fs');
var clientscp = require('scp2');
var SSH = require('simple-ssh');

var myObject =  require("./manage_nodes.js");

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);

var rpcConString = "tcp://172.29.93.97:4242";
//var rpcConString = "tcp://172.29.59.65:4242";
//var client = new zerorpc.Client();
//client.connect(rpcConString);

var path = require('path');
var upload_path = path.resolve(__dirname + '/uploads');

var result = {
    status: 0,
    message: '',
    data: ''
};
var fs = require('fs');
var busboy = require('connect-busboy');
var validator = require('express-validator');

var url = 'mongodb://172.29.59.100:27017/test';
var MongoClient = require('mongodb').MongoClient;
var action;
var res1;
var template_id;

var vpc_name = [];
var vpc_id = [];
var p_name = [];
var subnet_name = [];
var auth=[];

var client_pg = new pg.Client(conString);
client_pg.connect();

//client.invoke("validate_user", "sangamesh", function(request, response, more){});


exports.manageEnv = function(req, res){
	res.render('manageEnv');
}
var auth1,auth2;
var rows3,rows4,rows5,rows6;
var uName,pWord;
function getAwsCred(){	
	
	this.getAwsMethod = function(acName, pjName, pdName){	
	
		client_pg.query("SELECT * from project3 where account = ($1) and p_name = ($2)",[acName,pjName],function(err, result){
			if(err){
				throw err;
			}
			rows3 = result.rows;
			var subsc = rows3[0].subscription_name;
			
			client_pg.query("SELECT accesskey,secretkey from subscription where accountid = ($1) and subscription_name = ($2)",[acName,subsc],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				auth1 = rows4[0].accesskey;
				auth2 = rows4[0].secretkey;
			});
		});
	}
	this.getAzureCred = function(acName,pjName, pdName){
		client_pg.query("SELECT * from project3 where account = ($1) and p_name = ($2)",[acName,pjName],function(err, result){
			if(err){
				throw err;
			}
			rows5 = result.rows;
			var subsc = rows5[0].subscription_name;
			
			client_pg.query("SELECT * from subscription where accountid = ($1) and subscription_name = ($2)",[acName,subsc],function(err, result){
				if(err){
					throw err;
				}
				rows6 = result.rows;
				uName = rows6[0].username;
				pWord = rows6[0].password;
			});
		});
	}
}
var getAwsCred = new getAwsCred();

exports.loadBalance = function(req, res){res.render('loadBalance'); }
exports.manageVolumes = function(req, res){res.render('manageVolumes'); }
exports.securityGroupManage = function(req, res){res.render('securityGroupManage'); }
exports.trafficManager = function(req, res){res.render('trafficManager'); }
exports.schedulingNode = function(req, res){res.render('schedulingNode'); }

exports.manage = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	client_pg.query("SELECT * FROM azure_details where status <> 'terminated';", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	res.render('manage', {data : rows});
	 });	 
};

exports.manage_env_nodes = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	//console.log(Obj);
	var inst_id=Obj.inst_id,
	    accName = Obj.accName,
	    projName = Obj.projName,
	    action = Obj.action,
	    region = Obj.region,
	    pvd_name = Obj.pvd,
	    cldsrvc = Obj.cldsrvc,
	    role = Obj.role;
	if(pvd_name == "AWS")
		{
		 	getAwsCred.getAwsMethod(accName,projName,"");
		 	setTimeout(function(){	
			var arr=["AWS","manage_node",auth1, auth2,region,inst_id,action];
			console.log(arr);
			 //client.invoke("assign", arr, function(error, res, more) {});	
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
			 res.send("Success");
		 	 }, 2000);
		}else{
			if(action == "Reboot"){action = "Reboot";}
			else if(action == "Terminate"){action = "Terminate";}
			else{return;}
			var arr = ["Azure", "manage_node", action, role, cldsrvc];
			console.log(arr);
			//client.invoke("assign", arr, function(error, res, more) {});			
			 res.send("Success");
		}	
};
exports.manage_env = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var proj_name = [];
	client_pg.query("SELECT * FROM project3;", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	var row_length = rows.length;
	console.log(row_length);
	for(var i=0;i<row_length;i++){
		proj_name[i] = rows[i].p_name;
	}
	res.send(rows);
	 });	 
};

exports.deploy=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('pvd_template_information');
					//var region=db.collection('region');					
					instance.find().toArray(function(err,result){
					if(err){
							throw err;
							}
						else{	//console.log(result);					
								res.render('deploy', {data : result});
							}
					 db.close();					
					});					
				}		 
			});	
};

exports.actions = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var dns=req.query.id;
	action=req.query.status;	
	var arr=[action, dns];
	 /*var client = new zerorpc.Client();
	 client.connect("tcp://172.29.93.87:4242");
	 client.invoke("sendazure2", arr, function(error, res, more) {
		 console.log(res);
		 res1="true";
		 console.log(res1);
		 console.log(action);
		    if(action == "terminate" && res1 == "true")
		    	{		    	
		    	var check="Terminated";
		    	var client_pg = new pg.Client(conString);
		    	client_pg.connect();
		    	client_pg.query("UPDATE azure_details SET status = ($1) WHERE proj_name= ($2)",[check,dns]);
		    	}
		    else if(action == "reboot" && res1 == "true")
		    {
		    	var check="Reboot";
		    	var client_pg = new pg.Client(conString);
		    	client_pg.connect();
		    	client_pg.query("UPDATE azure_details SET status = ($1) WHERE proj_name= ($2)",[check,dns]);	
		    }
		    else{console.log("error has oocured");}
		});*/
};

exports.create_vpc=function(req,res){
	console.log(auth[0]);
	res.render('create_vpc');	
};
 
/* Functions for new screens*/
exports.vpc=function(req,res){
	  res.setHeader("Access-Control-Allow-Origin", "*");
	  var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  //console.log(Obj);
	  var accountName = Obj.accountName
	  	  ,projName = Obj.projName
	  	  ,prodName = Obj.prodName
	      ,region = Obj.region
	      ,cidr = Obj.cidr
	      ,vpc = Obj.vpc
	      ,tenancy = Obj.tenancy
	      ,pvd = Obj.provider; 
	  console.log(Obj);
	  getAwsCred.getAwsMethod(accountName,projName,prodName);
	  setTimeout(function(){		     
	     var arr = ["AWS", "create_vpc",auth1, auth2, region , cidr, vpc, tenancy];	
         console.log(arr);		 
	     //client.invoke("assign", arr, function(error, resq, more){});
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
	     res.send("Success");
	  }, 2000);
};
exports.subnet=function(req,res){
	  res.setHeader("Access-Control-Allow-Origin", "*");
	  var result=JSON.stringify(req.body)
	      ,Obj = JSON.parse(result)
	      ,accountName = Obj.accountName
	      ,projName = Obj.projName
	  	  ,prodName = Obj.prodName
	      ,pvd = Obj.provider
	      ,snRegion = Obj.region
	      ,cidrBlkSn = Obj.cidrBlkSn
	      ,snVpc = Obj.snVpc
	      ,snName = Obj.snName
	      ,snZone = Obj.snZone;
	     getAwsCred.getAwsMethod(accountName,projName,prodName);
	     setTimeout(function(){
			      var arr = [pvd, "create_subnet",auth1, auth2, snRegion , cidrBlkSn, snVpc, snZone, snName];	
			     //client.invoke("assign", arr, function(error, resq, more) {});
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
			     res.send("Success");
	     }, 2000);
};
exports.routeTable = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	  var result=JSON.stringify(req.body)
	      ,Obj = JSON.parse(result)
	      ,accountName = Obj.accountName
	      ,projName = Obj.projName
	  	  ,prodName = Obj.prodName
	      ,pvd = Obj.provider
	      ,routeRegion = Obj.region
	      ,routeName = Obj.routeName
	      ,routeVpc = Obj.routeVpc
	      ,routeSubnet = Obj.routeSubnet
		  ,inetGate = Obj.inetGateway;
	      getAwsCred.getAwsMethod(accountName,projName,prodName);
	      setTimeout(function(){
	     		var arr = [pvd, "route_table",auth1, auth2, routeRegion , routeName, routeVpc, routeSubnet, inetGate];
	      		console.log(arr);
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
	     		//client.invoke("assign", arr, function(error, resq, more) {});	  
	     		res.send("Success");
	      }, 2000);
}
exports.gateWay = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	  var result=JSON.stringify(req.body)
	      ,Obj = JSON.parse(result)
	      ,accountName = Obj.accountName
	      ,projName = Obj.projName
	  	  ,prodName = Obj.prodName
	      ,pvd = Obj.provider
	      ,gtWayRegion = Obj.region
	      ,gtWayName = Obj.gtWayName
	      ,gtWayVpc = Obj.gtWayVpc;
	      getAwsCred.getAwsMethod(accountName,projName,prodName);
		  setTimeout(function(){
			   var arr = [pvd, "internet_gateway",auth1, auth2, gtWayRegion , gtWayName, gtWayVpc];
			   //console.log(arr);
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
			   //client.invoke("assign", arr, function(error, resq, more) {});
			   res.send("success");
		  }, 2000);
};
exports.createStorage = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	 var result=JSON.stringify(req.body)
	     ,Obj = JSON.parse(result)
	     ,accountName = Obj.accountName
	     ,projName = Obj.projName
	  	 ,prodName = Obj.prodName
	     ,pvd = Obj.provider
	     ,vRegion = Obj.region
	     ,vType = Obj.vType
	     ,vSize = Obj.vSize
	     ,vIops = Obj.vIops
	     ,vName = Obj.vName
	     ,vZone = Obj.vZone;
		 getAwsCred.getAwsMethod(accountName,projName,prodName);
	     setTimeout(function(){
			   var arr = [pvd, "create_volume",auth1, auth2, vRegion , vZone, vName, vSize, vIops, vType];
			   console.log(arr);
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
			   //client.invoke("assign", arr, function(error, resq, more) {});
			  res.send("Success");
	     }, 2000);
};
exports.createSecGroup = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
		  var d1arr = (req.body.d1).split(','); 
		  var d2arr = (req.body.d2).split(',');
		  console.log(d1arr);
		  console.log(d2arr);
		  
		  getAwsCred.getAwsMethod(d1arr[0],d1arr[1],d1arr[2]);
		  setTimeout(function(){
			   var arr = [];
			  arr.push(d1arr[3],"create_sg", auth1,auth2, d1arr[4],d1arr[5],d1arr[6]);
			  var results = [];
			  while (d2arr.length) 
			  {				  
				  results.push(d2arr.splice(0, 4));
			  }
			  for(var i=0;i<results.length;i++)
			  {
				arr.push(results[i]);
			  }
				   console.log(arr);
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
				   //client.invoke("assign", arr, function(error, resq, more) {});
				  res.send("Success");
			  }, 2000);
}
exports.getSecurity = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var rows1 = [];
	client_pg.query("SELECT * FROM security_group;",function(err, result){
		if(err){
			throw err;
		}
		rows1 = result.rows;
		res.send(rows1);
	});
}
exports.getRouteTable = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var rows1 = [];
	client_pg.query("SELECT * FROM route_table;",function(err, result){
		if(err){
			throw err;
		}
		rows1 = result.rows;
		res.send(rows1);
	});
}
exports.getInetGateWay = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var rows1 = [];
	client_pg.query("SELECT * FROM internet_gateway;",function(err, result){
		if(err){
			throw err;
		}
		rows1 = result.rows;
		res.send(rows1);
	});
}
exports.getKeypair = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var rows1 = [];
	client_pg.query("SELECT * FROM key_pair;",function(err, result){
		if(err){
			throw err;
		}
		rows1 = result.rows;
		res.send(rows1);
	});
}
exports.createKeyPair = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	 var result=JSON.stringify(req.body)
	     ,Obj = JSON.parse(result)
	     ,accountName = Obj.accountName
	     ,projName = Obj.projName
	  	 ,prodName = Obj.prodName
	     ,pvd = Obj.provider
	     ,kpRegion = Obj.region
	     ,keyPair = Obj.keyPair;
		 getAwsCred.getAwsMethod(accountName,projName,prodName);
	     setTimeout(function(){
			   var arr = [pvd, "create_key_pair",auth1, auth2, kpRegion , keyPair];
			   console.log(arr);
			   //client.invoke("assign", arr, function(error, resq, more) {       
			   //});
			   
			   res.send("Success");
	     }, 2000);
}
var _ = require("underscore");
exports.downloadKp = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	function getMostRecentFileName(dir) {
	    var files = fs.readdirSync(dir);
	    return _.max(files, function (f) {
	        var fullpath = path.join(dir, f);
	        return fs.statSync(fullpath).ctime;
	    });
	}
	var fpath = 'D:\\updated\\Rapid_cloud\\keyfile\\'
	var filepath = getMostRecentFileName(fpath);
	res.download(fpath+filepath,filepath);
}
//create snapshot for volume
exports.createSnapShot = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	  var arr = [pvd, "create_snap",auth[0], auth[1], volName , snapName];
	   //console.log(arr);

	   /*client.invoke("assign", arr, function(error, resq, more) {
      
	   });*/
	res.send("Success");
}
var cloudurl = "http://172.29.93.97:5000/users/";
exports.deployTemplate = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var arr=[];
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var d1 = Obj.d1;
	var d1arr = d1.split(',');
	if(d1arr[0] == 'AWS'){
			getAwsCred.getAwsMethod(d1arr[4],d1arr[5],d1arr[6]);
		 setTimeout(function(){	
			d1arr.splice(4,2)
			d1arr.splice(2, 0, auth1);
			d1arr.splice(3, 0, auth2);
			for(var i=0;i<d1arr.length;i++)
				{
					arr.push(d1arr[i]);
				}
			
			var d2 = Obj.d2;
			var d3 = d2.split(',');
			//console.log(d3);
			var d4 = Obj.d4;
			var dsks = d4.split(',');
			for(var a=0;a<d3.length;a++)
			{
				if(a%6 == 0)
				{
					var len = d3[a],dsk = [];
					console.log(len);
					for(b=0;b<len;b++)
					{
						dsk[b] = dsks[b];
					}
					d3[a] = dsk;
					dsks.splice(0,len);
				}
			}
			//console.log(d3);
			if(d3.length>6)
				{
					var results = [];
					  while (d3.length) {
					    results.push(d3.splice(0, 6));
					  }
					  //for(var i=0;i<results.length;i++)
					  for(var i=0;i<results.length;i++)
						  {
						  	arr.push(results[i]);
						  }
				}else{arr.push(d3);}
			  console.log(arr);
			    var data = {arr1 : arr};
				var data1 = JSON.stringify(data);
				http.get(cloudurl+data1, function(response) {
				var finalData = '';
				  response.on("data", function (data) {
					finalData += data.toString();
				  });
				  response.on("end", function() {					  
					console.log(finalData.toString());
					client_pg.query("INSERT INTO deploy_status(status,time) values($1,$2)",[finalData.toString(),Date()],
					function(err, result) {
					if(err){
						console.log(err);
					}else{
						console.log("Success");;
					}
					});
					
				  });
				});
			  /*client.invoke("assign", arr, function(error, res, more) {
				  if(error) {
						console.error(error);
					} else {
						console.log("UPDATE:", res);
					}

					if(!more) {
						console.log("Done.");
					}
			  });*/
			res.send("Deployment will take some more time please vist after sometime");
		 }, 2000);
	}else{
			for(var i=0;i<d1arr.length;i++)
			{
				arr.push(d1arr[i]);
			}
		
			var d2 = Obj.d2;
			var d3 = d2.split(',');
			console.log(d1arr);
			var results = [];
			if(d3.length>3)
				{
					  deployFun();
					  
				function deployFun(){
					
					  while (d3.length) {
					    results.push(d3.splice(0, 3));
					  }
					  for(var i=0;i<results.length;i++)
						  {
						  	arr.push(results[i]);
							console.log(arr)
							var data = {arr1 : arr};
							var data1 = JSON.stringify(data);
							http.get(cloudurl+data1, function(response) {
							var finalData = '';
							  response.on("data", function (data) {
								finalData += data.toString();
							  });
							  response.on("end", function() {
								res.send(finalData.toString());
							  });
							});
							/*client.invoke("assign", arr, function(error, res, more) {
								if(error) {
									console.error(error);
								} else {
									console.log("UPDATE:", res);
								}

								if(!more) {
									console.log("Done.");
								}						
							});*/
						  }
						  checkFailed();
						/*setTimeout(function(){
							var loc;
						  for(var j=0;j<results.length;j++){
							  loc = j;
							  client_pg.query("SELECT * FROM deployment_env where env_name = ($1) and role = ($2)", [d1arr[3],results[j][2]], function(err,result){
							  if(err){
							   throw err;
							  }
							  var rows = result.rows;
							  console.log(loc);
							  if(rows.length == 0){
								  deployFailedFun(loc);}
							});	
						  }
						  
						 }, 60000);*/
				}
				}else{arr.push(d3);
						//client.invoke("assign", arr, function(error, resq, more) {});
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
						}
				function checkFailed(){
					setTimeout(function(){
							var loc;
						  for(var j=0;j<results.length;j++){
							  loc = j;
							  client_pg.query("SELECT * FROM deployment_env where env_name = ($1) and role = ($2)", [d1arr[3],results[j][2]], function(err,result){
							  if(err){
							   throw err;
							  }
							  var rows = result.rows;
							  console.log(loc);
							  if(rows.length == 0){
								  deployFailedFun(loc);}
							});	
						  }
						  
						 }, 60000);
				}		
				function deployFailedFun(pos){
					arr.splice(9,arr.length);
					arr.push(results[pos]);
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
					//client.invoke("assign", arr, function(error, resq, more) {});
					res.send("Success");
				}
			  //console.log(arr);
			 //client.invoke("assign", arr, function(error, resq, more) {});
			//res.send("Success");
			}
}


//New screen function end
/*Old screen functions*/
exports.deploy_data = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	template_id=Obj.id1;
	//os=Obj.os;
	MongoClient.connect(url, function(err, db) {
		if(err) { return console.dir(err); }
		  else {
			//console.log(template_id); 
		    //console.log("connected");
			var template_new = db.collection('pvd_template_information');
			//var region = db.collection('region');
			
				template_new.find({"Template_name":template_id}).toArray(function(err,resultq){
					if(err){
						throw(err);
					}
					else{
						var result_inst = [];
						var result_role = [];
						var result_img =[];
						var len_q=resultq.length;
						var id = resultq[0].Instances;	
						var inst_length = id.length;

						var template_name = resultq[0].Template_name;
						var template_region = resultq[0].Region;

			
						for(var i=0;i<inst_length;i++)
							{
								result_inst[i]=id[i].node;
								result_img[i]=id[i].image;
								result_role[i]=id[i].role;		
							}
						
						res.send(result_inst.toString()+"~"+result_img.toString()+"~"+result_role.toString()+"~"+template_name.toString()+"~"+template_region.toString());
				}
				});
				
				
		
		  }		
		});    
};

exports.vpc_deploy = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var vpc_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM vpc", function(err, result){
	if(err){
	throw err;
	}
	var vpc_rows = result.rows;
	/*var vpc_len = vpc_rows.length;
	console.log(vpc_rows);
	for (var i=0;i<vpc_len;i++)
		{
		vpc_name[i] = vpc_rows[i].vpc_name;
		vpc_id[i] = vpc_rows[i].vpc_id;
		}
	console.log(vpc_name);
	console.log(vpc_id);
	var rows = result.rows;
	res.send(vpc_name.toString()+"~"+vpc_id.toString());*/
	res.send(vpc_rows);
	 });
	
};

exports.project = function(req, res){
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	//client_pg.query("SELECT p_name FROM project", function(err, result){
	res.setHeader("Access-Control-Allow-Origin", "*");
	client_pg.query("SELECT * FROM project", function(err, result){
	if(err){
	throw err;
	}
	var proj_rows = result.rows;
	//console.log(proj_rows);
	res.send(proj_rows);
	/*console.log(proj_rows[0].p_name);
	var proj_len = proj_rows.length;
	console.log(proj_rows);
	console.log(proj_len);
	for (var i=0;i<proj_len;i++)
		{
			p_name[i] = proj_rows[i].p_name;
		}
	//console.log(p_name.length);
	//var rows = result.rows;
	res.send(p_name.toString());*/
	 });	 
};

exports.subnet_deploy = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var vpc_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM subnet", function(err, result){
	if(err){
	throw err;
	}
	var subnet_rows = result.rows;
	console.log(subnet_rows);
	res.send(subnet_rows);
	//console.log(result);
	/*var subnet_len = subnet_rows.length;
	//console.log(vpc_rows);
	for (var i=0;i<subnet_len;i++)
		{
		subnet_name[i] = subnet_rows[i].subnet_name;
		//vpc_id[i] = vpc_rows[i].vpc_id;
		}
	//console.log(subnet_name);
	//console.log(vpc_id);
	//var rows = result.rows;
	res.send(subnet_name.toString());*/	
	 });
	
};

exports.store_template = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	console.log(result);
	var Obj = JSON.parse(result);
	var inst = 0;
	var rl = 0;
	var img = 0;
	var new_role = [];
	var new_inst = [];
	var new_img = [];
	//console.log(Obj.vpc);
	//var newstr = 'role[]'
	//var obj_len = roles.length;
	//console.log(obj_len);
	//var check_len = Obj.length;
	//var ele = Obj[0];
//console.log(ele);
	var d1 = Obj.d1;
	var d1_array=d1.split(',');
console.log(d1_array[0]);
var prov = d1_array[0];
var vpc = d1_array[1];
var subnet = d1_array[2];
var project = d1_array[3];
var tename = d1_array[4];
var d2 = Obj.d2;
var d2_array=d2.split(',');
var d2_len = d2_array.length;
console.log(d2_len);
for(var k = 2; k<d2_len; k+=3){
	//console.log(k);
	new_role[rl] =  d2_array[k];
	rl++;
}

for(var k = 0; k<d2_len; k+=3){
	//console.log(k);
	new_inst[inst] =  d2_array[k];
	inst++;
}

for(var k = 1; k<d2_len; k+=3){
	//console.log(d2_array[k]);
	new_img[img] =  d2_array[k];
	img++;
}
console.log(new_role);
console.log(new_inst);
console.log(new_img);
//var client = new zerorpc.Client({ timeout: 120 });
//client.connect("tcp://172.29.59.61:4242");     
//var arr = ["aws", "create_environment_aws","rapidcloud","lledx" , new_inst[0], new_img[0], new_role[0],new_inst[1], new_img[1], new_role[1]];
var arr = ["aws", "create_environment", auth[0], auth[1], "ap-northeast-1", vpc, subnet,project, tename, "t2.micro","ami-383c1956", "app_server", "t2.medium", "ami-0dd8f963", "web_server", "m3.medium", "ami-f8220896", "data_base" ]
client.invoke("assign", arr, function(error, resq, more) {
	 console.log(resq);
   });
for(var i= 0;i<3;i++){
var client_pg = new pg.Client(conString);
client_pg.connect();
var nrole = new_role[i];
var ninst = new_inst[i];

//client_pg.query("INSERT INTO environment2(role,inst_type,vpc_id,subnet_id,p_id) values($1, $2, $3, $4, $5)", [nrole, ninst, vpc, subnet, project]);
}
//console.log(Obj.role[0]); 
	res.send("Hello");
	
};


exports.manage_template = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM enviroment3;", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	console.log(rows);
	res.render('manage_template', {data : rows});
	 });
	
};
//client_pg.connect();
exports.filter_env = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result); 
	 var proj_id=Obj.id;
	 client_pg.query("SELECT env_name FROM deployment_env where p_id = ($1) GROUP BY env_name", [proj_id], function(err,result){
		  if(err){
		   throw err;
		  }
		  var rows = result.rows;
		  console.log(rows);
		  res.send(rows);
	 });
};
exports.filter_env2 = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result); 
	 var proj_name=Obj.id;
	 console.log(req.body);
	 client_pg.query("SELECT pd_id FROM product where prod_name = ($1)", [proj_name], function(err,result){
		  if(err){
		   throw err;
		  }
		  var proj_id = result.rows;
		  client_pg.query("SELECT env_name,cloud_name FROM deployment_env where p_id = ($1) GROUP BY env_name,cloud_name", [proj_id[0].pd_id], function(err,result){
			  if(err){
			   throw err;
			  }
			  var rows = result.rows;
			  res.send(rows);
			});
		  
		 
	 });
	 
};

exports.popup_nodes = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var t_name=Obj.tname;
	console.log(t_name);
	client_pg.query("Select role,inst_type,inst_id,status from deployment_env where template_name = ($1)", [t_name], function(err,result){
		if(err){
			throw err;
		}
		
		var rows = result.rows;
		console.log(rows);
		var pinst = [];
		var prole = [];
		var ptype = [];
		var pstatus = [];
		var temp = [];
		var m =0;

		for (var i=0; i<rows.length;i++){
			//console.log(m);
			pinst[i] = rows[i].inst_id;
			prole[i] = rows[i].role;
			ptype[i] = rows[i].inst_type;
			pstatus[i] = rows[i].status;
			temp[m] = rows[i].role;
			m= m + 1;
			temp[m] = rows[i].inst_type;
			m= m +1;
			temp[m] = rows[i].inst_id;
			m = m+1;
			temp[m] = rows[i].status;
			m = m+1;
			//console.log(m);
		}
		//console.log(temp);
		//console.log(temp);
		res.send(pinst.toString()+"~"+prole.toString()+"~"+ptype.toString()+"~"+pstatus.toString()+"~"+temp.toString());
	});
	//res.send("hi");
};

exports.node_details = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result);
	 console.log(Obj);
	 var t_name=Obj.env_name;
	 var proj_id = Obj.proj_id;
	 console.log(t_name);
	 client_pg.query("Select * from deployment_env where env_name = ($1) AND p_id = ($2)", [t_name, proj_id], function(err,result){
	  if(err){
	   throw err;
	  }
	  var rows = result.rows;
	  //console.log(rows);
	  res.send(rows);
	 });
	 
	};
exports.node_detailsManage = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result);
	 console.log(Obj);
	 var t_name=Obj.env_name;
	 var proj_name = Obj.proj_id;
	 client_pg.query("Select * from deployment_env where env_name = ($1) AND p_name = ($2)", [t_name, proj_name], function(err,result){
	  if(err){
	   throw err;
	  }
	  var rows = result.rows;
		//console.log(rows);
	  res.send(rows);
	 });
	 
	};

fs.readFile('new.txt', 'utf-8', function(err,data){
    if(err){
    return console.log(err);}
    
    else
    {
    ndata = data.toString().split('~');
    dec = ndata[0];
    dec2 = ndata[1];
    decrypt1(dec);
    
    
    function decrypt1(text){
    var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    }     
    decrypt2(dec2);

    function decrypt2(text){
    var decipher2 = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    dec2 = decipher2.update(text,'hex','utf8')
    dec2 += decipher2.final('utf8');  
    }               
     
     //var client = new zerorpc.Client({ timeout: 120 });
     //client.connect("tcp://172.29.93.87:4242");     
     access = dec;
     secret = dec2;
     //console.log(access+secret);
     auth.push(access);
     auth.push(secret);
     //console.log(auth[0],auth[1]);
     //var arr = ["aws", "create_vpc",access, secret, region , cidr, vpc, tenancy];
    // console.log(arr);


    } 
    
    }); 

exports.cloud_project = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var project=Obj.project;
	var c_name = [];
	client_pg.query("Select cloud_name from cloudservice where p_name = ($1)", [project], function(err,result){
		if(err){
			throw err;
		}
		var rows = result.rows;

		console.log(rows);
		var cloud_len = rows.length;
		if(cloud_len == 0){
			res.send("Empty");
		}
		else{
			
			for(i=0;i<cloud_len;i++){
				c_name[i] = rows[i].cloud_name;
			}
			res.send(c_name.toString());
		}
		
	});
};

exports.filter_slot = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var cloud=Obj.cloud_service;
	var slot_name = [];
	client_pg.query("Select deploy_name from deployslot where cloud_name = ($1)", [cloud], function(err,result){
		if(err){
			throw err;
		}
		var rows = result.rows;

		console.log(rows);
		var slot_len = rows.length;
		if(slot_len == 0){
			res.send("Empty");
		}
		else{
			
			for(i=0;i<slot_len;i++){
				slot_name[i] = rows[i].deploy_name;
			}
			res.send(slot_name.toString());
		}
		
	});
};

exports.list_cloud_service = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var vpc_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	console.log("Hi");
	client_pg.query("SELECT cloud_name FROM cloudservice", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	console.log(rows);
	res.send(rows);
	 });
	
};


//Manage storage, sec group, key pair, 
exports.volumeDetails = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var inst_id = "i-f9491f79";
	client_pg.query("SELECT * FROM volume where inst_id = ($1)",[inst_id], function(err, result){
	//client_pg.query("SELECT * FROM volume ",function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		console.log(rows)
		res.send(rows);
		 });
}
exports.volumeDetails1 = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	client_pg.query("SELECT * FROM volume where status = ($1)",["Not"],function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		res.send(rows);
		 });
}
exports.keyPairDetails = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	client_pg.query("SELECT * FROM key_pair", function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		res.send(rows);
	});
}
exports.secGrpDetails = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	client_pg.query("SELECT * FROM security_group", function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		console.log(rows);
		res.send(rows);
	});
}
exports.attachVolume = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	    //vol = Obj.attachVol;
	var pv_name;
	var arr2 =[],arr1=[];//[["t2.micro", "stg1"],["t3.micro","stg2"]]
	var region;
	client_pg.query("SELECT * FROM volume where volume_name = ($1)",[vol], function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		console.log(rows)
		//pv_name = rows[0].prov_id;
		//region =  rows[0].region;
		arr1.push(rows[0].inst_id,rows[0].volume_name);
		arr2.push(arr1);
		console.log(arr2);
		var obj1 = new myObject(pv_name,"attach_volume",auth[0],auth[1],region,arr2);
		var result= obj1.attach();	
		res.send(result);
		 });
	
	
}
exports.attachKeyPair = function(req, res){	
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body),
	    Obj = JSON.parse(result),
	    pv_name = "AWS";
	var arr2 =[["t2.micro", "kp1"],["t3.micro","kp2"]]
	var region = "california";
	var obj1 = new myObject(pv_name,"attach_key",auth[0],auth[1],region,arr2);
	var result= obj1.attach();	
	res.send(result);
}
exports.attachSecGrp = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pv_name = "AWS";
	var arr2 =[["t2.micro", "sg1"],["t3.micro","kg2"]]
	var region = "california";
	var obj1 = new myObject(pv_name,"attach_secGroup",auth[0],auth[1],region,arr2);
	var result= obj1.attach();	
	res.send(result);
}
exports.deleteSecGrp = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	getAwsCred.getAwsMethod(req.body.accName,req.body.projName,req.body.prodName);
	     setTimeout(function(){
			   var arr = ["AWS", "delete_sec_grp",auth1, auth2, req.body.region , req.body.secGrpId];
			   //console.log(arr);
			   client.invoke("assign", arr, function(error, resq, more) {       
			   });
			   
			   res.send("Success");
	     }, 2000);
}

exports.deleteVol = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	getAwsCred.getAwsMethod(req.body.accName,req.body.projName,req.body.prodName);
	     setTimeout(function(){
			   var arr = ["AWS", "delete_vol",auth1, auth2, req.body.region , req.body.volName];
			   //console.log(arr);
			   client.invoke("assign", arr, function(error, resq, more) {       
			   });
			   
			   res.send("Success");
	     }, 2000);
}
exports.attachVol = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	getAwsCred.getAwsMethod(req.body.accName,req.body.projName,req.body.prodName);
	     setTimeout(function(){
			   var arr = ["AWS", "attach_vol",auth1, auth2, req.body.region , req.body.instId, req.body.volumeId];
			   console.log(arr);
			   client.invoke("assign", arr, function(error, resq, more) {  
			   });
			   
			   res.send("Success");
	     }, 2000);
	
}
exports.loadBalancerCreate = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result = JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var arr1 = Obj.d2;
	var instances = [];
	if (arr1.indexOf(",") !=-1) {
			instances = arr1.split(',');
		}else{
			instances.push(arr1);
		}
	
	var d1arr = Obj.d1.split(',');
	console.log(d1arr);
	var region = d1arr[3]
	   ,lbName = d1arr[4]
	   ,protocol = d1arr[5]
	   ,port1 = d1arr[6]
	   ,port2 = d1arr[7]
	var subnet = [], secGrp = [];
	subnet.push(d1arr[9]);
	secGrp.push(d1arr[8]);
	getAwsCred.getAwsMethod(d1arr[0],d1arr[1],d1arr[2]);
		 setTimeout(function(){	
			var arr = ["AWS", "create_load_bal",auth1, auth2, region, lbName, protocol, port1, port2, subnet,secGrp, instances];	
			console.log(arr);
				/*client.invoke("assign", arr, function(error, resq, more) {				   
				   });*/
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
			res.send("Success");
		 }, 2000);
	
}
exports.straccount = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result = JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pv_name ="Azure";
	var stracc = Obj.stracc,
	    strloc = Obj.strloc,
	    Account = Obj.account,
	    Project = Obj.project,
	    Product = Obj.product,
	    arr=[pv_name,"create_storage",stracc,strloc,Account,Project,Product];
	console.log(arr);
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
	//client.invoke("assign", arr, function(error, resq, more) {}); 
	res.send("success");
}
var spawn = require("child_process").spawn,child;
//Azure Load Balancer
exports.azLoadBalancer = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result = JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var cldService = Obj.cldService,
	    LbName = Obj.LbName,
	    protocol = Obj.protocol,
	    locPort = parseInt(Obj.locPort,10),
	    pubPort = parseInt(Obj.pubPort,10),
	    epName = Obj.epName,
	    lbSet = Obj.lbSet;
	
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {		    	    
		    var collection = db.collection('azureLoadBalancer');			
			var list1 = {lb_id : 1, cloud_Service : cldService, LB_Name : LbName, Protocol_Name : protocol, Local_Port : locPort, Public_Port : pubPort, EpName : epName, lbSetName : lbSet}
				
			collection.remove(function(err, result){
				if(err){
					console.log(err);
				}else{
					console.log("Document is deleted");
				}
			});
		    // Insert some users
		    collection.insert([list1], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
		      }
		      //Close connection
		      //db.close();
		    });
		  } 
		});
	 var script_path = './scripts/loadBalancer.ps1';
	child = spawn("powershell.exe",[script_path]);
	child.stdout.on("data",function(data){
	   console.log("Powershell Data: " + data);
	});
	child.stderr.on("data",function(data){
	    console.log("Powershell Errors: " + data);
	    res.send(data);
	});
	child.on("exit",function(){
	   console.log("Powershell Script finished");
	   res.send("Script finished");
	});
	child.stdin.end(); //end input
	
}
exports.azureEndPoint = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result = JSON.stringify(req.body)
	     Obj = JSON.parse(result);
	console.log(Obj);
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {		    	    
		    var collection = db.collection('Endpoints');			
			var list1 = {ep_id : 1, cloud_Service : Obj.cldSrvName, VM_Name : Obj.vmName, EP_Name : Obj.endpoint, Local_Port : parseInt(Obj.lclPort,10), Public_Port : parseInt(Obj.pbPort,10)}
				
			collection.remove(function(err, result){
				if(err){
					console.log(err);
				}else{
					console.log("Document is deleted");
				}
			});
		    // Insert some users
		    collection.insert([list1], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted %d documents into the "Endpoints" collection. The documents inserted with "_id" are:', result.length, result);
		      }
		      //Close connection
		      //db.close();
		    });
		  } 
		});
	var script_path = './scripts/CreateAzureEndPoints.ps1';
		child = spawn("powershell.exe",[script_path]);
		child.stdout.on("data",function(data){
		   console.log("Powershell Data: " + data);
		});
		child.stderr.on("data",function(data){
		    console.log("Powershell Errors: " + data);
		    res.send(data);
		});
		child.on("exit",function(){
		   console.log("Powershell Script finished");
		   res.send("Script finished");
		});
		child.stdin.end(); //end input
}

exports.trafficManage = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result = JSON.stringify(req.body)
	    ,Obj = JSON.parse(result);
	var ttl = 300;
	console.log(Obj);
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {		    	    
		    var collection = db.collection('TMProfile');			
			var list1 = {tmp_id : 1, azureTrafficName : Obj.pfName, DomainName : Obj.dmName+'.trafficmanager.net', LB_Method : Obj.lbMethod, Monitor_Port : parseInt(Obj.mPort,10), Monitor_Protocol : Obj.mnProtocol, MonitorRel_Path : "/", Ttl : ttl, cloud_service : Obj.cldService+'.cloudapp.net'}
				
			collection.remove(function(err, result){
				if(err){
					console.log(err);
				}else{
					console.log("Document is deleted");
				}
			});
		    // Insert some users
		    collection.insert([list1], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted %d documents into the "TMProfile" collection. The documents inserted with "_id" are:', result.length, result);
		      }
		    });
		  } 
		});
	var script_path = './scripts/createTrafficMgrProfile.ps1';
	child = spawn("powershell.exe",[script_path]);
	child.stdout.on("data",function(data){
	   console.log("Powershell Data: " + data);
	});
	child.stderr.on("data",function(data){
	    console.log("Powershell Errors: " + data);
	    res.send(data);
	});
	child.on("exit",function(){
	   console.log("Powershell Script finished");
	   res.send("Script finished");
	});
	child.stdin.end(); //end input
	
}

exports.validate = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	console.log(Obj);
	//client_pg.query("Select * from deployment_env where env_name = ($1) AND p_id = ($2)", [t_name, proj_id], function(err,result){
	client_pg.query("SELECT * FROM account where username = ($1) AND password = ($2)",[Obj.userName, Obj.passWord], function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		if(rows.length == 0)
		{
			res.send("Invalid");
		}else{
			var data = {};
			data.result = "Valid";
			data.role = rows[0].role;
			res.send(data);
		}
	});	
}
var upload_path1 = '../Rapid_cloud/blobfiles'
exports.blobUpload = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var bName = req.body.bName
	    ,cName = req.body.cName;
	console.log(bName);
	var imgData1;
	fs.readFile(req.files.bfile.path, function (err, data) {
	    var fileName = bName+"_"+req.files.bfile.name;
	    if(err){
	        console.log(err)
	    } else {
	        var newPath = path.resolve(upload_path1, fileName);

	        fs.writeFile(newPath, data, function (err) {
	            if(err) {
	               console.log(err);
	            } else {
	                fs.unlink(req.files.bfile.path, function() {
	                    if (err) {
	                        result.status = -1;
	                        result.message = err;
	                    } else {
	                        result.data = fileName;
	                    }	                   
	                    blobUploadAzure(fileName,newPath,cName,bName);
	                });
	            }
	        });
	    }
	});
	function blobUploadAzure(fname,fpath,cName,bName){
		console.log(fname,fpath);
		MongoClient.connect(url, function (err, db) {
			  if (err) {
			    console.log('Unable to connect to the mongoDB server. Error:', err);
			  } else {		    	    
			    var collection = db.collection('blobupload');			
				var list1 = {bb_id : 1, storageAccount : "l6portalvhdstqjd5msh1rcd", container_name : cName, blob_name : bName, blob_path : fpath}
					
				collection.remove(function(err, result){
					if(err){
						console.log(err);
					}else{
						console.log("Document is deleted");
					}
				});
			    // Insert some users
			    collection.insert([list1], function (err, result) {
			      if (err) {
			        console.log(err);
			      } else {
			        console.log('Inserted %d documents into the "blobupload" collection. The documents inserted with "_id" are:', result.length, result);
			        //res.send("Success");
			        var script_path = './scripts/uploadblob.ps1';
			    	child = spawn("powershell.exe",[script_path]);
			    	child.stdout.on("data",function(data){
			    	   console.log("Powershell Data: " + data);
			    	});
			    	child.stderr.on("data",function(data){
			    	    console.log("Powershell Errors: " + data);
			    	    res.send(data);
			    	});
			    	child.on("exit",function(){
			    	   console.log("Powershell Script finished");
			    	   res.send("Script finished");
			    	});
			    	child.stdin.end(); //end input
			      }
			    });
			  } 
			});		
	}
}

var hostName = '172.29.93.97',useName = 'sonata', userPass = "sonata@123";
exports.fileupload = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
    var accId = req.body.accName1
	,subId = req.body.subId
	,azureSub = req.body.azureSub
	,userName = req.body.userName
	,password = req.body.password;
console.log(req.body.accName1);
  
	console.log(accId,subId,azureSub,userName,password);
	var imgData;
	fs.readFile(req.files.file.path, function (err, data) {
	    //var fileName = azureSub+"_"+req.files.file.name;
		var fileName = accId+'.pem';
	    if(err){
	        console.log(err)
	    } else {
	        var newPath = path.resolve(upload_path, fileName);
	        fs.writeFile(newPath, data, function (err) {
	            if(err) {
	               console.log(err);
	            } else {
	                fs.unlink(req.files.file.path, function() {
	                    if (err) {
	                        result.status = -1;
	                        result.message = err;
	                    } else {
	                        result.data = fileName;
	                    }
	                    //res.render('accounts');
	                    fileinsert(fileName, accId);
	                });
	            }
	        });
	    }
	});
	function fileinsert(fileName, folder){
		var newPath = path.resolve(upload_path, fileName);
		var ssh = new SSH({
		    host: hostName,
		    user: useName,
		    pass: userPass
		});	 
		ssh.exec('mkdir /home/sonata/certificates/'+folder+'', {out: function(stdout) {console.log(stdout);}}).start();
		clientscp.scp(newPath, {
		    host: hostName,
		    username: useName,
		    password: userPass,
		    path: '/home/sonata/certificates/'+folder+''
		}, function(err) {
			if(err) console.log(err);
		    else console.log('sent');
		})
		fs.readFile(newPath, 'hex', function(err, imgData) {
	        console.log('imgData',imgData);
	        var accountid = accId;
	        var pvd = "Azure";
	        client_pg.query('insert into subscription (accountid,pem_file,provider,subscription_name,subscription_id,username,password) values ($1,$2,$3,$4,$5,$6,$7)',
	                           [accountid,imgData,pvd,azureSub,subId,userName,password],
	                           function(err, writeResult) {
	          console.log('err',err,'pg writeResult',writeResult);
	        });
	      });
		res.render('accounts');
		}
}

exports.accountDetails = function(req, res){	
	res.setHeader("Access-Control-Allow-Origin", "*");
	var rows,rows1,rows2,row3;
	client_pg.query("SELECT * FROM accountinfo;",function(err, result){
		if(err){
			throw err;
		}
		rows3 = result.rows;
	});
	client_pg.query("SELECT accountid, subscription_name, provider FROM subscription;", function(err, result){
		if(err){
		throw err;
		}
		rows = result.rows;	
		 });
	client_pg.query("SELECT * FROM project3;", function(err, result){
		if(err){
		throw err;
		}
		rows1 = result.rows;
		 });
	client_pg.query("SELECT * FROM product;", function(err, result){
		if(err){
		throw err;
		}
		rows2 = result.rows;
		store();
		 });
	function store(){
		var datadet = {};
		datadet.data1 = rows;
		datadet.data2 = rows1;
		datadet.data3 = rows2;
		datadet.data4 = rows3;
		res.send(datadet);
		//console.log(datadet);
	}	
}
exports.createAccount = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result  = JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	//console.log(Obj);
	client_pg.query("INSERT INTO accountinfo(accountid) values($1)", 
			 [Obj.acc],
					function(err, writeResult) {
		        console.log('err',err,'pg writeResult',writeResult);
		      });
	res.send("Success");
}
exports.createProject = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result  = JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	console.log(Obj);
	client_pg.query("INSERT INTO project3(p_id,p_name,start_date,account,technology,budget,team_size,manager_id,end_date,accountid,subscription_name) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", 
	 ['1003', Obj.pName, Obj.projDate, Obj.accName, Obj.pjTech, '3lakhs', '5', '1234', '2020-04-19', Obj.accName, Obj.subName],
			function(err, writeResult) {
        console.log('err',err,'pg writeResult',writeResult);
      });
	res.send("Success");
}
exports.createProduct = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	console.log(Obj.pdDate);
	
	client_pg.query("INSERT INTO product(accountid,p_name,prod_name,start_date,technology) values($1, $2, $3, $4, $5)", [Obj.accName, Obj.pjName, Obj.pdName, Obj.pdDate, Obj.pdTech],
			function(err, writeResult) {
        console.log('err',err,'pg writeResult',writeResult);
      });
	res.send("Success");
}
//Get the storage account
exports.getAzureStg = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	client_pg.query("SELECT * FROM storageacc;", function(err, result){
		if(err){
		throw err;
		}
		rows2 = result.rows;
		res.send(rows2);
		 });
}
//To store the aws credentials
exports.storeAwsSub = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result = JSON.stringify(req.body)
	    ,Obj = JSON.parse(result)
	    ,pvd = "AWS";
	console.log(Obj.accKey);
	 client_pg.query('insert into subscription (accountid,provider,subscription_name,accesskey,secretkey) values ($1,$2,$3,$4,$5)',
             [Obj.accName,pvd, Obj.awsSub, Obj.accKey, Obj.secKey],
             function(err, writeResult) {
		 console.log('err',err,'pg writeResult',writeResult);
	 });
	 res.send("Success");
}



//services for Azure resource group function
exports.createGroup = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
	 setTimeout(function(){
				var list1 = {rg_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGrp, region : req.body.region, vpcName : req.body.vpc, addPrefix : req.body.cidr};
			    var msg = saveObject(list1, "resourcegroup");
				//console.log(msg);
				//if(msg == true){
					var retVal = executeScript("resource.ps1");						
					var account = req.body.accountName,
						project = req.body.projName,
						resourceGroup = req.body.resGrp,
						region = req.body.region,
						vnetname = req.body.vpc,
						addressprefix = req.body.cidr;
						client_pg.query('INSERT INTO resources(account,project,resourcegroup,region) values($1, $2, $3, $4)', [account, project, resourceGroup, region]);	
						client_pg.query('INSERT INTO virtualnetwork(account,project,resourcegroup,vnetname,address_prefix,location) values($1, $2, $3, $4, $5, $6)', [account, project, resourceGroup, vnetname, addressprefix, region]);	
						res.send("success");
				//}else{res.send("Error in saving data");}
	     }, 2000);		 
}

function executeScript(scriptName){
	console.log(scriptName);
	//var cmd = 'C:\\Users\\sangamesh.b\\Desktop\\scripts\\'+scriptName;
	var cmd = './res_scripts/'+scriptName;
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

function saveObject(list, cname){
	console.log(list,cname);
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {
		    
		    console.log('Connection established to', url);    
		    var collection = db.collection(cname);
			
			collection.remove(function(err, result){
					if(err){
						console.log(err);
					}else{
						console.log("Document is deleted");
					}
				});
			
		    collection.insert([list], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
				return true;
			  }
		      db.close();
		    });
		  } 
		});
	
	
}
exports.getResource = function(req, res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		client_pg.query("SELECT * FROM resources;", function(err, result){
		if(err){
		throw err;
		}
		rows2 = result.rows;
		res.send(rows2);
		});
}
exports.createVnet = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var account = "Rezopia_Acc1",
	    project = "Rezopa_proj",
	    resourceGroup = "TestRG1",
		vnetname = "TestVNet",
		addressprefix = "192.168.0.0/16",
		region = "West US";
		client_pg.query('INSERT INTO virtualnetwork(account,project,resourcegroup,vnetname,address_prefix,location) values($1, $2, $3, $4, $5, $6)', [account, project, resourceGroup, vnetname, addressprefix, region]);	
		res.send("success"); 
}
exports.getVnet = function(req, res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		client_pg.query("SELECT * FROM virtualnetwork;", function(err, result){
		if(err){
		throw err;
		}
		rows2 = result.rows;
		res.send(rows2);
		});
}
exports.createSubnet = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
		getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
		setTimeout(function(){
				var list1 = {sn_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region, vpcName : req.body.vnetname, addPrefix : req.body.cidrBlkSn, confName : req.body.confName};
			    var msg = saveObject(list1, "subnet");
				//if(msg == true){
					var retVal = executeScript("subnet.ps1");	
					var account = req.body.accName,
						project = req.body.projName,
						resourceGroup = req.body.resGp,
						vnetname = req.body.vnetname,
						subnet_config_name = req.body.confName,
						addressprefix = req.body.cidrBlkSn;
						client_pg.query('INSERT INTO res_subnet(account,project,resourcegroup,vnetname,subnet_conf_name,address_prefix) values($1, $2, $3, $4, $5, $6)', [account, project, resourceGroup, vnetname, subnet_config_name, addressprefix]);			
						res.send("success");
				//}else{res.send("Error in saving data");}
	     }, 2000);		
		
}
exports.getSubnet = function(req, res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		client_pg.query("SELECT * FROM res_subnet;", function(err, result){
		if(err){
		throw err;
		}
		rows2 = result.rows;
		res.send(rows2);
		});
}
exports.createRtTable = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
	setTimeout(function(){
				var list1 = {rt_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region, vpcName : req.body.vnetName, routeTable : req.body.routTable, routeConf : req.body.routeConf, addPrefix : req.body.addPrefix,
				             nextHop : req.body.nextHop, nextHopIp : req.body.nextHopIp};
			    var msg = saveObject(list1, "routeTable");
				//if(msg == true){
					var retVal = executeScript("route.ps1");
					res.send("Success");
				//}else{res.send("Error in saving data");}
	     }, 2000);		
	
}
exports.createLclNetGtWay = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
	setTimeout(function(){
				var list1 = {gt_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region, gWayName : req.body.gwName, gateWayIpAdd : req.body.gwIpAdd, addPrefix : req.body.addPfx};
			    var msg = saveObject(list1, "localNwGway");
				//if(msg == true){
					var retVal = executeScript("localNetGWay.ps1");
					res.send("Success");
				//}else{res.send("Error in saving data");}
	     }, 2000);	
}
exports.createSecGrp = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
	setTimeout(function(){
				var list1 = {sg_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region,
				             rule1 : req.body.rule1, ruleName1 : req.body.ruleName1, access1 : req.body.access1, protocol1 : req.body.protocol1, priority1 : parseInt(req.body.priority1,10), prefix1 : req.body.prefix1,
							 rule2 : req.body.rule2, ruleName2 : req.body.ruleName2, access2 : req.body.access2, protocol2 : req.body.protocol2, priority2 : parseInt(req.body.priority2,10), prefix2 : req.body.prefix2,
							 sgName : req.body.sgName, vNet : req.body.vNet, subNet : req.body.subNet, cidr : req.body.cidr};
			    var msg = saveObject(list1, "securityGrp");
				//if(msg == true){
					var retVal = executeScript("securityGroup.ps1");
					res.send("Success");
				//}else{res.send("Error in saving data");}
	     }, 2000);	
	
}

exports.createDns = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
	setTimeout(function(){
				var list1 = {dns_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region, dnsName : req.body.dnsName};
			    var msg = saveObject(list1, "dns");
				//if(msg == true){
					var retVal = executeScript("dns.ps1");
					res.send("Success");
				//}else{res.send("Error in saving data");}
	     }, 2000);	
}
exports.createEndPoint = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
	setTimeout(function(){
				var list1 = {ep_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region, pfName : req.body.pfName, rtMethod : req.body.rtMethod,
								dnsName : req.body.dnsName, ttl : req.body.ttl, protocol : req.body.protocol, port : req.body.port, path : req.body.path,
								epName : req.body.epName, epType : req.body.epType, epStatus : req.body.epStatus, webAppName : req.body.webAppName};
			    var msg = saveObject(list1, "resGpEndpoint");
				//if(msg == true){
					var retVal = executeScript("endpoint.ps1");
					res.send("Success");
				//}else{res.send("Error in saving data");}
	     }, 2000);
}
exports.createVnetGWay = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
		getAwsCred.getAzureCred(req.body.accountName,req.body.projName,req.body.prodName);
		setTimeout(function(){
				var list1 = {gw_id : 1, userName : uName, pwd : pWord, resGrpName : req.body.resGp, region : req.body.region, pipName : req.body.pip, alMethod : req.body.alMethod,
				             vnet : req.body.vnet, snet : req.body.snet, gwType : req.body.gwType, vpnType : req.body.vpnType, gwSku : req.body.gwSku};
			    var msg = saveObject(list1, "createVnetGWay");
				//if(msg == true){
					var retVal = executeScript("VNetGWay.ps1");
					res.send("Success");
				//}else{res.send("Error in saving data");}
	     }, 2000);
		
}

//Deployment of template in resource group
exports.deployResource = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);	
	var Obj = JSON.parse(result);	
	var d1 = Obj.d1,
	    d2 = Obj.d2;
	var d2_obj = JSON.parse(d2);
	var resource = d1.split(","),
		account = resource[0],
		project = resource[1],
		product = resource[2],
		environment = resource[3],
		resGroup = resource[4],
		vnet = resource[5],
		subnet = resource[6],
		region = resource[7];
		
		MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {    
		    console.log('Connection established to');    
			var collection=db.collection('deploy_resources');
		    var data_obj = {rs_id : 1, AccoutName:account, ProjectName:project, ProductName:product, userName : "test@rapiddirectory.onmicrosoft.com", pwd : "Boron12#4", Environment:environment, Region:region, ResourceName:resGroup, VirtualNet:vnet, Subnet:subnet, Instances:d2_obj};
		    collection.remove(function(err, result){
					if(err){
						console.log(err);
					}else{
						console.log("Document is deleted");
					}
				});
			collection.insert([data_obj], function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted values sucess fully');
		      }
		      db.close();
		    });
		  } 
		});
		
	//var cmd = 'C:\\Users\\sangamesh.b\\Desktop\\scripts\\deploy.ps1';
	var cmd = './res_scripts/deploy.ps1';
	child = spawn("powershell.exe", [cmd]);
	child.stdout.on("data",function(data){
	   console.log("Powershell Data: " + data);
	});
	child.stderr.on("data",function(data){
	    console.log("Powershell Errors: " + data);
	});
	child.on("exit",function(){
	   console.log("Powershell Script finished");
	    var prod_id;
		client_pg.query("SELECT pd_id FROM product where prod_name = ($1);",[product], function(err, result){
		if(err){
		throw err;
		}
		rows2 = result.rows;
		prod_id = rows2[0].pd_id;
		savedata();
		});
	function savedata(){
	   for(var i=0;i<d2_obj.length;i++)
		{		
		client_pg.query("INSERT INTO deployment_env(prov_id,region,env_name,p_name,p_id,vpc_name,subnet_name,inst_type,inst_id,image,role,status,cloud_name,accountid,product_name,type) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", 
		 ['Azure', region, environment, project, prod_id, vnet, subnet, d2_obj[i].instName, d2_obj[i].instName,d2_obj[i].os, d2_obj[i].roleName, "running", resGroup, account, product,"resGroup"],
				function(err, writeResult) {
			console.log('err',err,'pg writeResult',writeResult);
			
		  });	
		
		}
	} 
	});
	child.stdin.end(); //end input	
	res.send("Success");
	
	
}

//resource group action functions
exports.resGroup_action= function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.body);
		getAwsCred.getAzureCred(req.body.accName,req.body.projName,req.body.prodName);
		setTimeout(function(){
			if(req.body.action == "Stop"){
				var list1 = {rs_id : 1, userName : uName, pwd : pWord, resName : req.body.resGroup, vmName : req.body.role};
			    var msg = saveObject(list1, "stopVmRes");
				var retVal = executeScript("stopVmRes.ps1");
				client_pg.query("UPDATE deployment_env SET status = ($1) WHERE role= ($2) and cloud_name=($3)",["stopped",req.body.role,req.body.resGroup]);
				res.send("Success");
			}else if(req.body.action == "Start"){
				var list1 = {rs_id : 1, userName : uName, pwd : pWord, resName : req.body.resGroup, vmName : req.body.role};
			    var msg = saveObject(list1, "startVmRes");
				var retVal = executeScript("startVmRes.ps1");
				client_pg.query("UPDATE deployment_env SET status = ($1) WHERE role= ($2) and cloud_name=($3)",["running",req.body.role,req.body.resGroup]);
				res.send("Success");
			}else if(req.body.action == "Terminate"){
				var list1 = {rs_id : 1, userName : uName, pwd : pWord, resName : req.body.resGroup, vmName : req.body.role};
			    var msg = saveObject(list1, "removeVmRes");
				var retVal = executeScript("removeVmRes.ps1");
				res.send("Success");
			}			
	     }, 2000);		
		
}
//Service to sync the vm details from the azure subscription
exports.upadatevm_details = function(req, res){
	console.log(req.body);
	if(req.body.Provider == "Azure"){
		getAwsCred.getAzureCred(req.body.accName,req.body.projName,req.body.prodName);
		setTimeout(function(){
				var prod_id;
			client_pg.query("SELECT pd_id FROM product where prod_name = ($1);",[req.body.prodName], function(err, result){
			if(err){
			throw err;
			}
			rows2 = result.rows;
			prod_id = rows2[0].pd_id;
			var list1 = {vm_id : 1, provider : req.body.Provider, userName : uName, pwd : pWord, project : req.body.projName, pd_id : prod_id};
					var msg = saveObject(list1, "getVms");
					var retVal = executeScript("getVms.ps1");
					res.send("Success");
			});	
				
			 }, 2000);
	}else{
		getAwsCred.getAwsMethod(req.body.accName,req.body.projName,req.body.prodName);
		setTimeout(function(){
				var prod_id;
			client_pg.query("SELECT pd_id FROM product where prod_name = ($1);",[req.body.prodName], function(err, result){
			if(err){
			throw err;
			}
			rows2 = result.rows;
			prod_id = rows2[0].pd_id;
			var list1 = {vm_id : 1, provider : req.body.Provider, userName : auth1, pwd : auth2, project : req.body.projName, pd_id : prod_id};
					var msg = saveObject(list1, "getVms");
					var retVal = executeScript("getVms.ps1");
					res.send("Success");
			});	
				
			 }, 2000);
	}		 
	
}
exports.softwareTool = function(req, res){	
	var list1 = {t_id : 1, ip_add : req.body.pip, node_name : req.body.name, tool : req.body.sName};
	var msg = saveObject(list1, "softwareDeploy");
	res.send("Success");
}

