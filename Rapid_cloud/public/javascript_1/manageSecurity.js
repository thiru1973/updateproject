var _ip = "http://172.29.59.63:3000";

//////////////////////////////////////////////////////	
function Con_SecurityGroupManage(){
	this.addLoadBa = document.getElementById("sGTable");
	this.attachInstancesArray = {};
	this.attachInstancesArray.InstanceName = "";
}
Con_SecurityGroupManage.prototype = {
	init:function(){
		var self = this;
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
		$(".countConfigBox").hide();
		$.getJSON( _ip + '/secGrpDetails', function (data){
			console.log(data);
			for(var i=0; i<data.length; i++){
				//console.log(data[i]);
				var crTr = document.createElement("tr");
					crTr.id ="dataOf"+i;
				insertAfter(self.addLoadBa, crTr);
				crTr.innerHTML+='<td>'+data[i].sg_name+'</td>\
							<td>'+data[i].sg_id+'</td>\
							<td>'+data[i].vpc_id+'</td>\
							<td>'+data[i].from_port+'</td>\
							<td>'+data[i].to_port+'</td>\
							<td>'+data[i].cidr+'</td>\
							<td>'+data[i].region+'</td>\
							<td><a href="#" title="'+data[i].sg_id+','+data[i].region+'"  onclick="sG.deleteVolume(this)" class="viewLink">Delete</a></td>\
							';
			}
		});
	},
	deleteVolume:function(ev){
		//console.log("Delete Volume:::"+ev.title);
		var secData = (ev.title).split(",");
		console.log(secData);
		var accountName = localStorage.getItem("Account")
		,projName = localStorage.getItem("ProjectName")
		,prodName = localStorage.getItem("ProductName");
		var data = {};
		data.accName = accountName;
		data.projName = projName;
		data.prodName = prodName;
		data.secGrpId = secData[0];
		data.region = secData[1];
		$.ajax({
				type: 'POST',
				jsonpCallback: "callback",
				datatype: 'jsonp',
				data: data,
				url: _ip +'/deleteSecGrp',
				success: function(data, textStatus){
					console.log(data);
				},
				error: function (xhr, status, error){
				   console.log('Failure');
				},
			  });
	}
}
var sG = new Con_SecurityGroupManage();
	sG.init();