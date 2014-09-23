define([], function() {
	Path.map("#!/parent").to(function() {
		if ( !JSON.parse(sessionStorage.getItem("isLoggedIn")) ) {
			window.location.hash = '#!/login';
		}		
	}).enter(function() {
		require(['tpl!template/parent.html'], function(tpl) {		
			var isParent = JSON.parse(sessionStorage.getItem("isParent"));
			if (!isParent) {
				window.location.hash = '#!/nanny';
			}
			
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
				console.debug(arguments);
			});			
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
