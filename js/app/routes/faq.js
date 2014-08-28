define([], function() {
	Path.map("#!/faq").to(function(){
	}).enter(function() {
		require(['tpl!template/faq.html', 'moment'], function(tpl) {
			$('#main').append($(tpl.apply({
				faqRow: [{
					subject: 'Newcommers!',
					description: 'blah blah blah blah',
					numTopics: '37',
					numReplies: '45',
					recentPost: 'blah blah blah blah',
				},{
					subject: 'Newcommers!',
					description: 'blah blah blah blah',
					numTopics: '37',
					numReplies: '45',
					recentPost: 'blah blah blah blah',
				},{
					subject: 'Newcommers!',
					description: 'blah blah blah blah',
					numTopics: '37',
					numReplies: '45',
					recentPost: 'blah blah blah blah',
				},],
			})));
		});
	}).exit(function() {
		// Exit from route
		$('#main').off().empty();
	});
});
