//////////////////////////////////////////////////////
var _ip = "http://172.29.59.63:3000";
$(document).ready(function(){

});

function nexusView(){
	this.addLoadBa = document.getElementById("mvTable");
}
nexusView.prototype = {
	init:function(){
		var self = this;
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
		var data = {};
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		$.ajax({
		  type: 'POST',
		  data:data,
		  url: _ip+'/nexusaf'
		})
		.done(function(data){
			//console.log(data);
			if(data.length == undefined){
				//for(var i=1; i<data.length; i++){
					var crTr = document.createElement("tr");
						crTr.id ="dataOf"+0;
						insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<td>'+data.project.groupId[0]+'</td>\
								<td>'+data.project.artifactId[0]+'</td>\
								<td>'+data.project.packaging[0]+'</td>\
								<td>'+data.project.version[0]+'</td>\
								<td><a href="#" title="'+data.project.artifactId[0]+'" onclick="pL.nexusafView();" class="viewLink">view</a>&nbsp;&nbsp;</td>\
								';
				//}
			}else{
				var crTr = document.createElement("tr");
						crTr.id ="dataOf"+0;
					insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<h3 align = "center"><p>'+data+'</p></h3>\
					';
			}
		})
		.fail(function(err){
			console.log(err);
		})
	},
	nexusafView : function(){
		location.href=_ip+"/nexusafView"
	}
	
}
var pL = new nexusView();
	pL.init();
/////////////////////////////////////////////////////	
