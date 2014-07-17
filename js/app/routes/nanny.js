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

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
