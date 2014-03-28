/*服务器地址*/
define('server/server', function() {

	// var baseUrl = "http://localhost:8080/Stuhome/";
	var baseUrl = "http://127.0.0.1/stuhome/js/test/";

	var index = {
		//搜索条件
		searchCondition: {
			// url: baseUrl + 'RoomSearchServlet',
			url: baseUrl + 'searchCondition.tpl',
			post: {
				city_id: "?",
				school_id: "?",
				network_condition_id: "?",
				owner_type_id: "?",
				ac_id: "?",
				wc_condition_id: "?",
				hot_water_id: "?",
				price: "?"
			},
			type: "search"
		},

		//搜索框
		search: {
			// url: baseUrl + 'RoomSearchServlet',
			url: baseUrl + 'searchCondition.tpl',
			post: {
				summary_des: "?"
			},
			type: "search"
		}
	}

	return {
		index: index //返回主页接口
	}

})