define([], function() {
	Path.map("#!/parent").to(function(){
	}).enter(function() {
		require(['tpl!template/parent.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
