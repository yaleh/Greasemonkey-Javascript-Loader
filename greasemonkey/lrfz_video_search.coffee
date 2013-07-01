#
#  var jQuery = null;
#  var debug = false;
#  var gmapi = null;
#
class LRFZVideoSearch
  instance = null
  alertMe: (s) ->
    alert s

  VideoSearchLinkBuilder = [(text) ->
    # 56 Playlist
    "<a href=\"http://so.56.com/index?type=album&key=" + encodeURI(text) + "\" target=\"_blank\">56.com 专辑</a>"
  , (text) ->
    # 56 Video
    "<a href=\"http://so.56.com/index?key=" + encodeURI(text) + "\" target=\"_blank\">56.com 视频</a>"
  , (text) ->
    # The Pirate Bay
    "<a href=\"http://thepiratebay.org/search/" + encodeURI(text) + "\" target=\"_blank\">The Pirate Bay</a>"
  , (text) ->
    # VeryCD
    "<a href=\"http://www.verycd.com/search/folders/" + encodeURI(text) + "\" target=\"_blank\">VeryCD</a>"
  , (text) ->
    # Youtube Channel
    "<a href=\"http://www.youtube.com/results?search_type=search_users&search_query=" + encodeURI(text) + "\" target=\"_blank\">Youtube Channel</a>"
  , (text) ->
    # Youtube Playlist
    "<a href=\"http://www.youtube.com/results?search_type=search_playlists&search_query=" + encodeURI(text) + "\" target=\"_blank\">Youtube Playlist</a>"
  , (text) ->
    # Youtube Video
    "<a href=\"http://www.youtube.com/results?search_type=&search_query=" + encodeURI(text) + "&aq=f\" target=\"_blank\">Youtube Video</a>"
  , (text) ->
    # isoHunt
    "<a href=\"http://isohunt.com/torrents/?ihq=" + encodeURI(text) + "\" target=\"_blank\">isoHunt</a>"
  , (text) ->
    # Youku video
    "<a href=\"http://so.youku.com/search_video/q_" + encodeURI(text) + "\" target=\"_blank\">优酷</a>"
  , (text) ->
    # Youku playlist
    "<a href=\"http://so.youku.com/search_playlist/q_" + encodeURI(text) + "\" target=\"_blank\">优酷列表</a>"
  , (text) ->
    # Tudou video
    "<a href=\"http://so.tudou.com/isearch/" + encodeURI(text) + "\" target=\"_blank\">土豆视频</a>"
  , (text) ->
    # Tudou playlist
    "<a href=\"http://so.tudou.com/psearch/" + encodeURI(text) + "\" target=\"_blank\">土豆豆单</a>"
  , (text) ->
    # OpenV
    "<a href=\"http://www.openv.com/ls.php?q=" + encodeURI(text) + "\" target=\"_blank\">天线视频</a>"
  , (text) ->
    # Gougou
    "<a href=\"http://www.gougou.com/search?id=1&search=" + encodeURI(text) + "\" target=\"_blank\">狗狗</a>"
  , (text) ->
    # Gougou BT
    "<a href=\"http://www.gougou.com/search?ty=1&search=" + encodeURI(text) + "\" target=\"_blank\">狗狗BT</a>"
  , (text) ->
    # Google CN video
    "<a href=\"http://video.google.cn/videosearch?q=" + encodeURI(text) + "&www_google_domain=www.google.cn&emb=0#\" target=\"_blank\">谷歌视频</a>"
  , (text) ->
    # Ku6 Playlist
    "<a href=\"http://so.ku6.com/p/q" + encodeURI(text) + "\" target=\"_blank\">酷6网-专辑搜索</a>"
  , (text) ->
    # Ku6 Video Search
    "<a href=\"http://so.ku6.com/v/q" + encodeURI(text) + "\" target=\"_blank\">酷6网-视频搜索</a>"
  ]
  site_jqpaths = [
    {
      name: "Douban Movie"
      patterns: [
        "http://www.douban.com/movie/.*",
        "http://www.douban.com/subject/.*",
        "http://movie.douban.com/subject/.*/"]
      paths: [
        ["div#in_tableb:has(table > img)", "img", "alt"],
        ["li.ilst", "img", "alt"],
        ["div#mainpic", "img", "alt"],
        ["dl.obs > dt", "img", "alt"],
        ["div#in_tableb > div.indent > table > tbody > tr > td:first-child", "a > img", "alt"],
        ["div#tablem > div#in_tablem > table > tbody > tr > td:first-child", "a > img", "alt"]
      ]
    },
    {
      name: "MDBChina"
      patterns: ["http://www.mdbchina.cn/.*"]
      paths: [
        ["div.photo_border", "img", "alt"],
        ["div.movie_photo", "img", "alt"],
        ["div.page_big_photo", "img", "alt"],
        ["li:has(a.mdbhb_img)", "img", "alt"]
      ]
    },
    {
      name: "Mtime"
      patterns: ["http://www.mtime.com/movie/.*"]
      paths: [
        ["div.ele_img_item", "a > img.img_box", "alt"],
        ["div#movie_main div.clearfix:has(a > img.movie_film_img)", "a > img.movie_film_img", "alt"],
        ["div#reviewScreen div.w80", "a > img.img_box", "alt"]
      ]
    }
  ]
  main: ->
    
    #  	GMJSLoader.GM_API.GM_log("main");
    instance = this
    
    #  	loadSettings();
    GMJSLoader.GMHelper.addCSSLink script_site + "/lrfz_video_search.css"
    
    #    	GMJSLoader.GM_API.GM_log("site_jqpaths = " + site_jqpaths);
    for sj in site_jqpaths 
      #    		GMJSLoader.GM_API.GM_log("si = " + sj);
      for pattern in sj.patterns
        
        re = undefined
        try
          re = new RegExp(pattern)
        catch error
          GMJSLoader.GM_API.GM_log "Failed on creating RegExp with: " + sj.patterns[pi]
          continue
        
        #    			GMJSLoader.GM_API.GM_log("Match " + document.location + " with JQPath " + 
        #    					sj.patterns[pi]);
        m = re.exec(document.location)
        if m?
          
          # matched
          #    				GMJSLoader.GM_API.GM_log("JQPath " + sj.patterns[pi] + " matched!");

          xpaths_j = sj.paths
          for xpath_group in xpaths_j
            GMJSLoader.jQuery(xpath_group[0]).each ->
              title = GMJSLoader.jQuery(xpath_group[1], this).attr(xpath_group[2])
              s = ""

              for builder in VideoSearchLinkBuilder
                s += "<li>" + builder(title) + "</li>"

              GMJSLoader.jQuery(this).append "<div class=\"lrfz_playlist\"><ul><li>" + "<a href=\"" + lrfz_video_search_homepage + "\">Search it! <font color=\"grey\"><i>v" + lrfz_video_search_version + "</i></font></a><div class=\"lrfz_playlist_menu\"><ul>" + s + "</ul></div></li></ul><div>"

          return

script_site = (if GMJSLoader.lrfz_video_search.debug then "http://localhost:8080" else "http://m.lrfz.com")
lrfz_video_search_version = "0.7"
lrfz_video_search_homepage = "http://www.lrfz.com/"

#	jQuery.gmapi.GM_log(document.body.scrollHeight);

#	debug = env.debug;
#	gmapi = env.gmapi;
#	jQuery = env.jQuery;
if (typeof jQuery isnt "undefined") and jQuery.fn.jquery is "1.2.6"
  GMJSLoader.GM_API.GM_log "Keep the original jQuery 1.2.6 ."
  GMJSLoader.jQuery = jQuery
  GMJSLoader.loadJS script_site + "/gmhelper.js"
else
  GMJSLoader.loadJS "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js"
  GMJSLoader.timedTrigger (->
    (typeof jQuery isnt "undefined") and (jQuery.fn.jquery is "1.2.6")
  ), ->
    GMJSLoader.GM_API.GM_log "jQuery loaded"
    GMJSLoader.jQuery = jQuery.noConflict(true)
    GMJSLoader.loadJS script_site + "/gmhelper.js"

GMJSLoader.timedTrigger (->
  typeof GMJSLoader.jQuery isnt "undefined"
), ->
  return  if GMJSLoader.jQuery.ui
  org_dollar = @$
  org_jQuery = @jQuery
  @$ = @jQuery = GMJSLoader.jQuery
  GMJSLoader.loadJS "http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js"
  GMJSLoader.timedTrigger (->
    typeof GMJSLoader.jQuery.ui isnt "undefined"
  ), ->
    @$ = org_dollar
    @jQuery = org_jQuery


GMJSLoader.timedTrigger (->
  (typeof GMJSLoader.GMHelper isnt "undefined") and (typeof GMJSLoader.jQuery isnt "undefined") and (typeof GMJSLoader.jQuery.ui isnt "undefined")
), ->
  
  # GMJSLoader.GM_API.GM_log("assert 2");
  GMJSLoader.loadJS script_site + "/jquery.cookie.js", GMJSLoader.GM_API.JSON.stringify(key: "jQuery.cookie")

GMJSLoader.callbackTrigger "jQuery.cookie", ->
  
  # GMJSLoader.GM_API.GM_log("assert 3");
  lrfz_video_search = new LRFZVideoSearch
  lrfz_video_search.main()

# if GMJSLoader.lrfz_video_search.debug
#   @LRFZVideoSearch = LRFZVideoSearch
#GMJSLoader.GM_API.GM_log("LRFZ Video Search is loaded.");