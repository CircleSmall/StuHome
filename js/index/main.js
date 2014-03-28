require(['common/common', 'index/index'], function($, index) {

	//判断是否继续加载还是重新加载(默认重新加载)
	isContinued = false;

	var selectDiv = $('#J_select'); //筛选条件内容
	var conTitle = $('#J_condition_title'); //筛选条件标题
	var J_template_str = ""; //模板字符串

	//搜索条件接口模拟的数据
	var conditionData = {
		city_id: $('#J_city', selectDiv).children('option:selected')[0].value,
		school_id: $('#J_school', selectDiv).children('option:selected')[0].value,
		network_condition_id: "",
		owner_type_id: "",
		ac_id: 0,
		wc_condition_id: 0,
		hot_water_id: 0,
		price: ""
	};

	//改变城市、学校选择框的值
	$('select', selectDiv).change(function() {
		var el = $(this).children('option:selected');
		var value = el[0].value;
		conditionData.school_id = value;
		

		if ($(this).attr('id') == "J_city") {
			$('.city', conTitle).text(el.text());
			conditionData.city_id = value;
		} else if ($(this).attr('id') == "J_school") {
			$('.school', conTitle).text(el.text());
			conditionData.school_id = value;
		}
		isContinued = false;
		showCondition();

	});

	//点击空调、独立卫生间、热水
	$('.fix', selectDiv).click(function() {
		var me = $(this);
		var type = $(me).attr('data-type');
		var value = $(me.children('input'))[0].checked ? 1 : 0;
		if(type == "ac") {
			conditionData.ac_id = value;
		} else if (type == "wc") {
			conditionData.wc_condition_id = value;
		} else if (type == "hot") {
			conditionData.hot_water_id = value;
		}
		isContinued = false;
		showCondition();
	});

	//点击筛选条件
	$('.row.J_line a', selectDiv).click(function() {

		var type = $(this).parents('.J_line').attr('data-type');

		if (type == "price") {

			conditionData.price = $.J_json.stringify({
				min: $(this).attr("data-min"),
				max: $(this).attr("data-max")
			});
			$('.price', conTitle).text($(this).text());

		} else if (type == "network") {

			conditionData.network_condition_id = $(this).attr('data-type');

		} else if (type == "owner_type") {

			conditionData.owner_type_id = $(this).attr('data-type');

		}
		$(this).parents('.J_line').find('a').removeClass('active');
		$(this).addClass('active');

		isContinued = false;
		showCondition();

	});

	//点击搜索框
	$('#J_search_btn').click(function(){
		var str = $('#J_search_input')[0].value;
		showSearch(checkSearch(str));
	});

	//检查搜索输入字段（目前还未检查）
	function checkSearch(str) {
		return str;
	}

	//显示搜索条件接口的数据
	function showCondition() {
		index.searchCondition(conditionData, fillData);
	};

	//显示搜索框接口的数据
	function showSearch(str) {
		index.search({
			summary_des: str
		}, fillData);
	};

	function fillData(data) {
		reLoad();
		$.J_apply($('.J_template_main'), {
			list: data
		});
	}

	//重新加载数据的操作,帮助模板加载
	function reLoad() {
		if (!isContinued) {
			$('.J_datalist').remove();
		}
	}

})