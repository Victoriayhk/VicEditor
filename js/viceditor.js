function EditPage(where) {
	var hnode           = document.getElementById('vichidden');
	var iframe          = document.createElement('iframe');
	
	iframe.style.cssText = "width: 500pt;\
	height: 620pt;\
	display: block;\
	margin: 30pt auto 20pt auto;\
	padding: 4em 3em;\
	background-color: #FFF;\
	border: solid 1px #BBB;\
	-webkit-box-shadow: 4pt 4pt 4pt #BBB;\
	-moz-box-shadow: 4pt 4pt 4pt #BBB;\
	box-shadow: 4pt 4pt 4pt #BBB;";

	hnode.style.display = 'none';
	iframe.frameBorder  = 0;
	hnode.parentNode.insertBefore(iframe, hnode);
	doc                 = iframe.contentDocument || iframe.contentWindow.document;
	doc.designMode      = 'on';
	doc.open();
	doc.write('<html><head></head><body></body></html>');
	doc.close();
	return doc;
}

function bold(doc) { return function() { doc.execCommand('bold')}; }
function italic(doc) { return function() { doc.execCommand('Italic')}; }
function Edit(doc) {
	this.bold = new bold(doc);
	this.italic = new italic(doc);
}

window.onload = function() {
	doc = EditPage();
	
	var edit = new Edit(doc);
	document.getElementById('bold').onclick = edit.bold;
	document.getElementById('italic').onclick = edit.italic;
}