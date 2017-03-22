//////////////////////////////////////////////////////
var _ip = "http://172.29.59.65:3000";
var viewTitle;

$(document).ready(function(){
	$('#severity').hide();
	$('#action-button').hide();
});

function closeMore(val){
	$(".advancedOpt"+val+"").hide();
}

function sonarProject(){
	this.addLoadBa = document.getElementById("mvTable");
}

sonarProject.prototype = {
	init:function(){
		var self = this;
		function insertAfter(referenceNode, newNode){
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
			var data = {};
			data.mtName = "projectList";
			data.accountName = localStorage.getItem("Account");
			data.projectName = localStorage.getItem("ProjectName");
			data.productName = localStorage.getItem("ProductName");
			$.ajax({
			  type: 'GET',
			  data:data,
			  url: _ip+'/sonarPrjList'
			})
			.done(function(data){
				//var jData = JSON.parse(data);
				console.log(data);
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						var rowElement = document.createElement('tr');
							rowElement.id = 'dataOf' + i;

                        insertAfter(self.addLoadBa, rowElement);
                        rowElement.innerHTML+='<td>'+data[i].sonar_project+'</td>\
								<td><a href="#" title="'+data[i].sonar_project+'" onclick="pL.showMore(this, '+i+')" class="viewLink">More</a></td>\
								';
				}
				}else{
					var crTr = document.createElement("tr");
							crTr.id ="dataOf"+i;
						insertAfter(self.addLoadBa, crTr);
						crTr.innerHTML+='<h3 align = "center"><p>No Project</p></h3>\
						';
				}
				})
				.fail(function(err){
					alert(err);
				})
	},
	projectView: function(ev){
		location.href=_ip+"/sonarView"+"?data="+ev.title;
	},
	showMore: function(id,i){
		$('.sonar-project-list').remove();
		//window.open("http://172.29.59.33:9000/overview?id=sonarproject", "Jenkins page", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=nowidth=1000px,height=700px");
		var data = {};
		data.mtName = "projIssues";
		data.pjName = id.title;
		data.accountName = localStorage.getItem("Account");
		data.projectName = localStorage.getItem("ProjectName");
		data.productName = localStorage.getItem("ProductName");
		$.ajax({
		  type: 'GET',
		  data:data,
		  url: _ip+'/sonarPrjList'
		})
		.done(function(data){
			
			var ot = JSON.parse(data.data1),
			   ot1 = JSON.parse(data.data2);
			  complexData = JSON.parse(ot1[0].msr[6].data);
			$(".advancedOpt"+i+"").empty();
            ot.facets.forEach(function (item) {
                if(item.values) {
                    item.values.forEach(function (severity) {
                        $('#severity').append(
                            "<div class='inline padding grey'>" +
                            	"<div class='text-center border' style='background:#E67070;'>" + severity.val + "</div>" +
                            	"<div class='text-center border' style='color:#C33223; font-Weight:bold;'>" + severity.count +"</div>" +
                        	"</div>"
							
                        );
					})
                }
            });
            $('#complexity').append(
                '<div class="padding-right inline padding-top">' +
                	'<label class="padding-bottom padding-right padding-left" style="margin-right:25px;"> Complexity</label>' +
					"<div class='inline padding grey padding-top width-long-md'>" +
                		"<div class='text-left border width-long-md' style='background:#E67070'>" + "Complexity" + ":" + " " + (ot1[0].msr[1].frmt_val).bold() + "</div>" +
						"<div class='text-left border width-long-md' style='background:#E6B670'>" + "Functional Complexity" + ":" + " " + (complexData.conditions[1].actual).bold() + "</div>" +
						"<div class='text-left border width-long-md' style='background:#C0E6F7'>" + "Class Complexity" + ":" + " " + (complexData.conditions[2].actual).bold() +"</div>" +
					"</div>" +
				'</div>' +
                "<div class='padding-right inline padding-left border-big'>" +
                	"<label>Quality Gate</label>" +
               		"<span style='color: red'>" + complexData.level + "</span>" +
                "</div>"
            );
            $('#technical-debt').append(
				'<div class="padding-right inline padding-top" style="height: 100px">' +
                	'<label class="padding-bottom padding-right padding-left"> Techinical Debt</label>' +
                	'<div class="inline padding-left box-model border text-center" style="margin-right:10px; padding-right:18px; background:#E6B670"> Scale Rating <br>' + (ot1[0].msr[4].frmt_val).bold() + '</div> ' +
                	'<div class="inline padding-left box-model border text-center" style="margin-right:10px; padding-right:18px; background:#C0E6F7"> Technical Ratio <br>'+ (ot1[0].msr[5].frmt_val).bold() + '</div> ' +
                	'<div class="inline padding-left box-model border text-center" style="margin-right:10px; padding-right:18px; background:#E67070"> Technical Debt <br>' + (ot1[0].msr[3].frmt_val).bold() + ' </div> ' +
		'</div>' );
		
		 $('#Comments').append(
                '<div class="padding-right inline padding-left marTop-15">' +
                	'<label class="padding-bottom padding-right" style="margin-right:30px;"> Comments</label>' +
                	"<div class='inline padding grey padding-top width-long-md'>" +
                		"<div class='text-center border width-long' style='font-Weight:bold;'>" + "Lines of Code" + ":" +" "+ (complexData.conditions[0].actual).fontcolor("Red") + "</div>" +
                		"<div class='text-center border width-long' style='font-Weight:bold;'>" + "Commented Line" + ":" +" "+ complexData.conditions[2].actual .fontcolor("Red") +"</div>" +
                	"</div>" +
                '</div>'
			);

			$(".advancedOpt"+0+"").show();
            $('#severity').show();
            $('#action-button').show();
            viewTitle = id.title;
		})
		.fail(function(err){
			alert(err);
		})
	}
}
var pL = new sonarProject();
	pL.init();

$(document).on("click", "#view-server", function(){
    var url = "http://172.29.59.33:9000/overview?id=" + viewTitle;
    /*$('#pipeView').remove();
    $('#sonar-overview').append(
        "<iframe width='1100' height='600px' target='_parent' src="+url+"></iframe>"
    );
    $('h1').html('Sonar Overview');
    $('#action-button').hide();*/
    window.open(url);
});

$(document).on("click", "#view-issues", function(){
    location.href=_ip+"/sonarView"+"?data=" + viewTitle;
});
/////////////////////////////////////////////////////	
