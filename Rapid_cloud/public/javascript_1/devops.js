window.onload  = function(){
	loadDevopsDetails();
}
function loadDevopsDetails(){
	$(function(){		
		   $.getJSON('http://172.29.59.62:3000/devopsDetails', function(data) {			
			   $('table.nodeSel tbody tr td').empty();
				for(var i=0;i<data.length;i++)
				{												
							tr = $('<tr/>');
				            tr.append("<td>" + data[i].vm_name+ "</td>");	
				            tr.append("<td>" + data[i].vm_size+ "</td>");
				            tr.append("<td>" + data[i].tool_name+ "</td>");	            
				            $('table.nodeSel tbody').append(tr);					 

				}
			  			  
		   });
		 
		});
}