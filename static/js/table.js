/**************************************************************************************
作者: 易惠康
日期: 2015-04-28
***************************************************************************************/

// 最大行数, 最大列数
var max_row = 10;
var max_col = 10;

// 插入表格时鼠标hover时的格子效果
var ttd_hover_style = { 'background-color': '#7EC0EE', 'border-color': '#4876FF', }

// 插入表格时鼠标没有hover时的格子效果
var ttd_normal_style = {'background-color': '#F2F2F2', 'border-color': 'CFCFCF', }


$('.ttd').hover(function(){
	// 动态选择表格规模的效果
	var row = $(this).parent().parent().children().index($(this).parent());
    var col = $(this).parent().children().index($(this));

    for (var i = 0; i <= row; i++) {
        for (var j = 0; j <= col; j++) {
            $('#ttb tr').eq(i).find('td').eq(j).css(ttd_hover_style);
        }
        for (var j = col + 1; j < max_col; j++) {
            $('#ttb tr').eq(i).find('td').eq(j).css(ttd_normal_style);
        }
    }
    for (var i = row + 1; i < max_row; i++) {
        for (var j = 0; j < max_col; j++) {
            $('#ttb tr').eq(i).find('td').eq(j).css(ttd_normal_style);
        }
    }

    $('#tablewidth').text(row + 1);
    $('#tableheight').text(col + 1);
})


$('#ttb').mouseleave(function(){
	// 恢复普通状态效果
	$('.ttd').css(ttd_normal_style);
})


$('.ttd').click(function(){
	// 点击动态插入图标中的格子后, 自动插入相应行数和列数的表格
	var row = $(this).parent().parent().children().index($(this).parent());
    var col = $(this).parent().children().index($(this));
    insertTable(row + 1, col + 1);
})


function insertTable(r, c) {
	console.log(r, c);
	var html = '<table>';
	for (var i = 0; i < r; i++) {
		html += '<tr style="height:2em">';
		for (var j = 0; j < c; j++) {
			html += '<td style="width:5em"></td>';
		}
		html += '</tr>';
	}
	html += '</table>';
	console.log(html);
	execCommand('insertHTML', html);
}