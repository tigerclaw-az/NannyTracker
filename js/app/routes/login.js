define([], function() {
	Path.map("#!/login").to(function(){
	}).enter(function() {
		require(['tpl!template/login.html'], function(tpl){
			$('#main').append($(tpl.apply()));

			$('header').hide();
			$('#main').addClass('transparent-background');
			$('footer').hide();

			$('#signupCheck').on('click', function(){
				if($(this).is(':checked')){
					$('#pass').hide();
					$('#loginBtn').addClass('hide');
					$('#resetBtn').removeClass('hide');
				}else{
					$('#pass').show();
					$('#loginBtn').removeClass('hide');
					$('#resetBtn').addClass('hide');
				}
			});

			$('#login').on('submit', function(e) {
				// $('#loginBtn i').removeClass('hidden').addClass('fa-spin');

				var user = $('#email').val(),
					pass = $('#pass').val(),
					xhr = $.ajax({
						url: '/api/index.php/login',
						type: 'POST',
						data: JSON.stringify({
							username: user,
							password: pass
						})
					});

				xhr
				// .then(function() { /* pass */ }, function() { /* fail */ })
				.done(function(data) {
					if (data.userType === 'parent') {
						window.location.hash = '#!/parent';
					} else {
						window.location.hash = '#!/nanny';
					}
				}).fail(function() {
					
				})
				.always(function() {
					console.debug(arguments);
					// $('#loginBtn i').removeClass('fa-spin').addClass('hidden');
				});

				e.preventDefault();
			});

			$('#resetBtn').on('submit', function(e) {

				var user = $('#email').val(),
					xhr = $.ajax({
						url: '/api/index.php/reset',
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
					// $('#loginBtn i').removeClass('fa-spin').addClass('hidden');
				});

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

