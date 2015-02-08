var binder = {
    ENTER_KEY : 13,
    isTouch: false,
    isMoved: false,
    startDistance: {x:0,y:0},
    init : function () {        
        try {
            document.createEvent("TouchEvent");
            binder.isTouch = true;            
        } catch (e) {
        }
        
        if (binder.isTouch) {                        
            $(document).bind('touchstart', function(e) {                
                binder.isMoved = false;                            
                binder.startDistance.x = e.originalEvent.touches[0].pageX;
                binder.startDistance.y = e.originalEvent.touches[0].pageY;
            });
            $(document).bind('touchmove', function() {                
                binder.isMoved = true;
            });
        } else {
            $(document).bind('mousedown', function(e) {
                binder.isMoved = false;       
                binder.startDistance.x = e.screenX;
                binder.startDistance.y = e.screenY;
            }); 
            
            $(document).bind('mousemove', function(e) {                
                binder.isMoved = true;                
            });            
        }
    },
    validateClick: function(e) {
        if (binder.isTouch) {            
            if (Math.abs(binder.startDistance.x - e.originalEvent.changedTouches[0].pageX) > 50) return false;
            if (Math.abs(binder.startDistance.y - e.originalEvent.changedTouches[0].pageY) > 50) return false;            
            return true;
        } else {
            if (Math.abs(binder.startDistance.x - e.screenX) > 50) return false;
            if (Math.abs(binder.startDistance.y - e.screenY) > 50) return false;
            return true;
        }
        
        return false;
    },
    tap : function (e, call) {                        
        if (binder.isTouch) {
            e.bind('touchend', function(e) {                
                if (binder.validateClick(e)) call(e);
            });
        } else {
            e.bind('click', function(e) {                
                if (binder.validateClick(e)) call(e);
            });
        }        
    },
    up : function (e, call) {       
        if (binder.isTouch) {
            e.bind('touchend', function(e) {
                if (binder.validateClick(e)) call(e);
            });
        } else {
            e.bind('mouseup', function(e) {                
                if (binder.validateClick(e)) call(e);
            });
        }
    },
    down : function (e, call) {        
        if (binder.isTouch) {
            e.bind('touchstart', function(e) {
                if (binder.validateClick()) call(e);
            });
        } else {
            e.bind('mousedown', function(e) {                
                if (binder.validateClick()) call(e);
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

