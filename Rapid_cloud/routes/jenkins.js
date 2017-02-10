var jenkinsapi = require('jenkins-api');
var http = require('http');
//var jenkins = jenkinsapi.init("http://sonatawkins.cloudapp.net:8080");
var jenkins = require('jenkins')({ baseUrl: 'http://sonatawkins.cloudapp.net:8080', crumbIssuer: false });
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
		console.log(data1.builds.length);
		jenkins.build.get(job, data1.builds.length, function(err, data) {
			if (err) res.send(err);
			console.log(data);
			res.send(data);
		});		
	  }
	});
	
	
}

exports.testRest = function(req, res){
	var data = {
		arr : [1,2,3,[4,5]]
	};
	var data1 = JSON.stringify(data);
	var url = "http://172.29.59.65:4242/users/";
	http.get(url+data1, function(response) {
	var finalData = '';
	  response.on("data", function (data) {
	    finalData += data.toString();
	  });
	  response.on("end", function() {
	    res.send(finalData.toString());
	  });
	});
}

/*jenkins.info(function(err, data) {
  if (err) throw err;

  console.log('info', data);
});
jenkins.view.get('Release2.0(Sonar-Pipeline)', function(err, data) {
	  if (err) res.send(err);
	  console.log(data);
	  });*/
/*jenkins.build.log('Release2.0(Build_Sonar)', 1, function(err, data) {
  if (err) console.log(err);

  console.log('build', data);
});*/
/* jenkins.job.list(function(err, data) {
if (err) throw err;

console.log('jobs', data);
Build+Package
}); */
/*jenkins.view.list(function(err, data) {
  if (err) console.log(err);
  console.log(data);
});
jenkins.job.get('Sonar_coverage', function(err, data) {
  if (err){
	  console.log(err);
  }else{
	console.log(data.builds.length);
  }
});*/



