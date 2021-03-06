/*服务器地址*/
define('server/server', function() {

	var baseUrl = "http://localhost:8080/Stuhome/";
	// var baseUrl = "http://127.0.0.1/Stuhome/js/test/";
	// var baseUrl = "http://localhost/Stuhome/js/test/";

	var index = {
		//搜索条件
		searchCondition: {
			url: baseUrl + 'RoomSearchServlet',
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
			url: baseUrl + 'RoomSearchServlet',
			post: {
				summary_des: "?",
				page_index:"?"
			},
			type: "search"
		}
	};

	var uploade = {
		//上传接口(表单提交接口)
		uploade: {
			url: baseUrl + 'RoomUploadServlet',
			post: {
				abstract_text: "?",
				owner_name: "?",
				owner_phone: "?",
				owner_type_id: "?",
				school_id: "?",
				city_id: "?",
				address: "?",
				other: "?",
				price: "?",
				square: "?",
				size_des:"?",
				hot_water_id: "?",
				network_condition_id: "?",
				ac_id:"?",
				wc_condition_id: "?",
				photo: "?"//图片url
			},
			type: "upload"
		},
		//检查图片的接口
		checkImg: {
			url: baseUrl + 'ImageCheckServlet'
			// url: baseUrl + 'ImageCheckServlet.php'
		}
	}

	var detail = {
		detail: {
			url: baseUrl + 'RoomDetailServlet',
			post: {
				room_id: "?"
			},
			type: "detail"
		}
	}

	return {
		baseUrl: baseUrl,
		index: index, //返回主页接口
		uploade: uploade,
		detail: detail
	}

})