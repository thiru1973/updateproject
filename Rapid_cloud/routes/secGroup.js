var AWS = require('aws-sdk');

AWS.config.update({accessKeyId : 'AKIAJTPQAUMPWKMM7ENA',
	secretAccessKey : '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',
});
AWS.config.update({region : 'us-east-1'});

var ec2 = new AWS.EC2();

/*ec2.describeInstances(function(error, data) {
	  if (error) {
	    console.log(error); // an error occurred
	  } else {
		  console.log((data.Reservations)[0].Instances); // request succeeded
	    //console.log((data.Reservations)[1].Instances);
		  console.log(data);
	  }
});*/

/*var params = {
		  ImageId: 'ami-2051294a', 
		  MaxCount: 1,
		  MinCount: 1,
		  SecurityGroupIds: [
		    'sg-680fba12',
		  ],
		  InstanceType: 't2.micro',
		  SubnetId: 'subnet-915f40bb',
		};
		
ec2.runInstances(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});*/