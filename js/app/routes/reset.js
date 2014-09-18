define([], function() {
	Path.map("#!/reset(/:hash)").to(function(){
	}).enter(function() {
		var hash = this.params['hash'];
		
		require(['tpl!template/reset.html'], function(tpl){
			$('#main').append($(tpl.apply()));

			$('header').hide();
			$('#main').addClass('transparent-background');
			$('footer').hide();		
		});
	}).exit(function() {
		// Exit from route
		$('header').show();
		$('#main').off().empty().removeClass('transparent-background');
		$('footer').show();
	});
});

