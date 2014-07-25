define([], function() {
	Path.map("#!/login").to(function(){
	}).enter(function() {
		require(['tpl!template/login.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
