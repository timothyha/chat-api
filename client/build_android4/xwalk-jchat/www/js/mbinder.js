var binder = {
    ENTER_KEY : 13,
    isTouch: false,
    init : function () {
        try {
            document.createEvent("TouchEvent");
            binder.isTouch = true;
        } catch (e) {
        }

    },
    tap : function (e, call) {
        if (binder.isTouch) {
            e.bind('touchend', call);
        } else {
            e.bind('mouseup', call);
        }
    },
    up : function (e, call) {
        if (binder.isTouch) {
            e.bind('touchend', call);
        } else {
            e.bind('mouseup', call);
        }
    },
    down : function (e, call) {
        if (binder.isTouch) {
            e.bind('touchstart', call);
        } else {
            e.bind('mousedown', call);
        }
    },
    blur : function(e, call) {
        e.bind('blur', call);
    },
    keyup : function(e, call) {
        e.bind('keyup', call);
    }
};

