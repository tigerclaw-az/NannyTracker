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
	'route/home', 'route/nanny', 'route/signup',
	'route/about', 'route/contact', 'route/faq', 'route/login', 'route/testimonials',
], function() {
	Path.rescue(function() {
		// TODO - Redirect to 404 page
	});

	Path.root("#!/home");

	Path.listen();
});
