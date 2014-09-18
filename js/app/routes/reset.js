define([], function() {
	Path.map("#!/reset(/:hash)").to(function(){
	}).enter(function() {
		var hash = this.params['hash'];
		
		require(['tpl!template/reset.html'], function(tpl){
			$('#main').append($(tpl.apply()));

			$('header').hidden();
			$('#main').addClass('transparent-background');
			$('footer').hidden();		
		});
	}).exit(function() {
		// Exit from route
		$('header').show();
		$('#main').off().empty().removeClass('transparent-background');
		$('footer').show();
	});
});

