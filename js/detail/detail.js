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
		wc_condition_id: "?",
		network_condition_id: "?",
		ac_id: "?",
		img_path:[]
	};

	function getDetailData(str, callback) {
		bizObj.room_id = str;
		$.J_xhr(server.detail, bizObj, function(data) {
			//回调函数
			callback && callback(mapData($.J_json.parse(data)));
		})
	}

	function mapData(data) {
		var result = {};
		for (var i in data) {
			if (i == "wc_condition_id" || i == "ac_id" || i == "hot_water_id") {
				result[i] = data[i] == 1 ? "有" : "无";
			} else if (i == "network_condition_id") {
				if (data[i] == 1) {
					result[i] = "有线网络";
				} else if (data[i] == 2) {
					result[i] = "无线网络";
				} else if (data[i] == 3) {
					result[i] = "有线及无线网络"
				}
			} else if (i == "img_path") {
				result["img_path"] = [];
				for (var j in data[i]) {
					result["img_path"].push({
						url: data[i][j]
					});
				}
				bizObj.img_path = result["img_path"];
			} else {
				result[i] = data[i];
			}
		}
		return result;
	}

	return {
		getDetailData: getDetailData,
		getBizObj: bizObj
	}

})