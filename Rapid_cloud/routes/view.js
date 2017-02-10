var express = require('express');
//var zerorpc = require("zerorpc");
var app     = express();
var MongoClient = require('mongodb').MongoClient;
var authObject =  require("./manage_nodes.js");
var pg = require("pg");
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();
var ActiveDirectory = require('activedirectory');


//var url = 'mongodb://172.29.59.62:27017/test';
var url = 'mongodb://172.29.59.100:27017/test';
exports.preview = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('template_details');
										
					instance.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{	
							//console.log(result);							
							res.render('PreView', { data : result });
							}
					 db.close();					
					});				
				}		 
			});	
};
exports.importvm = function(req,res){
	res.render('importvm');
}
exports.viewdata = function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var result=JSON.stringify(req.body);	
	var Obj = JSON.parse(result);
		console.log(Obj);
		var list=Obj.d1;
		var list2=list.split(',');
		//console.log(list2[0]);
	
	MongoClient.connect(url, function(err, db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
	   } else {
		console.log('Connection established');
		var instance=db.collection('template_details');
							
		instance.find({ "cloud": { "$in": list2 } }).toArray(function(err,result){
			if(err){
				throw err
			}
			else{
				//console.log(result);
				res.send(result)
			}
			db.close();
			});
		}
		
	});
};

exports.org_temp=function(req,res){
	var role=[];
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var glotemp=db.collection('org_temp1');
										
					glotemp.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							//res.render('org_temp', {data : result});
							res.send(result);
							}
					 db.close();					
					});				
				}		 
			});	
};

exports.create_org_temp=function(req,res){
	var role=[];
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var glotemp=db.collection('org_temp2');
										
					glotemp.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							res.send(result);
							}
					 db.close();					
					});				
				}		 
			});	
};


exports.node_store=function(req,res){
	var result=JSON.stringify(req.body);	
	var Obj = JSON.parse(result);
	var d1 = Obj.d1;
	var d2 = Obj.d2, d3 = Obj.d3, d4 = Obj.d4, d5 = Obj.d5, d6 = Obj.d6;
	console.log(d6);
	var d1_obj = JSON.parse(d1);
	console.log(d1_obj);
	console.log(d2+d3+d4+d5);
	var c_date = Date();
	var tt_type="Generic Template";
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {    
		    console.log('Connection established to');    
			var collection=db.collection('generic_template_information');
		    var DB_data = {Template_name : d2, Account_Name : d3, Project_Name : d4, Product_Name : d5, Template_type : tt_type, Created_at : c_date, Template_Role:d1_obj, Template_Desc:d6};

		   collection.insert([DB_data], function (err, result) {

		    					if (err) {
		    						console.log(err);
		    						res.send(err);
		    					} else {
		    						console.log('Inserted values sucess fully');
		    						res.send("Success");
		    					}
		    					db.close();

		    			});
		  	}	
		});
};

exports.name_check=function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function(err, db){
		if (err){
			console.log('Unable to connect to the MongoDB server. Error:',err);
		}
		else{
			console.log('Connection established to');
			var gts=db.collection('generic_template_information');
			gts.find().toArray(function(err, result){
				if (err)
					{
					console.log('Unable to connect to the MongoDB server. Error:',err);
					}
				else{
					res.send(result);					
				}
				db.close();
			});
		}
	});
}

exports.gen_view=function(req, res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		MongoClient.connect(url, function (err, db){
		if (err) {
			console.log('Unable to connect to the MongoDB server. Error:',err);
		}	else{
					console.log('Connection established to');
					var evn=db.collection('generic_template_information');
					evn.find().toArray(function(err,result){
					if(err)
					{
						throw err
					}
				else{
						res.send(result);
					}
				db.close();
			});
			}		
	});
};
exports.my_view=function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	MongoClient.connect(url, function (err, db){
	if (err) {
		console.log('Unable to connect to the MongoDB server. Error:',err);
	}	else{
				console.log('Connection established to');
				var evn=db.collection('pvd_template_information');
				evn.find().toArray(function(err,result){
				if(err)
				{
					throw err
				}
			else{				
					res.send(result);
				}
			db.close();
		});
		}		
});
};

exports.oauth = function(req, res){
	res.render('oauth');
}

var ad = new ActiveDirectory({
			 url: 'LDAP://172.26.42.66/CN=Users,DC=SONATA,DC=LOCAL',
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/ou=Users,ou=Nandi,dc=SONATA,dc=LOCAL',
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/DC=SONATA,DC=LOCAL',
			 //url: 'LDAP://BGLBG1W8DC01.SONATA.LOCAL/cn=ISV_Comp_Users,cn=Users,dc=SONATA,dc=LOCAL',
			});
exports.authentication = function(req, res){
	/*var obj1 = new authObject("AD", req.body.userName, req.body.passWord);
	var result= obj1.add();	
	setTimeout(function(){		
			 console.log(result);
			 res.send(result);
		 	 }, 2000);*/
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	var username = req.body.userName, password = req.body.passWord;		 
	ad.authenticate(username, password, function(err, auth) {
		  if (err) {
			console.log('ERROR: '+JSON.stringify(err));
		  }
		  if (auth) {
			console.log(auth);
			client_pg.query("select * from user_role where user_id = ($1)",[username], function(err,result){
				if(err){
					console.log(err);
				}
				var rows = result.rows;
				if(rows.length != 0){
				res.send(rows[0]);
				}
				else{
					client_pg.query("INSERT INTO user_role(user_name,user_email,user_id,role_id) values($1,$2,$3,$4)",[username,username,username,'u'],
					function(err, result) {
					if(err){
						res.send(err)
					}else{
						var data = {};
						data.role_id = 'u';
						data.User = username;
						//res.send(data);
						res.write(data);
						res.end();
					}
					});
				}
			
			});
		  }
		  else {
			res.send('Authentication failed!');
		  }
		});
}
exports.getRoles = function(req, res){
			res.setHeader("Access-Control-Allow-Origin", "*");
			var id = req.body.roleId;
			console.log(id);
			client_pg.query("Select r.role_id,p.perm_id,p.perm_name from roles r,permissions p,role_perm rp where rp.role_id = r.role_id and rp.perm_id = p.perm_id and r.role_id =($1)",[id],function(err,result){
				if(err){
					throw err;
				}
				var rows = result.rows;		
				res.send(rows);				
			});
}
var google = require('googleapis');
var https = require('https');
var OAuth2 = google.auth.OAuth2;
var CLIENT_ID = '107357424883-a1n7q1lnprhmved4d2bsrvhmedh9lhv1.apps.googleusercontent.com';
var CLIENT_SECRET = 'CDYGivXFVPijxsf2qP5oTHuX';
var REDIRECT_URL = 'http://localhost:3000/oauth2callback';
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
exports.gmail = function(req, res){
	console.log(req.body);
	res.setHeader("Access-Control-Allow-Origin", "*");
	var scopes = ['https://www.googleapis.com/auth/gmail.modify'];
		var url = oauth2Client.generateAuthUrl({
		  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		  scope: scopes // If you only need one scope you can pass it as string
		});
		res.send(url);
	
}
exports.oauth2callback = function(req, res){
	res.render('oauth2callback');
}
exports.getToken = function(req, res){
	console.log(req.body.code);
	res.setHeader("Access-Control-Allow-Origin", "*");
	oauth2Client.getToken(req.body.code, function(err, tokens) {
		  if(!err) {
			  res.send(tokens);
			  //oauth2Client.setCredentials(tokens);
		  }else{
			  res.send(err);
		  }
		});
}
//Services to get the name of the provoder that added under account
exports.getSubProviders = function(req, res){
	console.log(req.body);
	var acName = req.body.account,
		pjName = req.body.project;
	client_pg.query("SELECT * from project3 where account = ($1) and p_name = ($2)",[acName,pjName],function(err, result){
			if(err){
				throw err;
			}
			rows3 = result.rows;
			var subsc = rows3[0].subscription_name;
			
			client_pg.query("SELECT provider from subscription where accountid = ($1) and subscription_name = ($2)",[acName,subsc],function(err, result){
				if(err){
					throw err;
				}
				res.send(result.rows);
			});
		});
}

exports.getvms = function(req, res){
	console.log(req.body);
	client_pg.query("SELECT * from deployment_env_sync where prov_id = ($1) and p_name = ($2)",[req.body.provider, req.body.project],function(err, result){
				if(err){
					throw err;
				}
				res.send(result.rows);
			});
}

exports.syncVmData = function(req, res){
	var syncData;
	if(req.body.provider == "Azure"){
	client_pg.query("SELECT * from deployment_env_sync where prov_id = ($1) and p_name = ($2)",[req.body.provider, req.body.project],function(err, result){
				if(err){
					throw err;
				}
				syncData = result.rows;
				var cnt = 0;
				for(var i=0;i<syncData.length;i++)
				{
					client_pg.query("SELECT * from deployment_env where cloud_name = ($1) and inst_type = ($2)",[syncData[i].cloud_name,syncData[i].inst_id],function(err, syresult){
						if(err){
							throw err;
						}
						var syncresult = syresult.rows;
						cnt = syncData.length-(syncData.length-cnt);
						//console.log(cnt);
						if(syncresult.length == 0){
							client_pg.query("INSERT INTO deployment_env(prov_id,region,env_name,p_name,p_id,vpc_name,subnet_name,inst_type,inst_id,image,role,status,cloud_name,accountid,product_name,type) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", 
								['Azure', syncData[cnt].region, syncData[cnt].env_name, syncData[cnt].p_name, syncData[cnt].p_id, syncData[cnt].vpc_name, syncData[cnt].subnet_name, syncData[cnt].inst_type, syncData[cnt].inst_type,syncData[cnt].image, syncData[cnt].role, syncData[cnt].status , syncData[cnt].cloud_name, syncData[cnt].accountid, syncData[cnt].product_name,syncData[cnt].type],
							function(err, writeResult) {
								console.log('err',err,'pg writeResult',writeResult);							
							});
						}	
						cnt++;
					});
					
				}
				res.send("Success");
			});
	}else if(req.body.provider == "AWS"){
		client_pg.query("SELECT * from deployment_env_sync where prov_id = ($1) and p_name = ($2)",[req.body.provider, req.body.project],function(err, result){
				if(err){
					throw err;
				}
				syncData = result.rows;
				var cnt = 0;
				for(var i=0;i<syncData.length;i++)
				{
					client_pg.query("SELECT * from deployment_env where vpc_name = ($1) and inst_id = ($2)",[syncData[i].vpc_name,syncData[i].inst_id],function(err, syresult){
						if(err){
							throw err;
						}
						var syncresult = syresult.rows;
						console.log(syncresult);
						cnt = syncData.length-(syncData.length-cnt);
						if(syncresult.length == 0){
							client_pg.query("INSERT INTO deployment_env(prov_id,region,env_name,p_name,p_id,vpc_name,subnet_name,inst_type,inst_id,image,role,status,cloud_name,accountid,product_name,type) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", 
								['Aws', syncData[cnt].region, syncData[cnt].env_name, syncData[cnt].p_name, syncData[cnt].p_id, syncData[cnt].vpc_name, syncData[cnt].subnet_name, syncData[cnt].inst_type, syncData[cnt].inst_id,syncData[cnt].image, syncData[cnt].role, syncData[cnt].status , syncData[cnt].cloud_name, syncData[cnt].accountid, syncData[cnt].product_name,syncData[cnt].type],
							function(err, writeResult) {
								console.log('err',err,'pg writeResult',writeResult);							
							});
						}
						cnt++;
					});
					
				}
				res.send("Success");
			});
		
	}
}
