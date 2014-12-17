function newSendPanel(id) {
    var self = {};
    self.onSend = undefined;
    self.onClearUser = undefined;
    self.onClearTime = undefined;

    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
    }

    self.workplace.addClass("msendpanel");

    self.workplace.append(
            '<table cellpadding="0" cellspacing="0">\
                <tr>\
                    <td class="smile"><div class="inner icon-smile"></div></td>\
                    <td class="message">\
                        <input placeholder="Сообщение" />\
                        <div class="user"></div>\
                        <div class="time"></div>\
                    </td>\
                    <td class="send"><div class="mbutton">Отпр.</div></td>\
                </tr>\
            </table>');

    self.message = self.workplace.find('.message input');
    self.button = self.workplace.find('.send .mbutton');
    binder.tap(self.button, function () {
        if (self.onSend) {
            self.send();
        }
    });
    
    binder.tap(self.workplace.find('.user'), function() {
        self.clearUser();
    });
    
    binder.keyup(self.message, function(e) {
        if (e.keyCode === binder.ENTER_KEY) {
            self.send();
        }
    });  
    
    self.send = function() {
        var val = self.message.val();
        if (val === "") return;
        self.onSend(val);
        self.message.val("");
    };
    
    self.setUser = function(name) {
        if (name === undefined) return;
        var user = self.workplace.find('.user');
        var inp = self.workplace.find('.message input');
        user.text(name);
        user.show();
        inp.css('text-indent', user.outerWidth() + 8);
    };
    
    self.setTime = function(time) {
        
    };
    
    self.clearUser = function() {
        self.workplace.find('.message .user').hide();
        var inp = self.workplace.find('.message input');
        inp.css('text-indent', 0);
        if (self.onClearUser !== undefined) self.onClearUser();
    };
    
    self.clearTime = function() {
        
    };
        
    return self;
}