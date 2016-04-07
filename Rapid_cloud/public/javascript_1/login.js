/* ************************************
	Create by:Omprakash
	Created on: 4th April 2016
*************************************** */
"use strict";
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
	console.log(userName+passWord);
	var data = {};
	data.userName = userName;
	data.passWord = passWord;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: 'http://172.29.59.65:3000/validate',
	     success: function(results) {
	    	 console.log(results);
	    	 if(results == "Valid")
	    		 {
	    		 	location.href = "http://172.29.59.65:3000/accounts"
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