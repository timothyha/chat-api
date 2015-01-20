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
                    <td class="smile">\
                        <div class="inner icon-smile"></div>\
                    </td>\
                    <td class="message">\
                        <input class="message-input" readonly="true" />\
                        <div class="user"></div>\
                        <div class="time"></div>\
                    </td>\
                    <td class="send"><div class="mbutton">Отпр.</div></td>\
                </tr>\
            </table>\
            <div class="smile-popup">\
            </div>\
            '.format(global.chatRoot));

            //<img src="{0}/chat/i/1.gif" data-code="1" />\
    
    self.workplace.find('.message-input').pholder({ 
        className:'placeholder', 
        pholdertext:'Сообщение' 
    });;
        
    self.message = self.workplace.find('.message input');
    self.button = self.workplace.find('.send .mbutton');
    self.smileButton = self.workplace.find('.smile');
    self.smilePopup = self.workplace.find('.smile-popup');
    
    for (var i = 1; i < 91; i++) {
        if ((i === 89) || (i === 98) || (i === 99)) continue;
        var img = $('<img src="{0}/chat/i/{1}.gif" data-code="{1}" />'.format(global.chatRoot, i));
        binder.tap(img, function() {
            if (self.message.hasClass("placeholder")) {
                self.message.removeClass("placeholder");
                self.message.val("");
            }
            self.message.val('{0}(({1}))'.format(self.message.val(),$(this).attr('data-code')));
        });
        self.smilePopup.append(img);
    }
    
    binder.tap(self.button, function () {
        if (self.onSend) {
            self.send();
        }
    });
    
    binder.down(self.workplace.find('.user'), function(e) {
        e.preventDefault();        
        self.clearUser();        
    });
    
    binder.down(self.workplace.find('.time'), function(e) {
        e.preventDefault();        
        self.clearTime();        
    });
    
    binder.keyup(self.message, function(e) {
        if (e.keyCode === binder.ENTER_KEY) {
            self.send();
        }
    });
    
    binder.up(self.message, function(e) {
        $(this).removeAttr("readonly");
    });
    
    binder.blur(self.message, function(e) {
        $(this).attr("readonly", "true");
    });
    
    binder.tap(self.smileButton, function() {
        // Немного магии. Площадь занимаемая смайликами делется на ширину экрана и добавляется отступ
        self.smilePopup.css('height', (128000 / $(window).width()) + 16);
        self.smilePopup.toggle("fast");
        self.smileButton.toggleClass("active");
        self.clearFocus();
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
        /*var width = user.outerWidth() + 8;
        inp.css('padding-left', width);
        inp.css('width', inp.widht() - width);*/
    };
    
    self.clearUser = function() {
        self.clearTime();
        self.workplace.find('.message .user').hide();
        var inp = self.workplace.find('.message input');
        inp.css('text-indent', 0);
        if (self.onClearUser !== undefined) self.onClearUser();
    };
    
    self.setTime = function(stamp) {
        if (stamp === undefined) return;
        var user = self.workplace.find('.user');
        var time = self.workplace.find('.time');
        var inp = self.workplace.find('.message input');
        time.text(stamp);
        time.show();
        time.css('left', user.outerWidth() + 6);
        inp.css('text-indent', user.outerWidth() + time.outerWidth() + 8);
    };       
    
    self.clearTime = function() {
        self.workplace.find('.message .time').hide();
        var inp = self.workplace.find('.message input');
        var user = self.workplace.find('.user');
        inp.css('text-indent', user.outerWidth() + 8);
        if (self.onClearTime !== undefined) self.onClearTime();
    };
    
    self.clearFocus = function() {
        self.workplace.find('.message-input').blur();  
    };
        
    return self;
}