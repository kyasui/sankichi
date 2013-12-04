var co = {
	ui: {
		$splash: $('.splash'),
		$splash_logo: $('.splash-logo'),
		$header: $('.header'),
		$sections: $('.section'),
	},
	wHeight: 0,	
	wWidth: 0,	
	init: function() {		
		$(window).on('resize', co.on_resize).trigger('resize');
		co.init_splash_bg();
		co.bind_events();
	},	
	init_splash_bg: function() {
		if (co.wWidth >= 728) {
			$.supersized({
        		slides: [ {image : 'http://www.keiyasui.com/sankichi/img/splash_bg.jpg', title : ''} ]
        	});
		} else {
			co.ui.$splash.css('background-image', 'url(http://www.keiyasui.com/sankichi/img/splash_bg.jpg)');
		}		
	},
	on_resize: function() {
		co.wHeight = $(window).height();
		co.wWidth = $(window).width();
		co.set_splash_height();

		if (window.location.hash) {
			var the_hash = window.location.hash,
                target_offset = $(the_hash).offset().top;

            $('html, body').animate({
                scrollTop: target_offset
            }, 1000);
		}
	},
	set_splash_height: function() {
		co.ui.$splash.css('height', co.wHeight+ 'px');
		co.ui.$splash_logo.animate({
			opacity: 1.0
		}, 500, function(){
			$('#supersized').delay(500).animate({
				opacity: 1.0
			}, 500);
		});		
	},
	bind_events: function() {
		$('.header').waypoint('sticky', {
  			stuckClass: 'fixed'
		});

		$(document).on('click', '.product', function(e) {
			e.preventDefault();

			var $this = $(this),
				href = $this.find('.detail-link').attr('href') ? $this.find('.detail-link').attr('href') : '';

			if (href) {
				window.location.href = href;
			}			
		});

		$('.splash-nav').on('click', '.nav-link', function(e){ 
            e.preventDefault();

            var $this = $(this),
                target = $this.attr('href'),
                target_offset = $(target).offset().top;

            $('html, body').animate({
                scrollTop:target_offset
            }, 500);

            return false;
        });

        $('.cart').on('click', function(e){
        	e.preventDefault();

        	Store.cart.show();

        	return false;
        });

        co.ui.$sections.waypoint(function (event, direction) {
            var $this = $(this),
                section_id;

            if ($this.attr('id')) {
                section_id = $this.attr('id');

                co.ui.$header.find('a').removeClass('active');
                co.ui.$header.find('.' + section_id + '-link').addClass('active');
            }
        }, {offset: co.ui.$header.height()});
	}
};

$(function(){
	co.init();
});
