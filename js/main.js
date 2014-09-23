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
	'alertify',
	'route/home', 'route/about', 'route/contact',
	'route/faq', 'route/login', 'route/signup',
	'route/testimonials', 'route/nanny', 'route/parent',
	'route/reset'
], function(alertify) {
	Path.rescue(function() {
		// window.location = '/404.html';
	});

	Path.root("#!/home");

	Path.listen();

	$(document).delegate('#button-logout', 'click', function(e) {
		var i = 0,
			key;

		sessionStorage.clear();

		for (i = 0; i <= sessionStorage.length; i++) {
		    key = sessionStorage.key(i);
	   		sessionStorage.removeItem(key);
		}

		$.ajax({
			url: 'api/index.php/logout',
			type: 'GET',
		})
		.done(function(data) {
			alertify.success('Logout successful');
			window.location.hash = '#!/home';
		}).fail(function() {
			alertify.error('Unable to logout');
		})
		.always(function() {
		});

		e.preventDefault();
	});

	$.ajaxSetup({
		dataType: 'json'
	});
});