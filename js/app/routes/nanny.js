define([], function() {
	Path.map("#!/nanny").to(function() {
	}).enter(function() {
		require(['tpl!template/nanny.html', 'tpl!template/completed-task.html'], function(tplNanny, tplCT) {

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

			$('#button-logout').on('click', function(e) {
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

			$('[data-mark-complete]').on('click', function(e) {
				var $target = $(e.target),
					$containerCompleted = $($('#myTab .active a').attr('href')).find('.container-completed'),
					$taskBox = $target.parents('[data-task-box]'),
					action = $taskBox.find('[data-action]').text(),
					$note = $taskBox.find('[data-note]');

				$containerCompleted.append(tplCT.apply({
					action: action,
					time: moment().format('lll'),
					'isNote?': $note.val().length === 0 ? false : true,
					note: $note.val()
				}));

				$note.addClass('hide');
			});

			$('.container-completed').delegate('[data-edit-completed]', 'click', function(e) {
				var $target = $(e.target),
					$completedAction = $target.parents('[data-completed-action]'),
					$note = $completedAction.find('[data-completed-note]'),
					$time = $completedAction.find('[data-completed-time]');

				// FIXME: This needs to be moved
				$('.date').datetimepicker();

				$note
					.find('p').addClass('hide')
					.end()
					.find('input').removeClass('hide');

				$time
					.find('p').addClass('hide')
					.end()
					.find('.date').removeClass('hide');

				$completedAction.find('[data-edit-done]').removeClass('hide');
			});

			$('[data-add-note]').on('click', function(e) {					
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
