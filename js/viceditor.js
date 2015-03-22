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
	iframe.id = 'page';

	hnode.style.display = 'none';
	hnode.parentNode.insertBefore(iframe, hnode);
	doc                 = iframe.contentDocument || iframe.contentWindow.document;
	doc.designMode      = 'on';
	doc.open();
	doc.write('\
<html><head><meta charset = "utf-8">\
<link rel = "stylesheet" type = "text/css" href = "css/style.css" />\
</head>\
	<body>\
	</body>\
</html>');
	doc.close();
	return doc;
}

window.onload = function() {
    var doc = EditPage();
    onClickMapTo(document, doc);
}