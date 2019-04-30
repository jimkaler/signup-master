import $ from 'jquery'

export const enableScrolling = (device) => device === 'desktop' ? $("body").css("overflow", "visible") : $(document).unbind('touchmove');

export const disableScrolling = (device) => device === 'desktop' ? $("body").css("overflow", "hidden") : $(document).bind('touchmove', function(e) { e.preventDefault();});

export const autoScrolling = () => {
    $('body,html').animate({
        scrollTop: 0,
    }, 1000);
}

export const logoAnimation = (effect) => {
    effect === 'add' ? $('.logo').addClass("animation") : $('.logo').removeClass("animation")     
}