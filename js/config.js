
var baseUrl = '../js',
	version = (new Date()).getTime();

require.config({
	waitSeconds : 2000,
	baseUrl : baseUrl,
	paths : {
		jquery: 'common/jquery-1.10.2.min'
	},
	urlArgs : 'version=' + version
});
