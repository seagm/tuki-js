(function( $ ) {
    $.popup = function(body, title) {
        popup_box(body, title);
        return jQuery;
    };
 
    $.closePopup = function() {
        close_popup_box();
        return jQuery;
    };

    $.alert = function (message, tiptime) {
        popup_alert(message, tiptime);
        return jQuery;
    },

    $.notify = function (message) {
        popup_notify(message);
        return jQuery;
    },

    $.redirect = function (href) {
        location.href = href;
        return jQuery;
    },

    $.refresh = function () {
        location.reload();
        return jQuery;
    },

    $.reload =function () {
        location.reload();
        return jQuery;
    },

    $.postform = function (uri, postfields) {
        $tip.removeClass('hide');
        jQuery.post(uri, postfields, function (data) {
            if (tipTimer == undefined) $tip.addClass('hide');
            processResponse([], data);
        }, 'json');

        return jQuery;
    },

    $.iframe = function (url, w, h, c) {
        popup_iframe(url, w, h, c);

        return jQuery;
    }
}( jQuery ));

(function( $ ) {
 

}( jQuery ));