$(function() {

	SVGInjector(document.getElementById('inject-me'));

	var $leftHead = $('.features__heading--left'),
		$rightHead = $('.features__heading--right'),
		$leftText = $('.features__text--left'),
		$rightText = $('.features__text--right'),
		$triangle = $('.triangle');

	$leftHead.click(function() {
		activator($leftHead, $leftText, $rightHead, $rightText, 25);
	});

	$rightHead.click(function() {
		activator($rightHead, $rightText, $leftHead, $leftText, 75);
	});

	function activator(enableHead, enableText, disableHead, disableText, triangle) {
		enableHead.addClass('active');
		enableText.addClass('active');
		disableHead.removeClass('active');
		disableText.removeClass('active');
		$triangle.css("left", triangle + "%").css('marginLeft', '-5px');
	};


	$('.plan__trigger').click(function () {
		$(this).parent().toggleClass('active');
		$(this).parent().siblings().removeClass('active');
	})


	var owl = $('.owl-carousel'),
		owlOptions = {
			nav: true,
			loop: true,
			dots: true,
			dotsEach: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1
				}
			}
		};

	if ($(window).width() < 769) {
		var owlActive = owl.owlCarousel(owlOptions);
	} else {
		owl.addClass('off');
	}

	$(window).resize(function() {
		if ($(window).width() < 769) {
			if ($('.owl-carousel').hasClass('off')) {
				var owlActive = owl.owlCarousel(owlOptions);
				owl.removeClass('off');
			}
			var owlActive = owl.owlCarousel(owlOptions);
		} else {
			if (!$('.owl-carousel').hasClass('off')) {
				owl.addClass('off').trigger('destroy.owl.carousel');
				owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
			}
		}
	});

	$('.owl-dot').click(function () {
	  owl.trigger('to.owl.carousel', [$(this).index(), 300]);
	  $(this).addClass('active').siblings().removeClass('active');
	});

});
