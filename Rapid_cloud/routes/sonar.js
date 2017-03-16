var request = require('request');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var pg = require("pg");
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();

var murl = 'mongodb://172.29.59.100:27017/test';
var ip = 'http://172.29.59.33:9000';


var sonarUrl = ip+'/api/issues/search?facetMode=debt&facets=severities';
var comp = ip+'/api/resources?resource=sonarproject&metrics=ncloc,quality_gate_details,complexity,sqale_index,sqale_rating,sqale_debt_ratio,duplicated_lines';
exports.sonarProject = function(req, res){
	res.render('sonarProject');
}
exports.sonarView = function(req, res){
	res.render('sonarview');
}
function getSonarUrl(acName,pjName,pdName,callback){
	client_pg.query("SELECT * from sonarqube where account_id = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				callback(rows4)
	});
}
exports.sonarPrjList = function(req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var acName = query.accountName
	   ,pjName = query.projectName
	   ,pdName = query.productName;
	var dt,dt1;
	if(query.mtName == "projectList")
	{	
		client_pg.query("SELECT * from sonarqube where account_id = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				res.send(rows4);
	});
		/*request({method: 'GET', url: prjUrl}, function(error, response) {
					if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
						console.log(error);
					}					
				   res.send(response.body);                
				});*/
	}else if(query.mtName == "projIssues"){
		
		getSonarUrl(acName,pjName,pdName, function(callback){
			console.log(callback);
			//var comp = callback[0].url+'/api/resources?resource=sonarproject&metrics=ncloc,quality_gate_details,complexity,sqale_index,sqale_rating,sqale_debt_ratio,duplicated_lines';
			//var sonarUrl = callback[0].url+'/api/issues/search?facetMode=debt&facets=severities';
			var comp = ip+'/api/resources?resource=sonarproject&metrics=ncloc,quality_gate_details,complexity,sqale_index,sqale_rating,sqale_debt_ratio,duplicated_lines';
			var sonarUrl = ip+'/api/issues/search?facetMode=debt&facets=severities';
			request({method: 'GET', url: comp}, function(error, response) {
					if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
						console.log(error);
					}
					dt1 = response.body;              
				});
			request({method: 'GET', url: sonarUrl}, function(error, response) {
					if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
						console.log(error);
					}
					dt = response.body;
					store();             
				});
		})
		
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