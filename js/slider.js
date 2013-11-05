/*
	Plugin Name: Responsive Fullscreen Touch Slider
	Author: Brandon Beeks
	Version: 1.0
	Website: http://beeks.me/store/fullscreen-slider
*/

//Make sure we don't conflict with other libraries that use $
(function($) {
	$.fn.slider = function(options) {

		//Set our defaults, in case no settings vars are passed in
		var settings = $.extend({
      slide_class     : 'slide', 
      animation_speed : 300,
      transition      : 'vertical',
      touch_enabled   : true,
      auto_rotate			: true,
      rotate_speed		: 5000,
      pause_on_click  : true,
      show_controls   : true,
      next_id         : 'next',
      prev_id         : 'prev'
    }, options);

    var slideClass 		 = '.' + settings.slide_class,
    		animationSpeed = settings.animation_speed,
    		transition		 = settings.transition,
    		touchEnabled   = settings.touch_enabled,
    		autoRotate     = settings.auto_rotate,
    		rotateSpeed    = settings.rotate_speed,
    		pauseOnClick   = settings.pause_on_click,
    		showControls   = settings.show_controls,
    		nextId         = '#' + settings.next_id,
    		prevId         = '#' + settings.prev_id;

		//TODO pass in transition variable to determine if slides will go up/down, left/right, or fade

		//set our window height to a variable to limit making multiple calls
		var windowHeight = $(window).height(),
				windowWidth  = $(window).width();

		//find the first and next slide
		var current = $(slideClass + ':first-child'),
				next		= current.next(slideClass),
				prev 		= current.prev(slideClass);

		current.addClass('current');

		if (transition === 'vertical') {
			next.addClass('next').css('top', windowHeight);
			prev.addClass('prev').css('top', -windowHeight);
		}
		if (transition === 'horizontal') {
			next.addClass('next').css('left', windowWidth);
			prev.addClass('prev').css('left', -windowWidth);
		}
		if (transition === 'fade') {
			$('.slide').hide();
			current.show();
		}

		//Show//Hide our slide controls on page load, based on if there is a next/prev slide
		if (showControls) {
			if (!next.length) { $(nextId).hide() }
			if (!prev.length) { $(prevId).hide() }
		} else {
			$(nextId).hide();
			$(prevId).hide();
		}

		//Move the slides up 1 slide
		function nextSlide() {
			if (next.length) {

				if (transition === 'vertical') {
					//animate the current slide upward
					current.animate({
						top: -windowHeight
					}, animationSpeed);

					//animate the slide below into view
					next.animate({
						top: 0
					}, animationSpeed);
				}
				if (transition === 'horizontal') {
					//animate the current slide left
					current.animate({
						left: -windowWidth
					}, animationSpeed);

					//animate the slide to the right into view
					next.animate({
						left: 0
					}, animationSpeed);
				}
				if (transition === 'fade') {
					//animate the current slide upward
					current.fadeOut(animationSpeed);

					//animate the slide below into view
					next.fadeIn(animationSpeed);
				}

				//Update our slide classes
				prev.removeClass('prev');
				current.removeClass('current').addClass('prev');
				next.removeClass('next').addClass('current');

				if (transition === 'vertical') {
					next.next('.slide').addClass('next').css('top', windowHeight);
				}
				if (transition === 'horizontal') {
					next.next('.slide').addClass('next').css('left', windowWidth);
				}
				if (transition === 'fade') {
					next.next('.slide').addClass('next');
				}

				//update our slide vars
				current = $(slideClass + '.current');
				next 		= $(slideClass + '.next');
				prev 		= $(slideClass + '.prev');

				//Update our slide controls
				if (showControls) {
					if (!next.length) {
						$(nextId).hide();
						$(prevId).show();
					} else {
						$(nextId).show();
						$(prevId).show();
					}
				}
			}
		}

		//Move the slides down 1 slide
		function prevSlide() {
			if (prev.length) {

				if (transition === 'vertical') {
					//animate the current slide downward
					current.animate({
						top: windowHeight
					}, animationSpeed);

					//animate the slide above into view
					prev.animate({
						top: 0
					}, animationSpeed);
				} 
				if (transition === 'horizontal') {
					//animate the current slide downward
					current.animate({
						left: windowWidth
					}, animationSpeed);

					//animate the slide above into view
					prev.animate({
						left: 0
					}, animationSpeed);
				}
				if (transition === 'fade') {
					current.fadeOut(animationSpeed);
					prev.fadeIn(animationSpeed)
				}

				//Update our slide classes
				next.removeClass('next');
				current.removeClass('current').addClass('next');
				prev.removeClass('prev').addClass('current');

				if (transition === 'vertical') {
					prev.prev('.slide').addClass('prev').css('top', -windowHeight);
				}
				if (transition === 'horizontal') {
					prev.prev('.slide').addClass('prev').css('left', -windowWidth);
				}
				if (transition === 'fade') {
					prev.prev('.slide').addClass('prev');
				}

				//update our slide vars
				current = $(slideClass + '.current');
				next 		= $(slideClass + '.next');
				prev 		= $(slideClass + '.prev');

				//Update our slide controls
				if (showControls) {
					if (!prev.length) {
						$(prevId).hide();
						$(nextId).show();
					} else {
						$(prevId).show();
						$(nextId).show();
					}
				}
			}
		}

		//Event handlers for our slide controls
		$(nextId).on('click', function() {
			nextSlide();

			//Pause on click
			if (pauseOnClick) { clearInterval(rotateSlides); }

			return false;
		});

		$(prevId).on('click', function() {
			prevSlide();

			//Pause on click
			if (pauseOnClick) { clearInterval(rotateSlides); }

			return false;
		});

		//Add swipe capabilities using the touchSwipe jquery library
		if (touchEnabled) {
			$(slideClass).swipe( {
				swipeUp:function(event, direction, distance, duration, fingerCount) {
					nextSlide();
				},
				swipeDown:function(event, direction, distance, duration, fingerCount) {
					prevSlide();
				},
				//This controls how far the user must swipe (in pixels)
				threshold:0
			});
		}

		//Auto rotate
		if (autoRotate) {
			var numSlides = $(slideClass).length - 1, //4
					count     = 0;
			var rotateSlides = setInterval(function() {
				if (count < numSlides) {
					nextSlide();
					count++;
				} else {
					prevSlide();
					count++;
					if (count === ($(slideClass).length*2)-2) {
						count = 0;
					}
				}
				console.log(count + ':' + numSlides);
			}, rotateSpeed);
		}

		//Need to reset our variables and position of slides if the window size changes
		$(window).resize(function() {
			windowHeight = $(window).height();
			windowWidth  = $(window).width();

			if (transition === 'vertical') {
				next.css('top', windowHeight);
				prev.css('top', -windowHeight);
			}
			if (transition === 'horizontal') {
				next.css('left', windowWidth);
				prev.css('left', -windowWidth);
			}
		});
	}
}(jQuery));