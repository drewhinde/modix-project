(function (window) {
	"use strict";

	// Event is triggered by changing the view typ on results page (grid, list) view
	(function () {
		$(document).on('mdx-view-switch', function () {
			$('.mdx-result-list').toggleClass('tiles-container-10');
		});
	})();

	var $projectName 	= 'bentley',
		$buttonLeft 	= '<button type="button" data-role="none" class="slick-arrow anim-prev ' + $projectName + '-icons-arrow-left" aria-label="Previous" role="button"></button>',
		$buttonRight 	= '<button type="button" data-role="none" class="slick-arrow anim-next ' + $projectName + '-icons-arrow-right" aria-label="Next" role="button"></button>';

	// Tab Handling
	(function () {
		// Event is triggered via main.js from 11111 account so content with different behaviour can be initialized or updated
		$(document).on('mdx-init-tab', function (event, obj) {
			buildTabSlick($(event.target).find('.tab-vehicle-slide'), $(event.target), false);

			buildTabImageSlick($(event.target).find('.image-slide'), $(event.target), false);
		});

		$(document).on('mdx-update-tab', function (event, obj) {
			$(event.target).find('.tab-vehicle-slide, .image-slide').each(function () {
				this.slick.refresh();
			});

			setSimilarHeight($(event.target).find('.tab-vehicle-slide'));
		});

		$(document).on('mdx-leave-tab', function (event, obj) {

		});

		$(window).resize(function(){
			$('.tab-vehicle-slide').each(function() {
				setSimilarHeight($(this));
			});
		});

		function buildTabSlick($elem, $parent, destroy) {
			if (destroy && $elem.getSlick()) {
				$elem.unslick();
			}

			$elem.each(function () {
				$(this).slick({
					dots: false,
					arrows: true,
					infinite: true,
					speed: 300,
					slide: 'article',
					slidesToShow: $(this).data('max'),
					slidesToScroll: $(this).data('max-scroll'),
					autoplay: true,
					autoplaySpeed: $(this).data('duration'),
					responsive: [
						{
							breakpoint: 900,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 700,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								dots: false,
								arrows: false
							}
						}
					]
				});

				setSimilarHeight($(this));
			});
		}

		function buildTabImageSlick($elem, $parent, destroy) {
			/* Used for List View / Detail Page*/
			if (destroy && $elem.getSlick()) {
				$elem.unslick();
			}

			$elem.each(function () {
				$(this).slick({
					dots: true,
					arrows: true,
					prevArrow : $buttonLeft,
					nextArrow : $buttonRight,
					infinite: true,
					speed: 300,
					slidesToShow: 4,
					slidesToScroll: 4,
					autoplay: false,
					autoplaySpeed: 5000,
					lazyLoad: 'ondemand',
					responsive: []
				});
			});
		}

		if ($('#details').length > 0) {
			buildTabImageSlick($('.image-slide'), false, false);
		}
	})();

	// Animation Header Slider
	(function () {
		$('.anim-slick').each(function () {
			$(this).slick({
				slide: 'article',
				dots: true,
				arrows: false,
				prevArrow : $buttonLeft,
				nextArrow : $buttonRight,
				responsive: []
			});
		});
	})();

	// Vehicle-Slider
	(function () {
		$('.vehicle-slide').each(function() {
			var $sliderElement = $(this);

			$sliderElement.slick({
				dots: true,
				arrows: true,
				infinite: true,
				speed: 300,
				slide: 'article',
				slidesToShow: $sliderElement.data('max'),
				slidesToScroll: $sliderElement.data('max-scroll'),
				autoplay: $sliderElement.data('autoplay'),
				autoplaySpeed: $sliderElement.data('duration'),
				prevArrow : $buttonLeft,
				nextArrow : $buttonRight,
				responsive: [
					{
						breakpoint: 1400,
						settings: {
							arrows: false
						}
					},
					{
						breakpoint: 900,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							arrows: false
						}
					},
					{
						breakpoint: 700,
						settings: "unslick"
					}
				]
			});

			// Reinit slick slider when window width was lower than 700px
			$(window).on('resize', function(event) {
				if (!$sliderElement.hasClass('slick-initialized') && getWindowWidth() > 700) {
					$sliderElement.slick('reinit');
				}
			});
		});

		function getWindowWidth() {
			$('html, body').css({
				'overflow' : 'hidden'
			});

			var currentWidth = $(window).innerWidth();

			$('html, body').css({
				'overflow' : ''
			});

			return currentWidth;
		}
	})();

	// News-Slider
	(function () {
		$('.news-slide').each(function() {
			$(this).slick({
				dots: true,
				arrows: true,
				infinite: true,
				speed: 300,
				slide: 'article',
				slidesToShow: $(this).data('max'),
				slidesToScroll: $(this).data('max-scroll'),
				autoplay: false,
				autoplaySpeed: $(this).data('duration'),
				prevArrow : $buttonLeft,
				nextArrow : $buttonRight,
				responsive: [
					{
						breakpoint: 1300,
						settings: {
							arrows: false
						}
					},
					{
						breakpoint: 900,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							arrows: false
						}
					},
					{
						breakpoint: 700,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: false
						}
					}
				]
			});
		});
	})();

	// Toggle search
	$('#search-toggle').click(function(){
		$('#search').slideToggle('search-open', function() {
			$('#search-toggle').toggleClass('toggle');
		});
	});

	// VDP Slider
	(function () {
		$('.detail-slide').each(function() {
			$(this).slick({
				dots: true,
				arrows: true,
				infinite: true,
				speed: 300,
				slide: 'article',
				slidesToShow: $(this).data('max'),
				slidesToScroll: $(this).data('max-scroll'),
				autoplay: false,
				autoplaySpeed: $(this).data('duration'),
				prevArrow : $buttonLeft,
				nextArrow : $buttonRight,
				responsive: [
					{
						breakpoint: 700,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		});
	})();
})(window);
