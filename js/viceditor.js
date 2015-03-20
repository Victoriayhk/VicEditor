function addEventHandler(target, act, func) {
	if (target.addEventListener) target.addEventListener(act, func, false);
	else if (target.attachEvent) target.attachEvent("on" + act, func);
	else target["on" + act] = func;
}

function addItalic(input) {
	var start = input.selectionStart; // 选择文本开始位置
	var end = input.selectionEnd; // 选中文本结束位置
	var value = input.value; // 所有文本

	// 若选择文本为空, 创造新的空加粗文本, 光标处编辑加粗文本
	// 否则, 加粗选中文本, 并光标跳到选中加粗文本后面
	if (start == end) {
		var txtinsert = '<italic text>';
		input.value = value.substring(0, start) + '*' + txtinsert + '*' + value.substring(end);
		input.selectionStart = start + 1;
		input.selectionEnd = input.selectionStart + txtinsert.length;
	} else {
		input.value = value.substring(0, start) + '*' + value.substring(start, end) + '*' + value.substring(end);
		input.selectionStart = input.selectionSEnd = end + 2;
	}
	input.focus();
}

function addBold(input) {
	var start = input.selectionStart; // 选择文本开始位置
	var end = input.selectionEnd; // 选中文本结束位置
	var value = input.value; // 所有文本

	// 若选择文本为空, 创造新的空加粗文本, 光标处编辑加粗文本
	// 否则, 加粗选中文本, 并光标跳到选中加粗文本后面
	if (start == end) {
		var txtinsert = '<bold text>';
		input.value = value.substring(0, start) + '**' + txtinsert + '**' + value.substring(end);
		input.selectionStart = start + 2;
		input.selectionEnd = input.selectionStart + txtinsert.length;
	} else {
		input.value = value.substring(0, start) + '**' + value.substring(start, end) + '**' + value.substring(end);
		input.selectionStart = input.selectionSEnd = end + 4;
	}
	input.focus();
}

function addTab(input, e) {
	var start = input.selectionStart; // 选择文本开始位置
	var end = input.selectionEnd; // 选中文本结束位置
	var value = input.value; // 所有文本
	input.value = value.substring(0, start) + '\t' + value.substring(end); // 插入制表符
	input.selectionStart = input.selectionEnd = start + 1; // 设置光标位置
	e.preventDefault(); // 阻止他不跳转到到其它元素
	input.focus();
}

function addTitle(input, rk) {
	var start = input.selectionStart; // 选择文本开始位置
	var end = input.selectionEnd; // 选中文本结束位置
	var value = input.value; // 所有文本

	// 前插/后插的标题标记
	var txtbefore = '\n',
		txtafter = '\n';
	if (start == 0 || value.charAt(start - 1) == '\n') txtbefore = '';
	for (var i = 0; i < rk; i++) txtbefore += '#';
	txtbefore += ' ';

	// 如果选中为空, 从当前位置新起一行作为标题行, 否则标题化选中文本
	if (start == end) {
		var txtinsert = '<title h' + rk + '>';
		input.value = value.substring(0, start) + txtbefore + txtinsert + txtafter + value.substring(end);
		input.selectionStart = start + txtbefore.length;
		input.selectionEnd = input.selectionStart + txtinsert.length;
	} else {
		input.value = value.substring(0, start) + txtbefore + value.substring(start, end) + txtafter + value.substring(end);
		input.selectionStart = input.selectionEnd = end + txtbefore.length + txtafter.length;
	}
	input.focus();
}

function addLink(input) {
	var start = input.selectionStart; // 选择文本开始位置
	var end = input.selectionEnd; // 选中文本结束位置
	var value = input.value; // 所有文本

	// 若选择文本为空, 创造新的空链接, 光标处编辑链接文本
	// 否则, 给选中文本添加待编辑URL
	if (start == end) {
		var txtinsert = '<text>';
		input.value = value.substring(0, start) + '[' + txtinsert + '](<URL>)' + value.substring(end);
		input.selectionStart = start + 1;
		input.selectionEnd = input.selectionStart + txtinsert.length;
	} else {
		input.value = value.substring(0, start) + '[' + value.substring(start, end) + '](URL)' + value.substring(end);
		input.selectionStart = end + 3;
		input.selectionEnd = end + 6;
	}
	input.focus();
}

window.onload = function() {
	// create iframe: input/inputDoc
	var hnode = document.getElementById('viceditarea');
	var input = document.createElement('iframe');
	hnode.parentNode.insertBefore(input, hnode);
	hnode.style.display = 'none';
	input.style.width = '100%';
	input.style.height = '240pt';
	input.frameBorder = 0;
	inputDoc = input.contentDocument || input.contentWindow.document;
	inputDoc.designMode = 'on';
	inputDoc.open();
	inputDoc.write('<html><head></head><body></body></html>');
	inputDoc.close();

	// .exeCommand('head', false, arg);
	// H1, H2, H3, H4, H5, H6
	var headingbox = document.getElementById('heading');
	var btns = headingbox.getElementsByTagName('span');
	for (var i = 0, l = btns.length; i < l; i++) {
		btns[i].onclick = new function() {
			var hrank = btns[i].getAttribute('title');
			return function() {
				inputDoc.execCommand('formatBlock', false, '<' + hrank + '>');
			}
		};
	};

	// .exeComand(commandString)
	// + bold, italic, superscript, subscript, insertUnorderedList ,insertorderedList, undo, redo
	var singlebox = document.getElementById('single');
	var btns = singlebox.getElementsByTagName('span');
	for (var i = 0, l = btns.length; i < l; i++) {
		btns[i].onclick = new function() {
			var command = btns[i].getAttribute('title');
			return function() {
				inputDoc.execCommand(command);
			}
		};
	};

	// .exeCommand(commandString, false, arg)
	var promptbox = document.getElementById('prompt');
	var btns = promptbox.getElementsByTagName('span');
	for (var i = 0, l = btns.length; i < l; i++) {
		btns[i].onclick = new function() {
			var command = btns[i].getAttribute('title');
			return function() {
				var arg = prompt('arg: ');
				inputDoc.execCommand(command, false, arg);
			}
		};
	};

	// export as html
	var export_button = document.getElementById('export');
	var converter = new Showdown.converter({ extensions: ['twitter'] });
	export_button.onclick = new function() {
	    return function() {
            document.getElementById("output").innerHTML =
              converter.makeHtml(inputDoc.body.value);
        }
	};	
}