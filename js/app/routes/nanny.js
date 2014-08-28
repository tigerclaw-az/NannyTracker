define([], function() {
	Path.map("#!/nanny").to(function() {
	}).enter(function() {
		require(['tpl!template/nanny.html', 'tpl!template/completed-task.html', 'moment'], function(tplNanny, tplCT) {
			var $containerCompleted = $('.container-completed');

			$('#main').append($(tplNanny.apply({
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
					}]					
				}]
			})));

			$containerCompleted.append(tplCT.apply({				
					action: 'Change Diaper',
					time: moment().format('lll'),
					'isNote?': true,
					note: 'Screamed entire time'
			}));

			$('[data-mark-complete]').on('click', function(e) {
				var $target = $(e.target);

				// console.debug(e);
				// 1. Add completed task to "Completed" sidebar with current
				//    time. (use momentjs)
				$containerCompleted.append(tplCT.apply({
					// Fill in information from row that was clicked
				}))
			});

			$('[data-add-notes]').on('click', function(e) {
				// console.debug(e);
				// Show textarea when clicked
			});
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});