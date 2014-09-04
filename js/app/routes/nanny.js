define([], function() {
	Path.map("#!/nanny").to(function() {
	}).enter(function() {
		require(['tpl!template/nanny.html', 'tpl!template/completed-task.html', 'moment'], function(tplNanny, tplCT) {			
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

			var $containerCompleted = $('.container-completed');

			$containerCompleted.append(tplCT.apply({				
					action: 'Change Diaper',
					time: moment().format('lll'),
					'isNote?': true,
					note: 'Screamed entire time'
			}));

			$('[data-mark-complete]').on('click', function(e) {
				var $target = $(e.target),
					$taskBox = $target.parents('[data-task-box]'),
					action = $taskBox.find('[data-action]').text(),
					$note = $taskBox.find('[data-note]');

				console.debug($note.text());

				$containerCompleted.append(tplCT.apply({
					action: action,
					time: moment().format('lll'),
					'isNote?': $note.val().length === 0 ? false : true,
					note: $note.val()
				}));

				$note.addClass('hide');
			});

			$("[data-add-note]").on('click', function(e) {					
				var $target = $(e.target)
					$taskBox = $target.parents('[data-task-box]')
					$note = $taskBox.find('[data-note]');

				  if ( $note.hasClass('hide') ) {
					$note.removeClass('hide');
				  } else {
					$note.addClass('hide');
				  }
			});		
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
