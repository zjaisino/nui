/**
 * @author Aniu[2017-02-27 23:46]
 * @update Aniu[2017-02-27 23:46]
 * @version 1.0.1
 * @description 路由
 */

Nui.define(function(){
    return this.extend('component', {
        static:{
            _running:false,
            _domain:location.protocol+'//'+location.host,
            _paths:{},
            _params:{},
            _alias:{},
            _cache:{},
            _cacheContainer:{},
            _replace:function(hash){
                return hash.replace(this._domain, '').replace(/^\#\!?/, '').replace(/^([^\/])/, '/$1').replace(/\/$/g, '')
            },
            alias:function(val){
                return $.extend(this._alias, val||{})
            },
            _setCache:function(hash){
                var that = this, hash = that._oldhash, container;
                if(hash){
                    if(container = that._cacheContainer[hash]){
                        that._cache[hash] = container.html();
                    }
                }
            },
            _change:function(){
                var that = this, _hash = location.hash, hash = that._replace(_hash);
                if(!$.isEmptyObject(that._paths) || !$.isEmptyObject(that._params)){
                    that._setCache();
                    Nui.each([that._paths, that._params], function(val, key){
                        var match = false;
                        Nui.each(val, function(v){
                            if((key === 0 && hash === v.path) || (key === 1 && hash.indexOf(v.path) === 0)){
                                var params = hash.replace(v.path, '').replace(/^\//, '');
                                params = params ? params.split('/') : [];
                                if(params.length === v.params.length){
                                    var param;
                                    Nui.each(v.params, function(val, key){
                                        if(!param){
                                            param = {};
                                        }
                                        param[val] = params[key]
                                    })
                                    that._cacheContainer[_hash] = v.container;
                                    var cache = that._cache[_hash];
                                    v.render(v.target.length ? v.target : $(v.target.selector), v.container, {
                                        path:v.path,
                                        url:hash,
                                        param:param,
                                        cache:cache
                                    })
                                    that._running = match = true;
                                    return false
                                }
                            }
                        })
                        if(match){
                            return false
                        }
                    })
                    if(!that._running){
                        Nui.each(that._instances, function(v){
                            if(!that._hasEnter && v.options.enter === true){
                                that._hasEnter = true;
                                v.target.eq(0).trigger('click');
                                that._running = true;
                                return false
                            }
                        })
                    }
                }
                that._oldhash = _hash;
            },
            _bindHashchange:function(){
                var that = this;
                if(Nui.bsie7){
                    var hashchange = function(ret){
                        var hash = location.hash;
                        if(that._oldhash !== hash){
                            return !ret
                        }
                        return false
                    }
                    setInterval(function(){
                        if(hashchange()){
                            that._change()
                        }
                    }, 100);
                    hashchange(true)
                }
                else{
                    Nui.win.on('hashchange', function(){
                        that._change()
                    })
                }
            },
            run:function(){
                if(!this._running){
                    this._change();
                }
            },
            $ready:null
        },
        options:{
            path:null,
            container:null,
            enter:false,
            splitLevel:1,
            onBefore:null,
            onRender:null
        },
        _init:function(){
            var that = this, router = that.constructor;
            if(that._exec() && !router._bind){
                router._bind = true;
                router._bindHashchange();
            }
        },
        _exec:function(){
            var that = this, opts = that.options, router = that.constructor, target = that._getTarget();
            if(opts.path && target){
                that.path = that._setpath(opts.path);
                that.container = that._jquery(opts.container);
                var paths = that._getpath();
                if(paths.params.length){
                    if(!opts.splitLevel){
                        router._params[that.path] = paths
                    }
                    else{
                        if(opts.splitLevel <= 2){
                            var params = [], split = '/:', param, sub;
                            while(param = paths.params.shift()){
                                params.push(param);
                                subs = params.join(split);
                                router._params[paths.path+split+subs] = $.extend({}, paths, {
                                    params:subs.split(split)
                                })
                            }
                        }
                        if(opts.splitLevel === 2){
                            router._paths[paths.path] = paths
                        }
                    }
                }
                else{
                    router._paths[that.path] = paths
                }
                return that._event()
            }
        },
        _setpath:function(path){
            var router = this.constructor;
            if(path = Nui.trim(path)){
                Nui.each(router._alias, function(val, key){
                    path = path.replace(new RegExp('{'+ key +'}', 'g'), val)
                })
            }
            return router._replace(path)
        },
        _getpath:function(){
            var that = this, path = that.path, opts = that.options, index = path.indexOf('/:');
            var paths = {
                target:that.target,
                container:that.container,
                params:[]
            }
            if(index !== -1){
                paths.params = path.substr(index+2).split('/:');
                paths.path = path.substr(0, index);
            }
            else{
                paths.path = path
            }
            paths.render = typeof opts.onRender === 'function' ? opts.onRender : $.noop
            return paths
        },
        _sethash:function(hash){
            location.hash = '#!'+this.constructor._replace(hash);
        },
        _event:function(){
            var that = this, opts = that.options;
            that._on('click', Nui.doc, that.target, function(e, elem){
                var callback = function(){
                    that._sethash(elem.attr('href'));
                }
                if(typeof opts.onBefore === 'function' && opts.onBefore(elem, callback) === false){
                    return false
                }
                callback();
                return false
            })
            return that
        },
        _reset:function(){
            var that = this, router = that.constructor;
            that._off();
            delete router._paths[that.path];
            delete router._params[that.path];
            return that
        }
    })
})
