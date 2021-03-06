define('index/index', ['common/common', 'server/server'], function($, baseServer) {

	/*服务器端口*/
	var server = baseServer.index;

	/*领域对象*/
	var bizObj = {
		city_id: "",
		school_id: "",
		network_condition_id: "",
		owner_type_id: "",
		ac_id: "",
		wc_condition_id: "",
		hot_water_id: "",
		price: "",
		summary_des: "",
		page_index: ""
	};

	//搜索条件
	function searchCondition(data, callback) {

		bizObj.city_id = data.city_id || 0;
		bizObj.school_id = data.school_id || 0;
		bizObj.network_condition_id = data.network_condition_id;
		bizObj.owner_type_id = data.owner_type_id;
		bizObj.ac_id = data.ac_id;
		bizObj.wc_condition_id = data.wc_condition_id;
		bizObj.hot_water_id = data.hot_water_id;
		bizObj.price = data.price;
		bizObj.page_index = data.page_index;

		$.J_xhr(server.searchCondition, bizObj, function(data) {
			//回调函数
			var result = mapSearchResult($.J_json.parse(data));
			callback && callback(result);
		})

	}

	//搜索条件
	function search(data, callback) {

		bizObj.summary_des = data.summary_des;

		$.J_xhr(server.search, bizObj, function(data) {
			//回调函数
			var result = mapSearchResult($.J_json.parse(data));
			callback && callback(result);
		})

	}

	function mapSearchResult(data) {
		for (var i in data) {
			var d = data[i];
			d.wc = d.wc_condition_id == 1 ? "有" : "无";
			d.ac = d.ac_id == 1 ? "有" : "无";
			d.hot_water = d.hot_water_id == 1 ? "有" : "无";
			d.school = d.school_id == 1? "四川大学" : "电子科技大学";
			
			if (d.network_condition_id && d.network_condition_id == 1) {
				d.network = "有线";
			} else if (d.network_condition_id == 2) {
				d.network = "无线";
			} else if (d.network_condition_id == 3) {
				d.network = "有线及无线"
			} else {
				d.network = "无网";
			}

			if (d.owner_type_id == 1) {
				d.room_type = "个人租赁";
			} else if (d.owner_type_id == 2) {
				d.room_type = "房源租赁";
			}
			d.baseUrl = baseServer.baseUrl.substr(0,baseServer.baseUrl.length-1);
		}
		return data;
	}

	return {
		searchCondition: searchCondition,
		search: search,
		getBizObj: bizObj
	}

})