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
    $.fn.extend({
        //设置select的选项
        setOptions: function(options, selected) {
            var $this = this;
            $this.empty();
            for (var key in options) {
                if (key == selected)
                    $this.append('<option value="'+key+'" selected>'+options[key]+'</option>');
                else
                    $this.append('<option value="'+key+'">'+options[key]+'</option>');
            }

            return this;
        },

        top: function() {
            var node = $(this);
            while(node.parent().length) {
                node = node.parent();
            }
            return node;
        },

        smsCon: function(Operation_code,message,dataurl) {
            var $this = this;
            //不同的code不同的操作
            if(Operation_code == 1){
                $this.addClass('disable');
                $this.prev('div.sms_note').removeClass('alert').addClass('success');
                $this.prev('div.sms_note').text(message);
                var text = $this.children().text();
                var secends = 60;
                var t = setInterval(function(){
                    if (--secends < 0) {
                        clearInterval(t);
                        $this.removeClass('disable').children().text('Send Code');
                        $this.next().children('input[name=sms_verify_code]').attr('placeholder','Enter Verification Code').next().removeClass('incorrect');
                    } else {
                        $this.children().text('Resend Code ' + ' ' + secends);
                    }
                    if (secends < 57) {
                        $this.next().next().removeClass('hide').removeClass('disable');
                        $this.next().children('input[name=sms_verify_code]').removeClass('hide');
                    }
                }, 1000);

                return false;
            }else if(Operation_code == -1){
                $this.prev('div.sms_note').removeClass('success').addClass('alert');
                $this.prev('div.sms_note').text(message);
                $this.next().next().addClass('hide').addClass('disable');
                $this.next().children('input[name=sms_verify_code]').addClass('hide');
                return false;
            }else if(Operation_code == -2){
                $this.addClass('disable');
                $this.prev('div.sms_note').removeClass('success').addClass('alert');
                $this.prev('div.sms_note').text(message);
                var text = $this.children().text();
                var secends = 60;
                var t = setInterval(function(){
                    if (--secends < 0) {
                        clearInterval(t);
                        $this.removeClass('disable').children().text('Send Code');
                        $this.next().children('input[name=sms_verify_code]').attr('placeholder','Enter Verification Code').next().removeClass('incorrect');
                    } else {
                        $this.children().text('Resend Code ' + ' ' + secends);
                    }
                    if (secends < 57) {
                        $this.next().next().removeClass('hide').removeClass('disable');
                        $this.next().children('input[name=sms_verify_code]').removeClass('hide');
                    }
                }, 1000);

                return false;
            }else if(Operation_code == -7){
                $this.addClass('disable');
                $this.prev('div.sms_note').removeClass('success').addClass('alert');
                var message =  '<a href=\"'+dataurl+'\">'+message+'</a>';
                $this.prev('div.sms_note').html(message);
                $this.next().next().addClass('hide').addClass('disable');
                $this.next().children('input[name=sms_verify_code]').addClass('hide');
                return false;
            }
            return this;
        },

        call_sms: function(Operation_code, message) {
            var $this = this;
            if(Operation_code == 1){
                $this.next().removeClass('disable').find('input').removeAttr('disabled');
                $this.siblings(".btw").eq(0).prev('div.sms_note').removeClass('alert');
                $this.siblings(".btw").eq(0).prev('div.sms_note').addClass('success');
                $this.siblings(".btw").eq(0).prev('div.sms_note').text(message);
                $this.prev('div').remove();
                $this.siblings(".btw").eq(0).remove();
                $this.remove();
            }else if(Operation_code == -3){
                $this.prev('div').children('input[name=sms_verify_code]').val('').next().removeClass('loading');
                $this.siblings(".btw").eq(0).prev('div.sms_note').removeClass('success');
                $this.siblings(".btw").eq(0).prev('div.sms_note').addClass('alert');
                $this.siblings(".btw").eq(0).prev('div.sms_note').text(message);
            }else{
                $this.prev('div').children('input[name=sms_verify_code]').val('').next().removeClass('loading');
                $this.siblings(".btw").eq(0).prev('div.sms_note').removeClass('success');
                $this.siblings(".btw").eq(0).prev('div.sms_note').addClass('alert');
                $this.siblings(".btw").eq(0).prev('div.sms_note').text(message);
            }
            return this;
        },
    });
}( jQuery ));