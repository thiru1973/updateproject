var http = require('http');
var express = require('express');
var app     = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var pg = require("pg");

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var url = 'mongodb://172.29.59.100:27017/test';


var GitHub = require('github-api');
var Promise = require("es6-promise").Promise;

var noAuth = new GitHub();

// basic auth
const gh = new GitHub({
   username: 'sernapallyanurag',
   password: 'carborandum12#4'
});

const me = gh.getUser();
me.listRepos()
.then(function(data) {
	//console.log(data);
});

 const repo = gh.getRepo('sernapallyanurag', 'web');
 //console.log(repo);
 repo.listBranches()
.then(function(data){
	console.log(data.data);
});
