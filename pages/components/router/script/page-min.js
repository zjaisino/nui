Nui.define("pages/components/router/script/ajax",function(){var e=$.ajax;return function(t){"string"==typeof t&&(t={url:t,dataType:"json"});var n=t.success||$.noop,a=t.error||$.noop;return t.success=function(){n.apply(this,arguments)},t.error=function(){a.apply(this,arguments)},e($.extend(!0,{cache:!1,dataType:"json",statusCode:{404:function(){},502:function(){}}},t))}}),Nui.define("pages/components/router/script/tpls/seeVoucher",function(){return this.renders('这是查凭证页面，页面完整url是：<% url %>，路径是：<% path %><% if param %><br>参数分别是：<% each param %><% $index %>=<% $value %>，<% /each %><% /if %><a id="aaa" class="nui-router-back">返回</a> ')}),Nui.define("pages/components/router/script/modules/seeVoucher",["pages/components/router/script/tpls/seeVoucher","template"],function(e,t){return function(n,a,i){a.html(t.render(e,i))}}),Nui.define("{cpns}/placeholder",["component"],function(e){return this.extend(e,{options:{text:"",animate:!1,equal:!1,color:"#ccc"},_template:{list:"<%each style%><%$index%>:<%$value%>;<%/each%>",wrap:'<strong class="<% className %>" style="<%include \'list\'%>" />',elem:"<b style=\"<%include 'list'%>\"><%text%></b>"},_init:function(){this._exec()},_exec:function(){var e=this,t=e._getTarget();if(t){var n=e.deftext=t.attr("placeholder");!e.deftext&&e.options.text&&t.attr("placeholder",n=e.options.text),e.text=Nui.trim(n),void 0===e.val&&(e.val=Nui.trim(t.val())),e.text&&e._create()}},_create:function(){var e=this,t=e.options,n=e.constructor;if(!t.animate&&(t.animate||"placeholder"in document.createElement("input")))e._setStyle();else{t.animate&&e.target.removeAttr("placeholder");var a=e._tplData();a.style={position:"relative",display:"inline-block",width:e.target.outerWidth()+"px",overflow:"hidden",cursor:"text"},e.target.wrap(e._tpl2html("wrap",a)),e.element=$(e._tpl2html("elem",{text:e.text,style:function(){var a=e.target.outerHeight(),i=e.target.is("textarea");return{display:Nui.trim(e.target.val())?"none":"inline",position:"absolute",left:n._getSize(e.target,"l","padding")+n._getSize(e.target,"l")+"px",top:n._getSize(e.target,"t","padding")+n._getSize(e.target,"t")+"px",height:i?"auto":a+"px","line-height":i?"normal":a+"px",color:t.color}}()})).insertAfter(e.target),e._events()}},_setStyle:function(){var e=this;e.options;e.className="_placeholder-"+e.__id,e.target.addClass(e.className),e.constructor.style||e._createStyle(),e._createRules()},_createStyle:function(){var e=this,t=document.createElement("style");document.head.appendChild(t),e.constructor.style=t.sheet},_createRules:function(){var e=this,t=e.constructor.style,n=e.__id;try{t.deleteRule(n)}catch(e){}Nui.each(["::-webkit-input-placeholder",":-ms-input-placeholder","::-moz-placeholder"],function(a){var i="."+e.className+a,r="opacity:1; color:"+(e.options.color||"");try{"addRule"in t?t.addRule(i,r,n):"insertRule"in t&&t.insertRule(i+"{"+r+"}",n)}catch(e){}})},_events:function(){var e=this,t=e.options,n=e.constructor,a=n._getSize(e.target,"l","padding")+n._getSize(e.target,"l");e._on("click",e.element,function(){e.target.focus()}),e._on("focus",e.target,function(){t.animate&&e.element.stop(!0,!1).animate({left:a+10,opacity:"0.5"})}),e._on("blur change",e.target,function(t,n){e.value()}),e._on("keyup keydown",e.target,function(t,n){Nui.trim(n.val())?e.element.hide():e.element.show()})},_reset:function(){var e=this;e._off(),e.element&&(e.element.remove(),e.target.unwrap()),e.target.val(e.val).removeClass(e.className),e.deftext?e.target.attr("placeholder",e.deftext):e.target.removeAttr("placeholder")},value:function(e){var t=this.constructor,n=this.target,a=t._getSize(n,"l","padding")+t._getSize(n,"l"),i=Nui.trim(arguments.length?n.val(e).val():n.val());!this.options.equal&&i===this.text||!i?(n.val(""),this.element&&this.element.show(),this.options.animate&&this.element.stop(!0,!1).animate({left:a,opacity:"1"})):this.element&&this.element.hide()}})}),Nui.define("highlight",function(){return this.extend("component",{static:{_init:function(){var e=this;Nui.doc.on("click",function(){e._active&&Nui.each(e.__instances,function(e){e._active&&(e.element.find("tr.s-crt").removeClass("s-crt"),e._active=!1)}),e._active=!1})},_getcode:function(e,t){return'<code class="'+e+'">'+t+"</code>"},_getarr:function(e,t){var n=[];return e?(Nui.each(e,function(e){var a=t.indexOf(e),i=t.substr(0,a);t=t.substr(a+e.length),n.push(i),n.push(e)}),n.push(t)):n.push(t),n},_comment:function(e){return/\/\*/.test(e)?e=e.replace(/(\/\*(.|\s)*?\*\/)/g,this._getcode("comment","$1")):/\/\//.test(e)&&(e=e.replace(/(\/\/.*)$/g,this._getcode("comment","$1"))),e}},options:{tools:{copy:!0},isLight:!0,isLine:!1,isTitle:!0},_init:function(){this._exec()},_exec:function(){var e=this,t=e._getTarget();if(t){var n=t.get(0);"SCRIPT"===n.tagName&&"text/highlight"==n.type&&(e.code=t.html().replace(/^[\r\n]+|[\r\n]+$/g,"").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e.element&&e.element.remove(),e._create(),e.options.isLight&&e._event())}},_title:"",_template:'<div class="<% className %>"><%if tools%><div class="tools"><%if tools.copy%><em class="copy">复制</em><%/if%></div><%/if%><div class="body"><table><%each list val key%><tr><%if isLine === true%><td class="line" number="<%key+1%>"><%if bsie7%><%key+1%><%/if%></td><%/if%><td class="code"><%val%></td></tr><%/each%></table></div><%if isTitle%><em class="title"><%title%></em><%/if%></div>',_create:function(){var e=this,t=e.options,n=$.extend({bsie7:Nui.bsie7,list:e._list(),title:e._title,isLine:t.isLine,tools:t.tools,isTitle:t.isTitle},e._tplData());e.element=$(e._tpl2html(n)).insertAfter(e.target)},_getCode:function(){return this.code},_list:function(){return this._getCode().split("\n")},mapping:{"click tr":"active","click .copy":"copy"},callback:{active:function(e,t){this.constructor._active=this._active=!0,t.addClass("s-crt").siblings().removeClass("s-crt"),e.stopPropagation()},copy:function(){alert("傻帽！逗你玩呢。")}}})}),Nui.define("{light}/javascript",function(){return this.extend("highlight",{_title:"js",_getCode:function(){var e=this,t=e.code,n=e.constructor,a="",i=t.match(/(\/\/.*)|(\/\*(.|\s)*?\*\/)|('[^']*')|("[^"]*")/g),r=n._getarr(i,t);return Nui.each(r,function(e){$.trim(e)&&(/^\s*\/\//.test(e)?e=n._getcode("comment",e):/^\s*\/\*/.test(e)?e=e.replace(/(.+)/g,n._getcode("comment","$1")):(e=/'|"/.test(e)?e.replace(/(.+)/g,n._getcode("string","$1")):e.replace(new RegExp("(&lt;|&gt;|;|!|%|\\|\\[|\\]|\\(|\\)|\\{|\\}|\\=|\\/|-|\\+|,|\\.|\\:|\\?|~|\\*|&)","g"),n._getcode("symbol","$1")).replace(new RegExp("(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|elseif|each|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|include|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var)(\\s+|\\<code)","g"),n._getcode("keyword","$1")+"$2").replace(/(\/code>\s*)(\d+)/g,"$1"+n._getcode("number","$2")).replace(/(\/code>\s*)?([^<>\s]+)(\s*<code)/g,"$1"+n._getcode("word","$2")+"$3"),e=n._comment(e))),a+=e}),a}})}),Nui.define("pages/components/router/script/tpls/recordVoucher",function(){return this.renders('<input type="text" placeholder="aaaaaaaaaaa" value="11" data-placeholder-options=\'{"color":"#f60", "animate":true}\' /><input type="text" placeholder="111" data-placeholder-options=\'{"color":"#f60", "animate":true, "id":"aaa"}\' /><input type="text" placeholder="222" data-placeholder-options=\'{"color":"#f60", "animate":true}\' /><input type="text" placeholder="333" data-placeholder-options=\'{"color":"#f60", "animate":true, "id":"aaa"}\' /><div class="empty">还原</div><script type="text/highlight" data-javascript-options="{id:\'b\'}">var a = 1;var b = 2;<\/script> <div class="box nui-router-back">返回</div><a id="aaa">aaaaaaaaaaa</a>')}),Nui.define("pages/components/router/script/modules/recordVoucher",["component","pages/components/router/script/tpls/recordVoucher","template","{light}/javascript","{cpns}/placeholder"],function(e,t,n,a,i){var r=this,o=r.require("events");return function(r,s,c){return{init:function(){s.html(n.render(t,c)),this.event()},event:function(){o.call(this,{element:s,mapping:{"click .empty":"empty"},callback:{a:function(){a("destroy",s,"b"),e.static.destroy(s),setTimeout(function(){a("init",s),a("set",s,{isLine:!0})},2e3)},b:function(){alert()},c:function(){return confirm("哈哈")},empty:function(){i("value",s,"","aaa")}}})}}.init()}}),Nui.define("{cpns}/router",["component"],function(e){var t={_paths:{},_alias:{},_cache:{},_cacheContent:{},_init:function(){var e=this;Nui.doc.on("click",".nui-router-back",function(){return e.back()}).on("click",".nui-router-forward",function(){return e.forward()})},_setpaths:function(e,t){this._paths[e]||(this._paths[e]=t)},_replace:function(e){return e.replace(location.protocol+"//"+location.host,"").replace(/\s+/g,"").replace(/^\#\!?/,"").replace(/^([^\/])/,"/$1").replace(/\/$/,"")},_setCache:function(){var e=this,t=e._oldhash;t&&e._wrapper&&e._cacheContent[t]&&(e._cache[t]=e._wrapper.html())},_getWrapper:function(e){return $('<div class="wrapper"></div>').appendTo(e)},_change:function(){var t=this,n=location.hash,a=t._replace(n);$.isEmptyObject(t._paths)||(t._setCache(),Nui.each(t._paths,function(i){if(a===i.path||0===a.indexOf(i.path)){var r,o=a.replace(i.path,"").replace(/^\//,""),s=t.__instances[i.id],c=s.options;o=o?o.split("/"):[];var u=c.onRender,l=u;if("object"==typeof l&&"function"==typeof l.init&&(l=l.init),"function"==typeof l&&o.length===i.params.length){if(Nui.each(i.params,function(e,t){r||(r={}),r[e]=o[t]}),!s._wrapper){c.wrapper&&!s._wrapper?s._wrapper=t._getWrapper(s.container):t._wrapper||(t._wrapper=t._getWrapper(s.container)),s._wrapper||(e("destroy",t._wrapper.off()),t._cacheContent[n]=!0);var p=s._wrapper||t._wrapper,h=t._cache[n];l.call(u,s.target,p,{path:i.path,url:a,param:r,cache:h}),e("init",p)}var p=s._wrapper||t._wrapper;return p.show().siblings(".wrapper").hide(),"function"==typeof c.onAfter&&c.onAfter(s.target,p),t._initialize=match=!0,Nui.bsie7&&t._setHistory(n),!1}}}),t._initialize||Nui.each(t.__instances,function(e){if(!t._isEntry&&!0===e.options.entry)return t._isEntry=!0,e.target&&e._render(e.target.eq(0)),t._initialize=!0,!1})),t._oldhash=n},_bindHashchange:function(){var e=this;if(Nui.bsie7){var t=function(t){var n=location.hash;return e._oldhash!==n&&!t};setInterval(function(){t()&&e._change()},100),t(!0)}else Nui.win.on("hashchange",function(){e._change()})},_$ready:null,_$fn:null,start:function(){this._initialize||this._change()},href:function(e){var t=this;if(e){var n,a;e=this._replace(e),Nui.each(this._paths,function(i,r){if(r===e||0===e.indexOf(i.path)&&(n=e.replace(i.path+"/",""))&&n.split("/").length===i.params.length)return a=t.__instances[i.id],!1}),a&&a._render(a.target,e)}else t.start()},alias:function(e){return $.extend(this._alias,e||{})},forward:function(){return history.forward(),!1},back:function(){return history.back(),!1}};return Nui.bsie7&&(t._history=[],t._setHistory=function(e){this._isHistory||(Nui.each(this._history,function(e){e.active=!1}),this._history.push({hash:e,active:!0})),this._isHistory=!1},Nui.each(["forward","back"],function(e){var n="forward"===e?1:-1;t[e]=function(){var a=this,i=a._history.length;return t._isHistory=!0,Nui.each(a._history,function(t,r){var o=r+n;if(t.active){if(-1===o||o===i)return window.history[e](),!1;var s=a._history[o];return s&&(location.hash=s.hash,s.active=!0),t.active=!1,!1}}),!1}})),this.extend(e,{static:t,options:{path:"",delegate:null,container:null,entry:!1,wrapper:!1,level:1,onBefore:null,onRender:null,onAfter:null},_init:function(){var e=this,t=e.constructor;e._exec()&&!t._bind&&(t._bind=!0,t._bindHashchange())},_exec:function(){var e=this,t=e.options,n=e.constructor,a=e._getTarget();if(e.container=n._jquery(t.container),t.path&&e.container){e.path=e._setpath(t.path);var i=e._getpath(),r=i.params.length;if((!r&&1===t.level||1!==t.level)&&n._setpaths(i.rule,i),r&&t.level>0)for(var o,s,c=[];o=i.params.shift();)c.push(o),s=c.join("/:"),n._setpaths(i.rule+"/:"+s,$.extend({},i,{params:s.split("/:")}));if(a)return e._event()}},_setpath:function(e){var t=this.constructor;return(e=Nui.trim(e))&&Nui.each(t._alias,function(t,n){e=e.replace(new RegExp("{"+n+"}","g"),t)}),t._replace(e)},_getpath:function(){var e=this,t=e.path,n=e.options,a=t.indexOf("/:"),i={id:e.__id,params:[],rule:t,path:t};return-1!==a&&(i.params=t.substr(a+2).split("/:"),i.path=t.substr(0,a),n.level>0&&(i.rule=i.path)),i},_render:function(e,t){var n=this,a=n.options,i=t||e.attr("href");if(i){var r=!1,o=function(){r=!0,location.hash="#!"+n.constructor._replace(i)};if("function"==typeof a.onBefore&&!1===a.onBefore(e,o))return!1;r||o()}},_event:function(){var e=this,t=e.options;return e._on("click",t.delegate,e.target,function(t,n){return e._render(n),!1}),e},_reset:function(){var e=this,t=e.constructor;return e._off(),Nui.each(t._paths,function(n,a){n.id===e.__id&&delete t._paths[a]}),e}})}),Nui.define("pages/components/router/script/menu",[{id:"recordVoucher",name:"录凭证",index:!0,icon:"",path:"/voucher/record/"},{id:"seeVoucher",name:"查凭证",icon:"",index:!0,path:"/voucher/list/aniu/jser/"},{name:"账簿",icon:"",subs:[{id:"summary",name:"总账",icon:"",path:"/books/summary/"},{id:"detailed",name:"明细账",icon:"",path:"/books/detailed/"},{id:"accountbalance",name:"科目余额表",icon:"",path:"/books/accountbalance/"}]}]),Nui.define("pages/components/router/script/tpls/index",function(){return this.renders('<div class="m-main ui-bgw"><h3 class="ui-bdb ui-fcb"><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run1">欢</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run2">迎</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run3">使</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run4">用</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run5">云</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run6">记</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run7">账</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run8">！</em></h3><ul><% each $list %><% if $value.index %><li><a href="javascript:void(0)" rel="<% $value.path %>" id="<% $value.id %>Index"><em><i class="iconfont ui-animate">&#xe62a;</i></em><span class="ui-animate"><% $value.name %></span></a></li><% /if %><% /each %></ul></div>')}),Nui.define("pages/components/router/script/modules/index",["pages/components/router/script/tpls/index","template","pages/components/router/script/menu"],function(e,t,n){var a=this,i=a.require("{cpns}/router"),r=a.require("events",function(e){});return a.imports("../../style/index"),function(a,o,s){o.html(t.render(e,n)),r({element:o,mapping:{"click a":"seturl"},callback:{seturl:function(e,t){i("href",t.attr("rel"))}}})}}),Nui.define("pages/components/router/script/router",["{cpns}/router"],function(e){var t=this;return function(){e("alias",{list:"/voucher/list/:nickname/:career"}),e("options",{container:".g-main",delegate:Nui.doc,level:2,onAfter:function(e){$(".m-menu-item a.s-crt").removeClass("s-crt"),e.addClass("s-crt")}}),e({target:"#index",entry:!0,path:"/index",onRender:t.require("pages/components/router/script/modules/index")}),e({target:"#recordVoucher",path:"/voucher/record",wrapper:!1,onBefore:function(e,t){return confirm("点击取消不会切换页面")&&t(),!1},onRender:t.require("pages/components/router/script/modules/recordVoucher")}),e({target:"#seeVoucher",path:"{list}",wrapper:!1,level:2,onRender:t.require("pages/components/router/script/modules/seeVoucher")}),e("start")}}),Nui.define("pages/components/router/script/tpls/layout",function(){var e=this;return{head:e.renders('<div class="f-fl m-head-main"><% var data = list[0] %><p class="f-fl name"><% data.buname %></p><p class="f-fl month"><% data.buaddress %></p></div>'),menu:e.renders('<% each menu %><dl class="m-menu-item"><dt><a href="<% $value.path || \'javascript:void(0)\' %>"<% if $value.id %> id="<% $value.id %>"<% /if %>><em><i class="iconfont"></i></em><span><% $value.name %></span>   </a></dt><% if $value.subs && $value.subs.length %><dd><% each $value.subs %><a href="<% $value.path %>"<% if $value.id %> id="<% $value.id %>"<% /if %>><span><% $value.name %></span></a><% /each %></dd><% /if %></dl><% /each %>')}}),Nui.define("pages/components/router/script/render",["pages/components/router/script/menu","pages/components/router/script/tpls/layout","template"],function(e,t,n){return function(a){$(".m-headbox").html(n.render(t.head,a)),a.menu=e,$(".m-menu").html(n.render(t.menu,a))}}),Nui.define("./script/page",function(require,imports,renders,extend){var e=this,t=require("pages/components/router/script/render"),n=require("pages/components/router/script/router"),a=require("pages/components/router/script/ajax");imports("../style/base"),imports("../style/page");a({url:"./script/data.json",success:function(e){t(e),n()}}),e.exports=function(){}});
//# sourceMappingURL=page-min.js.map