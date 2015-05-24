$('#cssstyle').change(function(){
	var val = this.options[this.selectedIndex].value;
	loadCSS(STATIC_URL + val + ".css", doc);
})