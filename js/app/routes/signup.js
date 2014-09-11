define([], function() {
	Path.map("#!/signup").to(function(){
	}).enter(function() {
		require(['tpl!template/signup.html'], function(tpl) {

			$('#main').append($(tpl.apply()));

			$('#close').on('click', function(){
				$('#container-login-error').addClass('hide');
			})

			$('#signup').on('submit', function(e) {
				var email   = $('#email').val(),
					pass    = $('#pass').val(),
					first   = $('#first').val(),
					last    = $('#last').val(),
					address = $('#address').val(),
					city    = $('#city').val(),
					state   = $('#state').val(),
					phone   = $('#phone').val(),
					dob     = $('#dob').val(),
					gender  = $('#gender').val(),
					xhr;

				xhr = $.ajax({
					url: 'api/index.php/signup',
					type: 'POST',
					data: JSON.stringify({
						email:     email,
						password:  pass,
						firstname: first,
						lastname:  last,
						address:   address,
						city:      city,
						state:     state,
						phone:     phone,
						dob:       dob,
						gender:    gender,
					})
				});

				xhr
				.done(function(response) {
					//$('#signup-sent').text(response).show();
					//your request has been sent please check your email.
				}).fail(function(jqXHR, status, error) {
					var response = JSON.parse(jqXHR.responseText);
						
					$('#container-signup-error').removeClass('hide');
					$('#signup-error').text(response.statusText).show();
				})
				.always(function(response) {
					// always stuff
					console.debug(response);
				});

				e.preventDefault();
			});
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
