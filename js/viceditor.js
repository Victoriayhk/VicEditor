/*
                            _ooOoo_
                           o8888888o 
                           88" . "88    
                           (| ^_^ |)   
                           O\  =  /O
                        ____/`---'\____                       
                      .'  \\|     |//  `.
                     /  \\|||  :  |||//  \   
                    /  _||||| -:- |||||-  \
                    |   | \\\  -  /// |   |
                    | \_|  ''\---/''  |   |       
                    \  .-\__  `-`  ___/-. /        
                  ___`. .'  /--.--\  `. . ___   
                ."" '<  `.___\_<|>_/___.'  >'"".
              | | :  `- \`.;`\ _ /`;.`/ - ` : | |   
              \  \ `-.   \_ __\ /__ _/   .-` /  /
        ========`-.____`-.___\_____/___.-`____.-'======== 
                             `=---='
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/

function EditPage(pid) {
	// create a new page and insert into document
		var iframe          = document.createElement('iframe');
		iframe.style.cssText = 'width: 159.2mm;\
		height: 233.6mm;\
		display: block;\
		margin: 10pt auto 20pt auto;\
		padding: 31.7mm 25.4mm;\
		background-color: #FFF;\
		border: solid 1px #CCC;\
		-webkit-box-shadow: 0pt 0pt 4pt #CCC;\
		-moz-box-shadow: 0pt 0pt 4pt #CCC;\
		box-shadow: 0pt 0pt 4pt #CCC;';
		iframe.id = 'page' + pid;
		$('#vichidden').before(iframe);
	
	var doc = iframe.contentDocument || iframe.contentWindow.document;
	// set designMode 'on'	
		doc.designMode = 'on';
		doc.open();
		doc.write('<html><head><meta charset = "utf-8"><script type = "text/javascript" src = "js/page.js"></script></head><body></body></html>');
		doc.close();

	return doc;
}

function mapClickByTitle(title, where) {
	var key = "[title='" + title + "']";
	if (title[0] == 'h') {
		$(key).click(function() { 
			where.execCommand('formatBlock', false, '<' + title + '>');
		});
	} else {
		$(key).click(function(){
		   where.execCommand(title, false, null);
		});
	}
}

function onClickMapTo(to) {
	// non-argument commands
	var commands = ['undo', 'redo', 'paste', 'selectall', 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'normaltext', 'justifyleft', 'justifyright', 'justifycenter', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'removeformat'];
	for (var i = 0; i < commands.length; i ++) {
		mapClickByTitle(commands[i], to);
	};

	// h1, h2, h3, h4, h5, h6
	for (var i = 1; i <= 6; i++) {
		mapClickByTitle('h' + i, to);
	}
}

$(window).load(function (){
	// pages
	var pagecount = 1;
	var page = EditPage(0);
	onClickMapTo(page);
})