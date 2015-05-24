/**************************************************************************************
相关菜单栏功能定制, 需要
1. 用到自定义的execCommand函数(viceditor.js中有)
2. 本脚本设计用来被viceditor.js调用的(或一起使用), 非独立脚本

作者: huikangyi@gmail.com 或 huikangyi@hotmail.com
***************************************************************************************/

function mapCommand2Menu(command, argv) {
	// 添加id为't'+command或'q'+command的按钮的click事件为执行对应command, 即大致相当于doc.execCommad(command).
	$('#t' + command + ',#q' + command).click(function() {
		execCommand(command, argv);
	});
}


// 简单command(几乎能直接调用doc.execCommand, 不带参数的命令)
var commands = ['undo', 'redo', 'copy', 'cut', 'paste', 'delete', 'selectall',
	'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
	'justifyleft', 'justifyright', 'justifycenter', 'justifyfull',
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code',
	'unlink', 'inserthorizontalrule',
	'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'removeformat'];


// 给menu中的按钮们添加click事件
for (var i = 0; i < commands.length; i ++) {
	mapCommand2Menu(commands[i]);
}
