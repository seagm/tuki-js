(function ($) {
    $.call = function (funcName) {
        var callLevel = funcName.split('.');

        if (callLevel.length == 1) {
            window[callLevel[0]].apply(window, Array.prototype.slice.call(arguments, 1))
        } else if (callLevel.length == 2) {
            window[callLevel[0]][callLevel[1]].apply(window[callLevel[0]], Array.prototype.slice.call(arguments, 1))
        } else if (callLevel.length == 3) {
            window[callLevel[0]][callLevel[1]][callLevel[2]].apply(window[callLevel[0]][callLevel[1]], Array.prototype.slice.call(arguments, 1))
        } else {
            alert('Call level up to two levels');
        }

        return $
    };

    $.redirect = function (href) {
        location.href = href;
        return $;
    },

        $.delayRedirect = function (href, delayTime) {
            setTimeout(function () {
                location.href = href;
            }, delayTime);
            return $;
        },

        $.refresh = function () {
            location.reload();
            return $;
        },

        $.reload = function () {
            location.reload();
            return $;
        },

        /*seagm业务*/
        $.popup = function (body, title) {
            popup_box(body, title);
            return $;
        };

    $.closePopup = function () {
        close_popup_box();
        return $;
    };

    $.alert = function (message, tiptime) {
        popup_alert(message, tiptime);
        return $;
    },

        $.notify = function (message) {
            popup_notify(message);
            return $;
        },

        $.postform = function (uri, postfields) {
            $tip.removeClass('hide');
            jQuery.post(uri, postfields, function (data) {
                if (tipTimer == undefined) $tip.addClass('hide');
                processResponse([], data);
            }, 'json');

            return $;
        },

        $.iframe = function (url, w, h, c) {
            popup_iframe(url, w, h, c);
            return $;
        }
    /*seagm业务*/
}(jQuery));

(function ($) {
    $.fn.extend({
        //设置select的选项
        setOptions: function (options, selected) {
            var $this = this;
            $this.empty();
            for (var key in options) {
                if (key == selected)
                    $this.append('<option value="' + key + '" selected>' + options[key] + '</option>');
                else
                    $this.append('<option value="' + key + '">' + options[key] + '</option>');
            }

            return this;
        },

        top: function () {
            var node = $(this);
            while (node.parent().length) {
                node = node.parent();
            }
            return node;
        },

        /*seagm业务*/
        smsCon: function (Operation_code, message, dataurl) {
            var $this = this;
            //不同的code不同的操作
            if (Operation_code == 1) {
                $this.addClass('disabled');
                $this.prev('div.sms_note').removeClass('alert').addClass('success');
                $this.prev('div.sms_note').text(message);
                var text = $this.children().text();
                var secends = 60;
                var t = setInterval(function () {
                    if (--secends < 0) {
                        clearInterval(t);
                        $this.removeClass('disabled').children().text('Send Code');
                        $this.next().children('input[name=sms_verify_code]').attr('placeholder', 'Enter Verification Code').next().removeClass('incorrect');
                    } else {
                        $this.children().text('Resend ' + ' ' + secends);
                    }
                    if (secends < 57) {
                        $this.next().next().removeClass('hide').removeClass('disabled');
                        $this.next().children('input[name=sms_verify_code]').removeClass('hide');
                    }
                }, 1000);
                return false;
            } else if (Operation_code == -1) {
                $this.prev('div.sms_note').removeClass('success').addClass('alert');
                $this.prev('div.sms_note').text(message);
                $this.prev().next().next().find('div.alert').text(message);
                $this.next().next().addClass('hide').addClass('disabled');
                $this.next().children('input[name=sms_verify_code]').addClass('hide');
                return false;
            } else if (Operation_code == -2) {
                $this.addClass('disabled');
                $this.prev('div.sms_note').removeClass('success').addClass('alert');
                $this.prev('div.sms_note').text(message);
                var text = $this.children().text();
                var secends = 60;
                var t = setInterval(function () {
                    if (--secends < 0) {
                        clearInterval(t);
                        $this.removeClass('disabled').children().text('Send Code');
                        $this.next().children('input[name=sms_verify_code]').attr('placeholder', 'Enter Verification Code').next().removeClass('incorrect');
                    } else {
                        $this.children().text('Resend ' + ' ' + secends);
                    }
                    if (secends < 57) {
                        $this.next().next().removeClass('hide').removeClass('disabled');
                        $this.next().children('input[name=sms_verify_code]').removeClass('hide');
                    }
                }, 1000);

                return false;
            } else if (Operation_code == -7) {
                $this.addClass('disabled');
                $this.prev('div.sms_note').removeClass('success').addClass('alert');
                var message = '<a href=\"' + dataurl + '\">' + message + '</a>';
                $this.prev('div.sms_note').html(message);
                $this.next().next().addClass('hide').addClass('disable');
                $this.next().children('input[name=sms_verify_code]').addClass('hide');
                return false;
            }
            return this;
        },

        call_sms: function (Operation_code, message) {
            var $this = this;
            if (Operation_code == 1) {
                $this.next().removeClass('disable').find('input').removeAttr('disabled');
                $this.siblings(".btw").eq(0).prev('div.sms_note').removeClass('alert');
                $this.siblings(".btw").eq(0).prev('div.sms_note').addClass('success');
                $this.siblings(".btw").eq(0).prev('div.sms_note').text(message);
                $this.prev('div').remove();
                $this.siblings(".btw").eq(0).remove();
                $this.remove();
            } else if (Operation_code == -3) {
                $this.prev('div').children('input[name=sms_verify_code]').val('').next().removeClass('loading');
                $this.siblings(".btw").eq(0).prev('div.sms_note').removeClass('success');
                $this.siblings(".btw").eq(0).prev('div.sms_note').addClass('alert');
                $this.siblings(".btw").eq(0).prev('div.sms_note').text(message);
            } else {
                $this.prev('div').children('input[name=sms_verify_code]').val('').next().removeClass('loading');
                $this.siblings(".btw").eq(0).prev('div.sms_note').removeClass('success');
                $this.siblings(".btw").eq(0).prev('div.sms_note').addClass('alert');
                $this.siblings(".btw").eq(0).prev('div.sms_note').text(message);
            }
            return this;
        }
        /*seagm业务*/
    });
}(jQuery));