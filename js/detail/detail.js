define('detail/detail', ['common/common', 'server/server'], function($, baseServer) {
	/*服务器端口*/
	var server = baseServer.detail;

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
		img_path: []
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
		// 设置默认值
		result.baseUrl = baseServer.baseUrl.substr(0, baseServer.baseUrl.length - 1);
		result["network_condition"] = "无";
		result["school"] = "电子科技大学";
		result["hot_water"] = "无";
		result["wc_condition"] = "无";
		result["ac"] = "无";

		for (var i in data) {
			if (i == "img_path") {
				result["img_path"] = [];
				for (var j in data[i]) {
					result["img_path"].push({
						url: result.baseUrl + data[i][j]
					});
				}
				bizObj.img_path = result["img_path"];
			} else if (i == "network_condition_id") {
				if (data[i] == 1) {
					result["network_condition"] = "有线网络";
				} else if (data[i] == 2) {
					result["network_condition"] = "无线网络";
				} else if (data[i] == 3) {
					result["network_condition"] = "有线及无线网络"
				} else {
					result[i] = "无";
				}
			} else if (i == "school_id") {
				result["school"] = data[i] == 1 ? "四川大学" : "电子科技大学";
			} else if (i == "hot_water_id") {
				result["hot_water"] = data[i] == 1 ? "有" : "无";
			} else if (i == "wc_condition_id") {
				result["wc_condition"] = data[i] == 1 ? "有" : "无";
			} else if (i == "ac_id") {
				result["ac"] = data[i] == 1 ? "有" : "无";
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