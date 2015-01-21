var binder = {
    ENTER_KEY : 13,
    isTouch: false,
    isMoved: false,
    init : function () {
        try {
            document.createEvent("TouchEvent");
            binder.isTouch = true;            
        } catch (e) {
        }
        
        if (binder.isTouch) {            
            $(document).bind('touchstart', function() {
                binder.isMoved = false;                
            });
            $(document).bind('touchmove', function() {                
                binder.isMoved = true;
            });
        } else {
            $(document).bind('mousedown', function() {
                binder.isMoved = false;                
            }); 
            
            $(document).bind('mousemove', function() {                
                binder.isMoved = true;
            });            
        }
    },
    tap : function (e, call) {                        
        if (binder.isTouch) {
            e.bind('touchend', function(e) {
                if (!binder.isMoved) call(e);
            });
        } else {
            e.bind('click', function(e) {                
                if (!binder.isMoved) call(e);
            });
        }        
    },
    up : function (e, call) {
        if (binder.isMoved) return;
        
        if (binder.isTouch) {
            e.bind('touchend', function(e) {
                if (!binder.isMoved) call(e);
            });
        } else {
            e.bind('mouseup', function(e) {                
                if (!binder.isMoved) call(e);
            });
        }
    },
    down : function (e, call) {
        if (binder.isMoved) return;
        
        if (binder.isTouch) {
            e.bind('touchstart', function(e) {
                if (!binder.isMoved) call(e);
            });
        } else {
            e.bind('mousedown', function(e) {                
                if (!binder.isMoved) call(e);
            });
        }
    },
    blur : function(e, call) {
        e.bind('blur', call);
    },
    keyup : function(e, call) {
        e.bind('keyup', call);
    }
};

