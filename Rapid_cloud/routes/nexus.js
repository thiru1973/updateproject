var request = require('request');
var pg = require("pg");
var parseString = require('xml2js').parseString;
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();

exports.nexusView = function(req, res){
	res.render('nexusView');
}
exports.nexusafView = function(req, res){
	res.render('nexusafView');
}
exports.nexusaf = function(req, res){
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName;
	client_pg.query("SELECT * from nexus where accountid = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				if(rows4.length == 0){
					res.send("No data found for selected Project")
				}else{
					var nexUrl = 'http://admin:admin123@sonatanexus.cloudapp.net:8081/service/local/artifact/maven?r='+rows4[0].repo_id+'&g='+rows4[0].group_id+'&a='+rows4[0].arifact_id+'&v='+rows4[0].version+'';
					request({method: 'GET', url: nexUrl}, function(error, response) {
						if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
							console.log(error);
						}
						parseString(response.body, function (err, result) {
							res.send(result)
						});
					});
				}
	});	
}
exports.nexusstatus = function(req, res){
	var acName = req.body.accountName
	   ,pjName = req.body.projectName
	   ,pdName = req.body.productName
	   ,afName = req.body.artifact;
	client_pg.query("SELECT * from nexus where accountid = ($1) and p_name = ($2) and product_name = ($3)",[acName,pjName,pdName],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				if(rows4.length == 0)
				{
					res.send("No data found for selected project");
				}else{
						var nexUrl = 'http://admin:admin123@sonatanexus.cloudapp.net:8081/service/local/repositories/'+rows4[0].repo_id+'/content/'+rows4[0].group_id+'/'+rows4[0].arifact_id+'/'+rows4[0].version+'';
						request({method: 'GET', url: nexUrl}, function(error, response) {
							if ( error || (response.statusCode !== 201 && response.statusCode !== 302) ) {
								console.log(error);
							}
							parseString(response.body, function (err, result) {
								res.send(result)
							});
						});
				}
	});	
}