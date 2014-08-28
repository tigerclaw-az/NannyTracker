define([], function() {
	Path.map("#!/login").to(function(){
	}).enter(function() {
		require(['tpl!template/login.html'], function(tpl){
			$('#main').append($(tpl.apply()));

			$('header').hide();
			$('#main').addClass('transparent-background');
			$('footer').hide();

			$('#signupCheck').on('click', function(){
				if ($(this).is(':checked')){
					$('#pass').hide();
					$('#loginBtn').addClass('hide');
					$('#resetBtn').removeClass('hide');
				}else{
					$('#pass').show();
					$('#loginBtn').removeClass('hide');
					$('#resetBtn').addClass('hide');
				}
			});

			$('form').on('submit', function(){
				// 1. Check for login or reset password
				// 2. Perform action accordingly
				return false;
			});

			$('#login').on('submit', function() {
				$.ajax({
					url: '/api/index.php/login',
					dataType: 'json',
					type: 'POST',
					data: JSON.stringify({
						username: $('#email').val(),
						password: $('#pass').val()
					})
				}).always(function() {
					console.debug(arguments);
				});
			});			
		});
	}).exit(function() {
		// Exit from route
		$('header').show();
		$('#main').off().empty().removeClass('transparent-background');
		$('footer').show();
	});
});

