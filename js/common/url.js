/**
 * url
 */
define('common/url', function() {
	
	//给值为"?"的参数复值
	var urlMerge = function(para,data) {
		var re = {};
		for (var i in data) {
			if(para[i] && para[i] == "?") {
				re[i] = data[i];
			}
		}
		return re;
	}


	return {
		urlMerge: urlMerge
	}

})