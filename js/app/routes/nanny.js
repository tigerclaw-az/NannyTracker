define([], function() {
	Path.map("#!/nanny").to(function() {
	}).enter(function() {
		require(['tpl!template/nanny.html', 'tpl!template/completed-task.html'], function(tplNanny, tplCT) {

			// FIXME: Should probably check if user is a Nanny before redirecting
			// var isNanny = JSON.parse(sessionStorage.getItem("isNanny"));
			var isNanny = true;
			if (!isNanny) {
				window.location.hash = '#!/parent';
			}

			var notesDfd = $.Deferred().resolve('This is a test'),
				messagesDfd = $.Deferred().resolve([{
						message: 'Hey!',
						time: moment().subtract(3, 'days').format('lll')
					}, {
						message: 'Uh-oh',
						time: moment().format('lll')
					}]),
				childrenDfd = $.ajax({
					url: 'api/index.php/parents/' + sessionStorage.getItem("assocParentId") + '/children',//should be the parent that owns this nanny's id
					type: 'GET',
				});

			// Wait for all AJAX calls to complete
			$.when(notesDfd, messagesDfd, childrenDfd)
				.done(function(notes, messages, children) {
					var tabs = [];

					children.forEach(function(obj) {
						tabs.push({
							'isActive?': true,
							name: obj.name
						});
					});
					$('#main').append($(tplNanny.apply({
						generalNotes: notes,
						messages: messages,
						childrenTabs: tabs,
						children: children
					})));
				}).fail(function() {

				})
				.always(function() {

				});

			$('#button-logout').on('click', function(e) {
				sessionStorage.clear();
				for(var i = 0; i <= sessionStorage.length; i++) {
				    var key = sessionStorage.key(i);
			   		sessionStorage.removeItem(key);
				}

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
