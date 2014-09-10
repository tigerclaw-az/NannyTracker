define([], function() {
	Path.map("#!/signup").to(function(){
	}).enter(function() {
		require(['tpl!template/signup.html'], function(tpl) {

			$('#signup').on('submit', function(e) {
				var user    = $('#email').val(),
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
						username:  user,
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
					//$('#signup-error').text(error).show();
				})
				.always(function() {
					// always stuff
				});

				e.preventDefault();
			});

			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
