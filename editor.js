window.onload = function() {
	var editor 	 = document.getElementById("editor");
	var buttons  = editor.getElementsByTagName("span");
	var selects  = editor.getElementsByTagName("select");

	var console = document.getElementById("console");
	// console.style.display = "none";
	var iframe = document.createElement("iframe");
	iframe.style.width = "100%";
	iframe.height = "240px";
	iframe.frameBorder = 0;
	console.parentNode.insertBefore(iframe, console);
	var iframeDocument = iframe.contentDocument || iframe.contentWindow.docment;
	iframeDocument.designMode = "on";
	iframeDocument.open();
	iframeDocument.write('<html><head></head><body></body></html>');
	iframeDocument.close();


	for(var i = 0,l = buttons.length; i < l; i++) {
	   	buttons[i].onclick = new function() {
	        var command = buttons[i].getAttribute("title");
	        return function() {
	        	iframeDocument.execCommand(command);
	        }
	    }
	}

	for (var i = 0, l = selects.length; i < l; i++) {
		selects[i].onchange = new function() {
			var select = selects[i];
			return function() {
				var command = select.getAttribute("title");
				value = select.options[select.selectedIndex].value;
				iframeDocument.execCommand(command, false, value);
			}
		}
	}
}