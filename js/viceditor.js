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
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
	doc.designMode = 'on';
	doc.open();
	doc.write('<html><head><meta charset = "utf-8"></head><body></body></html>');
	doc.close();

	return iframe;
}

function mapClickByTitle(title, where) {
	var doc = where.contentDocument || where.contentWindow.document;
	var key = "[title='" + title + "']";
	if (title[0] == 'h') {
		$(key).click(function() { 
			doc.execCommand('formatblock', false, '<' + title + '>');
			where.focus();
		});
	} else {
		$(key).click(function(){
		   doc.execCommand(title, false, null);
		   where.focus();
		});
	}
}

function onClickMapTo(where) {
	var doc = where.contentDocument || where.contentWindow.document;

	// non-argument commands
	var commands = ['undo', 'redo', 'copy', 'cut', 'paste', 'delete', 'selectall',
		'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
		'justifyleft', 'justifyright', 'justifycenter', 'justifyfull',
		'insertimage', 'inserthorizontalrule',
		'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'removeformat'];
	for (var i = 0; i < commands.length; i ++) {
		mapClickByTitle(commands[i], where);
	};

	// h1, h2, h3, h4, h5, h6
	for (var i = 1; i <= 6; i++) {
		mapClickByTitle('h' + i, where);
	}

	// quoteblock
	$("[title = blockquote]").click(function() {
		doc.execCommand('formatblock', false, '<blockquote>');
		where.focus();
	});

	// insert link
	// $("[title = createlink]").click(function () {
	// 	var url = prompt('Link url:', 'http://');
	// 	if (url) {
	// 		doc.execCommand('createlink', false, url);
	// 		where.focus();
	// 	}
	// });
	doc.onselectionchange = function(e) {
		var range = where.getSelection().getRangeAt(0);
		var dummy = document.createElement("span");
		range.insertNode(dummy);
		var box = document.getBoxObjectFor(dummy);
		var X = box, Y = box.y;
		dummy.parentNode.removeChild(dummy);
		$("#dialoglink").data('X', X);
		$("#dialoglink").data('Y', Y);
	}
	$("[title = createlink]").click(function (e) {
		var X = $("#dialoglink").data('X');
		var Y = $("#dialoglink").data('Y');
		$("#dialoglink").css('left', X - 0.5 * $("#dialoglink").width());
		$("#dialoglink").css('top', Y * 1.4);
		$("#dialoglink").toggle(200);
	});
	


	// insert image
	$("[title = isnertimage]").click(function () {
		var url = prompt('Image url:', 'http://');
		if (url) {
			doc.execCommand('insertimage', false, url);
			where.focus();
		}
	});

	// insert markdown text (converted into HTML)
	$("[title = insertmarkdown]").click(function (e) {
		var X = e.clientX;
		var Y = e.clientY;
		$("#dialogmarkdown").css('left', X - 0.5 * $("#dialogmarkdown").width());
		$("#dialogmarkdown").css('top', Y * 1.4);
		$("#dialogmarkdown").toggle(200);
	});
	$("#dialogmarkdown .reset").click(function() {
		$('#dialogmkinput').val("");
	});
	$('#dialogmarkdown .apply').click(function() {
		var converter = new Showdown.converter({ extensions: ['twitter'] });
		var value = $('#dialogmkinput').val();
		var html = converter.makeHtml(value);
		$("#dialogmarkdown").hide(200);
		doc.execCommand('insertHTML', true, html);
		where.focus();
	});
	$("#dialogmarkdown .close").click(function() {
		$("#dialogmarkdown").hide(200);
	});

}

$(window).load(function (){
	// pages
	var pagecount = 1;
	var page = EditPage(0);
	onClickMapTo(page);
})
