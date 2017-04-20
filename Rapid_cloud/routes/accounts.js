var pg = require("pg");
var fs = require('fs');
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
//var conString = "pg://postgres@mongoclone.cloudapp.net:5432/abrahamdevilliers";
var client_pg = new pg.Client(conString);
var spawn = require("child_process").spawn,child;

exports.accounts = function(req,res){
	res.render('accounts');
}
exports.login = function(req, res){
	res.render('login');
}
exports.createDevTemp = function(req,res){
	res.render('createDevTemp');
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
var cron = require('cron');
exports.runScript = function(req, res){
	var result = JSON.stringify(req.body),
	    Obj = JSON.parse(result),
	    scriptName = Obj.scriptName,
	    scriptData = Obj.scriptData,
	    stype = Obj.type,
	    hr = Obj.hr,
	    min = Obj.min;
	 console.log(req.body);
	if(stype == "Once"){
	   // var scdtime = '00 '+min+' '+hr+' '+"*"+' '+"*"+' '+"*"+' ';
	    //var cronJob = cron.job(scdtime, function(){
        fs.writeFile('./scripts/'+scriptName+'.ps1', scriptData, function (err) {
          if (err) return res.send(err);
          console.log('creating file');

          var script_path = './scripts/'+scriptName+'.ps1';
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
            res.send("Success");
            });
            child.stdin.end(); //end input
            });
            // cronJob.start();
       // });
	}else{
	    var scdtime = '00 '+min+' '+hr+' '+"*"+' '+"*"+' '+"*"+' ';
        var cronJob = cron.job(scdtime, function(){
        fs.writeFile('./scripts/'+scriptName+'.ps1', scriptData, function (err) {
              if (err) return res.send(err);
              console.log('creating file');

            var script_path = './scripts/'+scriptName+'.ps1';
            child = spawn("powershell.exe", [script_path]);
            child.stdout.on("data",function(data){
               console.log("Powershell Data: " + data);
            });
            child.stderr.on("data",function(data){
                console.log("Powershell Errors: " + data);
                //res.send(data);
            });
            child.on("exit",function(){
               console.log("Powershell Script finished");
               //res.send("Script finished");
            });
            child.stdin.end(); //end input
            });
            cronJob.start();
           });
	}
}
var _ = require("underscore");
exports.download = function(req,res){
	function getMostRecentFileName(dir) {
	    var files = fs.readdirSync(dir);

	    // use underscore for max()
	    return _.max(files, function (f) {
	        var fullpath = path.join(dir, f);

	        // ctime = creation time is used
	        // replace with mtime for modification time
	        return fs.statSync(fullpath).ctime;
	    });
	}
	var fpath = 'C:\\Users\\sangamesh.b\\Desktop\\scripts\\result\\'
	var filepath = getMostRecentFileName(fpath);
	res.download(fpath+filepath,filepath);
	
}