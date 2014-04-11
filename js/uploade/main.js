require(['common/common', 'uploade/uploade'], function($, uploade) {

	var J_first = $('#first_step');
	var J_second = $('#second_step');
	var J_third = $('#third_step');
	var J_done = $('#J_done');

	var FORM_STR;

	// 点击事件监听
	$('#J_first_next', J_first).click(function() {
		FORM_STR = $('form',J_first).formSerialize();
		console.log(FORM_STR);
		$.J_url.setHash('second');
	});

	//点击选择图片
	$('.J_uploade_img_input', J_second).change(function() {

		var me = $(this);
		//限制图片类型
		var filepath = me.val();
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".JPG" && ext != ".GIF" && ext != ".PNG" && ext != ".JPEG") {
			alert("图片限于gif,png,jpg格式");
			return false;
		}
		//限制图片大小
		var img = new Image();
		img.src = filepath;
		img.onload = function(){
			if (img.fileSize > 0) {
				if (img.fileSize > 1 * 1024) {
					alert("图片不大于2M。");
					return false;
				}
			}
		};

		return true;
	});

	//返回
	$('.form-return').click(function(){
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