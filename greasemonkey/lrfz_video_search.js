/*
  var jQuery = null;
  var debug = false;
  var gmapi = null;
*/

var script_site = GMJSLoader.lrfz_video_search.debug?"http://localhost:8080":"http://m.lrfz.com";
var lrfz_video_search_version = "0.7";
var lrfz_video_search_homepage = "http://www.lrfz.com/";

function LRFZVideoSearch() {

    var instance = null;

    this.alertMe = function(s) {
        alert(s);
    };

    var VideoSearchLinkBuilder =
    	[
    	    
    	    function (text){
    		// 56 Playlist
    		return '<a href="http://so.56.com/index?type=album&key=' + encodeURI(text) +'" target="_blank">56.com 专辑</a>';
    	    },
    	    
    	    function (text){
    		// 56 Video
    		return '<a href="http://so.56.com/index?key=' + encodeURI(text) +'" target="_blank">56.com 视频</a>';
    	    },
    	    
    	    function (text){
    		// The Pirate Bay
    		return '<a href="http://thepiratebay.org/search/' + encodeURI(text) +'" target="_blank">The Pirate Bay</a>';
    	    },
    	    
    	    function (text){
    		// VeryCD
    		return '<a href="http://www.verycd.com/search/folders/' + encodeURI(text) +'" target="_blank">VeryCD</a>';
    	    },
    	    
    	    function (text){
    		// Youtube Channel
    		return '<a href="http://www.youtube.com/results?search_type=search_users&search_query=' + encodeURI(text) +'" target="_blank">Youtube Channel</a>';
    	    },
    	    
    	    function (text){
    		// Youtube Playlist
    		return '<a href="http://www.youtube.com/results?search_type=search_playlists&search_query=' + encodeURI(text) +'" target="_blank">Youtube Playlist</a>';
    	    },
    	    
    	    function (text){
    		// Youtube Video
    		return '<a href="http://www.youtube.com/results?search_type=&search_query=' + encodeURI(text) +'&aq=f" target="_blank">Youtube Video</a>';
    	    },
    	    
    	    function (text){
    		// isoHunt
    		return '<a href="http://isohunt.com/torrents/?ihq=' + encodeURI(text) +'" target="_blank">isoHunt</a>';
    	    },
    	    
    	    function (text){
    		// Youku video
    		return '<a href="http://so.youku.com/search_video/q_' + encodeURI(text) +'" target="_blank">优酷</a>';
    	    },
    	    
    	    function (text){
    		// Youku playlist
    		return '<a href="http://so.youku.com/search_playlist/q_' + encodeURI(text) +'" target="_blank">优酷列表</a>';
    	    },
    	    
    	    function (text){
    		// Tudou video
    		return '<a href="http://so.tudou.com/isearch/' + encodeURI(text) +'" target="_blank">土豆视频</a>';
    	    },
    	    
    	    function (text){
    		// Tudou playlist
    		return '<a href="http://so.tudou.com/psearch/' + encodeURI(text) +'" target="_blank">土豆豆单</a>';
    	    },
    	    
    	    function (text){
    		// OpenV
    		return '<a href="http://www.openv.com/ls.php?q=' + encodeURI(text) +'" target="_blank">天线视频</a>';
    	    },
    	    
    	    function (text){
    		// Gougou
    		return '<a href="http://www.gougou.com/search?id=1&search=' + encodeURI(text) +'" target="_blank">狗狗</a>';
    	    },
    	    
    	    function (text){
    		// Gougou BT
    		return '<a href="http://www.gougou.com/search?ty=1&search=' + encodeURI(text) +'" target="_blank">狗狗BT</a>';
    	    },
    	    
    	    function (text){
    		// Google CN video
    		return '<a href="http://video.google.cn/videosearch?q=' + encodeURI(text) +'&www_google_domain=www.google.cn&emb=0#" target="_blank">谷歌视频</a>';
    	    },
    	    
    	    function (text){
    		// Ku6 Playlist
    		return '<a href="http://so.ku6.com/p/q' + encodeURI(text) +'" target="_blank">酷6网-专辑搜索</a>';
    	    },
    	    
    	    function (text){
    		// Ku6 Video Search
    		return '<a href="http://so.ku6.com/v/q' + encodeURI(text) +'" target="_blank">酷6网-视频搜索</a>';
    	    },
    	    
    	];
    
    var site_jqpaths = [
        
        {
            'name':'Douban Movie',
            'patterns':[
                'http://www.douban.com/movie/.*',
                'http://www.douban.com/subject/.*',
		'http://movie.douban.com/subject/.*/',
                
            ],
            'paths':[
                
                ["div#in_tableb:has(table > img)", "img", "alt"],
                
                ["li.ilst", "img", "alt"],
                
                ["div#mainpic", "img", "alt"],
                
                ["dl.obs > dt", "img", "alt"],
                
                ["div#in_tableb > div.indent > table > tbody > tr > td:first-child", "a > img", "alt"],
                
                ["div#tablem > div#in_tablem > table > tbody > tr > td:first-child", "a > img", "alt"],
                
            ],
        },                        
        
        {
            'name':'MDBChina',
            'patterns':[
                
                'http://www.mdbchina.cn/.*',
                
            ],
            'paths':[
                
                ["div.photo_border","img","alt"],
                
                ["div.movie_photo","img","alt"],
                
                ["div.page_big_photo","img","alt"],
                
                ["li:has(a.mdbhb_img)","img","alt"],
                
            ],
        },                        
        
        {
            'name':'Mtime',
            'patterns':[
                
                'http://www.mtime.com/movie/.*',
                
            ],
            'paths':[
                
                ["div.ele_img_item","a > img.img_box","alt"],
                
                ["div#movie_main div.clearfix:has(a > img.movie_film_img)", "a > img.movie_film_img", "alt"],
                
                ["div#reviewScreen div.w80", "a > img.img_box", "alt"],
                
            ],
        },                        
        
    ];

    
    this.main = function() {
	//  	GMJSLoader.GM_API.GM_log("main");

    	instance = this;
	//  	loadSettings();

    	GMJSLoader.GMHelper.addCSSLink(script_site + "/lrfz_video_search.css");

	//    	GMJSLoader.GM_API.GM_log("site_jqpaths = " + site_jqpaths);
    	
    	for (var sji=0, sj_len=site_jqpaths.length; sji<sj_len; ++sji){
    	    var sj = site_jqpaths[sji];
	    //    		GMJSLoader.GM_API.GM_log("si = " + sj);
    	    for (var pi=0, sjp_len=sj.patterns.length; pi<sjp_len; ++pi){
    		var re;
    		try{
    		    re = new RegExp(sj.patterns[pi]);
    		}catch(error){
    		    GMJSLoader.GM_API.GM_log("Failed on creating RegExp with: " + sj.patterns[pi]);
    		    continue;
    		}
		//    			GMJSLoader.GM_API.GM_log("Match " + document.location + " with JQPath " + 
		//    					sj.patterns[pi]);
    		var m = re.exec(document.location);
    		if (m!=null) {
    		    // matched
		    //    				GMJSLoader.GM_API.GM_log("JQPath " + sj.patterns[pi] + " matched!");

    		    xpaths_j = sj.paths;
    		    for (var i=0; i<xpaths_j.length; i++) {
    			GMJSLoader.jQuery(xpaths_j[i][0]).each(function(){
    			    var title = GMJSLoader.jQuery(xpaths_j[i][1],this).attr(xpaths_j[i][2]);
    			    s = '';
    			    for (var n=0; n<VideoSearchLinkBuilder.length; n++) {
    				s += '<li>' + VideoSearchLinkBuilder[n](title) +'</li>';
    			    }			
    			    GMJSLoader.jQuery(this).append('<div class="lrfz_playlist"><ul><li>' + 
    							   '<a href="' + lrfz_video_search_homepage + '">Search it! <font color="grey"><i>v' + lrfz_video_search_version + '</i></font></a><div class="lrfz_playlist_menu"><ul>' +
    							   s +
    							   '</ul></div></li></ul><div>'
    							  );
    			});
    		    }
    		    return;
    		}
    	    }
    	}


    	//	jQuery.gmapi.GM_log(document.body.scrollHeight);
    };

}

//	debug = env.debug;
//	gmapi = env.gmapi;
//	jQuery = env.jQuery;

if((typeof jQuery != 'undefined') && jQuery.fn.jquery == '1.2.6'){
    GMJSLoader.GM_API.GM_log("Keep the original jQuery 1.2.6 .");
    GMJSLoader.jQuery = jQuery;
    GMJSLoader.loadJS(script_site + "/gmhelper.js");	
}else{
    GMJSLoader.loadJS("http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js");

    GMJSLoader.timedTrigger(
	function(){return (typeof jQuery != 'undefined') && (jQuery.fn.jquery == '1.2.6');},
	function(){
	    GMJSLoader.GM_API.GM_log("jQuery loaded");
	    GMJSLoader.jQuery = jQuery.noConflict(true);
	    GMJSLoader.loadJS(script_site + "/gmhelper.js");
	}
    );
}

GMJSLoader.timedTrigger(
    function(){return (typeof GMJSLoader.jQuery != 'undefined');},
    function(){
	if(GMJSLoader.jQuery.ui){
	    return;
	}
	org_dollar = $;
	org_jQuery = jQuery;
	$ = jQuery = GMJSLoader.jQuery;
	GMJSLoader.loadJS("http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js");
	GMJSLoader.timedTrigger(
	    function(){return (typeof GMJSLoader.jQuery.ui != 'undefined');},
	    function(){
		$ = org_dollar;
		jQuery = org_jQuery;
	    }
	);
    }
);

GMJSLoader.timedTrigger(
    function(){
	return (typeof GMJSLoader.GMHelper != 'undefined') &&
	    (typeof GMJSLoader.jQuery != 'undefined') &&
	    (typeof GMJSLoader.jQuery.ui != 'undefined');
    },
    function(){
	// GMJSLoader.GM_API.GM_log("assert 2");
	GMJSLoader.loadJS(script_site + "/jquery.cookie.js",
			  GMJSLoader.GM_API.JSON.stringify({key:'jQuery.cookie'}));
    }
);

GMJSLoader.callbackTrigger("jQuery.cookie",
			   function(){
			       // GMJSLoader.GM_API.GM_log("assert 3");
			       var lrfz_video_search = new LRFZVideoSearch();
			       lrfz_video_search.main();
			   });

//GMJSLoader.GM_API.GM_log("LRFZ Video Search is loaded.");
