require(['common/common', 'detail/detail'], function($, detail) {

	var bizObj = detail.getBizObj;
	bizObj.room_id = preLoadData.room_id;

	//拿到初始化数据并渲染
	detail.getDetailData(bizObj.room_id, function(data) {
		$.J_apply($('.J_template_detail'), data, function() {
			//动画效果
			var imgShow = $('.imgShow');

			$('.sliderAbsolute .item', imgShow).click(function() {
				$(this).parent().children('.item').removeClass('active');
				$(this).addClass('active');
				$('.show', imgShow).attr('src', $(this).children('img').attr("src"));
			});

		});

	});



})