define([], function() {
	Path.map("#!/testimonials").to(function(){
	}).enter(function() {
		require(['tpl!template/testimonials.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});