var should = require("should")
    , routes = require("../routes");
var supertest = require("supertest");

var request = {};
var response = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the index view name", function(){
        routes.index(request, response);
        response.viewName.should.equal("index");
        });

    });
});

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the master view name", function(){
        routes.master(request, response);
        response.viewName.should.equal("master");
        });

    });
});

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the masterpage view name", function(){
        routes.master_2(request, response);
        response.viewName.should.equal("master_2");
        });

    });
});

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the template create view name", function(){
        routes.create_template2(request, response);
        response.viewName.should.equal("create_template2");
        });

    });
});

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the template create view name", function(){
        routes.create_template2(request, response);
        response.viewName.should.equal("create_template2");
        });

    });
});

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the product stage view name", function(){
        routes.prod_stage(request, response);
        response.viewName.should.equal("prod_stage");
        });

    });
});


describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the product stage view name", function(){
        routes.cloud_service(request, response);
        response.viewName.should.equal("cloud_service");
        });

    });
});

var server = supertest.agent("http://172.29.59.65:3000");

describe("AWS script test",function(){
	it("Run the script",function(done){
		var data = [{cldsrvc : "null", region : "us-east-1", inst_id : "i-0074c3aaa6a0340f2", role : "Database", pvd : "AWS", action : "ScheduleStop", user_hr : "18", user_min : "45", user_date :"2016-06-22"},
					{cldsrvc : "null", region : "us-east-1", inst_id : "i-0074c3aaa6a0340f2", role : "Database", pvd : "AWS", action : "ScheduleStart", user_hr : "18", user_min : "50", user_date :"2016-06-22"},
					];
		//for(var i=0;i<data.length;i++){	
			server
			.post('/scheduleService')
			.send(data[1])
			.expect("Content-type",/json/)
			.expect(200)
			.end(function(err,res){
				res.status.should.equal(200);
				res.body.data.should.equal("OK");
				done();
			});
		//}
		
	});
});

