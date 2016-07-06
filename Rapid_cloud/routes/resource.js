var spawn = require("child_process").spawn,child;

exports.createGroup = function(req,res){
	var retVal = executeScript("resource.ps1");
	res.send(retVal);	
}
exports.createVnet = function(req,res){
	var retVal = executeScript("VNet.ps1");
	res.send(retVal);
}
exports.createSubnet = function(req,res){
	var retVal = executeScript("subnet.ps1");
	res.send(retVal);
}
function executeScript(scriptName){
	var cmd = 'C:\\Users\\sangamesh.b\\Desktop\\scripts\\'+scriptName;
	child = spawn("powershell.exe", [cmd]);
	child.stdout.on("data",function(data){
	   console.log("Powershell Data: " + data);
	});
	child.stderr.on("data",function(data){
	    console.log("Powershell Errors: " + data);
	    return data;
	});
	child.on("exit",function(){
	   console.log("Powershell Script finished");
	   return "Script finished";
	});
	child.stdin.end(); //end input
}