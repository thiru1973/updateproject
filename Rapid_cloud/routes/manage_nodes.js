var zerorpc = require("zerorpc");

var pg = require("pg");
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();
var rpcConString = "tcp://172.29.93.97:4242";
var client = new zerorpc.Client();
client.connect(rpcConString);
//Constructor for manage volumes, security groups, keypairs 
function AttachObject(pvName, methodName, acc, sec, region, sgArr) {
	  this.pvName = pvName;
	  this.methodName = methodName;
	  this.acc = acc;
	  this.sec = sec;
	  this.sgArr = sgArr;
	  this.region = region;
	  
	}

AttachObject.prototype.attach = function() {
	  var arr=this.sgArr;
	  arr.splice(0,0,(this.pvName));
	  arr.splice(1,0,(this.methodName));
	  arr.splice(2,0,(this.acc));
	  arr.splice(3,0,(this.sec));
	  arr.splice(4,0,(this.region));
	  console.log(arr);
	  /*client.invoke("assign", arr, function(error, resq, more) {
	       
	   });*/
	  
	  return "Success";
	};






var ActiveDirectory = require('activedirectory');
var ldap = require('ldapjs');
var google = require('googleapis');
var https = require('https');
var OAuth2 = google.auth.OAuth2;
var CLIENT_ID = '107357424883-a1n7q1lnprhmved4d2bsrvhmedh9lhv1.apps.googleusercontent.com';
var CLIENT_SECRET = 'CDYGivXFVPijxsf2qP5oTHuX';
var REDIRECT_URL = 'http://localhost:3000/oauth2callback';
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var ad = new ActiveDirectory({
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/ou=Users,ou=Nandi,dc=SONATA,dc=LOCAL',
			 url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/DC=SONATA,DC=LOCAL',
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/cn=ISV_Comp_Users,cn=Users,dc=SONATA,dc=LOCAL',
			});
function Calculator(method, uName, pWord){
	this.method = method;
	this.uName = uName;
	this.pWord = pWord;
}
Calculator.prototype.add = function(){
		 
		var username = this.uName;//'rahul.kumar@sonata-software.com';
		var password = this.pWord;//'Welcome@1';
		ad.authenticate(username, password, function(err, auth) {
		  if (err) {
			console.log('ERROR: '+JSON.stringify(err));
		  }
		  if (auth) {
			console.log(auth);
			client_pg.query("Select r.role_id,p.perm_id,p.perm_name from roles r,permissions p,role_perm rp where rp.role_id = r.role_id and rp.perm_id = p.perm_id and r.role_id ='a';",function(err,result){
				if(err){
					throw err;
				}
				var rows = result.rows;		
				console.log(rows);
				
			});
		  }
		  else {
			console.log('Authentication failed!');
		  }
		});
		/*var username = 'sangamesh.b@sonata-software.com';
		var groupName = 'ISV_Comp_Users';
		ad.isUserMemberOf(username, groupName, function(err, isMember) {
		  if (err) {
			console.log('ERROR: ' +JSON.stringify(err));
			return;
		  }

		  console.log(username + ' isMemberOf ' + groupName + ': ' + isMember);
		});*/
		return "authenticated";
		
		/*var scopes = ['https://www.googleapis.com/auth/gmail.modify'];
		var url = oauth2Client.generateAuthUrl({
		  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		  scope: scopes // If you only need one scope you can pass it as string
		});
		console.log(url);
		var code = '4/cX5_N2ljmj_XKdfiUyYfKZrHbJzGuCzU7fgt5Wpz4pk';
		oauth2Client.getToken(code, function(err, tokens) {
		  if(!err) {
			  console.log(tokens);
			  //oauth2Client.setCredentials(tokens);
		  }else{
			  console.log(err);
		  }
		});*/
}
//var ad = new Calculator('Oauth', 'sangamesh.b@sonata-software.com', 'Ubuntu12#4');
//var result = ad.add();


module.exports = AttachObject;
module.exports = Calculator;
