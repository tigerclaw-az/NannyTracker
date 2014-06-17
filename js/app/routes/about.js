define([], function() {
	Path.map("#!/about").to(function(){
	}).enter(function() {
		require(['tpl!template/about.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
