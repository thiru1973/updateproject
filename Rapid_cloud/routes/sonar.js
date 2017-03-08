var request = require('request');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var murl = 'mongodb://172.29.59.100:27017/test';
var ip = 'http://172.29.59.33:9000';
var issueUrl = ip+'/api/issues/search';
//var prjUrl = ip+'/api/projects';
var prjUrl =  ip+'/api/resources/index?metrics=date&format=json';
var sonarUrl = ip+'/api/issues/search?facetMode=debt&facets=severities';
var comp = ip+'/api/resources?resource=sonarproject&metrics=ncloc,quality_gate_details,complexity,sqale_index,sqale_rating,sqale_debt_ratio,duplicated_lines';
exports.sonarProject = function(req, res){
	res.render('sonarProject');
}
exports.sonarView = function(req, res){
	res.render('sonarview');
}
exports.sonarPrjList = function(req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var dt,dt1;
	if(query.mtName == "projectList")
	{	
		request({method: 'GET', url: prjUrl}, function(error, response) {
					if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
						console.log(error);
					}					
				   res.send(response.body);                
				});
	}else if(query.mtName == "projIssues"){
		
		request({method: 'GET', url: comp}, function(error, response) {
					if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
						console.log(error);
					}
					dt1 = response.body;
					
					//res.send(response.body);                
				});
		request({method: 'GET', url: sonarUrl}, function(error, response) {
					if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
						console.log(error);
					}
					dt = response.body;
					store();
				   //res.send(response.body);                
				});
		}
	function store(){
		var datadet = {};
		datadet.data1 = dt;
		datadet.data2 = dt1;
		MongoClient.connect(murl, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {    
		    console.log('Connection established to');    
			var collection=db.collection('sonar_report');
		    collection.insert(datadet, function (err, result) {
		      if (err) {
		        console.log(err);
		      } else {
		        console.log('Inserted values sucess fully');
		      }
		      db.close();
		    });
		  } 
		});  
		res.send(datadet);
	}
}