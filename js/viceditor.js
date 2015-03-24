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

function urlValid(url) {
	var re = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-‌​\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
	return re.exec(url);
}

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
		'unlink',
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
	$("[title = createlink]").click(function (e) {
		var X = e.clientX;
		var Y = e.clientY;
		$("#dialoglink").css('left', X - 0.5 * $("#dialoglink").width());
		$("#dialoglink").css('top', Y * 1.4);
		$("#dialoglink").toggle(200);
		$('#dialoglktext').val(doc.getSelection());
		$('#dialoglkurl').val("");
		$('#dialoglink .apply').attr('disabled', true);
	});
	$('#dialoglink .apply').click(function() {
		var text = $('#dialoglktext').val();
		var href  = $('#dialoglkurl').val();
		doc.execCommand("insertHTML", false ,"<a href='" + href + "'>" + text +"</a>");
		$("#dialoglink").hide(200);
		where.focus();
	});
	$("#dialoglink .close").click(function() {
		$("#dialoglink").hide(200);
	});
	$('#dialoglktext, #dialoglkurl').on('change keydown paste input', function(e) {
		var text = $('#dialoglktext').val();
		var url = $('#dialoglkurl').val();
		if (text == "" || url == "" || !urlValid(url)) {
			$('#dialoglink .apply').attr('disabled', true);
		} else {
			$('#dialoglink .apply').attr('disabled', false);
		}
	})
	


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
