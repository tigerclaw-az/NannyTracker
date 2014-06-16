define([], function() {
	Path.map("#!/home").to(function(){
	}).enter(function() {
		require(['tpl!template/hello.html'], function(tplHello) {
			$('body').append(tplHello.apply({
				name: 'Erik'
			}));
		});
	}).exit(function() {
		// Exit from route
	});
});
