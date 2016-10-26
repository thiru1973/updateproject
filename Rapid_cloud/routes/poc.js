var http = require('http');
var express = require('express');
var app     = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var pg = require("pg");
var async = require("async");
var fs = require("fs");
var jsonfile = require("jsonfile");

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var url = 'mongodb://172.29.59.100:27017/test';


var GitHub = require('github-api');
var Promise = require("es6-promise").Promise;

var noAuth = new GitHub();
var repo_names = [];
var branch_array = [];

// basic auth
const gh = new GitHub({
   username: 'sernapallyanurag',
   password: 'carborandum12#4'
});

var Jenkins_Centos ={
"tool_name" : "Jenkins",
"OS" : "Centos",
"os_version" : "7.1",
"endpoints" : "'8080'",
"runlist" : "'role[centjen]'",
"devops_type" : "CI",
"version" : "1.6581-1",
"standard_vm" : "'Medium'",
"process_vms" : "3",
"technology" : ["Node.js", "Java"],
"image" : "'5112500ae3b842c8b9c604889f8753c3__OpenLogic-CentOS-71-20150605'"			
};

/*
const me = gh.getUser();
me.listRepos()
.then(function(data) {
	//console.log(data);
	for (var i=0; i<data.data.length;i++){
		repo_names[i] = data.data[i].name;
		//console.log(repo_names[i]);
	}
	for (var j=0;j<repo_names.length;j++){
	//console.log(repo_names[j]);
	var repo = gh.getRepo('rahulkumardbit',repo_names[j]);
 console.log(repo.__currentTree.branch);
 repo.listBranches()
.then(function(data){
	//console.log(data);
	branch_array.push(data.data);
	console.log(branch_array)
});
//setTimeout(console.log(branch_array), 10000);
}
	
});

jsonfile.writeFile("projectfiles/projectname.json", Jenkins_Centos, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 





var req = request.post(url, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    console.log('URL: ' + body);
  }
});
var form = req.form();
form.append('file', '<FILE_DATA>', {
  filename: 'myfile.txt',
  contentType: 'text/plain'
});


*/































var ActiveDirectory = require('activedirectory');


var ad = new ActiveDirectory({
			 url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/ou=Users,ou=Nandi,dc=SONATA,dc=LOCAL',
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/DC=SONATA,DC=LOCAL',
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/cn=ISV_Comp_Users,cn=Users,dc=SONATA,dc=LOCAL',
			});
			
exports.authentication = function(req, res){	
	var username = "sangamesh.b@sonata-software.com", password = "Ubuntu12#4";		 
	ad.authenticate(username, password, function(err, auth) {
		  if (err) {
			res.send('ERROR: '+JSON.stringify(err));
		  }
		  if (auth) {
			res.send(auth);
		  }
		  else {
			res.send('Authentication failed!');
		  }
		});
}