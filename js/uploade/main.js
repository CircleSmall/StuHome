require(['common/common', 'uploade/uploade', 'server/server'], function($, uploade, server) {

	var J_first = $('#first_step');
	var J_second = $('#second_step');
	var J_third = $('#third_step');
	var J_done = $('#J_done');

	var FORM_DATA = {};
	FORM_DATA.photo = []; //初始化图片数组

	var onePicStr = $('.J_onePic').html();

	checkForm(); //表单的验证

	// 点击第一步的下一步
	$('#J_first_next', J_first).click(function() {
		//先校验input是否全部添加完成
		var checkFormResult = checkAllInput();
		if (checkFormResult !== "ok") {
			alert(checkFormResult);
			return;
		}
		FORM_DATA = {}; //清空表单数据
		FORM_DATA = $.J_translateFormData($('form', J_first));
		FORM_DATA.photo = [];
		$.J_url.setHash('second');
	});

	//点击选择图片
	J_second.on("change", '.J_uploade_img_input', function() {
		var onePic = $(this).parents('.J_onePic');
		var form = $(this).parent();
		uploade.checkImg(form, function(data) {
			var result = data;
			if (result.check_result == "ok") {
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
		//给图片数组赋值
		FORM_DATA.photo = [];
		$('.showImg img').each(function() {
			FORM_DATA.photo.push($(this).attr("src"));
		});
		console.log(FORM_DATA.photo)
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
		J_third.children('.row').remove();
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

	//表单验证
	function checkForm() {
		//房源标题验证
		$('.room-title', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_title', J_first).find('.warn');
			if (str.length > 20 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});

		//联系人验证
		$('.contact-person', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_ownername', J_first).find('.warn');
			if (str.length > 6 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});

		//联系电话验证
		$('.contact-phone', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_phone', J_first).find('.warn');
			if (str.length > 11 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});

		//详细地址验证
		$('.J_address', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_address', J_first).find('.warn');
			if (str.length > 30 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});

		//房间介绍验证
		$('.room-intro', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_roomintro', J_first).find('.warn');
			if (str.length > 140 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});

		//价格介绍验证
		$('.price', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_price', J_first).find('.warn');
			if (str.length > 20 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});

		//平方大小验证
		$('.J_area_size', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_areasize', J_first).find('.warn');
			var reg = /^[0-9]*[1-9][0-9]*$/gi;
			if (str.length > 10 || str.length <= 0 || !reg.test(str)) {
				warnDOM.text("请输入正确的数字");
			} else {
				warnDOM.text("");
			}
		});

		//几室几厅验证
		$('.J_area_num', J_first).blur(function() {
			var str = $(this).val();
			var warnDOM = $('.J_add_areanum', J_first).find('.warn');
			if (str.length > 8 || str.length <= 0) {
				warnDOM.text("您输入的字符不符合格式");
			} else {
				warnDOM.text("");
			}
		});
	}

	function checkAllInput() {
		var str = "ok";
		if ($('.warn', J_first).text().length > 0) {
			str = "请填写正确再点击下一步"
		} else if ($('.hot-water input:checked', J_first).length == 0) {
			str = "请确定是否有热水";
		} else if ($('.network input:checked', J_first).length == 0) {
			str = "请确定是否有网络";
		} else if ($('.ac input:checked', J_first).length == 0) {
			str = "请确定是否有空调";
		} else if ($('.wc input:checked', J_first).length == 0) {
			str = "请确定是否有卫生间";
		}
		return str;
	}

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