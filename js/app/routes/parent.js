define([], function() {
	Path.map("#!/parent").to(function(){
	}).enter(function() {
		require(['tpl!template/parent.html', 'moment' ], function(tpl) {
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
