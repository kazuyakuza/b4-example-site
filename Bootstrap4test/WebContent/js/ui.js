/* Nav Bar */
jQuery(document).ready(function() {
	on_scroll_fix_navbar_on_top ();
});

function on_scroll_fix_navbar_on_top ()
{
	var nav_wrapper = $("div#nav-wrapper");
	
	if (nav_wrapper.length == 0)
		return;
	
	var navbar = nav_wrapper.find("nav#nav");
	
	if (navbar.length == 0)
		return;
	
	var set_fixed_position = navbar.position().top + -0.5;
	navbar
	.after('<div id="temporal_space" style="display:none;"></div>');
	var temporal_space = navbar.next("#temporal_space");
	temporal_space.css("min-height", navbar.height() + "px");
	temporal_space.css("min-width", navbar.width() + "px");
	
	$(window).scroll(function() {
		fix_navbar_on_outViewport(nav_wrapper, navbar, set_fixed_position, temporal_space);
	});
	
	fix_navbar_on_outViewport(nav_wrapper, navbar, set_fixed_position, temporal_space);
}

function fix_navbar_on_outViewport (nav_wrapper, navbar, set_fixed_position, temporal_space) {
	if ($(window).scrollTop()
		> set_fixed_position)
	{
		if (!navbar.hasClass("top_fixed"))
		{
			navbar
			.addClass("top_fixed");
			
			temporal_space
			.fadeIn(0);
		}
	} 
	else if (navbar.hasClass("top_fixed"))
	{
		navbar
		.removeClass("top_fixed");
					
		temporal_space
		.fadeOut(0);
	}
}

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}