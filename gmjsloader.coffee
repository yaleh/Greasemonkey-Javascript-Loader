# http://www.json.org/json2.js is required
class GMJSLoaderClass
  callback_funcs = {}
  loaded_js = {}
  
  # innerHTMl is opitonal
  loadJS: (url, innerHTML) ->
    return  if url and loaded_js[url]
    script = document.createElement("script")
    script.src = url
    script.type = "text/javascript"
    script.innerHTML = innerHTML
    loaded_js[url] = true  if url
    document.getElementsByTagName("head")[0].appendChild script

  timedTrigger: (condition, f) ->
    jsWait = ->
      if condition()
        f()
      else
        window.setTimeout jsWait, 100
    jsWait()

  callbackTrigger: (key, f) ->
    callback_funcs[key] = new Array()  unless callback_funcs[key]
    callback_funcs[key].push f

  triggerCall: (key) ->
    funcs = callback_funcs[key]
    for n of funcs
      funcs[n]()

  getParameters: ->
    
    # get the parameters from last script object in head
    sc = document.getElementsByTagName("head")[0].getElementsByTagName("script")
    s = sc[sc.length - 1].innerHTML
    
    # GM_log(s);
    JSON.parse s

  
  #return eval('(' + s + ')');
  @GM_API = new (->
    @GM_addStyle = GM_addStyle
    @GM_getValue = GM_getValue
    @GM_setValue = GM_setValue
    @GM_getResourceURL = GM_getResourceURL
    @GM_getResourceText = GM_getResourceText
    @GM_log = GM_log
    @GM_openInTab = GM_openInTab
    @GM_registerMenuCommand = GM_registerMenuCommand
    @GM_xmlhttpRequest = GM_xmlhttpRequest
    @JSON = JSON
  )()

@GMJSLoader = new GMJSLoaderClass