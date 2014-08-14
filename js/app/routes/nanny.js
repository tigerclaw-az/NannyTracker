define([], function() {
	Path.map("#!/nanny").to(function() {
	}).enter(function() {
		require(['tpl!template/nanny.html', 'moment'], function(tpl) {
			$('#main').append($(tpl.apply({
				generalNotes: 'Big blurb of text',
				messages: [{
					message: 'Hey!',
					time: moment().subtract(3, 'days').format('lll')
				}, {
					message: 'Uh-oh',
					time: moment().format('lll')
				}],
				childrenTabs: [{
					'isActive?': true,
					name: 'Brianna'
				}, {
					name: 'Iris'
				}],
				children: [{
					'isActive?': true,
					name: 'Brianna',
					actions: [{
						action: 'Take Bath'
					}, {
						action: 'Feed Dog'
					}],
					completedActions: [{
						action: 'Take Bath',
						time: moment().format('lll')
					}]
				}, {
					name: 'Iris',
					actions: [{
						action: 'Change Diaper'
					}, {
						action: 'Dinner'
					}, {
						action: 'Bath'
					}],
					completedActions: [{
						action: 'Change Diaper',
						time: moment().format('lll'),
						'isNote?': true,
						note: 'Screamed entire time'
					}]
				}]
			})));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});