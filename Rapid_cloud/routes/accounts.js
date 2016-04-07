var pg = require("pg");
var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);

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