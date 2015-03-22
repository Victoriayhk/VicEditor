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

function getElementById(from, idvalue) {
    var items = from.children;
    for (item in items) {
        if (item.id == idvalue) return item;
    }
    for (item in items) {
        var tmp = getElementById(item, idvalue);
        if (tmp) return tmp;
    }
    return;
}


// Edit
function undo(doc) { return function() { doc.execCommand('undo'); } }
function redo(doc) { return function() { doc.execCommand('redo'); } }
function paste(doc) { return function() { doc.execCommand('paste'); } }
function selectAll(doc) { return function() { doc.execCommand('selectAll'); } }
function justifyLeft(doc) { return function() { doc.execCommand('justifyLeft'); } }
function justifyRight(doc) { return function() { doc.execCommand('justifyRight'); } }
function justifyCenter(doc) { return function() { doc.execCommand('justifyCenter'); } }
function justifyFull(doc) { return function() { doc.execCommand('justifyFull'); } }

// Format
function bold(doc) { return function() { doc.execCommand('bold'); } }
function italic(doc) { return function() { doc.execCommand('Italic'); } }
function underline(doc) { return function() { doc.execCommand('underline'); } }
function strikeThrough(doc) { return function() { doc.execCommand('strikeThrough'); } }
function superscript(doc) { return function() { doc.execCommand('superscript'); } }
function subscript(doc) { return function() { doc.execCommand('subscript'); } }
function removeFormat(doc) { return function() { doc.execCommand('removeFormat'); } }
function heading(doc, rk) { return function() { doc.execCommand('formatBlock', false, '<h' + rk + '>'); } }
function insertOrderedList(docm, rk) { return function() { doc.execCommand('insertOrderedList', false, '<h' + rk + '>'); } }
function insertUnorderedList(docm, rk) { return function() { doc.execCommand('insertUnorderedList', false, '<h' + rk + '>'); } }

function createLink(from, doc) {
    return function() {
        var e                = window.event;
        var dialog           = from.getElementById('dialoglink');
        var atext            = from.getElementById('linktext');
        var aurl             = from.getElementById('linkurl');
        var button           = from.getElementById('linkbtn');
        dialog.style.left    = e.clientX;
        dialog.style.top     = e.clientY;
        dialog.style.display = 'block';

        button.disabled = true;
        if (doc.selection && doc.selection.createRange().text) {
            atext.value = doc.selection.createRange().text;
            aurl.value  = "";
            aurl.focus();
        } else {
            atext.value = "";
            aurl.value  = "";
            atext.focus();
        }

    }
}

// key bind
function onClickMapTo(from, to) { // args are both 'document' objects
    // Edit
    from.getElementById('undo').onclick = new undo(to);
    from.getElementById('redo').onclick = new redo(to);
    from.getElementById('paste').onclick = new paste(to);
    from.getElementById('selectall').onclick = new selectAll(to);

    // Format
    from.getElementById('bold').onclick = new bold(to);
    from.getElementById('italic').onclick = new italic(to);
    from.getElementById('underline').onclick = new underline(to);
    from.getElementById('strikethrough').onclick = new strikeThrough(to);
    from.getElementById('superscript').onclick = new superscript(to);
    from.getElementById('subscript').onclick = new subscript(to);
    from.getElementById('normaltext').onclick = new removeFormat(to, 1);  // to be fixed.
    from.getElementById('h1').onclick = new heading(to, 1);
    from.getElementById('h2').onclick = new heading(to, 2);
    from.getElementById('h3').onclick = new heading(to, 3);
    from.getElementById('h4').onclick = new heading(to, 4);
    from.getElementById('h5').onclick = new heading(to, 5);
    from.getElementById('h6').onclick = new heading(to, 6);
    from.getElementById('justifyleft').onclick = new justifyLeft(to, 3);
    from.getElementById('justifyright').onclick = new justifyRight(to, 4);
    from.getElementById('justifycenter').onclick = new justifyCenter(to, 5);
    from.getElementById('justifyfull').onclick = new justifyFull(to, 6);
    from.getElementById('insertorderedList').onclick = new insertOrderedList(to);
    from.getElementById('insertunorderedList').onclick = new insertUnorderedList(to);
    from.getElementById('removeformat').onclick = new removeFormat(to, 1);

    from.getElementById('link').onclick = new createLink(from, to);
}
