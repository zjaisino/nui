/**
 * @author Aniu[2016-11-10 22:39]
 * @update Aniu[2016-11-10 22:39]
 * @version 1.0.1
 * @description NUI框架核心
 */

;!(function(window, document, undefined){
    if(window.Nui){
        return
    }

    var Nui = window.Nui = {
        // Nui.type('nui', 'String') => true
        // Nui.type(['nui'], ['Object', 'Array']) => true
        type:function(obj, type){
            if(obj === null || obj === undefined){
                return false
            }
            if(isArray(type)){
                var ret = false;
                Nui.each(type, function(v){
                    if(isType(v)(obj)){
                        ret = true;
                        return false
                    }
                })
                return ret
            }
            return isType(type)(obj)
        },
        each:function(obj, callback){
            var i;
            if(isArray(obj)){
                var len = obj.length;
                for(i=0; i<len; i++){
                    if(callback(obj[i], i) === false){
                        break;
                    }
                }
            }
            else{
                for(i in obj){
                    if(callback(obj[i], i) === false){
                        break;
                    }
                }
            }
        },
        //jquery1.9之后就移除了该方法，以插件形式存在
        browser:(function(){
            var ua = navigator.userAgent.toLowerCase();
            var match = /(edge)[ \/]([\w.]+)/.exec(ua) ||
                        /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                        /(msie) ([\w.]+)/.exec(ua) ||
                        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            var browser = match[1] || '';
            var version = match[2] || '0';
            var ret = {}

            //IE11会伪装成firefox
            if(browser === 'mozilla' && /trident/.test(ua)){
                browser = 'msie';
                version = '11.0'
            }
            if(browser){
                ret[browser] = true;
                ret.version = version
            }
            if(ret.chrome || ret.edge){
                ret.webkit = true
            }
            else if(ret.webkit){
                ret.safari = true
            }
            return ret
        })()
    }

    var isType = function(type){
        return function(obj){
            return {}.toString.call(obj) === '[object ' + type + ']'
        }
    }

    var isArray = Nui.isArray = Array.isArray || isType('Array');

    Nui.each({
        trim:/^\s+|\s+$/g,
        trimLeft:/^\s+/g,
        trimRight:/\s+$/g
    }, function(v, k){
        Nui[k] = (function(){
            if(!String.prototype[k]){
                return function(str){
                    return str.replace(v, '')
                }
            }
            return function(str){
                return str[k]()
            }
        })()
    })

    var noop = function(){}

    Nui.bsie6 = Nui.browser.msie && Nui.browser.version <= 6;
    Nui.bsie7 = Nui.browser.msie && Nui.browser.version <= 7;

    // unique(['1', '2', '1']) => ['1', '2']
    var unique = function(arr){
        var newarr = [];
        var temp = {};
        Nui.each(arr, function(val){
            if(!temp[val]){
                temp[val] = true
                newarr.push(val)
            }
        })
        return newarr
    }

    var extend = function(){
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if(typeof target === 'boolean'){
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if(typeof target !== 'object' && !Nui.type(target, 'Function')){
            target = {};
        }
        if(length === i){
            target = {};
            --i;
        }
        for( ; i < length; i++){
            if((options = arguments[i]) != null){
                for(name in options){
                    src = target[name];
                    copy = options[name];
                    if(target === copy){
                        continue;
                    }
                    if(deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        }
                        else{
                            clone = src && isObject(src) ? src : {};
                        }
                        target[name] = extend(deep, clone, copy);
                    }
                    else if(copy !== undefined){
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }

    var isObject = function(obj){
        if(!obj || !Nui.type(obj, 'Object') || obj.nodeType || (obj[0] && obj[0].nodeType)){
            return false;
        }
        return true
    }

    var isEmptyObject = function(obj){
        var name;
        for(name in obj){
            return false;
        }
        return true;
    }

    var domain = location.protocol+'//'+location.host;
    //获取当前页面的uri
    var getPath = function(){
        var url = (domain+location.pathname).replace(/\\/g, '/');
        var index =  url.lastIndexOf('/');
        return url.substr(0, index+1);
    }

    var dirname = getPath();

    var getModuleid = function(){
        ++mid;
        return '_module_'+mid
    }

    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

    var support = 'onload' in document.createElement('script');

    var mid = 0;

    var moduleData;

    var cacheModules = {};

    var cacheStyles = {};

    var rootModules = {};

    var components = {};

    var config = {
        skin:null,
        paths:{},
        alias:{},
        maps:{}
    }

    //------- 修复个别浏览器兼容性问题 begin --------

    //讲道理说，文件在被加载完毕后会立即执行define方法，在onload(onreadystatechange IE9-)事件中得到moduleData，这个过程是同步的
    //但是在IE9-中，高概率出现不同步情况，就是在onreadystatechange事件中得到moduleData值不是当前文件数据，原因在于执行onload时，其它模块刚好被加载，被重新赋值了
    //IE9-中文件被加载会有5个状态 uninitialized > loading > loaded > interactive > complete
    //脚本被执行时可以通过dom节点获取到node.readyState值为interactive，而该节点一定是当前加载的脚本节点
    //小概率出现节点被添加到dom后会立即执行define，可能是由于IE的缓存原因
    var currentlyAddingScript;
    if(Nui.browser.msie && Nui.browser.version <= 9){
        var interactiveScript;
        var getCurrentScript = function(){
            if(currentlyAddingScript){
                return currentlyAddingScript
            }
            if(interactiveScript && interactiveScript.readyState === 'interactive'){
                return interactiveScript
            }
            Nui.each(head.getElementsByTagName('script'), function(script){
                if(script.readyState === 'interactive'){
                    interactiveScript = script
                    return false
                }
            })
            return interactiveScript
        }
    }

    //防止不支持该对象的浏览器报错
    window.console = window.console || {
        log:noop,
        debug:noop,
        error:noop,
        info:noop
    }

    //防止IE6-IE7鼠标hover以及position:fixed时背景图片闪烁
    if(Nui.bsie7){
        document.execCommand('BackgroundImageCache', false, true);
    }

    //常用jq对象
    if(typeof jQuery !== 'undefined'){
        Nui.win = jQuery(window);
        Nui.doc = jQuery(document);
    }

    //------- 修复end -------

    var Module = function(attrs, deps){
        var mod = this;
        //define实参中依赖模块名
        mod.deps = deps||[];
        //所有依赖模块名
        mod.alldeps = mod.deps;
        //所有依赖模块
        mod.depmodules = {};
        //模块唯一id
        mod.id = attrs[0];
        //模块名
        mod.name = attrs[1];
        //文件参数
        mod.version = '';
        //文件后缀 -min
        mod.suffix = attrs[2];
        //所在目录
        mod.uri = mod.id.substr(0, mod.id.lastIndexOf('/')+1);
    }

    //动态加载模块
    Module.prototype.load = function(){
        var mod = this;
        if(!mod.loaded && mod.name !== '_module_'+mid){
            if(!mod.url){
                var node = document.createElement('script');
                mod.url = mod.id+mod.suffix+'.js'+mod.version;
                node.src = mod.url;
                node.async = true;
                node.id = mod.id;
                currentlyAddingScript = node;
                head.appendChild(node);
                currentlyAddingScript = null;
                if(support){
                    node.onload = node.onerror = mod.onload(node)
                }
                else{
                    //ie6/7/8
                    node.onreadystatechange = function(){
                        if(/loaded|complete/.test(node.readyState)){
                            mod.onload(node)()
                        }
                    }
                }
            }
            return mod.resolve()
        }
        else{
            return mod.onload()
        }
    }

    //动态加载css
    Module.prototype.loadcss = function(){
        var mod = this;
        if(mod.styles && mod.styles.length){
            Nui.each(mod.styles, function(val){
                var path = Module.getAttrs(val, mod.uri)[0];
                if(!cacheStyles[path]){
                    cacheStyles[path] = true;
                    var node = document.createElement('link');
                    path = path+'.css'+mod.version;
                    node.rel = 'stylesheet';
                    node.href = path;
                    head.appendChild(node);
                }
            })
        }
        return mod;
    }

    //加载模块依赖
    Module.prototype.resolve = function(){
        var mod = this;
        if(mod.alldeps.length && isEmptyObject(mod.depmodules)){
            Nui.each(mod.alldeps, function(val){
                var module = Module.getModule(val, [], mod.uri);
                module.version = mod.version;
                mod.depmodules[val] = module.loaded ? module : module.load()
            })
        }
        return mod
    }

    //因为无法知晓最后一个依赖模块，所以只要任意模块被加载完毕，就会从入口模块遍历所有依赖，当全部依赖都被加载时执行回调
    Module.prototype.onload = function(node){
        var mod = this;
        if(node){
            return (function(){
                moduleData = node.moduleData || moduleData;
                node.onload = node.onerror = node.onreadystatechange = null;
                head.removeChild(node);
                node = null;
                mod.loaded = true;
                if(moduleData){
                    Nui.each(moduleData, function(val, key){
                        val && (mod[key] = val)
                    })
                    moduleData = null;
                }
                return mod.resolve().rootCallback()
            })
        }
        else{
            mod.loaded = true;
            return mod.resolve().rootCallback()
        }
    }

    //获取入口模块的所有依赖模块id，若依赖全部被加载则执行回调
    Module.prototype.rootCallback = function(){
        Nui.each(rootModules, function(root, name){
            var data = root.getData();
            var ids = unique(data.ids);
            if(data.loaded && root.callback){
                root.callback(ids)
            }
        })
        return this
    }

    //获取模块所有依赖的id，以及依赖是否被加载完毕
    Module.prototype.getData = function(data){
        if(!data){
            data = {
                ids:[],
                loaded:true
            }
        }
        data.ids.unshift(this.id);
        if(!this.loaded){
            data.loaded = false
        }
        if(this.alldeps.length){
            Nui.each(this.depmodules, function(val){
                data = val.getData(data)
            })
        }
        return data
    }

    //设置工厂函数内部方法
    Module.prototype.setFactory = function(){
        var mod = this;
        var factory = mod.factory;

        //导入模块
        factory.require = function(id, callback){
            var _mod = mod.depmodules[id];
            if(_mod){
                if(typeof callback === 'function'){
                    callback(_mod.module)
                }
                return _mod.module
            }
        }

        //继承模块
        factory.extend = function(module, members, inserts){
            var exports;

            if(!module){
                return
            }

            if(typeof module === 'string'){
                var _mod = factory.require(module);
                if(_mod === undefined){
                    return module
                }
                module = _mod
            }

            if(isArray(module)){
                exports = extend(true, [], module)
                if(inserts === true){
                    if(!isArray(members)){
                        exports.push(members)
                    }
                    else{
                        exports = exports.concat(members)
                    }
                }
            }
            else if(Nui.type(module, 'Function')){
                if(module.exports){
                    exports = extend(true, {}, module.exports, members);
                    exports.static.__parent = new Module.Class.parent(module)
                }
                else{
                    exports = extend(true, noop, module, members)
                }
            }
            else if(Nui.type(module, 'Object')){
                exports = extend(true, {}, module, members)
            }
            else{
                exports = module
            }

            if(isArray(inserts) && Nui.type(exports, ['Object', 'Function'])){
                Nui.each(inserts, function(val){
                    if(val.method && val.content){
                        var arr = val.method.split('->');
                        var lastkey = arr[arr.length-1];
                        var object, key;
                        while(key = arr.shift()){
                            object = object || exports;
                            if(key === lastkey){
                                break;
                            }
                            object = object[key]
                        }
                        var func = object[lastkey];
                        if(Nui.type(func, 'Function')){
                            var code = func.toString().replace(/(\})$/, ';'+val.content+'$1');
                            func = new Function('return '+code);
                            object[lastkey] = func();
                        }
                    }
                })
            }

            return exports
        }

        //导入样式
        factory.imports = noop;

        //渲染字符串
        factory.renders = function(tpl){
            return tpl
        }

        //导出接口
        factory.exports = {};

        return factory
    }

    //调用工厂函数，获取模块导出接口
    Module.prototype.exec = function(){
        var mod = this;
        if(!mod.module && typeof mod.factory === 'function'){
            var factory = mod.setFactory(), modules;
            if(mod.deps.length){
                //设置工厂函数形参，也就是依赖模块的引用
                modules = [];
                Nui.each(mod.deps, function(val){
                    modules.push(factory.require(val))
                })
            }
            else{
                //将工厂函数的内部方法作为参数传递，方便调用
                modules = [factory.require, factory.imports, factory.renders, factory.extend]
            }
            var exports = factory.apply(factory, modules);
            //优先使用return接口
            if(typeof exports === 'undefined'){
                exports = factory.exports
            }
            
            if(mod.name === 'component' || (exports.static && exports.static.__parent instanceof Module.Class.parent)){
                var obj = {
                    statics:{},
                    propertys:{},
                    methods:{},
                    apis:{init:true}
                }

                if(config.skin && typeof config.skin === 'string'){
                    exports.options.skin = config.skin
                }

                Nui.each(exports, function(val, key){
                    //静态属性以及方法
                    if(key === 'static'){
                        obj['statics'] = val
                    }
                    //实例方法
                    else if(typeof val === 'function'){
                        obj.methods[key] = val;
                        if(!/^_/.test(key)){
                            obj.apis[key] = true
                        }
                    }
                    //实例属性
                    else{
                        obj.propertys[key] = val
                    }
                })
                //文件名作为组件名
                var name = mod.name.substr(mod.name.lastIndexOf('/')+1).replace(/\W/g, '');
                if(components[name]){
                    mod.module = components[name]
                }
                else{
                    obj.statics.__component_name = name;
                    mod.module = components[name] = Module.Class(mod, obj);
                    delete exports.static.__parent;
                    mod.module.exports = exports;
                    if(mod.name !== 'component'){
                        var Class = mod.module('Class'), method;
                        Nui.each(['_$fn', '_$ready'], function(v){
                            method = Class[v];
                            if(typeof method === 'function'){
                                method.call(Class, name, mod.module)
                            }
                        })
                    }
                }
            }
            else{
                mod.module = exports;
            }
        }
        return mod
    }

    //获取正确规范的路径
    Module.replacePath = function(path){
        // a///b///c => a/b/c
        path = path.replace(/([^:])\/{2,}/g, '$1/');

        // a/b...../c => a/b../c
        path = path.replace(/\.{2,}/g, '..');

        // a/b../c => a/c
        // a/../c => c
        var replace = function(str){
            if(/([\w]+\/?)(\.\.\/)/g.test(str)){
                str = str.replace(/([\w]+\/?)(\.\.\/)/g, function(a, b, c){
                    if(a == b+c){
                        return ''
                    }
                    return a
                })
                return replace(str)
            }
            return str
        }
        path = replace(path);

        // a/b./c => a/b/c
        // a/./c => a/c
        return path.replace(/([\w]+)\/?(\.\/)+/g, '$1/')
    }

    //创建组件类
    Module.Class = function(mod, object){
        var Class = function(options){
            var that = this;
            extend(true, that, object.propertys, {
                __id:Class.__id++,
                _eventList:[]
            });
            that.options = extend(true, {}, that.options, Class._options, options||{})
            that._defaults = extend(that.options);
            Class.__instances[that.__id] = that;
            that._init()
        }
        extend(true, Class, object.statics);
        extend(true, Class.prototype, object.methods);
        Class.__setMethod(object.apis, components);
        if(typeof Class._init === 'function'){
            Class._init()
        }
        return function(){
            var args = arguments;
            var len = args.length;
            var options = args[0];
            if(typeof options === 'string'){
                if(options === 'Class'){
                    return Class
                }
                if(!/^_/.test(options)){
                    var attr = Class[options];
                    if(typeof attr === 'function'){
                        return attr.apply(Class, Array.prototype.slice.call(args, 1))
                    }
                    else if(len > 1){
                        return Class[options] = args[1]
                    }
                    return attr
                }
            }
            else{
                return new Class(options)
            }
        }
    }

    Module.Class.parent = function(module){
        this.exports = module.exports;
        this.Class = module('Class');
    }

    Module.setPath = function(id){
        var pathMatch = /\{([^\{\}]+)\}/.exec(id);
        if(pathMatch){
            var path = config.paths[pathMatch[1]];
            if(path){
                id = id.replace(pathMatch[0], path).replace(/(\.(js|css))?(\?[\s\S]*)?$/g, '');
            }
        }
        return id
    }

    Module.getAttrs = function(id, uri){
        // xxx.js?v=1.1.1 => xxx
        // xxx.css?v=1.1.1 => xxx
        var name = id.replace(/(\.(js|css))?(\?[\s\S]*)?$/g, '');
        var match = name.match(/-min$/g);
        var suffix = '';
        var dirid;
        if(match){
            name = name.replace(/-min$/g, '');
            suffix = match[0]
        }
        id = Module.setPath(config.alias[name] || name);
        if(!/^((https?|file):)?\/\//.test(id)){
            dirid = Module.replacePath(dirname + id);
            id = (uri || dirname) + id;
        }
        id = Module.replacePath(id);
        return [id, name, suffix, dirid]
    }

    Module.getModule = function(name, deps, uri){
        var attrs = Module.getAttrs(name, uri);
        var id = attrs[0];
        return cacheModules[attrs[1]] || cacheModules[id] || cacheModules[attrs[3]] || (cacheModules[id] = new Module(attrs, deps))
    }

    Module.load = function(id, callback, _module_){
        if(Nui.type(id, 'String') && Nui.trim(id)){
            //截取入口文件参数，依赖的文件加载时都会带上该参数
            var match = id.match(/(\?[\s\S]+)$/);
            var mod = Module.getModule(_module_, [id]);

            if(match){
                mod.version = match[0]
            }
            
            var depname = mod.alldeps[0];
            var version = config.maps[depname.replace(/-min$/, '')]||'';
            if(version){
                if(!/^\?/.test(version)){
                    version = '?v='+version
                }
                mod.version = version
            }

            mod.callback = function(ids){
                var _module = mod.depmodules[depname];
                var suffix = _module.suffix;
                Nui.each(ids, function(id){
                    var module = cacheModules[id].exec();
                    if(!suffix){
                        module.loadcss()
                    }
                })
                if(Nui.type(callback, 'Function')){
                    callback.call(Nui, _module.module)
                }
                delete rootModules[_module_];
                delete mod.callback
            }

            rootModules[_module_] = mod;

            mod.load()
        }
    }

    //获取工厂函数中模块的依赖
    Module.getdeps = function(str){
        var deps = [];
        var styles = [];
        var match = str.match(/(require|extend|imports)\(('|")[^'"]+\2/g);
        if(match){
            Nui.each(match, function(val){
                if(/^(require|extend)/.test(val)){
                    deps.push(val.replace(/^(require|extend)|[\('"]/g, ''))
                }
                else{
                    styles.push(val.replace(/^imports|[\('"]/g, ''))
                }

            })
        }
        return [unique(deps), unique(styles)]
    }

    Module.define = function(id, deps, factory){
        //Nui.define(function(){})
        if(Nui.type(id, 'Function')){
            factory = id;
            id = undefined;
            deps = [];
        }
        //Nui.define(['mod1', 'mod2', ..], function(){})
        //Nui.define('id', function(){})
        else if(Nui.type(deps, 'Function')){
            factory = deps;
            if(Nui.type(id, 'String')){
                deps = []
            }
            else{
                deps = id;
                id = undefined
            }
        }

        var arrs = Module.getdeps(factory.toString());
        var alldeps = deps.concat(arrs[0]);
        var styles = arrs[1];

        if(id && !cacheModules[id] && !cacheModules[Module.getAttrs(id)[0]]){
            var mod = Module.getModule(id, alldeps);
            mod.deps = deps;
            mod.styles = styles;
            mod.factory = factory;
            mod.loaded = true;
            mod.load()
        }

        moduleData = {
            name:id,
            deps:deps,
            styles:styles,
            alldeps:alldeps,
            factory:factory
        }

        if(typeof getCurrentScript !== 'undefined'){
            var script = getCurrentScript();
            if(script){
                script.moduleData = moduleData
            }
        }
    }

    Nui.load = Nui.use = function(id, callback){
        if(id && typeof id === 'string'){
            Module.load(id, callback, getModuleid())
        }
        return Nui
    }

    Nui.define = function(){
        var args = arguments;
        var len = args.length;
        var params = [];

        //Nui.define()
        //Nui.define('')
        //Nui.define([])
        //Nui.define({})
        if(!len || (len === 1 && !Nui.type(args[0], 'Function'))){
            params.push(function(){
                return args[0]
            })
        }

        //Nui.define('id', [])
        //Nui.define('id', {})
        else if((len === 2 && !Nui.type(args[1], 'Function')) || (len == 3 && !Nui.type(args[2], 'Function'))){
            params.push(args[0]);
            params.push(function(){
                return args[1]
            })
        }

        //Nui.define({}, function(){})
        else if(len === 2 && !Nui.type(args[0], ['Array', 'String']) && Nui.type(args[1], 'Function')){
            params.push(args[1])
        }

        //Nui.define('id', {}, function(){})
        //Nui.define('id', '', function(){})
        else if(len === 3 && !isArray(args[1]) && Nui.type(args[2], 'Function')){
            params.push(args[0]);
            params.push(args[2]);
        }

        //Nui.define('id', [], function(){})
        else{
            params = args
        }

        Module.define.apply(Module, params)
    }

    Nui.config = function(obj, val){
        if(Nui.type(obj, 'Object')){
            config = extend({}, config, obj);
        }
        else if(val && Nui.type(obj, 'String')){
            config[obj] = val;
            if(obj !== 'paths'){
                return
            }
        }
        else{
            return
        }
        var base = config.base || config.paths.base || '';
        if(!/^((https?|file):)?\/\//.test(base)){
            base = config.paths.base = domain+base
        }
        Nui.each(config.paths, function(v, k){
            if(k !== 'base' && !/^((https?|file):)?\/\//.test(v)){
                config.paths[k] = base+'/' + v
            }
        })
    }

})(this, document)
