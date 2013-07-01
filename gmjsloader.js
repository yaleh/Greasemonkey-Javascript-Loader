// http://www.json.org/json2.js is required

var GMJSLoader = new(function() {
	var callback_funcs={};
	var loaded_js={};
	
	// innerHTMl is opitonal
	this.loadJS = function(url, innerHTML){
		if(url && loaded_js[url]){
			return;
		}
		var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.innerHTML = innerHTML;
        if(url)
        	loaded_js[url]=true;
        document.getElementsByTagName('head')[0].appendChild(script);
	};
	
	this.timedTrigger = function(condition, f){
		function jsWait() {
            if (condition()) {
                f();
            } else {
                window.setTimeout(jsWait, 100);
            }
        }
        
        jsWait();
	};
	
	this.callbackTrigger = function(key, f){
		if(!callback_funcs[key]){
			callback_funcs[key]=new Array();
		}
		callback_funcs[key].push(f);
	};
	
	this.triggerCall = function(key){
		var funcs=callback_funcs[key];
		for(n in funcs){
			funcs[n]();
		}
		
	};
	
	this.getParameters = function(){
		// get the parameters from last script object in head
		var sc=document.getElementsByTagName('head')[0].getElementsByTagName('script');
    	var s=sc[sc.length-1].innerHTML;
    	// GM_log(s);
    	return JSON.parse(s);
    	//return eval('(' + s + ')');
	};
	
	this.GM_API = new(function(){
	    this.GM_addStyle = GM_addStyle;
    	this.GM_getValue = GM_getValue;
	    this.GM_setValue = GM_setValue;
    	this.GM_getResourceURL = GM_getResourceURL;
	    this.GM_getResourceText = GM_getResourceText;
	    this.GM_log = GM_log;
	    this.GM_openInTab = GM_openInTab;
	    this.GM_registerMenuCommand = GM_registerMenuCommand;
	    this.GM_xmlhttpRequest = GM_xmlhttpRequest;
	    this.JSON = JSON;
	})();
})();