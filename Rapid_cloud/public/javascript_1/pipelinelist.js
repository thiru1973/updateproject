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
		$.getJSON( _ip+'/jenkinsJob', function (data){
			console.log(data);
			if(data.length > 0){
				for(var i=1; i<data.length; i++){
					var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
						insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<td>'+data[i].name+'</td>\
								<td><a href="#" title="'+data[i].name+'" onclick="pL.pipelineView(this)" class="viewLink">view</a>&nbsp;&nbsp;</td>\
								';
				}
			}else{
				var crTr = document.createElement("tr");
						crTr.id ="dataOf"+i;
					insertAfter(self.addLoadBa, crTr);
					crTr.innerHTML+='<h3 align = "center"><p>No Pipeline List</p></h3>\
					';
			}
		});
	},
	pipelineView: function(ev){
	console.log(ev.title);
	location.href=_ip+"/pipelineView"+"?data="+ev.title;
	}
}
var pL = new pipelineList();
	pL.init();
/////////////////////////////////////////////////////	
