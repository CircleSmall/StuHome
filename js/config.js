
require.config({
	waitSeconds : 2000,
	baseUrl : '../js',
	paths : {
		'jquery': 'lib/jquery',
		'jquery-form': 'lib/jquery.form',
		'mustache':'lib/mustache',
		'json2':'lib/json2',
		'tmpl':'lib/tmpl'
	},
	shim : {
		'jquery-form' : ['jquery']
	},
	urlArgs : 'version=' + (new Date()).getTime()
});
