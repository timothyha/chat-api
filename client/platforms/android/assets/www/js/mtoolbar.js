function newToolbar(id) {
    var self = {};

    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
    }

    self.workplace.addClass('mtoolbar');

    self.workplace.append($('\
                            <table class="tcontent" cellpadding="0" cellspacing="0">\
                                <tr>\
                                    <td class="left-buttons"><div></div></td>\
                                    <td class="title"></td>\
                                    <td class="right-buttons"><div class="inner"></div></td>\
                                </tr>\
                            </table>'));

    self.addButton = function (item) {
        var b = undefined;
        if (item.type === "normal") {
            b = $('<div class="mbutton">{0}</div>'.format(item.name));
        } else if (item.type === "icon") {
            b = $('<div class="mbutton-icon icon-{0}"></div>'.format(item.icon));
        }

        binder.tap(b, item.onTap)        

        if (item.position === "left") {
            var leftButtons = self.workplace.find('.left-buttons');
            leftButtons.append(b);
        } else if (item.position === "right") {
            var rightButtons = self.workplace.find('.right-buttons .inner');
            rightButtons.append(b);
        }
        return this;
    };

    self.setTitle = function (item) {
        var title = self.workplace.find('.title');        
        if (item.type === "text") {            
            title.text(item.text);
        } else if (item.type === "control") {
            title.append(item.control.workplace);            
        }
        return this;
    }

    return self;
}