var Zabbix = require ('zabbix');
var pg = require("pg");
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();

var zabbix = new Zabbix('http://zabbixservercld.cloudapp.net/zabbix/api_jsonrpc.php','admin', 'zabbix');

exports.zabbixHost = function(req, res){
	var inst = (req.body.d1).split(",");
	var rows4;
	for(var i=0;i<inst.length;i++){
		client_pg.query("SELECT role,cloud_name from deployment_env where deploy_id = ($1)",[inst[i]],function(err, result){
				if(err){
					throw err;
				}
				rows4 = result.rows;
				zabbix.login(function (err, resp, body) {
				  if (!err) {
					console.log("Authenticated! AuthID is: " + zabbix.authid);
				  }
					zabbix.call("host.create",
					{
							"jsonrpc": "2.0",
							"host": rows4[0].role,
							"interfaces": [
								{
									"type": 1,
									"main": 1,
									"useip": 0,
									"ip": "",
									"dns": rows4[0].cloud_name+".cloudapp.net",
									"port": "10050"
								}
							],
							"groups": [
								{
									"groupid": "8"
								}
							],
							 "templates": [
								{
									"templateid": "10001"
								}
							]
						}
					,function (err, resp, body) {
					  if (!err) {			  
						console.log(resp.statusCode + " result: " + JSON.stringify(body.result[0]));
						res.send(body);
					  }else{
						  console.log(err)
						  res.send(err);
					  }
					});
				});
				
	});
			
	}
	
	
} 

exports.monitor = function(req, res){
	res.render('monitor');
}

exports.openzabbix = function(req,res){
	res.setHeader('user:admin','password:zabbix');
	res.redirect('http://zabbixservercld.cloudapp.net/zabbix/charts.php?ddreset=1');
}