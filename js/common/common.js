define('common/common', function(require) {

	require('common/jquery');
	require('common/json2');

	$.J_cookie = require('common/cookie');
	$.J_log = require('common/log');
	$.J_json = JSON;
	$.J_mustache = require('common/mustache');
	$.J_url = require('common/url');


	$.J_xhr = function(obj, data, callback) {
		if (!obj.url) {
			console.log('没有合法调用xhr');
		}
		var url = obj.url;
		var para = obj.get || obj.post;
		var paraObj = $.J_url.urlMerge(para, data);

		//传送的字符串
		var sendStr = obj.type + "=" + JSON.stringify(paraObj);

		if (obj.get) {
			$.get(url, sendStr, function(returnData) {
				callback && callback(returnData);
			});
		} else if (obj.post) {
			$.post(url, sendStr, function(returnData) {
				callback && callback(returnData);
			});
		} else {
			console.log("请指定一个get 或 post 方法");
		}
	}

	// 参数el: dom节点, data 要渲染的对象, callback渲染后的回调
	$.J_apply = function(el, data, callback) {
		if (typeof el != 'string' && el.length && !el.nodeName) {
			// 如果el是jquery对象
			for (var i = 0; i < el.length; i++) {
				$.J_apply(el[i], data, callback);
			}

		} else {
			//如果el是dom节点
			var str = $.J_mustache.render(el.value, data);
			var attr = el.getAttribute('data-continue');
			if (attr && attr == "true") {
				$(el).before(str);
			} else {
				$(el).before(str);
				$(el).remove();
			}

		}

	};

	$.J_mix = function() {
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
	 * 把参数2,3...的所有不为undefined的key复制到参数1上
	 */
	$.J_merge = function() {
		if (arguments.length > 0) {
			var re = arguments[0];
			for (var i = 1; i < arguments.length; i++) {
				var o = arguments[i];
				for (var p in o) {
					if (o[p] != undefined) {
						re[p] = o[p];
					}
				}
			}
			return re;
		}
		return undefined;
	}

	/**
	 * 判断是否为空
	 */
	$.J_isNull = function(o) {
		return o == undefined || o == null || o == '';
	}

	/**
	 * 节点替换成指定HTML
	 */
	$.J_replaceHTML = function(element, html) {
		var div = document.createElement('div');
		div.innerHTML = html;
		for (var i = 0, a = div.childNodes; i < a.length;) {
			element.parentNode.insertBefore(a[0], element);
		}
		div = null;
		element.parentNode.removeChild(element);
	}

	return $;
});