var pg = require("pg");
var fs = require('fs');
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
var spawn = require("child_process").spawn,child;

exports.accounts = function(req,res){
	res.render('accounts');
}
exports.login = function(req, res){
	res.render('login');
}
exports.validate = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	console.log(Obj);
	client_pg.query("SELECT * FROM account;", function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		var row_length = rows.length;
		console.log(rows);		
		 });
	res.send("Success");
}
var path = require('path');

exports.runScript = function(req, res){
	var result = JSON.stringify(req.body),
	    Obj = JSON.parse(result),
	    scriptName = Obj.scriptName,
	    scriptData = Obj.scriptData;
	
	/*fs.writeFile('./scripts/'+scriptName+'.ps1', scriptData, function (err) {
	  if (err) return res.send(err);
	  console.log('creating file');
	  
	  var script_path = './scripts/'+scriptName+'.ps1';
	  //console.log(script_path);
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
		res.send("Powershell script is finished");
		
		//res.send("success");
		});
		child.stdin.end(); //end input	  
	});*/
	var file = 'C:\\Users\\sangamesh.b\\Desktop\\scripts\\VMDetails-18-Apr-2016-10-09-05.csv';
	res.download(file, 'VMDetails-18-Apr-2016-10-09-05.csv');
	
}