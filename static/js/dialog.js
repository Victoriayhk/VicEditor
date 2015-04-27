/**************************************************************************************
给文本编辑器(RTE)添加对话框效果, 要求:
1. RTE的编辑区(ifamge)对象page(全局变量)
2. RTE的编辑区(ifamge)对象page内的document对象, 写作doc(全局变量)
3. 只有class属性为dialog, 且内部有一个class属性为north的div元素才有摇曳效果(鼠标按住north处), 这样才有摇曳效果.
4. 本脚本用到了loadScript函数(在viceditor.jd中有)
5. 本脚本用到了STATIC_URL(在viceditor.jd中有)
6. 鉴于4和5, 本脚本设计用来被viceditor.js调用的(或一起使用)
7. 本脚本要用到showdown插件(在extensions文件夹中)

作者: 易惠康
***************************************************************************************/


/**************************************************************************************
DragResize v1.0 对话框可摇曳
(c) 2005-2006 Angus Turnbull, TwinHelix Designs http://www.twinhelix.com

Licensed under the CC-GNU LGPL, version 2.1 or later:
http://creativecommons.org/licenses/LGPL/2.1/
This is distributed WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
***************************************************************************************/

if(typeof addEvent!='function'){var addEvent=function(o,t,f,l){var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;if(o[d]&&!l)return o[d](t,f,false);if(!o._evts)o._evts={};if(!o._evts[t]){o._evts[t]=o[n]?{b:o[n]}:{};o[n]=new Function('e','var r=true,o=this,a=o._evts["'+t+'"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');if(t!='unload')addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL)})}if(!f._i)f._i=addEvent._i++;o._evts[t][f._i]=f};addEvent._i=1;var removeEvent=function(o,t,f,l){var d='removeEventListener';if(o[d]&&!l)return o[d](t,f,false);if(o._evts&&o._evts[t]&&f._i)delete o._evts[t][f._i]}}function cancelEvent(e,c){e.returnValue=false;if(e.preventDefault)e.preventDefault();if(c){e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()}};function DragResize(myName,config){var props={myName:myName,enabled:true,handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,minWidth:10,minHeight:10,minLeft:0,maxLeft:9999,minTop:0,maxTop:9999,zIndex:1,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mOffX:0,mOffY:0,elmX:0,elmY:0,elmW:0,elmH:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null};for(var p in props)this[p]=(typeof config[p]=='undefined')?props[p]:config[p]};DragResize.prototype.apply=function(node){var obj=this;addEvent(node,'mousedown',function(e){obj.mouseDown(e)});addEvent(node,'mousemove',function(e){obj.mouseMove(e)});addEvent(node,'mouseup',function(e){obj.mouseUp(e)})};DragResize.prototype.select=function(newElement){with(this){if(!document.getElementById||!enabled)return;if(newElement&&(newElement!=element)&&enabled){element=newElement;element.style.zIndex=++zIndex;if(this.resizeHandleSet)this.resizeHandleSet(element,true);elmX=parseInt(element.style.left);elmY=parseInt(element.style.top);elmW=element.offsetWidth;elmH=element.offsetHeight;if(ondragfocus)this.ondragfocus()}}};DragResize.prototype.deselect=function(delHandles){with(this){if(!document.getElementById||!enabled)return;if(delHandles){if(ondragblur)this.ondragblur();if(this.resizeHandleSet)this.resizeHandleSet(element,false);element=null}handle=null;mOffX=0;mOffY=0}};DragResize.prototype.mouseDown=function(e){with(this){if(!document.getElementById||!enabled)return true;var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(myName+'-([trmbl]{2})','');while(elm){if(elm.className){if(!newHandle&&(hRE.test(elm.className)||isHandle(elm)))newHandle=elm;if(isElement(elm)){newElement=elm;break}}elm=elm.parentNode}if(element&&(element!=newElement)&&allowBlur)deselect(true);if(newElement&&(!element||(newElement==element))){if(newHandle)cancelEvent(e);select(newElement,newHandle);handle=newHandle;if(handle&&ondragstart)this.ondragstart(hRE.test(handle.className))}}};DragResize.prototype.mouseMove=function(e){with(this){if(!document.getElementById||!enabled)return true;mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;var diffX=mouseX-lastMouseX+mOffX;var diffY=mouseY-lastMouseY+mOffY;mOffX=mOffY=0;lastMouseX=mouseX;lastMouseY=mouseY;if(!handle)return true;var isResize=false;if(this.resizeHandleDrag&&this.resizeHandleDrag(diffX,diffY)){isResize=true}else{var dX=diffX,dY=diffY;if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmX+=diffX;elmY+=diffY}with(element.style){left=elmX+'px';width=elmW+'px';top=elmY+'px';height=elmH+'px'}if(window.opera&&document.documentElement){var oDF=document.getElementById('op-drag-fix');if(!oDF){var oDF=document.createElement('input');oDF.id='op-drag-fix';oDF.style.display='none';document.body.appendChild(oDF)}oDF.focus()}if(ondragmove)this.ondragmove(isResize);cancelEvent(e)}};DragResize.prototype.mouseUp=function(e){with(this){if(!document.getElementById||!enabled)return;var hRE=new RegExp(myName+'-([trmbl]{2})','');if(handle&&ondragend)this.ondragend(hRE.test(handle.className));deselect(false)}};DragResize.prototype.resizeHandleSet=function(elm,show){with(this){if(!elm._handle_tr){for(var h=0;h<handles.length;h++){var hDiv=document.createElement('div');hDiv.className=myName+' '+myName+'-'+handles[h];elm['_handle_'+handles[h]]=elm.appendChild(hDiv)}}for(var h=0;h<handles.length;h++){elm['_handle_'+handles[h]].style.visibility=show?'inherit':'hidden'}}};DragResize.prototype.resizeHandleDrag=function(diffX,diffY){with(this){var hClass=handle&&handle.className&&handle.className.match(new RegExp(myName+'-([tmblr]{2})'))?RegExp.$1:'';var dY=diffY,dX=diffX,processed=false;if(hClass.indexOf('t')>=0){rs=1;if(elmH-dY<minHeight)mOffY=(dY-(diffY=elmH-minHeight));else if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));elmY+=diffY;elmH-=diffY;processed=true}if(hClass.indexOf('b')>=0){rs=1;if(elmH+dY<minHeight)mOffY=(dY-(diffY=minHeight-elmH));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmH+=diffY;processed=true}if(hClass.indexOf('l')>=0){rs=1;if(elmW-dX<minWidth)mOffX=(dX-(diffX=elmW-minWidth));else if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));elmX+=diffX;elmW-=diffX;processed=true}if(hClass.indexOf('r')>=0){rs=1;if(elmW+dX<minWidth)mOffX=(dX-(diffX=minWidth-elmW));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));elmW+=diffX;processed=true}return processed}};


var dragresize = new DragResize('dragresize',
	{ minWidth: 50, minHeight: 50, minLeft: -100, minTop: -100, maxLeft: 10000, maxTop: 10000 });


dragresize.isElement = function(elm) {
	if (elm.className && elm.className.indexOf('dialog') > -1) return true;
};


dragresize.isHandle = function(elm) {
	if (elm.className && elm.className.indexOf('north') > -1) return true;
};

dragresize.ondragfocus = function() { };
dragresize.ondragstart = function(isResize) { };
dragresize.ondragmove = function(isResize) { };
dragresize.ondragend = function(isResize) { };
dragresize.ondragblur = function() { };

dragresize.apply(document);


/**************************************************************************************/

// 需要用到dialog的编辑命令, 请在这里添加编辑命令的名字, 使dialog的通用效果有效
var DIALOG_COMMANDS = ['markdown', 'link', 'image'];


/****基本效果****/

function dialogToggle(dname, X, Y, init_argvs) {
	// 在X,Y处的正下方弹出对应对话框, 并预设对话框中的一些内容
	var dialog = $("#d" + dname);
	$(dialog).css('left', X - 0.5 * $(dialog).width());
	$(dialog).css('top', Y * 1.4);
	$(dialog).toggle(200);

	if (init_argvs) {
		for (var key in init_argvs) {
			$('#' + key).val(init_argvs[key]);
		}
	}
}


$('.dialog').each(function(idx, dialog) {
	// 通过对话框上的fa-close图标关闭对应对话框
	$(dialog).find('.close').click(function(){
		$(dialog).hide(200);
	});
});


$.each(DIALOG_COMMANDS, function(idx, dname) {
	// 通过按一个id格式为q+DIALOG_COMMANDS[i]的组件的click操作打开对应对话框, 比如一个<span id = "qlink"><span>可以打开dlink对话框
	$('#q' + dname).click(function(e) {
		var X = e.clientX;
		var Y = e.clientY;
		var init_argvs = {};
		if (dname == "link") init_argvs['dltext'] = doc.getSelection();
		dialogToggle(dname, X, Y, init_argvs);
	});
});



/****插入超链接****/

$('#dlink .apply').click(function() {
	// 点击超链接对话框上的Apply按钮, 插入链接, 关闭对话框
	var text = $("#dltext").val();
	var href  = $('#dlurl').val();
	doc.execCommand("insertHTML", false ,"<a href='" + href + "'>" + text +"</a>");
	$("#dlink").hide(200);
	page.focus();
});


$('#dltext, #dlurl').on('change keydown paste input', function(e) {
	// 随键盘键入即时检查链接文本和链接地址的合法性: 链接文本不为空, 链接地址不为空且合法; 不合法时disable Apply按钮
	var text = $("#dltext").val();
	var url = $('#dlurl').val();
	if (text == "" || url == "" || !urlValid(url)) {
		$('#dlink .apply').attr('disabled', true);
	} else {
		$('#dlink .apply').attr('disabled', false);
	}
})


/****插入图片****/

// 不支持本地上传
$('#dimage #dibrowse').attr('disabled', true);
$('#uploadBtn').attr('disabled', true);


$('#dimage .apply').click(function() {
	// 点击超链接对话框上的Apply按钮, 插入图片
	var href  = $('#dialogimgurl').val();
	doc.execCommand("insertImage", false, href);
	$("#dimage").hide(200);
	page.focus();
});


$('#dialogimgurl,#uploadBtn').on('change keydown paste input', function(e) {
	// 随键盘键入即时检查图片地址的合法性: 仅作与超链接一样的URL正则匹配检查; 不合法时disable Apply按钮
	var url = $('#dialogimgurl').val();
	if (!urlValid(url)) {
		$('#dialogimgshow').attr('src', '');
		$('#dimage .apply').attr('disabled', true);
	} else {
		$('#dialogimgshow').attr('src', url);
		$('#dimage .apply').attr('disabled', false);
	}
});


/****插入markdown****/

// markdown转html的插件: showdown
loadScript(STATIC_URL + 'extensions/showdown/showdown.js');
loadScript(STATIC_URL + 'extensions/showdown/extensions/twitter.js');


$("#dmarkdown .reset").click(function() {
	// 重置对话框中的markdown格式文本框内容为空
	$('#dialogmkinput').val("");
});


$('#dmarkdown .apply').click(function() {
	// 将输入的markdown文本通过showdown脚本转为html代码插入doc中
	var converter = new Showdown.converter({ extensions: ['twitter'] });
	var value = $('#dialogmkinput').val();
	var html = converter.makeHtml(value);
	$("#dmarkdown").hide(200);
	doc.execCommand('insertHTML', true, html);
	page.focus();
});
