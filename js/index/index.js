define('index/index', ['common/common', 'server/server'],function($,server){
	
	/*服务器端口*/
	var server = server.index;

	/*领域对象*/
	var bizObj = {
		school_id : "",
		network_condition_id : "",
		owner_type_id : "",
		ac_id : "",
		wc_condition_id : "",
		hot_water_id : "",
		price : "",
		summary_des : ""
	}

	//搜索条件
	function searchCondition(data,callback) {

		bizObj.school_id = data.school_id || 0;
		bizObj.network_condition_id = data.network_condition_id;
		bizObj.owner_type_id = data.owner_type_id;
		bizObj.ac_id = data.ac_id;
		bizObj.wc_condition_id = data.wc_condition_id;
		bizObj.hot_water_id = data.hot_water_id;
		bizObj.price = data.price;
		
		bizObj.visitkey = parseInt(new Date().getTime() / 1000);

		$.J_xhr(server.searchCondition, bizObj, function(data){
			//回调函数
			callback && callback(data);
		})

	}

	return {
		searchCondition : searchCondition,
		getBizObj: bizObj
	}

})