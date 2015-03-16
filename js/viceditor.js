function addTitle(str, start, end, tr) {
	var insert1 = ' ', insert2 = '\n';
	for (var i = 0; i < tr; i ++) insert1 = '#' + insert1;
	if (start && str.charAt(start - 1) != '\n') insert1 = '\n' + insert1;

	return [str.substring(0, start) + insert1 + str.substring(start, end) + insert2 + str.substring(end),
			end + insert1.length + insert2.length,
			end + insert1.length + insert2.length
		];
}

function addBold(str, start, end) {
	return [str.substring(0, start) + '**' + str.substring(start, end) + '**' + str.substring(end),
			end + 4,
			end + 4
		];
}

function addTab(str, start, end) {
	return [str.substring(0, start) + '\t' + str.substring(end),
			end + 1,
			end + 1
		];
}

window.onload = function() {
	var editor    = document.getElementById('viceditor');
	var inputarea = document.getElementById('vicinputarea');
	var buttons   = editor.getElementsByTagName('span');

	inputarea.onkeyup = function(e) {
		var start = this.selectionStart, end = this.selectionEnd, str = inputarea.value, res;
		if (start == end) while (start && str.charAt(start - 1) != '\n') start--;

	    if (e.keyCode === 9) { // tab
	        e.preventDefault();
	        res = addTab(str, start, end);
	    }

	    if (e.keyCode === 66 && e.ctrlKey) { // Ctrl + B
	    	res = addBold(str, start, end);
	    }

	    if (49 <= e.keyCode && e.keyCode <= 54 && e.ctrlKey && e.shiftKey) { // Ctrl + Shift + 1
	    	res = addTitle(str, start, end, e.keyCode - 48);
	    }

	    if (res) {
		    inputarea.value = res[0];
		    inputarea.selectionStart = res[1];
		    inputarea.selectionEnd = res[2];	    	
	    }
	}
}