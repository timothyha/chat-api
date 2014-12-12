var binder = {
    isTouch: false,
    init: function () {
        try {
            document.createEvent("TouchEvent");
            binder.isTouch = true;
        } catch (e) {
        }

    },
    tap: function (e, call) {
        if (binder.isTouch) {
            e.bind('touchend', call);
        } else {
            e.bind('click', call);
        }
    }
};

