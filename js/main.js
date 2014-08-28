requirejs.config({
	baseUrl: 'js/lib',
	waitSeconds: 30,

	paths: {
		app: '../app',
		model: '../app/models',
		route: '../app/routes',
		template: '../app/templates',
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

require([
	'route/home', 'route/about', 'route/contact',
	'route/faq', 'route/login', 'route/signup',
	'route/testimonials', 'route/nanny', 'route/parent',
], function() {
	Path.rescue(function() {
		// window.location = '/404.html';
	});

	Path.root("#!/home");

	Path.listen();

	$.ajaxSetup({
		dataType: 'json'
	});
});