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
				price: "?",
				page_index:"?"
			},
			type: "search"
		},

		//搜索框
		search: {
			// url: baseUrl + 'RoomSearchServlet',
			url: baseUrl + 'searchCondition.tpl',
			post: {
				summary_des: "?",
				page_index:"?"
			},
			type: "search"
		}
	};

	var uploade = {
		//上传接口
		uploade: {
			url: baseUrl + 'uploade.tpl'
		}
	}

	return {
		index: index, //返回主页接口
		uploade: uploade
	}

})