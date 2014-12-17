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
            e.bind('click', call);
        }
    },
    keyup : function(e, call) {
        e.bind('keyup', call);
    }
};

