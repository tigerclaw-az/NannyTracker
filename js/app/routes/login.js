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
					$('#password').hide();
					$('#button-login').addClass('hide');
					$('#button-reset').removeClass('hide');
				}else{
					$('#password').show();
					$('#button-login').removeClass('hide');
					$('#button-reset').addClass('hide');
				}
			});

			$('#close').on('click', function(){
				$('#container-login-error').addClass('hide');
			})

			$('#login').on('submit', function(e) {
				// $('#button-login i').removeClass('hidden').addClass('fa-spin');
				var $target = $(e.target),
					user = $('#email').val(),
					pass = $('#password').val(),
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
							console.log(user.id);							
							sessionStorage.setItem("parentId", user.id);
							sessionStorage.setItem("isParent", true);
						} else {
							window.location.hash = '#!/nanny';
							sessionStorage.setItem("parentId", user.parentId);
							sessionStorage.setItem("isParent", false);
						}

						sessionStorage.setItem("isLoggedIn", true);
					}).fail(function(jqXHR, status, error) {
						var response = JSON.parse(jqXHR.responseText);
						
						$('#container-login-error').removeClass('hide');
						$('#login-error').text(response.statusText);
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

