function EditPage(where) {
	var hnode           = document.getElementById('vichidden');
	var iframe          = document.createElement('iframe');
	
	iframe.style.cssText = "width: 159.2mm;\
	height: 233.6mm;\
	display: block;\
	margin: 30pt auto 20pt auto;\
	padding: 31.7mm 25.4mm;\
	background-color: #FFF;\
	border: solid 1px #CCC;\
	-webkit-box-shadow: 0pt 0pt 4pt #CCC;\
	-moz-box-shadow: 0pt 0pt 4pt #CCC;\
	box-shadow: 0pt 0pt 4pt #CCC;";

	hnode.style.display = 'none';
	iframe.frameBorder  = 0;
	hnode.parentNode.insertBefore(iframe, hnode);
	doc                 = iframe.contentDocument || iframe.contentWindow.document;
	doc.designMode      = 'on';
	doc.open();
	doc.write('\
<html><head><meta charset = "utf-8"><link rel = "stylesheet" type = "text/css" href = "css/dialog.css" /><script type = "text/javascript" src = "js/dialog.js"></script></head>\
	<body>\
		<div class = "dialog link">\
			<table>\
				<tr><td>Text :</td><td><input id = "linktext" type = "text"></td></tr>\
				<tr><td>Url :</td><td><input id = "linkurl" type = "text"></td><td><button id = "apply">Apply</button></td></tr>\
			</table>\
		</div>\
	</body>\
</html>');
	doc.close();
	return doc;
}

// Edit
function undo(doc) { return function() { doc.execCommand('undo'); } }
function redo(doc) { return function() { doc.execCommand('redo'); } }
function paste(doc) { return function() { doc.execCommand('paste'); } }
function selectAll(doc) { return function() { doc.execCommand('selectAll'); } }
function justifyLeft(doc) { return function() { doc.execCommand('justifyLeft'); } }
function justifyRight(doc) { return function() { doc.execCommand('justifyRight'); } }
function justifyCenter(doc) { return function() { doc.execCommand('justifyCenter'); } }
function justifyFull(doc) { return function() { doc.execCommand('justifyFull'); } }


// Format
function bold(doc) { return function() { doc.execCommand('bold'); } }
function italic(doc) { return function() { doc.execCommand('Italic'); } }
function underline(doc) { return function() { doc.execCommand('underline'); } }
function strikeThrough(doc) { return function() { doc.execCommand('strikeThrough'); } }
function superscript(doc) { return function() { doc.execCommand('superscript'); } }
function subscript(doc) { return function() { doc.execCommand('subscript'); } }
function removeFormat(doc) { return function() { doc.execCommand('removeFormat'); } }
function heading(docm, rk) { return function() { doc.execCommand('formatBlock', false, '<h' + rk + '>'); } }
function insertOrderedList(docm, rk) { return function() { doc.execCommand('insertOrderedList', false, '<h' + rk + '>'); } }
function insertUnorderedList(docm, rk) { return function() { doc.execCommand('insertUnorderedList', false, '<h' + rk + '>'); } }

window.onload = function() {
	var doc = EditPage();

	// Edit
	document.getElementById('undo').onclick = new undo(doc);
	document.getElementById('redo').onclick = new redo(doc);
	document.getElementById('paste').onclick = new paste(doc);
	document.getElementById('selectall').onclick = new selectAll(doc);

	// Format
	document.getElementById('bold').onclick = new bold(doc);
	document.getElementById('italic').onclick = new italic(doc);
	document.getElementById('underline').onclick = new underline(doc);
	document.getElementById('strikethrough').onclick = new strikeThrough(doc);
	document.getElementById('superscript').onclick = new superscript(doc);
	document.getElementById('subscript').onclick = new subscript(doc);
	document.getElementById('normaltext').onclick = new removeFormat(doc, 1);  // to be fixed.
	document.getElementById('h1').onclick = new heading(doc, 1);
	document.getElementById('h2').onclick = new heading(doc, 2);
	document.getElementById('h3').onclick = new heading(doc, 3);
	document.getElementById('h4').onclick = new heading(doc, 4);
	document.getElementById('h5').onclick = new heading(doc, 5);
	document.getElementById('h6').onclick = new heading(doc, 6);
	document.getElementById('justifyleft').onclick = new justifyLeft(doc, 3);
	document.getElementById('justifyright').onclick = new justifyRight(doc, 4);
	document.getElementById('justifycenter').onclick = new justifyCenter(doc, 5);
	document.getElementById('justifyfull').onclick = new justifyFull(doc, 6);
	document.getElementById('insertorderedList').onclick = new insertOrderedList(doc);
	document.getElementById('insertunorderedList').onclick = new insertUnorderedList(doc);
	document.getElementById('removeformat').onclick = new removeFormat(doc, 1);
}