var _ip = "http://172.29.59.65:3000"

function inValid(message){
   $('.alert-body').html(message);
   $('#alertModal').modal('show');
 }

function accSetting(){

}
var acc;
accSetting.prototype = {
	init:function(){
		var url = document.location.href
        var idx = url.lastIndexOf("data=");
        acc = url.substring(idx+5).replace("#","");
        $.ajax({
        	  type: 'GET',
        	  url: _ip+'/accountDetails'
        	})
        	.done(function(data){
        	var subsc = document.getElementById("subscriptions");
        		for(var i =0; i < data.data1.length; i++){
                    if(data.data1[i].accountid == acc){
                        subsc.innerHTML+='<input type="radio" id="sbscr" name="subscr"><label class="radio-inline" id ="sbscr">'+data.data1[i].subscription_name+'</label></br>';
                    }
                }
                subsc.innerHTML+='<label id"sbscr">From</label><input type="date" id="fdate"></input>\
                                    <label id="sbscr">To</label><input type="date" id="tdate"></input>\
                                    <button class="btn btn-danger" id="edit-check">View</button>\
                                    </br><a href="bill.pdf">View April Bill</a>';
        	})
        	.fail(function(err){
        		alert(err);
        	})
	}
}
var ac = new accSetting();
	ac.init();

$(document).on("click", "#edit-check", function(){
    var sname = $("input[name='subscr']:checked").next('label').html();
    var fdate = document.getElementById("fdate").value
       ,tdate = document.getElementById("tdate").value;
    if(sname == "" || sname == null){inValid("Select any subcriptions");}
    if(fdate == "" || fdate == null){document.getElementById("fdate").focus();return}
    else if(tdate == "" || tdate == null){document.getElementById("tdate").focus();return}
    var data={};
    data.accName = acc;
    data.subscname = sname;
    data.fdate = fdate;
    data.tdate = tdate;
    console.log(data);
    $.ajax({
      type: 'POST',
      data: data,
      url: _ip+'/subusage'
    })
    .done(function(data){
        console.log(data);
        /*var subsc = document.getElementById("subscriptions");
        subsc.innerHTML+='<a href='+data+'.pdf>View</a>';*/
        location.href = _ip+'/usage'+data+'.pdf'
    })
    .fail(function(err){
        console.log(err)
    })

});