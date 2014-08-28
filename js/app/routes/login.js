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

			$('#login').on('submit', function(e) {
				$.ajax({
					url: '/api/index.php/login',
					dataType: 'json',
					type: 'POST',
					data: JSON.stringify({
						username: $('#email').val(),
						password: $('#pass').val()
					})
				}).done(function() {
					console.log('PASS');
				}).fail(function() {
					console.log('FAIL');
				}).always(function() {
					console.debug(arguments);
				});

				console.log("I'm FIRST!");	

				e.preventDefault();
				// return false;
			});					
		});
	}).exit(function() {
		// Exit from route
		$('header').show();
		$('#main').off().empty().removeClass('transparent-background');
		$('footer').show();
	});
});

