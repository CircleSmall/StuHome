require(['common/common', 'index/index'], function($, index) {

	//搜索条件接口模拟的数据
	var conditionData = {
		school_id: "school_id",
		network_condition_id: "network_condition_id",
		owner_type_id: "owner_type_id",
		ac_id: "ac_id",
		wc_condition_id: "wc_condition_id",
		hot_water_id: "hot_water_id",
		price: "price"
	}


	index.searchCondition(conditionData, function(data) {
		$.J_apply($('.J_template_main'),{list:data});
	})

})