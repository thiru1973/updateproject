var jenkinsapi = require('jenkins-api');
var http = require('http');
var request = require('request');
//var jenkins = jenkinsapi.init("http://sonatawkins.cloudapp.net:8080");
var jenkins = require('jenkins')({ baseUrl: 'http://sonatawkins.cloudapp.net:8080', crumbIssuer: false });
//var jenkins = require('jenkins')({baseUrl: 'http://jenk:cloudrapid1@172.29.59.33:8080', crumbIssuer:false});
//var jenkins = require('jenkins')({ baseUrl: 'http://wv-na-qa-jenkins-lb-1683162067.us-east-1.elb.amazonaws.com:8080', crumbIssuer: true });

exports.pipelinelist = function(req, res){
	res.render('pipelinelist');
}
exports.pipelineview = function(req, res){
	res.render('pipelineview');
}

exports.jenkinsJob = function(req, res){	
	jenkins.view.list(function(err, data) {
	  if (err) res.send(err);
	  res.send(data);
	});
}
exports.pipelineviewdata = function(req, res){
	var pipe = req.body.pipelineName;
	jenkins.view.get(pipe, function(err, data) {
	  if (err) res.send(err);
	  res.send(data);
	});
}
exports.buildPipe = function(req, res){
	var job = req.body.jobName;
	jenkins.job.build(job, function(err, data) {
	  if (err) throw err;
	 
	  console.log('queue item number', data);
	});
	res.send("Success");
}

exports.projectTech = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var data = [ "tui", "worldventures", "isv" ];
	res.send(data);
}
exports.getBuild = function(req, res){
	//console.log(req.body.jobName);
	var job = req.body.jobName;
	jenkins.job.get(job, function(err, data1) {
	  if (err){
		  console.log(err);
	  }else{
		//console.log(data1.builds.length);
		jenkins.build.get(job, data1.builds.length, function(err, data) {
			if (err) res.send(err);
			res.send(data);
		});		
	  }
	});	
}
exports.getBuildLog = function(req, res){
	var job = req.body.jobName;
	jenkins.job.get(job, function(err, data1) {
	  if (err){
		  console.log(err);
	  }else{
		//console.log(data1.builds.length);
		jenkins.build.log(job, data1.builds.length, function(err, data) {
		  if (err) throw err;	 
		  res.send('log', data);
		});	
	  }
	});	
	
}





