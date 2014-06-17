define([], function() {
	Path.map("#!/nanny").to(function(){
	}).enter(function() {
		require(['tpl!template/nanny.html'], function(tplNanny) {
			$('#container').append($(tplNanny.apply()));
		});
	}).exit(function() {
		// Exit from route
	});
});
