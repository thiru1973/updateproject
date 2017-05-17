var http = require('http');
var request = require('request');
var pg = require("pg");
var fs=require('fs');
var MongoClient = require('mongodb').MongoClient;
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();
var murl = 'mongodb://172.29.59.100:27017/test';
//var jenkins = require('jenkins')({ baseUrl: 'http://sonatawkins.cloudapp.net:8080', crumbIssuer: false });
exports.pipelinelist = function(req, res){
	res.render('pipelinelist');
}
exports.pipelineview = function(req, res){
	res.render('pipelineview');
}

exports.jenkinsJob = function(req, res){
	console.log(req.body);
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	client_pg.query("SELECT pipeline_names,url,delivery_pipeline from jenkins where accountid = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				res.send(rows4);
	});
	//res.send(req.body);
	/*jenkins.view.list(function(err, data) {
	  if (err) res.send(err);
	  res.send(data);
	});*/
}
exports.pipelineviewdata = function(req, res){
	var pipe = req.body.pipelineName;
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	   
		getUrlPipe(pipe,acName,pjName,pdName, function(callback){
			console.log(callback)
			var jenkins = require('jenkins')({ baseUrl: callback, crumbIssuer: false });
			jenkins.view.get(pipe, function(err, data) {
			  if (err) res.send(err);
			  res.send(data);
			});
		})	
}
exports.buildPipe = function(req, res){
	var job = req.body.jobName;
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	getUrlJob(acName,pjName,pdName, function(callback){
		var jenkins = require('jenkins')({ baseUrl: callback, crumbIssuer: false });
		jenkins.job.build(job, function(err, data) {
		  if (err){
			  console.log(err);
			  res.send(err);}
		  else{
			  console.log(data);
			  var d = {};
			  d.msg = "Build pipeLine has started with queue item number";
			  d.queue = data;
			  d.url = callback;
			  res.send(d);
			  }
		});
		
	})
}

exports.projectTech = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var data = [ "tui", "worldventures", "isv" ];
	res.send(data);
}
function getUrlPipe(pipe, acName, pjName, pdName, callback){
	client_pg.query("SELECT pipeline_names,url from jenkins where accountid = ($1) and p_name = ($2) and product_name = ($3) and pipeline_names = ($4)",[acName,pjName,pdName,pipe],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				callback(rows4[0].url)
	})
}
function getUrlJob(acName, pjName, pdName, callback){
	client_pg.query("SELECT url from jenkins where accountid = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				callback(rows4[0].url)
	})
}
var conString1 = "pg://postgres:cloud123@172.29.59.63:5432/CI_Devops";
var client_pg1 = new pg.Client(conString1);
client_pg1.connect();
exports.getBuild = function(req, res){
	var job = req.body.jobName;
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	 getUrlJob(acName,pjName,pdName, function(callback){
		var jenkins = require('jenkins')({ baseUrl: callback, crumbIssuer: false });
		jenkins.job.get(job, function(err, data1) {
		  if (err){
			  console.log(err);
		  }else{
			jenkins.build.get(job, data1.builds.length, function(err, data) {
				if (err) res.send(err);
				client_pg1.query("INSERT INTO jenkins_data(accountid,project_name,prod_name,job_name,build_detail) values($1,$2,$3,$4,$5)",[acName,pjName,pdName,job,data],
						function(err, stresult) {
						if(err){
							console.log(err);
						}else{
							res.send(data);
						}
				});
				
			});		
		  }
		});
	 })		
}
exports.getBuildLog = function(req, res){
	var job = req.body.jobName;
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	   
	getUrlJob(acName,pjName,pdName, function(callback){
		var jenkins = require('jenkins')({ baseUrl: callback, crumbIssuer: false });
		jenkins.job.get(job, function(err, data1) {
		  if (err){
			  console.log(err);
		  }else{
			jenkins.build.log(job, data1.builds.length, function(err, data) {
			  if (err) throw err;	 
			  res.send('log', data);
			});	
		  }
		});	
	})
	
	
}

exports.uploadJson = function(req, res){
	res.render('upload');
}
exports.uploadConfJson = function(req, res){
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	fs.readFile(req.files.file.path, "utf-8", function (err, data) {
	    if(err){
	        console.log(err)
	    } else {
			console.log(data);
			MongoClient.connect(murl, function (err, db) {
			  if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			  } else {
				var collection = db.collection('config');				
				collection.insert({data : data}, function (err, result) {
				  if (err) {
					console.log(err);
				  } else {
					console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
				  }
					var jenkins = require('jenkins')({ baseUrl: 'http://sonatawkins.cloudapp.net:8080', crumbIssuer: false });
					jenkins.job.build('Dynamic_Pipeline', function(err, data) {
						  if (err) throw err;
						  res.render('pipelinelist');
					});
				  db.close();
				});
			  } 
			});
			//res.send("Success");
	    }
	});
}


exports.getDedicatedDevops = function(req,res){
var deploy_id = req.body.deployment_id;
console.log(req.body);
	client_pg.query("SELECT ci_url from dedicated_devops where deployment_id = ($1)",[deploy_id],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
                console.log(rows4);
				var ci_url = rows4[0].ci_url;
				var jenkins = require('jenkins')({ baseUrl: ci_url, crumbIssuer: false });
                jenkins.job.build('Dynamic_Pipeline', function(err, data) {
                      if (err) throw err;
                      res.send('success');
                });
	})

}



exports.demoJenkins = function(req,res){
						/* var jenkins = require('jenkins')({ baseUrl:'http://sonatawkins.cloudapp.net:8080', crumbIssuer: false });
    					jenkins.job.build('Dynamic_Pipeline', function(err, data) {
    						  if (err) throw err;
    						  res.send(data);
    					}); */
    					var jenkins = require('jenkins')({ baseUrl:'http://sonatawkins.cloudapp.net:8080', crumbIssuer: false });
                        jenkins.view.get('Demo_Delivery_Project', function(err, data) {
                          if (err) console.log(err);
						  console.log(data);
                          res.send(data.pipelines[0].pipelines);
                        });
}
