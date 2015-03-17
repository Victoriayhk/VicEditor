function addEventHandler(target, act, func) {
	if(target.addEventListener) target.addEventListener(act, func, false);
	else if(target.attachEvent) target.attachEvent("on" + act, func);
	else target["on" + act] = func;
}

function addItalic(input) {
	var start = input.selectionStart;	// 选择文本开始位置
	var end   = input.selectionEnd;		// 选中文本结束位置
	var value = input.value;			// 所有文本
	
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
	var start = input.selectionStart;	// 选择文本开始位置
	var end   = input.selectionEnd;		// 选中文本结束位置
	var value = input.value;			// 所有文本
	
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
	
function addTab(input) {	
	var start = input.selectionStart;	// 选择文本开始位置
	var end   = input.selectionEnd;		// 选中文本结束位置
	var value = input.value;			// 所有文本
	input.value = value.substring(0, start) + '\t' + value.substring(end);	// 插入制表符
	input.selectionStart = input.selectionEnd = start + 1;					// 设置光标位置
	e.preventDefault();														// 阻止他不跳转到到其它元素
	input.focus();
}

function addTitle(input, rk) {
	var start = input.selectionStart;	// 选择文本开始位置
	var end   = input.selectionEnd;		// 选中文本结束位置
	var value = input.value;			// 所有文本
	
	// 前插/后插的标题标记
	var txtbefore = '\n', txtafter = '\n';
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
	var start = input.selectionStart;	// 选择文本开始位置
	var end   = input.selectionEnd;		// 选中文本结束位置
	var value = input.value;			// 所有文本
	
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
	var editor = document.getElementById('viceditor');
	var input = document.getElementById('vicinputarea');

	input.onkeydown = function(e) {
	    if (e.keyCode === 9) addTab(input, e);				// Tab
	    if (e.keyCode === 66 && e.ctrlKey) addBold(input); 	// Ctrl + B
	    if (49 <= e.keyCode && e.keyCode <= 54 && e.ctrlKey && e.shiftKey)
	    	addTitle(input, e.keyCode - 48);				// Ctrl + Shift + 1/2/3/4/5/6
	    if (e.keyCode == 73 && e.ctrlKey) addItalic(input);	// Ctirl + I
	    if (e.keyCode == 76 && e.ctrlKey) addLink(input);	// Ctirl + L
	}
}