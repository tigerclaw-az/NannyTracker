requirejs.config({
	baseUrl: 'js/lib',
	waitSeconds: 30,

	paths: {
		app: '../app',
		model: '../app/models',
		route: '../app/routes',
		template: '../../templates',
		widget: '../app/widgets',
		worker: '../app/workers',
		root: '../..',

		// requirejs plugins
		text: 'requirejs-plugins/text',
		tpl: 'requirejs-plugins/template',
		image: 'requirejs-plugins/image'
	},
	shim: {

	}
});

require(['route/home'], function() {
	Path.root("#!/home");

	Path.listen();
});
