define([], function() {
	Path.map("#!/home").to(function(){
	}).enter(function() {
		require(['tpl!template/home.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
	});
});
