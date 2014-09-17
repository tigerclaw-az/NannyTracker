define([], function() {
	Path.map("#!/parent").to(function(){
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

			$('#logout').on('click', function(e) {
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
				}).done(function(data) {
					window.location.hash = '#!/home';
				}).fail(function() {

				})
				.always(function() {

				});

				e.preventDefault();
			});
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();

	});
});
