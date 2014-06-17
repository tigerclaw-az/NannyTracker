define([], function() {
	Path.map("#!/signup").to(function(){
	}).enter(function() {
		require(['tpl!template/signup.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
	});
});
