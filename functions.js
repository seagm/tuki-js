//拦截点击
(function(w) {
    w.console = w.console || {
        log: function () {
            return;
        }
    };

//全局元素
    var $head = $('head');
    var $body = $('body');
    //拦截 表单提交
    $body.on('submit', 'form[target="background"]', function () {
        var formData = new FormData(this);
        var $form = $(this);
        $.ajax(this.action, {
            type: 'POST',
            url: this.action,
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            timeout: 15000,
        }).done(function (data, textStatus) {
            processResponse($form, data);
        }).fail(function (jqXHR, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
            alert(err);
        }).always(function () {
        });
        return false;
    });
    //拦截 普通链接
    $body.on('click', 'a[target="background"]', function () {
        var $a = $(this);
        $.getJSON($a.attr('href')
        ).done(function (data) {
            processResponse($a, data);
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
            alert(err);
        }).always(function () {
        });
        return false;
    });
}(window));

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function number2string(number) {
    string = '';
    if (number >= 1000000000) {
        floor1 = Math.floor(number / 10000000) / 100;
        number = number - floor1 * 1000000000;
        string = string + floor1 + 'b';
    } else if (number >= 1000000) {
        floor2 = Math.floor(number / 10000) / 100;
        number = number - floor2 * 1000000;
        string = string + floor2 + 'm';
    } else if (number >= 1000) {
        floor3 = Math.floor(number / 10) / 100;
        number = number - floor3 * 1000;
        string = string + floor3 + 'k';
    } else if (number > 0) {
        string = string + number;
    } else {
        string = '0';
    }
    return string;
};

//处理所有ajax返回
function processResponse($obj, data) {
    //var $this = $obj;
    for (var i = 0; i < data.length; i++) {
        if ('this' === data[i].selector) {
            //$obj = $this;
        } else if ('jQuery' === data[i].selector) {
            $obj = jQuery;
        } else {
            $obj = jQuery(data[i].selector);
        }
        delete data[i].selector;
        for (var command in data[i]) {
            for (var j = 0; j < data[i][command].length; j++) {
                if ('function' == typeof $obj[command]) {
                    $obj = $obj[command].apply($obj, data[i][command][j]);
                } else {
                    alert('function '+command+' does not exist');
                }
            }
        }
    }
}

//