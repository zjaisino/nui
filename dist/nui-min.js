!function(t,e,n){if(!t.Nui){var r=t.Nui={type:function(t,e){if(null===t||void 0===t)return!1;if(i(e)){var n=!1;return r.each(e,function(e){if(o(e)(t))return n=!0,!1}),n}return o(e)(t)},each:function(t,e){var n;if(i(t)){var r=t.length;for(n=0;n<r&&e(t[n],n)!==!1;n++);}else for(n in t)if(e(t[n],n)===!1)break},browser:function(){var t=navigator.userAgent.toLowerCase(),e=/(edge)[ \/]([\w.]+)/.exec(t)||/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],n=e[1]||"",r=e[2]||"0",o={};return"mozilla"===n&&/trident/.test(t)&&(n="msie",r="11.0"),n&&(o[n]=!0,o.version=r),o.chrome||o.edge?o.webkit=!0:o.webkit&&(o.safari=!0),o}()},o=function(t){return function(e){return{}.toString.call(e)==="[object "+t+"]"}},i=r.isArray=Array.isArray||o("Array");r.each({trim:/^\s+|\s+$/g,trimLeft:/^\s+/g,trimRight:/\s+$/g},function(t,e){r[e]=function(){return String.prototype[e]?function(t){return t[e]()}:function(e){return e.replace(t,"")}}()});var a=function(){};t.console=t.console||{log:a,debug:a,error:a,info:a},r.bsie6=r.browser.msie&&r.browser.version<=6,r.bsie7=r.browser.msie&&r.browser.version<=7,r.bsie7&&e.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery&&(r.win=jQuery(t),r.doc=jQuery(e));var u,c,s=function(t){var e=[],n={};return r.each(t,function(t){n[t]||(n[t]=!0,e.push(t))}),e},l=function(){var t,e,n,o,a,u,c=arguments[0]||{},s=1,p=arguments.length,d=!1;for("boolean"==typeof c&&(d=c,c=arguments[1]||{},s=2),"object"==typeof c||r.type(c,"Function")||(c={}),p===s&&(c={},--s);s<p;s++)if(null!=(a=arguments[s]))for(o in a)t=c[o],n=a[o],c!==n&&(d&&n&&(f(n)||(e=i(n)))?(e?(e=!1,u=t&&i(t)?t:[]):u=t&&f(t)?t:{},c[o]=l(d,u,n)):void 0!==n&&(c[o]=n));return c},f=function(t){return!(!t||!r.type(t,"Object")||t.nodeType)},p=function(t){var e;for(e in t)return!1;return!0},d=location.protocol+"//"+location.host,h=function(){var t=(d+location.pathname).replace(/\\/g,"/"),e=t.lastIndexOf("/");return t.substr(0,e+1)}(),m=function(){return"_module_"+y++},g=e.head||e.getElementsByTagName("head")[0]||e.documentElement,v="onload"in e.createElement("script"),y=0,_={},b={},$=[],x={},N={paths:{},alias:{}};if(r.browser.msie&&r.browser.version<=9)var O,w=function(){return c||(O&&"interactive"===O.readyState?O:(r.each(g.getElementsByTagName("script"),function(t){if("interactive"===t.readyState)return O=t,!1}),O))};var j=function(t,e){var n=this;n.deps=e||[],n.alldeps=n.deps,n.depmodules={},n.id=t[0],n.name=t[1],n.parameter="",n.suffix=t[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};j.prototype.load=function(){var t=this;if(t.loaded||/_module_\d+$/.test(t.id))return t.onload();var n=e.createElement("script");return t.url=t.id+t.suffix+".js"+t.parameter,n.src=t.url,n.id=t.id,c=n,g.appendChild(n),c=null,v?n.onload=n.onerror=t.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&t.onload(n)()},t.resolve()},j.prototype.resolve=function(){var t=this;return t.alldeps.length&&p(t.depmodules)&&r.each(t.alldeps,function(e){var n=j.getModule(e,[],t.uri);n.parameter=t.parameter,t.depmodules[e]=n.loaded?n:n.load()}),t},j.prototype.onload=function(t){var e=this;return t?function(){if(u=t.moduleData||u,t.onload=t.onerror=t.onreadystatechange=null,g.removeChild(t),t=null,e.loaded=!0,u)return r.each(u,function(t,n){t&&(e[n]=t)}),u=null,e.resolve().runcallback()}:(e.loaded=!0,e.resolve().runcallback())},j.prototype.runcallback=function(){var t=this,e=t.getloaded();return e&&r.each(e,function(t){t.root.callback&&t.root.callback(t.modules)}),t},j.prototype.getModules=function(t){var e=this;return t||(t=[]),t.unshift(e.id),e.alldeps.length&&r.each(e.depmodules,function(e){t=e.getModules(t)}),t},j.prototype.getloaded=function(){var t=[],e=[];r.each($,function(n){var r=s(n.getModules());e=e.concat(r),t.push({root:n,modules:r})}),e=s(e);for(var n;n=e.shift();)if(!_[n].loaded)return!1;return t},j.prototype.setFactory=function(){var t=this,e=t.factory;return e.require=function(e){var n=t.depmodules[e];if(n)return n.module},e.extend=function(t,n,o){var u;if(t){if("string"==typeof t){var c=e.require(t);if(void 0===c)return t;t=c}return i(t)?(u=l(!0,[],t),o===!0&&(i(n)?u=u.concat(n):u.push(n))):u=r.type(t,"Function")?t.exports?l(!0,{},t.exports,n):l(!0,a,t,n):r.type(t,"Object")?l(!0,{},t,n):t,i(o)&&r.type(u,["Object","Function"])&&r.each(o,function(t){if(t.method&&t.content){for(var e,n,o=t.method.split("->"),i=o[o.length-1];(n=o.shift())&&(e=e||u,n!==i);)e=e[n];var a=e[i];if(r.type(a,"Function")){var c=a.toString().replace(/(\})$/,";"+t.content+"$1");a=new Function("return "+c),e[i]=a()}}}),u}},e.imports=a,e.renders=function(t){return t},"component"===t.name&&(e.components=function(){return x}),e},j.prototype.exec=function(){var t=this;if(!t.module&&r.type(t.factory,"Function")){var e=t.setFactory(),n=[];r.each(t.deps,function(t){n.push(e.require(t))});var o=e.apply(e,n);if("component"!==t.name&&r.type(o,"Object")&&r.type(o._init,"Function")){var i={static:{},attr:{},proto:{}};r.each(o,function(t,e){"static"===e?i[e]=t:r.type(t,"Function")?i.proto[e]=t:i.attr[e]=t});var a=t.name.substr(t.name.lastIndexOf("/")+1).replace(/\{[^\{\}]+\}/g,"");x[a]?t.module=x[a]:(i.static._component_name_=a,i.static._component_attr_name_="nui_component_"+a,t.module=x[a]=j.createClass(t,i),t.module.exports=o,r.each(["$fn","$ready"],function(e){t.module(e,a,t.module)}))}else t.module=o}return t},j.prototype.loadcss=function(){var t=this;return t.styles&&t.styles.length&&r.each(t.styles,function(n){var r=j.getAttrs(n,t.uri)[0];if(!b[r]){b[r]=!0,r=r+".css"+t.parameter;var o=e.createElement("link");o.rel="stylesheet",o.href=r,g.appendChild(o)}}),t},j.replacePath=function(t){t=t.replace(/([^:])\/{2,}/g,"$1/"),t=t.replace(/\.{2,}/g,"..");var e=function(t){return/([\w]+\/?)(\.\.\/)/g.test(t)?(t=t.replace(/([\w]+\/?)(\.\.\/)/g,function(t,e,n){return t==e+n?"":t}),e(t)):t};return t=e(t),t.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},j.createClass=function(t,e){var n=function(t){var r=this;l(!0,r,e.attr,{index:n._index++,_events:[]}),r.options=l(!0,{},r.options,n._options,t||{}),r.optionsCache=l(r.options),n._instances[r.index]=r,r.static=null,r._init()};return l(!0,n,e.static),l(!0,n.prototype,e.proto),function(){var t=arguments,e=t[0];if("string"!=typeof e)return new n(e);if(0!==e.indexOf("_")){var r=n[e];return"function"==typeof r?r.apply(n,Array.prototype.slice.call(t,1)):r}}},j.setPath=function(t){var e=/\{([^\{\}]+)\}/.exec(t);if(e){var n=N.paths[e[1]];n&&(t=t.replace(e[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return t},j.getAttrs=function(t,e){var n,r=t.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),o=r.match(/(-debug|-min)$/g),i="";return o&&(r=r.replace(/(-debug|-min)$/g,""),i=o[0]),t=j.setPath(N.alias[r]||r),/^(https?|file):\/\//.test(t)||(n=j.replacePath(h+t),t=(e||h)+t),t=j.replacePath(t),[t,r,i,n]},j.getModule=function(t,e,n){var r=j.getAttrs(t,n),o=r[0];return _[r[1]]||_[o]||_[r[3]]||(_[o]=new j(r,e))},j.load=function(t,e,n){if(r.type(t,"String")&&r.trim(t)){var o=t.match(/(\?[\s\S]+)$/),i=_[j.getAttrs(t)[0]]||j.getModule(n,[t]);o&&(i.parameter=o[0]),$.push(i),i.callback=function(t){var o=i,a=i.suffix;i.name===n&&r.each(i.depmodules,function(t){o=t,a=t.suffix}),r.each(t,function(t){var e=_[t].exec();a||e.loadcss()}),r.type(e,"Function")&&e.call(r,o.module),delete i.callback},i.load()}},j.getdeps=function(t){var e=[],n=[],o=t.match(/(require|extend|imports)\(('|")[^'"]+\2/g);return o&&r.each(o,function(t){/^(require|extend)/.test(t)?e.push(t.replace(/^(require|extend)|[\('"]/g,"")):n.push(t.replace(/^imports|[\('"]/g,""))}),[s(e),s(n)]},j.define=function(t,e,n){r.type(t,"Function")?(n=t,t=void 0,e=[]):r.type(e,"Function")&&(n=e,r.type(t,"String")?e=[]:(e=t,t=void 0));var o=j.getdeps(n.toString()),i=e.concat(o[0]),a=o[1];if(t&&!_[t]&&!_[j.getAttrs(t)[0]]){var c=j.getModule(t,i);c.deps=e,c.styles=a,c.factory=n,c.loaded=!0,c.load()}if(u={name:t,deps:e,styles:a,alldeps:i,factory:n},void 0!==w){var s=w();s&&(s.moduleData=u)}},r.load=function(t,e){return j.load(t,e,m()),r},r.define=function(){var t=arguments,e=t.length,n=[];!e||1===e&&!r.type(t[0],"Function")?n.push(function(){return t[0]}):2===e&&!r.type(t[1],"Function")||3==e&&!r.type(t[2],"Function")?(n.push(t[0]),n.push(function(){return t[1]})):2===e&&!r.type(t[0],["Array","String"])&&r.type(t[1],"Function")?n.push(t[1]):3===e&&!i(t[1])&&r.type(t[2],"Function")?(n.push(t[0]),n.push(t[2])):n=t,j.define.apply(j,n)},r.config=function(t,e){r.type(t,"Object")?l(!0,N,t):r.type(t,"String")&&e&&l(!0,N[t],e);var n=N.paths.base||"";/^(https?|file):\/\//.test(n)||(n=N.paths.base=d+n),r.each(N.paths,function(t,e){"base"===e||/^(https?|file):\/\//.test(t)||(N.paths[e]=n+"/"+t)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(t,e){var n=decodeURI(e||location.href),r={};if(startIndex=n.indexOf("?"),startIndex++>0){var o,i=n.substr(startIndex).split("&");Nui.each(i,function(t){o=t.split("="),r[o[0]]=o[1]})}return"string"==typeof t&&t&&(r=void 0!==(o=r[t])?o:""),r},setParam:function(t,e,n){var r;if(Nui.type(t,"Object"))r=e||location.href,Nui.each(t,function(t,e){t&&(Nui.type(t,"Object")&&(t=tools.getJSON(t)),r=tools.setParam(e,t,r))});else if(r=n||location.href,r.indexOf("?")===-1&&(r+="?"),Nui.type(e,"Object")&&(e=tools.getJSON(e)),r.indexOf(t+"=")!==-1){var o=new RegExp("("+t+"=)[^&]*");r=r.replace(o,"$1"+e)}else{var i="";r.indexOf("=")!==-1&&(i="&"),r+=i+t+"="+e}return r},supportCss3:function(t){var e,n=["webkit","Moz","ms","o"],r=[],o=document.documentElement.style,i=function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})};for(e in n)r.push(i(n[e]+"-"+t));r.push(i(t));for(e in r)if(r[e]in o)return!0;return!1},supportHtml5:function(t,e){return t in document.createElement(e)},jumpUrl:function(t,e){t&&$('<a href="'+t+'"'+(e?'target="'+(e||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(t,e){if(t=parseInt(t)){if(!e)return t;var n=new Date(t),r={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return e=e.replace(/([yMdhms])+/g,function(t,e){var o=r[e];return void 0!==o?(t.length>1&&(o="0"+o,o=o.substr(o.length-2)),o):"y"===e?(n.getFullYear()+"").substr(4-t.length):t})}return"-"},getJSON:function(t){if("undefined"!=typeof JSON){var e=JSON.stringify(t);return Nui.browser.msie&&"8.0"==Nui.browser.version?e.replace(/\\u([0-9a-fA-F]{2,4})/g,function(t,e){return String.fromCharCode(parseInt(e,16))}):e}if(Nui.isArray(t)){var n=[];return Nui.each(t,function(t){n.push(tools.getJSON(t))}),"["+n.join(",")+"]"}if(Nui.type(t,"Object")){var r=[];return Nui.each(t,function(t,e){r.push('"'+e+'":'+tools.getJSON(t))}),"{"+r.join(",")+"}"}return'"'+t+'"'},getData:function(t){var e={result:{},total:0,voidTotal:0},n=t.serializeArray(),r=n.length,o=0;for(o;o<r;o++){var i=$.trim(n[o].value);e.all++,i||e.voidTotal++,e.result[n[o].name]=i}return e}}),Nui.define("template",["util"],function(t){var e=function(t,e,r){if(this.tplid=t){if(n[t])return f.call(this,n[t],e,r);var o=document.getElementById(t);if(o&&"SCRIPT"===o.nodeName&&"text/html"===o.type)return f.call(this,n[t]=o.innerHTML,e,r)}return""},n={},r={openTag:"<%",closeTag:"%>"},o={trim:Nui.trim,formatDate:t.formatDate,setParam:t.setParam},i=!!"".trim,a=";$that.out = function(){return $that.code";a=(i?'""'+a:"[]"+a+'.join("")')+"}";var u=function(t){return i?t?function(t){return"$that.code += "+t+";"}:function(t,e){return t+=e}:t?function(t){return"$that.code.push("+t+");"}:function(t,e){return t.push(e),t}},c=u(!0),s=u(),l=function(t,n,r,o){var i=this,a=n.replace(/([^\s])/g,"\\$1"),u=r.replace(/([^\s])/g,"\\$1");return t.replace(new RegExp(a+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+u,"g"),function(t,n){if(n){var r=i[n];return"function"==typeof r&&(r=r()),"string"==typeof r?f.call(i,r,null,o):e(n,null,o)}return""})},f=function(t,e,n){var u=this;if("string"==typeof t){n=n||{};var c=n.openTag||r.openTag,f=n.closeTag||r.closeTag;if(t=l.call(u,t,c,f),e&&"object"==typeof e){Nui.isArray(e)&&(e={$list:e});var h=i?"":[];Nui.each(t.split(c),function(t,e){t=t.split(f),e>=1?h=s(h,d(Nui.trim(t[0]),!0)):t[1]=t[0],h=s(h,d(t[1].replace(/'/g,"\\'").replace(/"/g,'\\"')))});var m=i?"":[];Nui.each(e,function(t,e){m=s(m,e+"=$data."+e+",")}),i||(h=h.join(""),m=m.join("")),h="var "+m+"$that=this; $that.line=4; $that.code="+a+";\ntry{\n"+h+";}\ncatch(e){\n$that.error(e, $that.line)\n};";try{var g=new Function("$data",h);g.prototype.methods=o,g.prototype.error=p(h,e,u.tplid),t=new g(e).out(),g=null}catch(t){p(h,e,u.tplid)(t)}}return t}return""},p=function(t,e,n){return function(r,o){var i="\n",a=[];t="function anonymous($data){\n"+t+"\n}",t=t.split("\n"),Nui.each(t,function(t,e){a.push(e+1+"      "+t.replace("$that.line++;",""))}),i+="code\n",i+=a.join("\n")+"\n\n",void 0!==typeof JSON&&(i+="data\n",i+=JSON.stringify(e)+"\n\n"),n&&(i+="templateid\n",i+=n+"\n\n"),o&&(i+="line\n",i+=o+"\n\n"),i+="message\n",i+=r.message,console.error(i)}},d=function(t,e){if(!t)return"";var n;return(e?void 0!==(n=h(t,"if"))?"if("+n+"){":void 0!==(n=h(t,"elseif"))?"\n}\nelse if("+n+"){":"else"===t?"\n}\nelse{":"/if"===t?"}":void 0!==(n=h(t,"each ",/\s+/))?"Nui.each("+n[0]+", function("+(n[1]||"$value")+","+(n[2]||"$index")+"){":"/each"===t?"});":void 0!==(n=h(t," | ",/\s*,\s*/))?c("$that.methods."+n[0]+"("+n.slice(1).toString()+")"):0===t.indexOf("var ")?t+";":c(t):c("'"+t+"'"))+"\n$that.line++;"},h=function(t,e,n){var r;if(0===t.indexOf(e)?r="":" | "===e&&t.indexOf(e)>0&&(r=","),void 0!==r)return t=Nui.trimLeft(t.replace(e,r)),n?t.split(n):t};return e.method=function(t,e){o[t]||(o[t]=e)},e.config=function(){var t=arguments;Nui.type(t[0],"Object")?Nui.each(t[0],function(t,e){r[e]=t}):t.length>1&&"string"==typeof t[0]&&(r[t[0]]=t[1])},e.render=f,e}),Nui.define("component",["template"],function(tpl){var module=this,getOptions=function(name,elem){var options=elem.data(name+"Options");if(options)return"string"==typeof options&&(options=eval("("+options+")")),options},statics={_index:0,_instances:{},_options:{},_getSize:function(t,e,n){var r=0;if(n=n||"border",e=e||"tb","all"===n)return this._getSize(t,e)+this._getSize(t,e,"padding");var o={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},i=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:o},{margin:o}];return Nui.each(i,function(o){o[n]&&Nui.each(o[n][e],function(e){var o=parseInt(t.css(n+e));r+=isNaN(o)?0:o})}),r},$fn:function(t,e){$.fn[t]||($.fn[t]=function(){var n=arguments,r=n[0];return this.each(function(){if("string"!=typeof r)Nui.type(r,"Object")?r.target=this:r={target:this},e(r);else if(r){var o=this.nui[t];if(0!==r.indexOf("_"))if("options"===r)o.set(n[1],n[2]);else{var i=o[r];"function"==typeof i&&i.apply(o,Array.prototype.slice.call(n,1))}}})})},$ready:function(t,e){var n=$.fn[t];Nui.doc.find("[data-"+t+"-options]").each(function(r,o){var i=$(o);options=getOptions(t,i),n?i[t](options):e(options)})},options:function(t,e){Nui.type(t,"Object")?$.extend(!0,this._options,t):Nui.type(t,"String")&&(this._options[t]=e)}};return Nui.each(["init","set","reset","destroy"],function(t){statics[t]=function(){var e=this,n=arguments,r=n[0],o=e._component_name_;o?r&&r.selector?"init"===t?r.find("[data-"+o+"-options]").each(function(){var t=$(this);t[o]&&t[o](getOptions(o,t))}):r.find("[nui_component_"+o+"]").each(function(){var e;this.nui&&(e=this.nui[o])&&e[t]&&e[t].apply(e,Array.prototype.slice.call(n,1))}):Nui.each(e._instances,function(e){e[t].apply(e,n)}):(Array.prototype.unshift.call(n,t),Nui.each(module.components(),function(t){t.apply(t,n)}))}}),{static:statics,options:{target:null,theme:""},_init:$.noop,_exec:$.noop,_jquery:function(t){return"string"==typeof t||void 0===t.selector?$(t):t},_getTarget:function(){var t=this;if(!t.target){var e=t.options.target,n=t.constructor;if(!e)return null;e=t._jquery(e),t.target=e.attr(n._component_attr_name_,""),t.target.each(function(){this.nui||(this.nui={}),this.nui[n._component_name_]=t})}return t.target},_on:function(t,e,n,r,o){var i=this;"function"==typeof n&&(o=r,r=n,n=e,e=null,"string"==typeof n&&(n=$(n)));var a=function(t){return r.call(this,t,$(this))};return e?("string"!=typeof n&&(n=n.selector),e.on(t,n,a),o&&e.find(n).trigger(t)):(n.on(t,a),o&&n.trigger(t)),i._events.push({dalegate:e,selector:n,type:t,callback:a}),i},_off:function(){var t=this,e=t._events;return Nui.each(e,function(t,n){t.dalegate?t.dalegate.off(t.type,t.selector,t.callback):t.selector.off(t.type,t.callback),e[n]=null,delete e[n]}),t._events=[],t},_delete:function(){var t=this,e=t.constructor;t.target.removeAttr(e._component_attr_name_).each(function(){this.nui&&(this.nui[e._component_name_]=null,delete this.nui[e._component_name_])}),e._instances[t.index]=null,delete e._instances[t.index]},_reset:function(){var t=this;return t._off(),t.element&&t.element.remove(),t},_tpl2html:function(t,e){return tpl.render.call(this,t,e,{openTag:"<%",closeTag:"%>"})},set:function(t,e){var n=this;return n._reset(),(t||e)&&($.isPlainObject(t)?n.options=$.extend(!0,n.options,t):n.options[t]=e,n._exec()),n},get:function(t){var e=this;return t?e.options[t]:e.options},reset:function(){return this.set(that.optionsCache)},destroy:function(){var t=this;t._reset(),t._delete()}}});