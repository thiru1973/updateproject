/* ************************************
	Create by: Omprakash Ramanadham
	Created on: 1st Aug 2016
*************************************** */
var _ip = "http://172.29.59.65:3000";
$(".up_1").click(function(e){
   var vv = $(this).parent().parent().children("input[type='text']");
   var valu = vv.val();
	//valu == 10 ? false : valu++;
	vv.val(valu);
});
$(".down_1").click(function(e){
   var vv = $(this).parent().parent().children("input[type='text']");
   var valu = vv.val();
	//valu == 1 ? false : valu--;
	vv.val(valu);
});
function Const_Tire(){
	this.tiersInTemplate = 1;
	this.count = 1;
	this.templateName = "";
	this.container = document.getElementById("confi");
	this.sr = document.getElementById("count0");
	this.servers = {};
	this.serverInfo = [];
	this.info = {};
}
Const_Tire.prototype = {
	inputCount: function(){
		$(".up_11").click(function(e){
			var vv = $(this).parent().parent().children("input[type='text']");
			var valu = vv.val();
			valu == 10 ? false : valu++;
			vv.val(valu);
		});
		$(".down_11").click(function(e){
		   var vv = $(this).parent().parent().children("input[type='text']");
		   var valu = vv.val();
			valu == 1 ? false : valu--;
			vv.val(valu);
		});
	},
	addConfig: function(AddorRemove){
		if(AddorRemove == 1){
			this.tiersInTemplate++;
			this.count++;
			this.init()
		}else if(AddorRemove == 0){
			if(this.count != 1){
				var d = document.querySelectorAll('.template_con');
				var dd = d[this.count-1];
					dd.remove();
				this.tiersInTemplate--;
				this.count--;
				this.sr.value = this.count;
				//console.log(this.count);
			}
		}
	},
	init: function(){
		var tT = this.tiersInTemplate;		
		this.container.innerHTML+='\
			<div class="template_con">\
				<div class="configTire">Configure Tier <input placeholder="Tier Name" type="text" class="simpleInputTxt" id="configT_'+tT+'" style="background-color:#eaeaea; border:solid 1px #525050; font-size:10px; padding:7px 5px; margin-left:10px;" /><a href="#" class="pull-right" onclick="template.removeRecord(this,'+tT+');"><span class="glyphicon glyphicon-remove-sign clo" aria-hidden="true"></span></a></div>\
				<table class="table table-bordered">\
					<tbody id="server_'+tT+'">\
						<tr>\
						<td style="width:40%;"><input placeholder="Server Name" type="text" id="ser_'+tT+'" class="simpleInputTxt" /></td>\
						<td style="width:40%;"><input placeholder="Operating System" type="text" id="operSys_'+tT+'" class="simpleInputTxt" /></td>\
						<td style="width:14%;">\
							<div class="input-group spinner pull-left count_1">\
								<input id="count_'+tT+'" type="text" class="form-control" value="1">\
								<div class="input-group-btn-vertical">\
									<button class="btn btn-default up_11" type="button">\
									<i class="fa glyphicon glyphicon-triangle-top"></i></button>\
									<button class="btn btn-default down_11" type="button">\
									<i class="fa glyphicon glyphicon-triangle-bottom"></i>\
									</button>\
								</div>\
							</div>\
						</td>\
						<td style="width:6%;"><button class="buttonClsrv buttonSn" onclick="template.addServer(this)" id="'+tT+'"style="margin-top:5px;margin-left:10px;">Add</button>\
						</td>\
						</tr>\
					</tbody>\
				</table>\
			</div>';
		this.tiersInTemplate == 1 ? document.querySelector('.clo').style.display="none" : false;
		this.sr.value = this.count;
		this.inputCount();
	},
	addServer: function(server){
		var expTname = /^\w+$/;
		var i = server.id;
		var vb = server.parentNode;
		var idd = vb.parentNode;
		var pd = idd.parentNode,
		    pt = pd.id;
		var se = document.getElementById("ser_"+i).value,
			op = document.getElementById("operSys_"+i).value,
			ct = document.getElementById("count_"+i).value;
			if(!expTname.test(se))
			{
				document.getElementById("ser_"+i).focus();
				return;
			}else if(!expTname.test(op))
					{
						document.getElementById("operSys_"+i).focus();
						return;
					}
			
		var dd = document.getElementById("server_"+i);
			dd.innerHTML+='\
			<tr>\
				<td>'+se+'</td>\
				<td>'+op+'</td>\
				<td>'+ct+'</td>\
				<td><a href="#" id="server_'+i+'" onclick="parentNode.parentNode.remove(), event.preventDefault()" class="pull-right"><span class="glyphicon glyphicon-remove-sign gr" aria-hidden="true"></span></a></td>\
			</tr>';
		this.inputCount();
		this.servers={server:pt, role:se, os:op, count:ct};
		this.serverInfo.push(this.servers);
		this.info={conf : this.servers};
	},
	removeRecord: function(ev,conf){
		var ser = "server_"+conf;
		for(var i=0; i<this.serverInfo.length; i++){
			if(this.serverInfo[i].server == ser){				
				this.serverInfo.splice(i,1);
				//delete this.serverInfo[i]
			}
		}
		event.preventDefault();
		ev.parentNode.parentNode.remove();
		this.count--
		var srt = document.getElementById("count0");
			srt.value = this.count;		
	},
	saveRecord: function(){
		var id = "save_exit";
		if(this.serverInfo == null)
		{
			alert("You not configured");
			document.getElementById("ser_"+i).focus();
			return;			
		}else{
			var ary1 = JSON.stringify(this.serverInfo);
			var tm_name = document.getElementById("RM_name").value;
			
			var accountName = localStorage.getItem("Account")
			,projName = localStorage.getItem("ProjectName")
			,prodName = localStorage.getItem("ProductName");
			
			var a = Math.floor(100000 + Math.random() * 900000)
			a = a.toString().substring(0, 3);
			var te_name=projName+"_"+tm_name+"_"+a;
			alert(te_name);
			
			/*$.ajax({
			 type: 'POST',
			 jsonpCallback: "callback",
			 datatype: 'jsonp',
			 data: "d1="+ary1+"&d2="+te_name+"&d3="+accountName+"&d4="+projName+"&d5="+prodName,
			 url: _ip+'/node_store',
			 success: function(results) {
				 if(id == "save_exit")
				 {
					 location.href=_ip+"/assignNode"+"?data="+te_name;
				 }else if(id == "create_exit")
						 {
							 $(".alert-success").stop().slideDown();
							 location.href=_ip+"/master_2";
						 }
			 },
			 error: function (xhr, status, error){
				console.log('Failure');
				alert("failure");
				},
			 });*/
		}
	}
}
var template = new Const_Tire();
	template.init();
