define([], function() {
	Path.map("#!/login").to(function(){
	}).enter(function() {
		require(['tpl!template/login.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
		$(document).ready(function(){
			$('header').hide();
			$('#main').css('background-color', 'rgba(0,0,0,0)');
			$('footer').hide();
		});
	}).exit(function() {
		// Exit from route
		$('header').show();
		$('#main').off().empty().css('background-color', '#fff');
		$('footer').show();
	});
});

$('body').on('click', '#signupCheck', function(){
    if($(this).is(':checked')){
		$('#pass').fadeOut();
		$('#loginBtn').empty().html('Reset').attr('href', '/sendReset');
    }else{
		$('#pass').fadeIn();
		$('#loginBtn').empty().html('Login').attr('href', '#');
    }
});