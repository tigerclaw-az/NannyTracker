define([], function() {
	Path.map("#!/nanny").to(function() {
	}).enter(function() {
		require(['tpl!template/nanny.html', 'tpl!template/completed-task.html'], function(tplNanny, tplCT) {
			var parentId = sessionStorage.getItem("parentId")
			$.ajax({
				url: 'api/index.php/parents/:' + parentId + '/children',//should be the parent that owns this nanny's id
				type: 'GET',
			}).done(function(data) {
				console.log(data); // should be the children that belong to the parent that this nanny belongs to
				// $('#main').append($(tplNanny.apply({
					// then the children has is be here as 
					//data
				// })));	
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

			$('.js-mark-complete').on('click', function(e) {
				var $target = $(e.target),
					$containerCompleted = $($('#myTab .active a').attr('href')).find('.container-completed'),
					$actionBox = $target.parents('.js-container-actions'),
					action = $actionBox.find('.js-action-name').text(),
					$note = $actionBox.find('.js-action-note');

				$containerCompleted.append(tplCT.apply({
					action: action,
					time: moment().format('lll'),
					'isNote?': $note.val().length === 0 ? false : true,
					note: $note.val()
				}));

				$note.addClass('hide');
			});

			$('.js-container-completed-actions').delegate('.js-edit-completed-action', 'click', function(e) {
				var $target = $(e.target),
					$completedAction = $target.parents('.js-container-completed-action'),
					$note = $completedAction.find('.js-container-completed-action-note'),
					$time = $completedAction.find('.js-container-completed-action-time');

				// FIXME: This needs to be moved
				$completedAction.find('.date').datetimepicker();

				$note
					.find('.js-completed-action-note-text').addClass('hide')
					.end()
					.find('.js-completed-action-note-input').removeClass('hide');

				$time
					.find('.js-completed-action-time-text').addClass('hide')
					.end()
					.find('.js-completed-action-time-input').removeClass('hide');

				$completedAction.find('.js-edit-completed-action-done')
					.removeClass('hide')
					.on('click', function(e) {
						$(this).addClass('hide').off();

						// TODO: Save edited data to Database
						$note
							.find('.js-completed-action-note-text').removeClass('hide')
							.end()
							.find('.js-completed-action-note-input').addClass('hide');

						$time
							.find('.js-completed-action-time-text').removeClass('hide')
							.end()
							.find('.js-completed-action-time-input').addClass('hide');						
					});
			});			

			$('.js-add-notes').on('click', function(e) {					
				var $target = $(e.target)
					$actionBox = $target.parents('.js-container-actions')
					$note = $actionBox.find('.js-action-note');

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
