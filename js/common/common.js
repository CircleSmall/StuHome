define('common/common', ['common/jquery', 'common/mustache', 'common/cookie', 'common/log', 'common/json2'], //

	function(undefined, mustache, cookie, log, undefined) {

		$.J_cookie = cookie,
		$.J_log = log;
		$.J_json = JSON;

		$.J_xhr = function(obj, data, callback) {
			if (!obj.url) {
				console.log('没有合法调用xhr');
			}
			var url = obj.url;
			var para = obj.get || obj.post;
			var paraObj = $.merge(para, data);

			if (obj.get) {
				$.get(url, paraObj, function(returnData) {
					callback && callback($.parseJSON(returnData));
				});
			} else if (obj.post) {
				$.post(url, paraObj, function(returnData) {
					callback && callback($.J_json.parse(returnData));
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
				var str = mustache.render(el.value, data);
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
		 * 把参数2,3...的所有不为undefined的key复制到参数1值为"？"key上
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

		return $;
	});