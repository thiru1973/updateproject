//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){

});

function pipelineList(){
	this.addLoadBa = document.getElementById("mvTable");
}
pipelineList.prototype = {
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
		  url: _ip+'/jenkinsJob'
		})
		.done(function(data){
			console.log(data);
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
						insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<td>'+data[i].pipeline_names+'</td>\
								<td><a href="#" title="'+data[i].pipeline_names+','+data[i].delivery_pipeline+'" onclick="pL.pipelineView(this)" class="viewLink">view</a>&nbsp;&nbsp;</td>\
								';
				}
			}else{
				var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
					insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<h3 align = "center"><p>No Pipeline List</p></h3>\
					';
			}
		})
		.fail(function(err){
			console.log(err);
		})
	},
	pipelineView: function(ev){
	var pipeData = (ev.title).split(",");
	console.log(ev.title);
	location.href=_ip+"/pipelineView"+"?data="+pipeData;
	}
}
var pL = new pipelineList();
	pL.init();
/////////////////////////////////////////////////////	
