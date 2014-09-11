define([], function() {
	Path.map("#!/login").to(function(){
	}).enter(function() {
		require(['tpl!template/login.html'], function(tpl){
			$('#main').append($(tpl.apply()));

			$('header').hide();
			$('#main').addClass('transparent-background');
			$('footer').hide();

			$('#forgot-password').on('click', function(){
				if($(this).is(':checked')){
					$('#pass').hide();
					$('#button-login').addClass('hide');
					$('#button-reset').removeClass('hide');
				}else{
					$('#pass').show();
					$('#button-login').removeClass('hide');
					$('#button-reset').addClass('hide');
				}
			});

			$('#login').on('submit', function(e) {
				// $('#button-login i').removeClass('hidden').addClass('fa-spin');
				var $target = $(e.target),
					user = $('#email').val(),
					pass = $('#pass').val(),
					xhr;

				if ($('#button-login').is(':visible')) {
					xhr = $.ajax({
						url: 'api/index.php/login',
						type: 'POST',
						data: JSON.stringify({
							username: user,
							password: pass
						})
					});

					xhr
					// .then(function() { /* pass */ }, function() { /* fail */ })
					.done(function(response) {
						var user = response.data[0];

						if (user.isParent) {
							window.location.hash = '#!/parent';
						} else {
							window.location.hash = '#!/nanny';
						}
					}).fail(function(jqXHR, status, error) {
						$('#container-login-error').removeClass('hide');
						$('#login-error').text(error);
					})
					.always(function() {
						// $('#button-login i').removeClass('fa-spin').addClass('hidden');
					});
				} else {
					xhr = $.ajax({
						url: 'api/index.php/reset',
						type: 'POST',
						data: JSON.stringify({
							username: user
						})
					});

					xhr
					// .then(function() { /* pass */ }, function() { /* fail */ })
					.done(function(data) {
						// Show success message to user
					}).fail(function() {
						// Show fail message to user
					})
					.always(function() {
						console.debug(arguments);
						// $('#button-login i').removeClass('fa-spin').addClass('hidden');
					});
				}

				e.preventDefault();
			});
		});
	}).exit(function() {
		// Exit from route
		$('header').show();
		$('#main').off().empty().removeClass('transparent-background');
		$('footer').show();
	});
});

