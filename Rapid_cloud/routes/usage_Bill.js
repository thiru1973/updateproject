var schedule = require('node-schedule');
var http = require('http');
var pg = require("pg");
var MongoClient = require('mongodb').MongoClient;
var fs=require('fs');
var ejs = require('ejs')
var pdf = require('html-pdf');
var html = fs.readFileSync('./views/pdffile.ejs', 'utf8');
var billfile = fs.readFileSync('./views/bill.ejs', 'utf8');
var options = {format: 'Letter'};

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);
client_pg.connect();
var url = 'mongodb://172.29.59.100:27017/test';
exports.accSetting = function(req, res){
	res.render('accountSetting');
}
function getsubid(acName, subsc, callback){
	client_pg.query("SELECT * from subscription where accountid = ($1) and subscription_name = ($2)",[acName,subsc],function(err, result){
    				if(err){
    					throw err;
    				}
    				rows6 = result.rows;
    				callback(rows6)
    			});
}
var usageurl = "http://172.29.93.97:4252/usage/";
var billurl = "http://172.29.93.97:4252/bill/"
exports.subusage = function(req, res){
    var data = req.body;
    getsubid(data.accName,data.subscname, function(callback){
            var fdate = req.body.fdate;
            var data1 = JSON.stringify(data);
            console.log(data1);
            http.get(usageurl+data1, function(response) {
                var finalData = '';
                  response.on("data", function (data) {
                    finalData += data.toString();
                  });
                  response.on("end", function() {
                    saveUsageData(JSON.parse(finalData),"usage_data")
                    //res.send(JSON.parse(finalData));
                    var ret = ejs.render(html, {
                         info: JSON.parse(finalData)
                        });
                        pdf.create(ret, options).toFile('./usagedata/usage'+fdate+'.pdf', function(err, result) {
                          if (err) return console.log(err);
                          console.log(result); //
                          res.send(fdate)
                        });
                    //console.log(JSON.stringify(finalData));
                  });
                });
    })
}
/*exports.subbill = function(req, res){
    var data = {};
    data.accName = "Sonata_Account";
    data.subscname = "MicroSoft Azure";
    data.fdate = "2017-05-01";
    data.tdate = "2017-05-15";
    getsubid(data.accName,data.subscname, function(callback){
                var fdate = req.body.fdate;
                var data1 = JSON.stringify(data);
                console.log(data1);
                http.get(billurl+data1, function(response) {
                    var finalData = '';
                      response.on("data", function (data) {
                        finalData += data.toString();
                      });
                      response.on("end", function() {
                        //saveUsageData(finalData)
                        var subbl = JSON.parse(finalData);
                        var subbll = 0;
                        for(var bl=0;bl<subbl.Meters.length;bl++){
                            if(subbl.Meters[bl].EffectiveDate == '2017-04-01T00:00:00Z' && subbl.Meters[bl].MeterCategory == 'Virtual Machines'){
                                //console.log(subbl.Meters[0].MeterRates["0"])
                                subbll = subbll+subbl.Meters[bl].MeterRates["0"];
                            }
                        }
                        var dt ={};
                        dt.service = "Virtual Machines"
                        dt.amount = subbll;
                        var ret = ejs.render(billfile,{info : dt});
                            pdf.create(ret, options).toFile('./usagedata/bill.pdf', function(err, result) {
                              if (err) return console.log(err);
                              console.log(result); //
                              res.send(result)
                            });
                      });
                    });
        })
}*/
exports.subbill = function(req, res){
    var data = {};
    data.accName = "Sonata_Account";
    data.subscname = "MicroSoft Azure";
    data.fdate = "2017-05-01";
    data.tdate = "2017-05-15";
    getsubid(data.accName,data.subscname, function(callback){
                var fdate = req.body.fdate;
                var data1 = JSON.stringify(data);
                console.log(data1);
                http.get(billurl+data1, function(response) {
                    var finalData = '';
                      response.on("data", function (data) {
                        finalData += data.toString();
                      });
                      response.on("end", function() {
                        saveUsageData(JSON.parse(finalData),"bill_data")
                        //console.log(finalData);
                        /*var subbl = JSON.parse(finalData);
                        console.log(subbl.value[0].properties.quantity);
                        //res.send(subbl.value[0].properties.quantity);
                        var subbll = 0;
                        for(var bl=0;bl<subbl.value.length;bl++){
                            if(subbl.value[bl].properties.usageStartTime == '2017-03-01T00:00:00+00:00'){
                                console.log(subbl.value[bl].properties.quantity)
                                subbll = subbll+subbl.value[bl].properties.quantity;
                            }
                        }
                        var dt ={};
                        dt.service = "Virtual Machines"
                        dt.amount = subbll;
                        var ret = ejs.render(billfile,{info : dt});
                            pdf.create(ret, options).toFile('./usagedata/bill.pdf', function(err, result) {
                              if (err) return console.log(err);
                              console.log(result); //
                              res.send(result)
                            });*/
                      });
                    });
        })
}

schedule.scheduleJob('0 11 * * *', function(){
  console.log('The answer to life, the universe, and everything!');
        var data = {};
        data.accname = "Sonata_Account";
        data.subscname = "MicroSoft Azure"
        data.fdate = "2017-05-01";
        data.tdate = "2017-05-15";
      var data1 = JSON.stringify(data);
      http.get(usageurl+data1, function(response) {
          var finalData = '';
            response.on("data", function (data) {
              finalData += data.toString();
            });
            response.on("end", function() {
              saveUsageData(JSON.parse(finalData),"usage_data")
              //res.send(finalData.toString());
            });
          });
});

function saveUsageData(usageData, cname){
   MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to');
        var collection=db.collection(cname);
        var dte = Date();
        var DB_data = {day : dte, data : usageData}
        collection.insert([DB_data], function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('Inserted values sucess fully');
          }
          db.close();
        });
      }
    });
}
exports.generateBill = function(req, res){
    var usagedata;
    MongoClient.connect(url, function (err, db) {
          if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
           } else {
            console.log('Connection established');
            var instance=db.collection('usage_data');
            instance.find().toArray(function(err,result){
            if(err){
                    throw err
                    }
                else{
                        usagedata = result;
                        var instance=db.collection('bill_data');
                        instance.find().toArray(function(err,resultdb){
                        if(err){
                                throw err
                                }
                            else{
                                    var sum = 0;
                                    for(var i=0;i<usagedata[0].data.value.length;i++){
                                        for(j=0;j<resultdb[0].data.Meters.length;j++){
                                            if(usagedata[0].data.value[i].properties["meterId"] == resultdb[0].data.Meters[j].MeterId)
                                            sum = sum+resultdb[0].data.Meters[j].MeterRates["0"]
                                        }

                                    }
                                    console.log(sum);
                                    res.send(usagedata[0].data.value[0].properties["meterId"]);
                                }
                        });
                    }
            });
        }
            });
}


