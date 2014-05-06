require(['common/common', 'uploade/uploade', 'server/server'], function($, uploade, server) {

	var J_first = $('#first_step');
	var J_second = $('#second_step');
	var J_third = $('#third_step');
	var J_done = $('#J_done');

	var FORM_DATA = {};
	var FORM_IMG = {};

	var onePicStr = $('.J_onePic').html();

	// 点击第一步的下一步
	$('#J_first_next', J_first).click(function() {
		FORM_DATA = {}; //清空表单数据
		FORM_DATA = $.J_translateFormData($('form', J_first));
		FORM_DATA.photo = FORM_IMG;
		$.J_url.setHash('second');
	});

	//点击选择图片
	J_second.on("change", '.J_uploade_img_input', function() {
		var onePic = $(this).parents('.J_onePic');
		var form = $(this).parent();
		uploade.checkImg(form, function(data) {
			var result = data;
			if (result.check_result == "ok") {
				FORM_IMG["img_url" + onePic.attr('data-id')] = result.img_path;
				var imgUrl = server.baseUrl + result.img_path;
				var str = '<img src="' + imgUrl + '" alt="">';
				$('.showImg', onePic).html(str);
			} else {
				return;
			}

		})
	});

	//点击继续添加图片
	$('#J_addPic').click(function() {
		var id = parseInt($(this).attr('data-total')) + 1;
		$(this).parent().before('<div class="J_onePic" data-id="' + id + '">' + onePicStr + '</div>');
		$(this).attr('data-total', id);
	});

	//点击第二步的下一步
	$('#J_second_next', J_second).click(function() {
		//序列化得到的表单元素
		var templateData = [];
		for (var i in FORM_DATA) {
			if (i == "photo") {
				//排除图片数据
				continue;
			}
			var obj = {};
			obj.name = i;
			obj.value = FORM_DATA[i];
			templateData.push(uploade.mapResultData(obj));
		};

		$.J_apply($('.J_template_third'), {
			list: templateData
		});

		$.J_url.setHash('third');
	});

	//点击确认上传
	$('#J_submit', J_third).click(function() {
		uploade.uploadeData(FORM_DATA, function() {
			$.J_url.setHash('done');
		});
	})

	//点击继续上传
	$('#J_continue_submit', J_done).click(function() {
		location.reload();
	})

	//返回
	$('.form-return').click(function() {
		history.go(-1);
	});

	//hash监听
	window.onhashchange = function() {
		$('.J_panel').hide();
		$(window).scrollTop(0);
		var level = $.J_url.getHash();
		switch (level) {
			case '#first':
				J_first.show();
				break;
			case '#second':
				J_second.show();
				break;
			case '#third':
				J_third.show();
				break;
			case '#done':
				J_done.show();
				break;
			default:
				J_first.show();
		}
	}

	//设置默认hash
	$.J_url.setHash('first');
	$('.J_panel').hide();
	J_first.show();
	$('.help').show();
})