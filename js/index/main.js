require(['common/common', 'index/index'], function($, index) {

	if(!preLoadData){
		console.log("pre load 参数错误")
	}

	//判断是否继续加载还是重新加载(默认重新加载)
	isContinued = false;

	//判断当前状态是搜索框接口还是搜索条件接口(search和condition)
	var searchStatus = "";

	var selectDiv = $('#J_select'); //筛选条件内容
	var conTitle = $('#J_condition_title'); //筛选条件标题
	var J_template_str = ""; //模板字符串

	//搜索条件接口模拟的数据
	var conditionData = {
		city_id: preLoadData.city.value,
		school_id: preLoadData.school.value,
		network_condition_id: 0,
		owner_type_id: 0,
		ac_id: 0,
		wc_condition_id: 0,
		hot_water_id: 0,
		price: {min:0,max:1000000},//price默认是无限
		page_index: 0
	};

	//改变城市、学校选择框的值
	$('select', selectDiv).change(function() {
		var el = $(this).children('option:selected');
		var value = parseInt(el[0].value);
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
		if (type == "ac") {
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

			conditionData.price = {
				min: parseInt($(this).attr("data-min")),
				max: parseInt($(this).attr("data-max"))
			};

			$('.price', conTitle).text($(this).text());

		} else if (type == "network") {

			conditionData.network_condition_id = parseInt($(this).attr('data-type'));

		} else if (type == "owner_type") {

			conditionData.owner_type_id = parseInt($(this).attr('data-type'));

		}
		$(this).parents('.J_line').find('a').removeClass('active');
		$(this).addClass('active');

		isContinued = false;
		showCondition();

	});

	//点击搜索框
	$('#J_search_btn').click(function() {
		var str = $('#J_search_input')[0].value;
		showSearch(checkSearch(str));
	});

	//点击加载更多
	$('#J_load').click(function() {

		conditionData.page_index++;

		isContinued = true;

		if (searchStatus == "search") {
			showSearch();
		} else if (searchStatus == "condition") {
			showCondition();
		}
	})

	//检查搜索输入字段（目前还未检查）
	function checkSearch(str) {
		return str;
	}

	//显示搜索条件接口的数据
	function showCondition() {
		searchStatus = "condition";
		reLoad();
		index.searchCondition(conditionData, fillData);
	};

	//显示搜索框接口的数据
	function showSearch(str) {
		searchStatus = "search";
		reLoad();
		index.search({
			summary_des: str
		}, fillData);
	};

	function fillData(data) {
		$.J_apply($('.J_template_main'), {
			list: data
		});
	}

	//重新加载数据的操作,帮助模板加载
	function reLoad() {
		if (!isContinued) {
			$('.J_datalist').remove();
			conditionData.page_index = 0; //重设page_index
		}
	}


	//默认操作
	var city = $('span.city',conTitle);
	city.text(preLoadData.city.content);
	var school = $('span.school',conTitle);
	school.text(preLoadData.school.content);
	showCondition();

})