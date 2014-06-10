require.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app',
		route: '../routes',
		tpl: '../templates'
	}
});

require(['route/home'], function() {
	Path.root("#!/home");

	Path.listen();
});