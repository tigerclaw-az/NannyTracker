define([], function() {
	Path.map("#!/parent").to(function(){
	}).enter(function() {
		require(['tpl!template/parent.html'], function(tpl) {

		$.ajax({
			url: 'api/index.php/parents/' + sessionStorage.getItem("parentId") + '/children',//should be the parent that owns this nanny's id
			type: 'GET',
		}).done(function(data) {
			console.log(data.data[0]); // should be the children that belong to the parent that this nanny belongs to
			// var output = Mustache.to_html(tplNanny, data[0]);
			// $('#main').append(output);	
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
