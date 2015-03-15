window.onload = function() {
	var converter = new Showdown.converter({ extensions: ['twitter'] });
	var input = document.getElementById('textarea');
	var submitbutton = document.getElementById('submit');
	
	submitbutton.onclick = new function() {
	    return function() {
	        document.getElementById("exportresult").innerHTML =
	          converter.makeHtml(input.value);
	    }
	};
}