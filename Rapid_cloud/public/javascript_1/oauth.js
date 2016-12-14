/* ************************************
	Create by:Omprakash
	Created on: 4th April 2016
*************************************** */
"use strict";
var _ip = 'http://172.29.59.65:3000'
var _userName_Input_Id = document.getElementById("userName_Input_Id"),
	_passWord_Input_Id = document.getElementById("passWord_Input_Id"),
	_login_Button = document.getElementById("login_Button"),
	u, p;
	
function dataValid(){
	console.log(event.keyCode);
	u = _userName_Input_Id.value;
	p = _passWord_Input_Id.value;
	
	/*if(event.keyCode == "13"){
		if(u =="" || p ==""){
			$(".alert-warning, .alert-danger").hide();
			$(".alert-warning").show().delay(2000).fadeOut('slow');
			$(".alert-warning summary").text("User name And Password should not be empty.");
			$(".alert-warning span.glyphicon").on("click",function(){
				$(".alert-warning").hide();
			});
		}else{
			console.log("Condition True:::" +u, p);
			$(".alert-danger, .alert-warning").hide();
			$(".alert-danger").show().delay(2000).fadeOut('slow');
			$(".alert-danger summary").text("User name and Password is not matching..!!");
			$(".alert-danger span.glyphicon").on("click",function(){
				$(".alert-danger").hide();
			});
		}
	}*/
}

function validate()
{
	//dataValid();
	var userName = _userName_Input_Id.value,
	passWord = _passWord_Input_Id.value;
	//console.log(userName+passWord);
	var data = {};
	data.userName = userName;
	data.passWord = passWord;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/authentication',
	     success: function(results) {
			 console.log(results);
	    	 if(results != "Authentication failed!")
	    		 {
					sessionStorage.setItem("role",results.role_id);
					sessionStorage.setItem("User",results.user_id);
	    		 	location.href = _ip+"/accounts"
	    		 }else{
	    			 $(".alert-danger, .alert-warning").hide();
	    				$(".alert-danger").show().delay(2000).fadeOut('slow');
	    				$(".alert-danger summary").text("User name and Password is not matching..!!");
	    				$(".alert-danger span.glyphicon").on("click",function(){
	    					$(".alert-danger").hide();
	    				});	
	    				}
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });	
}
function myfunction(){
	var data = {};
	data.userName = "Gmail";
	var windowThatWasOpend;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/gmail',
	     success: function(results) {
	    	 //alert(results);
			 
			 windowThatWasOpend = window.open(results, "please sign with google", "width=500px,height=700px");
			 window.onmessage = function(e){
				 windowThatWasOpend.close();
				 var urlWithCode = e.data;
				 
				 var idx = urlWithCode.lastIndexOf("code=");
				 var code = urlWithCode.substring(idx+5).replace("#","");
				var data = {};
				data.code = code;
				 $.ajax({
					 type: 'POST',
					 jsonpCallback: "callback",
					 datatype: 'jsonp',
					 data: data,	 
					 url: _ip+'/getToken',
					 success: function(results) {
							alert(results.access_token);	
							console.log(results);
					 },
					 error: function (xhr, status, error){
						console.log('Failure');
						alert("failure");
						},
				   });
			 }
			 
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });	
}
/*function azureAuth(){
	var data = {};
	data.userName = "Azure";
	var windowThatWasOpend;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/auth',
	     success: function(results) {
	    	 console.log(results);
			  window.location.href = results;
			 
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });	
}*/
function azureAuth(){
	var data = {};
	data.userName = "Azure";
	var windowThatWasOpend;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: _ip+'/auth',
	     success: function(results) {
	    	 //alert(results);
			 
			 windowThatWasOpend = window.open(results, "please sign with google", "width=500px,height=700px");
			 window.onmessage = function(e){
				 windowThatWasOpend.close();
				 var urlWithCode = e.data;
				 console.log(urlWithCode);
				 var idx = urlWithCode.lastIndexOf("code=");
				 var code = urlWithCode.substring(idx+5).replace("#","");
				var data = {};
				data.code = code;
				console.log(data);
				 $.ajax({
					 type: 'POST',
					 jsonpCallback: "callback",
					 datatype: 'jsonp',
					 data: data,	 
					 url: _ip+'/getAzureToken?code='+code,
					 success: function(results) {	
							console.log(results);
							sessionStorage.setItem("role",results.role_id);
							sessionStorage.setItem("User",results.User);
							location.href = _ip+"/accounts"
					 },
					 error: function (xhr, status, error){
						console.log('Failure');
						alert("failure");
						},
				   });
			 }
			 
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });	
}