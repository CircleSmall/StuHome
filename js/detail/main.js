require(['common/common', 'detail/detail'], function($, detail) {

	var bizObj = detail.getBizObj;
	bizObj.room_id = $.J_url.getPara("roomId");

	//拿到初始化数据并渲染
	detail.getDetailData(bizObj.room_id, function(data) {
		var imgLength = data.img_path.length;
		$.J_apply($('.J_template_detail'), data, function() {
			var imgShow = $('.imgShow');
			var divAbsolute = $('.sliderAbsolute', imgShow);
			var imgW = 88;

			// 给图片添加active
			if (bizObj["img_path"].length <= 0) {
				return;
			}

			$('.sliderAbsolute .item:eq(0)', imgShow).addClass('active');
			$('.show', imgShow).attr("src", bizObj["img_path"][0].url);

			//动画效果
			$('.sliderAbsolute .item', imgShow).click(function() {
				$(this).parent().children('.item').removeClass('active');
				$(this).addClass('active');
				$('.show', imgShow).attr('src', $(this).children('img').attr("src"));
			});

			$('.slider .direction', imgShow).click(function() {
				var translateX;
				if ($(this).hasClass("left")) {
					translateX = translate(parseInt(divAbsolute.css('left')), +1);
				} else if ($(this).hasClass("right")) {
					translateX = translate(parseInt(divAbsolute.css('left')), -1);
				}

				if (translateX === false) {
					return;
				}
				divAbsolute.animate({
					left: translateX.toString() + "px"
				});
			});

			function translate(val, num) {
				val = val + num * imgW;
				var l = imgLength * imgW - 4 * imgW;
				if (val < -1 * l) {
					return false;
				} else if (val > 0) {
					return false;
				}
				return val;
			}

		});

	});
})