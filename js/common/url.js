/**
 * url
 */
define('common/url', function() {
	//给值为"?"的参数复值
	function Url() {

	}

	Url.prototype = {
		urlMerge: function(para, data) {
			var re = {};
			for (var i in data) {
				if (para[i] && para[i] == "?") {
					re[i] = data[i];
				}
			}
			return re;
		},
		getHash: function() {
			return location.hash;
		},
		setHash: function(hash) {
			location.hash = hash;
		}
	}


	return new Url
})