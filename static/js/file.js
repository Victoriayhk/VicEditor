// 插件 jsPDF
loadScript(STATIC_URL + 'extensions/jsPDF/jsPDF.min.js');


$('#savepdf').click(function () {
    // 保存为PDF格式, 目前不支持utf-8, 效果有待完善
    var pdf = new jsPDF();
    var specialElementHandlers = {
        '#editor': function(element, renderer){
            return true;
        }
    };
    pdf.fromHTML(doc.body.innerHTML, 20, 30, {
        'width': 170, 
        'elementHandlers': specialElementHandlers
    });
    pdf.save('myword.pdf');
});


$('#qprint').click(function() {
    // 打印, 调用系统打印工具
    $('#menu').hide();
    $('#page').css({
        "width": "100%",
        "height": "100%",
        "border": "solid 1px transparent",
        "-webkit-box-shadow": "none",
        "-moz-box-shadow": "none",
        "box-shadow": "none",
    });
    window.print();
    $('#page').css({
        "width": "159.2mm",
        "height": "233.6mm",
        "display": "block",
        "margin": "10pt auto 20pt auto",
        "padding": "31.7mm 25.4mm",
        "background-color": "#FFF",
        "border": "solid 1px #CCC",
        "-webkit-box-shadow": "0pt 0pt 4pt #CCC",
        "-moz-box-shadow": "0pt 0pt 4pt #CCC",
        "box-shadow": "0pt 0pt 4pt #CCC",
    });
    $('#menu').show();
});
