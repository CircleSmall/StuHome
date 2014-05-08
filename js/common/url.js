/**
 * url
 */
define('common/url', function() {
	//给值为"?"的参数复值
	function Url(url) {
		this.para = {};
		this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
		if (typeof url != 'undefined') {
			this.parse(url);
		}
	}

	Url.prototype = {
		parse: function(url) {
			this.url = url;
			var r = this._regex.exec(url);
			if (!r) throw "URLParser::_parse -> Invalid URL";
			var params = url.split("?")[1] ? url.split("?")[1].split("&") : null;
			if (params) {
				for (var i in params) {
					var p = params[i].split("=");
					if(!p) continue;
					this.para[p[0]] = p[1];
				}
			} else {
				return this.parse = null
			}
		},
		getPara: function(key) {
			return this.para[key];
		},
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


	return new Url(location.href)
})