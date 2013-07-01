/**
 * GMHelper
 * 
 * Greasemonkey helper from LRFZ.
 *
 * Copyright (c) 2008 Yale Huang (http://www.lrfz.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

GMJSLoader.GMHelper = new(function(){
	this.addInlineCSS = function (css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	};
	
	this.addCSSLink = function(url) {
		var link = document.createElement('LINK');
		link.rel = 'stylesheet';
		link.href = url;
		link.type = 'text/css';
		document.body.insertBefore(link, null);
	};
})();