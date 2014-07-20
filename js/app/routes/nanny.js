define([], function() {
	Path.map("#!/nanny").to(function(){
	}).enter(function() {
		require(['tpl!template/nanny.html'], function(tplNanny) {
			$('#main').append($(tplNanny.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
