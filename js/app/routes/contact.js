define([], function() {
	Path.map("#!/contact").to(function(){
	}).enter(function() {
		require(['tpl!template/contact.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
