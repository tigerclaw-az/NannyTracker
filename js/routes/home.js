define([], function() {
	Path.map("#!/home").to(function(){
	}).enter(function() {
		require(['text!tpl/hello.html'], function(tplHello) {
			$('body').append(tplHello.apply({
				name: 'Erik'
			}));
		})
	}).exit(function() {
		// Exit from route
	});	
});