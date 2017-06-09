Nui.define("{cpns}/layer/layer",["component","util"],function(t,e){var n={_maskzIndex:1e4,_zIndex:1e4,_mask:null,_init:function(){var t=this;Nui.win.on("resize",function(){Nui.each(t.__instances,function(t){(t.options.position||!0===t.options.isCenter)&&t.resize()})})},$fn:null,$ready:null,init:null},i={content:"",width:300,height:"auto",maxWidth:0,maxHeight:0,timer:0,edge:0,container:"body",title:"温馨提示",animate:"",isMove:!0,isMask:!0,isClickMask:!1,isMoveMask:!1,isClose:!0,isCenter:!0,isFull:!1,isTop:!1,isFixed:!0,scrollbar:!0,bubble:{enable:!1,dir:"top"},iframe:{enable:!1,cache:!1,src:""},close:{enable:!0,text:"×"},confirm:{enable:!1,text:"确定",callback:function(){return!0}},cancel:{enable:!1,text:"取消"},position:null,bottom:null,button:null,onMove:null,onResize:null,onScroll:null,onClick:null};return this.extend(t,{static:n,options:i,_template:{layout:'<div class="<% className %> ui-animate ui-animate-bounceIn"><div class="layer-box"><% if close %><% var btn = close %><% include "button" %><% /if %><% if title %><div class="layer-head"><span class="layer-title"><% title %></span></div><% /if %><div class="layer-body"><div class="layer-main"><% content %></div></div><% if button && button.length %><div class="layer-foot"><% each button btn %><% include "button" %><% /each %></div><% /if %></div></div>',button:'<span class="nui-button layer-button layer-button-<% btn.id %>"><% btn.text || "匿名按钮" %></span>',iframe:'<iframe<% each attr %> <% $index %>="<% $value %>"<% /each %>></iframe>',mask:NaN},_data:{},_init:function(){var t=this.constructor;this._zIndex=++t._zIndex,this._exec()},_exec:function(){var t=this,e=t.options,n=t.constructor;if(t._container=n._jquery(e.container),t._container.length){if("BODY"!==t._container.get(0).tagName){t._window=t._container,t._isWindow=!1;var i=t._container.css("position");"absolute"!==i&&"relative"!==i&&t._container.css("position","relative")}else t._window=Nui.win,t._isWindow=!0;t._create()}},_create:function(){var t=this,e=t.options,n=t._createButton(),i=t._tplData({content:t._getContent(),close:n.close,button:n.button,title:e.title});t.element=$(t._tpl2html("layout",i)).appendTo(t._container),t._box=t.element.children(".layer-box"),t._head=t._box.children(".layer-head"),t._body=t._box.children(".layer-body"),t._main=t._body.children(".layer-main"),t._foot=t._box.children(".layer-foot"),!0===e.iframe.enable&&(t._iframe=t._main.children("iframe"),t._iframeOnload()),!0===e.isMove&&e.title&&t._move(),t._button.length&&t._buttonEvent(),e.isTop&&t._setTop(),t._show()},_getContent:function(){var t=this,e=t.options,n="";return!0===e.iframe.enable?n=t._createIframe():"string"==typeof e.content?n=e.content:e.content instanceof jQuery&&(n=e.content.prop("outerHTML")),n},_createIframe:function(){var t=this,n=(t.options,"layer-iframe"+t.__index);return!1===i.iframe.cache&&(src=e.setParam("_",(new Date).getTime(),src)),t._tpl2html("iframe",{frameborder:"0",name:n,id:n,src:src,scroll:"hidden",style:"width:100%;"})},_iframeOnload:function(){var t=this;t._iframe.load(function(){t._resize()})},_createButton:function(){var t=this,e=t.options,n={},i={},o={};return t._button=[],Nui.each(["confirm","cancel"],function(t){var i=e[t];i&&!0===i.enable&&(n[t]={id:t,text:i.text,callback:i.callback})}),e.button&&e.button.length&&Nui.each(e.button,function(e){var i=e.id;o[i]||(o[i]=!0,n[i]&&(e.text||("cancel"===i?e.text="取消":"confirm"===i&&(e.text="确定")),delete n[i]),t._button["close"===i?"unshift":"push"](e))}),Nui.each(n,function(e){t._button.push(e)}),!o.close&&e.close&&!0===e.close.enable&&t._button.unshift({id:"close",text:e.close.text,callback:e.close.callback}),t._button[0]&&"close"===t._button[0].id?(i.close=t._button[0],i.button=t._button.slice(1)):i.button=t._button,i},_buttonEvent:function(){var t=this;Nui.each(t._button,function(e){t._on("click",t.element,".layer-button-"+e.id,function(n,i){var o=e.id,a=e.callback,s="function"==typeof a?a.call(t,n,i):null;("confirm"===o&&!0===s||"confirm"!==o&&!1!==s)&&t.destroy()})})},_setTop:function(){var t=this;t._on("click",t.element,function(){t.setzIndex()})},_move:function(){var t,e,n,i,o=this,a=o.options,s=o.element,c=o.constructor,l=s,r=!1;o._on("mousedown",o._head,function(n,i){r=!0,o._setzIndex(),!0===a.isMoveMask&&(l=o._moveMask=$(o._tpl2html("mask",{name:"movemask",skin:a.skin,zindex:o._zIndex+1})),!0!==a.isFixed||Nui.bsie6||l.css("position","fixed"),l.css({width:o._data.width-c._getSize(l,"lr"),height:o._data.height-c._getSize(l),top:o._data.top,left:o._data.left})),i.css("cursor","move"),t=n.pageX-o._data.left,e=n.pageY-o._data.top,n.stopPropagation()}),o._on("mousemove",Nui.doc,function(a){var s=Nui.doc.width(),c=Nui.doc.height();if(r)return n=a.pageX-t,i=a.pageY-e,n<0&&(n=0),i<0&&(i=0),n+o._data.width>s&&(n=s-o._data.width),i+o._data.height>c&&(i=c-o._data.height),o._data.top=i,o._data.left=n,l.css({top:i,left:n}),!r}),o._on("mouseup",Nui.doc,function(t){r&&(r=!1,o._head.css("cursor","default"),!0===a.isMoveMask&&(s.css(o._data),o._moveMask.remove()),Nui.bsie6&&!0===a.isFixed&&(o._data.winTop=i-Nui.win.scrollTop(),o._data.winLeft=i-Nui.win.scrollLeft()),"function"==typeof a.onMove&&a.onMove.call(this))})},_setzIndex:function(){var t=this,e=t.constructor;t._downing||(t._downing=!0,t._zIndex=++e._zIndex,t.element.css("zIndex",t._zIndex),Nui.each(e.__instances,function(e){e&&e!==t&&(e._downing=!1)}))},_resize:function(t){var e=this,n=e.options,i=e.element,o=e._window.outerWidth(),a=e._window.outerHeight();if(n.position){var s=n.position;e._position={top:s.top,right:s.right,bottom:s.bottom,left:s.left};var c=i.css(e._position).position();e._data.left=c.left,e._data.top=c.top}else(t||!0===n.isCenter)&&(e._data.left=(o-e._data.width)/2,e._data.top=(a-e._data.height)/2,i.css(e._data))},_setSize:function(){var t=this,e=t.constructor,n=t.options,i=t.element,o=e._getSize(i,"lr","all"),a=e._getSize(i,"tb","all"),s=n.edge>0?2*n.edge:0,c=t._window.outerWidth()-s,l=t._window.outerHeight()-s,r=c,u=l;!0!==n.isFull&&(r=n.width>0?n.width:"auto",u=n.height>0?n.height:"auto",n.maxWidth>0&&i.outerWidth()>n.maxWidth&&(r=n.maxWidth),n.maxHeight>0&&i.outerHeight()>n.maxWidth&&(u=n.maxHeight),!0===n.scrollbar&&(r>c&&(r=c),u>l&&(u=l))),t._data.width=r-o,t._data.height=u-a,i.css(t._data),t._data.width=i.outerWidth(),t._data.height=i.outerHeight()},_show:function(){var e=this,n=e.options;e.element;return e._setSize(),e._resize(!0),t("init",e._main),"function"==typeof n.onInit&&n.onInit.call(this,e._main,e.__index),e},_reset:function(){var e=this.constructor,n=!0;t.exports._reset.call(this),t("destroy",this._main),Nui.each(e.__instances,function(t){if(t&&1==t.options.isMask&&"BODY"===t._container.eq(0).tagName)return n=!1}),n&&e._mask&&(e._mask.remove(),e._mask=null),this._mask&&this._mask.remove(),this.options.timer>0&&clearTimeout(this._timer)},resize:function(){var t=this,e=t.options;t.element;return t._resize(),"function"==typeof e.onResize&&e.onResize.call(this,t._main,t.__index),t},hide:function(){this.destroy()},destroy:function(){var t=this,e=t.constructor,n=t.options;t._reset(),t._delete(),e._zIndex--,"function"==typeof n.onDestroy&&n.onDestroy.call(this,t._main,t.__index)}})}),Nui.define("./script/demo",function(require,imports,renders,extend){var t=require("{cpns}/layer/layer");t({content:"<a>aaa</a>",confirm:{enable:!0},cancel:{enable:!0},position:null,button:[{id:"cancel"},{id:"confirm"}]})});