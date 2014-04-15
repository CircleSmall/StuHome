define('detail/detail', ['common/common', 'server/server'], function($, server) {
	/*服务器端口*/
	var server = server.detail;

	/*领域对象*/
	var bizObj = {
		room_id: "?",
		abstract: "?",
		price: "?",
		address: "?",
		square: "?",
		brief: "?",
		wc_condition_id: "?",
		network_condition_id: "?",
		ac_id: "?"
	};

	function getDetailData(str,callback) {
		bizObj.room_id = str;
		$.J_xhr(server.detail, bizObj, function(data) {
			//回调函数
			callback && callback($.J_json.parse(data));
		})
	}

	return {
		getDetailData: getDetailData,
		getBizObj: bizObj
	}

})