Nui.define("./menu",[{name:"凭证",icon:"",subs:[{name:"录凭证",icon:"",path:""},{name:"查凭证",icon:"",path:""}]},{name:"账簿",icon:"",subs:[{name:"总账",icon:"",path:""},{name:"明细账",icon:"",path:""},{name:"科目余额表",icon:"",path:""}]}]),Nui.define("./head",{result:"success",data:{username:"阿牛の喵呜",date:"2017年3月"}}),Nui.define("./index",["./head","./menu","template"],function(e,t,a){var n=this;"success"===e.result&&($(".name").text(e.data.username),$(".month").text(e.data.date));var r=a.render(n.renders('<% each $list %><dl class="m-menu-item"><dt><a href="<% $value.path || \'javascript:void(0)\' %>"><em><i class="iconfont"><% $value.icon %></i></em><span><% $value.name %></span>   </a></dt><% if $value.subs && $value.subs.length %><dd><% each $value.subs val %><a href="<% val.path || \'javascript:void(0)\' %>"><span><% val.name %></span></a><% /each %></dd><% /if %></dl><% /each %>'),t);$(".m-menu").html(r)}),Nui.define("{cpns}/router",function(){return this.extend("component",{static:{_trigger:!1,_domain:location.protocol+"//"+location.host,_paths:{},_params:{},_alias:{},_cache:{},_cacheContainer:{},_replace:function(e){return e.replace(this._domain,"").replace(/^\#\!?/,"").replace(/^([^\/])/,"/$1").replace(/\/$/g,"")},alias:function(e){return $.extend(this._alias,e||{})},_setCache:function(e){var t=this,e=t._oldhash;e&&Nui.each(t._cacheContainer,function(a,n){if(n===e)return t._cache[e]=a.html(),!1})},_change:function(){var e=this,t=location.hash,a=e._replace(t);$.isEmptyObject(e._paths)&&$.isEmptyObject(e._params)||(e._setCache(),Nui.each([e._paths,e._params],function(n,r){var i=!1;if(Nui.each(n,function(n){if(0===r&&a===n.path||1===r&&0===a.indexOf(n.path)){var c=a.replace(n.path,"").replace(/^\//,"");if(c=c?c.split("/"):[],c.length===n.params.length){var s={};Nui.each(n.params,function(e,t){s[e]=c[t]}),e._cacheContainer[t]=n.container;var o=e._cache[t];return n.render(n.target,n.container,{path:n.path,url:a,param:s,cache:o}),e._trigger=i=!0,!1}}}),i)return!1}),e._trigger||Nui.each(e._instances,function(t){if(!0===t.options.enter)return t.target.eq(0).trigger("click"),e._trigger=!0,!1})),e._oldhash=t},_bindHashchange:function(){var e=this;if(Nui.bsie7){var t=function(t){var a=location.hash;return e._oldhash!==a&&!t};setInterval(function(){t()&&e._change()},100),t(!0)}else Nui.win.on("hashchange",function(){e._change()})},trigger:function(){this._trigger||this._change()},$ready:null},options:{path:"",container:null,enter:!1,onBefore:null,onRender:null},_init:function(){var e=this,t=e.constructor;e._exec()&&!t._bind&&(t._bind=!0,t._bindHashchange())},_exec:function(){var e=this,t=e.options,a=e.constructor;if(e.path=e._setpath(t.path),e.target=e._getTarget(),e.container=$(t.container),t.path&&e.target){var n=e._getpath();if(n.params.length){var r=[];Nui.each(n.params,function(e){r.push(e);var t=r.join("/:");a._params[n.path+"/:"+t]=$.extend({},n,{params:t.split("/:")})}),a._params[e.path]=n}else a._paths[e.path]=n;return e._event()}},_setpath:function(e){var t=this.constructor;return(e=Nui.trim(e))&&Nui.each(t._alias,function(t,a){e=e.replace(new RegExp("{"+a+"}","g"),t)}),t._replace(e)},_getpath:function(){var e=this,t=e.path,a=e.options,n=t.indexOf("/:"),r={target:e.target,container:e.container,params:[]};return-1!==n?(r.params=t.substr(n+2).split("/:"),r.path=t.substr(0,n)):r.path=t,r.render="function"==typeof a.onRender?a.onRender:$.noop,r},_sethash:function(e){location.hash="#!"+this.constructor._replace(e)},_event:function(){var e=this,t=e.options;return e._on("click",e.target,function(a,n){var r=function(){e._sethash(n.attr("href"))};return("function"!=typeof t.onBefore||!1!==t.onBefore(n,r))&&(r(),!1)}),e},_reset:function(){var e=this,t=e.constructor;return e._off(),delete t._paths[e.path],delete t._params[e.path],e}})}),Nui.define("./script/page",["{cpns}/router"],function(e){var t=this;t.imports("../style/base"),t.imports("../style/index"),t.require("./index")});