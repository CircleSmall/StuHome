define('index/index', ['common/common', 'server/server'],function($,server){
	
	/*服务器端口*/
	var server = server.index;

	/*领域对象*/
	var bizObj = {
		city_id : "",
		school_id : "",
		network_condition_id : "",
		owner_type_id : "",
		ac_id : "",
		wc_condition_id : "",
		hot_water_id : "",
		price : "",
		summary_des : "",
		page_index : ""
	}

	//搜索条件
	function searchCondition(data,callback) {

		bizObj.city_id = data.city_id || 0;
		bizObj.school_id = data.school_id || 0;
		bizObj.network_condition_id = data.network_condition_id;
		bizObj.owner_type_id = data.owner_type_id;
		bizObj.ac_id = data.ac_id;
		bizObj.wc_condition_id = data.wc_condition_id;
		bizObj.hot_water_id = data.hot_water_id;
		bizObj.price = data.price;
		bizObj.page_index = data.page_index;

		$.J_xhr(server.searchCondition, bizObj, function(data){
			//回调函数
			callback && callback($.J_json.parse(data));
		})

	}

	function mapSearchCondition(data) {
		return data
	}

	//搜索条件
	function search(data,callback) {

		bizObj.summary_des = data.summary_des;
		
		$.J_xhr(server.search, bizObj, function(data){
			//回调函数
			callback && callback($.J_json.parse(data));
		})

	}

	return {
		searchCondition : searchCondition,
		search : search,
		getBizObj: bizObj
	}

})