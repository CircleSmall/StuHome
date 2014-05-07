define('uploade/uploade', ['common/common', 'server/server'], function($, server) {
	/*服务器端口*/
	var server = server.uploade;

	/*领域对象*/
	var bizObj = {
		formData: {} //表单数据
	};

	//上传接口
	function uploadeData(data, callback) {

		bizObj.formData.abstract_text = data.abstract_text;
		bizObj.formData.owner_name = data.owner_name;
		bizObj.formData.owner_phone = data.owner_phone;
		bizObj.formData.school_id = parseInt(data.school_id);
		bizObj.formData.address = data.address;
		bizObj.formData.other = data.other;
		bizObj.formData.price = data.price;
		bizObj.formData.square = parseInt(data.square);
		bizObj.formData.hot_water_id = parseInt(data.hot_water_id);
		bizObj.formData.network_condition_id = parseInt(data.network_condition_id);
		bizObj.formData.photo = data.photo; //图片url
		bizObj.formData.owner_type_id = parseInt(data.owner_type_id);
		bizObj.formData.ac_id = parseInt(data.ac_id);
		bizObj.formData.size_des = data.size_des;
		bizObj.formData.wc_condition_id = parseInt(data.wc_condition_id);
		bizObj.formData.city_id = parseInt(data.city_id);

		$.J_xhr(server.uploade, bizObj.formData, function(data) {
			//回调函数
			callback && callback($.J_json.parse(data));
		})
	}

	//检查图片接口
	function checkImg(form, callback) {
		var options = {
			url: server.checkImg.url,
			dataType: 'json',
			type: "post",
			success: callback,
			resetForm: false,
			clearForm: false
		};
		$(form).ajaxSubmit(options);
	}

	//结果预览时的映射
	function mapResultData(data) {
		var obj = {};

		if (data.name == "abstract_text") {
			obj.name = "房源标题"
			obj.value = data.value;
		}
		if (data.name == "owner_name") {
			obj.name = "联系人";
			obj.value = data.value;
		}
		if (data.name == "owner_phone") {
			obj.name = "联系电话";
			obj.value = data.value;
		}
		if (data.name == "school_id") {
			obj.name = "邻进学校";
			obj.value = data.value;
		}
		if (data.name == "address") {
			obj.name = "房间地址";
			obj.value = data.value;
		}
		if (data.name == "other") {
			obj.name = "详细介绍";
			obj.value = data.value;
		}
		if (data.name == "price") {
			obj.name = "价格";
			obj.value = data.value;
		}
		if (data.name == "square") {
			obj.name = "房间大小";
			obj.value = data.value;
		}
		if (data.name == "hot_water_id") {
			obj.name = "热水";
			obj.value = data.value == 1 ? "有" : "无";
		}
		if (data.name == "network_condition_id") {
			obj.name = "网络";
			obj.value = data.value == 1 ? "有" : "无";
		}
		if (data.name == "ac_id") {
			obj.name = "空调";
			obj.value = data.value == 1 ? "有" : "无";
		}
		if (data.name == "size_des") {
			obj.name = "几室几厅";
			obj.value = data.value;
		}
		if (data.name == "owner_type_id") {
			obj.name = "房源类型";
			obj.value = data.value == 1 ? "个人租赁" : "经纪人租赁";
		}
		if (data.name == "wc_condition_id") {
			obj.name = "卫生间";
			obj.value = data.value == 1 ? "有" : "无";
		}
		if (data.name == "city_id") {
			obj.name = "城市";
			obj.value = data.value == 1 ? "成都" : "";
		}

		return obj;
	}


	return {
		uploadeData: uploadeData,
		checkImg: checkImg,
		mapResultData: mapResultData,
		getBizObj: bizObj
	}
})