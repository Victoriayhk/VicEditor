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

function checkOverflow(el)
{
	var curOverflow = el.style.overflow;
	if ( !curOverflow || curOverflow === "visible" )
	el.style.overflow = "hidden";

	var isOverflowing = el.clientWidth < el.scrollWidth 
		|| el.clientHeight < el.scrollHeight;

	el.style.overflow = curOverflow;

	return isOverflowing;
}

function EditPage(pid) {
	// create a new page and insert into document
	var iframe          = document.createElement('iframe');
	iframe.style.cssText = 'width: 159.2mm;\
	height: 100%;\
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
} // iframe returned, NOT document

function urlValid(url) {
	var r1 = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	var r2 = /^(?:[\w]\:|\\)(\\[\S]+)+\.\w{2,6}$/;
	return r1.exec(url) || r2.exec(url);
}

function mapClickByTitle(to, title, varg) {
	var doc = to.contentDocument || to.contentWindow.document;
	var key = "[title = " + title + "]";
	$(key).click(function() {
		if (varg) {
			if (!doc.execCommand(title, false, varg))
				doc.execCommand('insertHTML', false, '<' + title + '>' + varg + '</' + title + '>');
		} else if (!doc.execCommand(title, false, null))
			doc.execCommand('formatblock', false, '<' + title + '>');
		to.focus();
	});
}

function mapCreateLink(to) {
	var doc = to.contentDocument || to.contentWindow.document;
	
	$("[title = createlink]").click(function (e) {
		var X = e.clientX;
		var Y = e.clientY;
		$("#dialoglink").css('left', X - 0.5 * $("#dialoglink").width());
		$("#dialoglink").css('top', Y * 1.4);
		$("#dialoglink").toggle(200);
		$("#dialoglktext").val(doc.getSelection());
		$('#dialoglkurl').val("http://");
		$('#dialoglink .apply').attr('disabled', true);
	});

	$('#dialoglink .apply').click(function() {
		var text = $("#dialoglktext").val();
		var href  = $('#dialoglkurl').val();
		doc.execCommand("insertHTML", false ,"<a href='" + href + "'>" + text +"</a>");
		$("#dialoglink").hide(200);
		to.focus();
	});

	$('#dialoglink .close').click(function() {
		$("#dialoglink").hide(200);
		to.focus();
	});
	
	$('#dialoglktext, #dialoglkurl').on('change keydown paste input', function(e) {
		var text = $("#dialoglktext").val();
		var url = $('#dialoglkurl').val();
		if (text == "" || url == "" || !urlValid(url)) {
			$('#dialoglink .apply').attr('disabled', true);
		} else {
			$('#dialoglink .apply').attr('disabled', false);
		}
	})
}

function mapInsertImage(to) {
	var doc = to.contentDocument || to.contentWindow.document;
	
	$("[title = insertimage]").click(function (e) {
		var X = e.clientX;
		var Y = e.clientY;
		$("#dialogimage").css('left', X - 0.5 * $("#dialogimage").width());
		$("#dialogimage").css('top', Y * 1.4);
		$("#dialogimage").toggle(200);
		$('#dialogimgurl').val("");
		$('#dialogimgshow').attr('src', '');
		$('#dialogimage .apply').attr('disabled', true);
	});

	$('#dialogimage .apply').click(function() {
		var href  = $('#dialogimgurl').val();
		doc.execCommand("insertImage", false, href);
		$("#dialogimage").hide(200);
		to.focus();
	});

	$('#dialogimage .close').click(function() {
		$("#dialogimage").hide(200);
		to.focus();
	});
	
	$('#dialogimgurl').on('change keydown paste input', function(e) {
		var url = $('#dialogimgurl').val();
		if (!urlValid(url)) {
			$('#dialogimgshow').attr('src', '');
			$('#dialogimage .apply').attr('disabled', true);
		} else {
			$('#dialogimgshow').attr('src', url);
			$('#dialogimage .apply').attr('disabled', false);
		}
	});

	$('#uploadBtn').on('change', function () {
    	$('#dialogimgurl').val(this.value);
    	var url = $('#dialogimgurl').val();
		if (!urlValid(url)) {
			$('#dialogimgshow').attr('src', '');
			$('#dialogimage .apply').attr('disabled', true);
		} else {
			$('#dialogimgshow').attr('src', url);
			$('#dialogimage .apply').attr('disabled', false);
		}
	});
}

function mapInsertMarkdown(to) {
	var doc = to.contentDocument || to.contentWindow.document;

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
		to.focus();
	});

	$("#dialogmarkdown .close").click(function() {
		$("#dialogmarkdown").hide(200);
	});
}

function insertTable(to, row, col) {
	var doc = to.contentDocument || to.contentWindow.document;
	var table = doc.createElement('table');

	for (var i = 0; i < row; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < col; j++) {
			var td = doc.createElement('td');
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	doc.body.appendChild(table);
}

function mapInsertTable(to) {
	var max_row = 20;
	var max_col = 20;
	
	$('.ttd').hover(function() {
		var row = $(this).parent().parent().children().index($(this).parent());
		var col = $(this).parent().children().index($(this));

		for (var i = 0; i <= row; i++) {
			for (var j = 0; j <= col; j++) {
				$('table tr').eq(i).find('td').eq(j).css('background-color', '#7EC0EE');
				$('table tr').eq(i).find('td').eq(j).css('border-color', '#4876FF');
			}
		}
		for (var i = 0; i <= row; i++) {
			for (var j = col + 1; j < max_col; j++) {
				$('table tr').eq(i).find('td').eq(j).css('background-color', '#F2F2F2');
				$('table tr').eq(i).find('td').eq(j).css('border-color', '#CFCFCF');
			}
		}
		for (var i = row + 1; i < max_row; i++) {
			for (var j = 0; j < max_col; j++) {
				$('table tr').eq(i).find('td').eq(j).css('background-color', '#F2F2F2');
				$('table tr').eq(i).find('td').eq(j).css('border-color', '#CFCFCF');
			}
		}

		$('#tablewidth').text(row + 1);
		$('#tableheight').text(col + 1);
	});

	$('.ttd').click(function() {
		var row = $(this).parent().parent().children().index($(this).parent());
		var col = $(this).parent().children().index($(this));

		insertTable(to, row + 1, col + 1);
	});
}

function onClickMapTo(to) {
	// basic commands click map
	var commands = ['undo', 'redo', 'copy', 'cut', 'paste', 'delete', 'selectall',
		'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
		'justifyleft', 'justifyright', 'justifycenter', 'justifyfull',
		'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code',
		'unlink', 'inserthorizontalrule',
		'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'removeformat'];
	
	mapCreateLink(to);
	mapInsertImage(to);
	mapInsertMarkdown(to);
	mapInsertTable(to);
	for (var i = 0; i < commands.length; i ++) mapClickByTitle(to, commands[i]);
}

$(window).load(function (){
	// pages
	var pagecount = 1;
	var page = EditPage(0);
	onClickMapTo(page);
	// textDetection(page);
})
