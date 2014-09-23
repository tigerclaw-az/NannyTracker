define(['jquery', 'jquery.spin'], function($) {
	Path.map("#!/parent").to(function() {
		var isParent;

		$('#main').spin('xlarge');

		if ( !JSON.parse(sessionStorage.getItem("isLoggedIn")) ) {
			window.location.hash = '#!/login';
		}

		isParent = JSON.parse(sessionStorage.getItem("isParent"));
		if (!isParent) {
			window.location.hash = '#!/nanny';
		}
	}).enter(function() {
		require([
			'moment', 'tpl!template/parent.html'
		], function(moment, tpl) {					
			$.ajax({
				url: 'api/index.php/parents/' + sessionStorage.getItem("parentId") + '/children',//should be the parent that owns this nanny's id
				type: 'GET',
			}).done(function(data) {
				$('#main').append($(tpl.apply({
					messages: [{
						message: 'Hey!',
						time: moment().subtract(3, 'days').format('lll')
					}, {
						message: 'Uh-oh',
						time: moment().format('lll')
					}],
					completedActions: [{
						action: 'Nap',
						startTime: '1:00',
						endTime: '5:00',
						notes: 'The child slept well!'
					}]

				})));
			}).fail(function() {

			})
			.always(function() {
				$('#main').spin(false);
			});			
		});
	}).exit(function() {
		// Exit from route
		$('#main').spin(false);
		$('#main').off().empty();
	});
});
