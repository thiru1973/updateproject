var http = require('http');
var request = require('request');
var pg = require("pg");
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();
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
	client_pg.query("SELECT pipeline_names,url from jenkins where accountid = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
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
		  if (err) throw err;		 
		  console.log('queue item number', data);
		});
		res.send("Success");
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





