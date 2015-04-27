// This method dispatches key events based on the keymap bindings.
function key_dispatch(event) {
	// We start off with no modifiers and no key name
	var modifiers = ''
	var keyname = null;
	
	// Build the modifier string in canonical lowercase alphabetical order.
	if (event.altKey) modifiers += 'alt_';
	if (event.ctrlKey) modifiers += 'ctrl_';
	if (event.metaKey) modifiers += 'meta_';
	if (event.shiftKey) modifiers += 'shift_';
	
	// The keyname is easy if the DOM Level 3 key property is implemented:
	if (event.key)
		keyname = event.key;
	// Use the keyIdentifier on Safari and Chrome for function key names
	else if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== 'U+')
		keyname = event.keyIdentifier;
	// Otherwise, use the keyCode property and the code-to-name map below
	else
		keyname = keyCodeToKeyName[event.keyCode];
	
	// If we couldn't figure out a key name, just return and ignore the event.
	if (!keyname) return;
	
	// The canonical key id is modifiers plus lowercase key name
	return modifiers + keyname.toLowerCase();
};

function key_normalize(keyid) {
	keyid = keyid.toLowerCase(); // Everything lowercase
	var words = keyid.split(/\s+|[\-+_]/); // Split modifiers from name
	var keyname = words.pop(); // keyname is the last word
	keyname = keyAliases[keyname] || keyname; // Is it an alias?
	words.sort(); // Sort remaining modifiers
	words.push(keyname); // Add the normalized name back 
	return words.join('_'); // Concatenate them all
};


keyAliases = { // Map common key aliases to their "official" 
	'escape': 'esc', // key names used by DOM Level 3 and by 
	'delete': 'del', // the key code to key name map below.
	'return': 'enter', // Both keys and values must be lowercase here.
	'ctrl': 'control',
	'space': 'spacebar',
	'ins': 'insert'
};


// The legacy keyCode property of the keydown event object is not standardized
// But the following values seem to work for most browsers and OSes.
keyCodeToKeyName = {
	// Keys with words or arrows on them
	8: 'Backspace', 9: 'Tab', 13: 'Enter', 16: 'Shift', 17: 'Control', 18: 'Alt', 19: 'Pause', 20: 'CapsLock', 27: 'Esc', 32: 'Spacebar', 33: 'PageUp', 34: 'PageDown', 35: 'End', 36: 'Home', 37: 'Left', 38: 'Up', 39: 'Right', 40: 'Down', 45: 'Insert', 46: 'Del',
	
	// Number keys on main keyboard (not keypad)
	48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
	
	// Letter keys. Note that we don't distinguish upper and lower case
	65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z',
	
	// Keypad numbers and punctuation keys. (Opera does not support these.)
	96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9', 106: 'Multiply', 107: 'Add', 109: 'Subtract', 110: 'Decimal', 111: 'Divide',

	// Function keys
	112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12', 124: 'F13', 125: 'F14', 126: 'F15', 127: 'F16', 128: 'F17', 129: 'F18', 130: 'F19', 131: 'F20', 132: 'F21', 133: 'F22', 134: 'F23', 135: 'F24',

	// Punctuation keys that don't require holding down Shift
	// Hyphen is nonportable: FF returns same code as Subtract
	59: ';', 61: '=', 186: ';', 187: '=',

	// Firefox and Opera return 59,61
	188: ',', 190: '.', 191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: '\''
};


/**************************************************************************************
快捷键定制, 要求:
1. RTE的编辑区(ifamge)对象page(全局变量)
2. RTE的编辑区(ifamge)对象page内的document对象, 写作doc(全局变量)
3. 鉴于4和5, 本脚本设计用来被viceditor.js调用的(或一起使用)

PS: 本本脚本此说明上方的代码来自: JavaScript.The Definitive Guide(David Flanagan)中的Example 17-8

作者: 易惠康
***************************************************************************************/


doc.onkeydown = function(e) {
	key = key_dispatch(e);
	$.getJSON(STATIC_URL + "json/hotkeys.json", function(hotkeys) {
		$.each(hotkeys, function(command, ekey) {
			if (key == key_normalize(ekey)) {
				execCommand(command);
			}
		});
	});
}
