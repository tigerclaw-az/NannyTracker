define([], function() {
	Path.map("#!/faq").to(function(){
	}).enter(function() {
		require(['tpl!template/faq.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
