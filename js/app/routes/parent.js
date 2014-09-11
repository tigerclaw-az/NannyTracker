define([], function() {
	Path.map("#!/parent").to(function(){
	}).enter(function() {
		require(['tpl!template/parent.html', 'moment' ], function(tpl) {

		$.ajax({
			url: 'api/index.php/children',
			type: 'GET',
		}).done(function(data) {
			// put children where they go
		}).fail(function() {
			
		})
		.always(function() {
			console.debug(arguments);
		});

		$('#logout').on('click', function(e) {
				var xhr;				

					xhr = $.ajax({
						url: 'api/index.php/logout',
						type: 'GET',
					});

					xhr
					.done(function(data) {
						window.location.hash = '#!/home';
					}).fail(function() {
						
					})
					.always(function() {
						console.debug(arguments);
					});

				e.preventDefault();
			});
			
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

		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();

	});
});
