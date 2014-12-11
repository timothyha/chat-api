function newContentSlider(id) {
    var self = {};
    self.onChanged = null;
            
    self.controls = [];

    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
    }
    
    self.workplace.append($('<table class="host" cellpadding="0" cellspacing="0">\
                        <tr class="inner">\
                        </tr>\
                    </table>'));
    
    self.host = self.workplace.find('.host');
    self.inner = self.workplace.find('.inner');

    self.contentWidth = self.workplace.width();
    self.currentIndex = 0;
    var speed = 500;

    var swipeOptions = {
        triggerOnTouchEnd: true,
        swipeStatus: swipeStatus,
        allowPageScroll: "vertical",
        threshold: 75
    };

    self.workplace.addClass("mcontentslider");
    self.workplace.swipe(swipeOptions);

    function swipeStatus(event, phase, direction, distance) {
        if (phase === "move" && (direction === "left" || direction === "right")) {
            var duration = 0;

            if (direction === "left") {
                scrollContent((self.contentWidth * self.currentIndex) + distance, duration);
            } else if (direction === "right") {
                scrollContent((self.contentWidth * self.currentIndex) - distance, duration);
            }

        } else if (phase === "cancel") {
            scrollContent(self.contentWidth * self.currentIndex, speed);
        } else if (phase === "end") {
            if (direction === "right") {
                previousContent();
            } else if (direction === "left") {
                nextContent();
            }
        }
    }

    function previousContent() {
        self.currentIndex = Math.max(self.currentIndex - 1, 0);
        scrollContent(self.contentWidth * self.currentIndex, speed);
        if (self.onChanged !== null) self.onChanged(self.currentIndex);
    }

    function nextContent() {
        self.currentIndex = Math.min(self.currentIndex + 1, self.controls.length - 1);
        scrollContent(self.contentWidth * self.currentIndex, speed);
        if (self.onChanged !== null) self.onChanged(self.currentIndex);
    }

    function scrollContent(distance, duration) {
        self.host.css("transition-duration", (duration / 1000).toFixed(1) + "s");
        var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
        self.host.css("transform", "translate(" + value + "px,0)");
    }

    self.addControl = function (control) {        
        control.workplace.css("width", self.contentWidth);
        self.controls.push(control);        
        var td = $('<td></td>');        
        td.append(control.workplace);
        self.inner.append(td);
    };
    
    self.resize = function() {
        self.contentWidth = self.workplace.width();
        for (var i = 0; i < self.controls.length; i++) {
            var control = self.controls[i];
            control.workplace.css("width", self.contentWidth);
            var width = control.workplace.width() - (control.workplace.outerWidth() - control.workplace.width());
            control.workplace.css("width", width);
        }
    };

    return self;
}
