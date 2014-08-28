define([], function() {
	Path.map("#!/home").to(function(){
	}).enter(function() {
		require(['tpl!template/home.html'], function(tpl) {
			$('#main').append($(tpl.apply()));
			var loggedIn = false,
				showProfileBtn = function() {
					if (loggedIn) {
						$("#loginPanel").addClass('hidden');
						$("#userPanel").removeClass('hidden');
					} else {
						$("#loginPanel").removeClass('hidden');
						$("#userPanel").addClass('hidden');
					}
				};
			
			showProfileBtn();

			$('body').on('slid.bs.carousel', '#homeSlider', function() { 
				var caption = $("#caption");
				var heading = "heading";
				var body = "body text";

				var carouselData = $(this).data('bs.carousel');
			  	var currentIndex = carouselData.getActiveIndex();

			  	var content = [
				  		{heading: "Join Now!", body: "The easies way to get started today is to click the Sign Up button on the upper right corner of your screen. We look forward to having you as a new member of our ever-growing community!", btn: "signup",},
				  		{heading: "Get to know Us!", body: "Our community of Parents and Nannies creates such a great community we want to tell you all about it. Click the button below to learn more about Nanny Tracker.", btn: "about",},
				  		{heading: "Having Trouble?", body: "If you're having trouble naviging through Nanny Tracker or finding the information you need to find, then all you need to do is visit our FAQ page.", btn: "faq",},
			  		];

			    caption.empty();
			    caption.append('\
			    	<h3>' + content[currentIndex].heading + '</h3><p>' + content[currentIndex].body + '</p><br>\
					<a class="btn btn-primary" href="#!/' + content[currentIndex].btn + '">learn more</a>\
				');

			});
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});