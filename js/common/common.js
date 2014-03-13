define('common/common', function(require) {

	require('common/jquery');

	var mustache = require('common/mustache'),
		cookie = require('common/cookie'),
		log = require('common/log');

	$.cookie = cookie;
	$.log = log;
	$.mustache = mustache;
	// $.json = window.JSON || require('common/json2');


	$.mix = function() {
		var re = {};
		for (var i = 0; i < arguments.length; i++) {
			var o = arguments[i];
			for (var p in o) {
				if (o[p] != undefined) {
					re[p] = o[p];
				}
			}
		}
		return re;
	}
	
	/**
	 * 判断是否为空
	 */
	$.isNull = function(o) {
		return o == undefined || o == null || o == '';
	}

	return $;
});