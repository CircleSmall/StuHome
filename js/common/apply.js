/**
 * 模板渲染
 */
define('commom/apply', ['jquery', 'common/mustache'], function($, mustache) {

	//参数el: dom节点, data 要渲染的对象, callback渲染后的回调
	var apply = function(el, data, callback) {

		if (typeof el != 'string' && el.length && !el.nodeName) {
			// 如果el是jquery对象
			for (var i = 0; i < el.length; i++) {
				tpl(el[i], data, callback, excuteQueue);
			}
		} else {
			//如果el是dom节点
			var str = mustache.render(getStr(el), data);
			var attr = el.getAttribute('data-continue');
			if (attr && attr == "true") {
				$(el).before(str);
			} else {
				$(el).before(str);
				$(el).remove();
			}

		}

	};

	//得到节点字符串(textarea)
	function getStr(el) {
		if (typeof el == "string") {
			return
		} else {
			return el.value;
		}
	};

	return apply;

})