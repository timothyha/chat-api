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
                        <table cellpadding="0" cellspacing="0" class="inner">\
                            <tr>\
                                <td class="tags">\
                                    <table cellpadding="0" cellspacing="0" class="w100">\
                                        <tr>\
                                            <td class="tag">\
                                                <div class="user"></div>\
                                            </td>\
                                            <td class="tag">\
                                                <div class="time"></div>\
                                            </td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td class="mess-td">\
                                    <input class="message-input" disabled="disabled" placeholder="Сообщение"/>\
                                </td>\
                            </tr>\
                        </table>\
                    </td>\
                    <td class="send"><div class="mbutton">Отпр.</div></td>\
                </tr>\
            </table>\
            <div class="smile-popup">\
            </div>\
            '.format(global.chatRoot));          
        
    self.message = self.workplace.find('.message-input');
    self.button = self.workplace.find('.send .mbutton');
    self.smileButton = self.workplace.find('.smile');
    self.smilePopup = self.workplace.find('.smile-popup');
    
    for (var i = 1; i < 91; i++) {
        if ((i === 89) || (i === 98) || (i === 99)) continue;
        var img = $('<img src="{0}/chat/i/{1}.gif" data-code="{1}" />'.format(global.chatRoot, i));
        binder.tap(img, function(e) {            
            self.message.val('{0}(({1}))'.format(self.message.val(),$(e.target).attr('data-code')));
        });
        self.smilePopup.append(img);
    }
    
    binder.tap(self.button, function () {
        if (self.onSend) {
            self.send();
        }
    });
    
    binder.tap(self.workplace.find('.user'), function(e) {
        self.clearUser(); 
        self.clearFocus();
    });
    
    binder.tap(self.workplace.find('.time'), function(e) {        
        self.clearTime();        
        self.clearFocus();
    });
    
    binder.tap(self.workplace.find(".mess-td"), function(e) {        
       self.message.removeAttr("disabled");
       self.message.focus();
    });
    
    binder.tap(self.message, function(e) {        
        //self.message.removeAttr("disabled");
    });
    
    binder.keyup(self.message, function(e) {
        if (e.keyCode === binder.ENTER_KEY) {
            self.send();
        }
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
        self.workplace.find('.tags').show();
        user.text(name);
        user.show();
    };
    
    self.clearUser = function() {
        self.clearTime();
        self.workplace.find('.tags').hide();
        self.workplace.find('.message .user').hide();
        if (self.onClearUser !== undefined) self.onClearUser();
    };
    
    self.setTime = function(stamp) {
        if (stamp === undefined) return;
        var time = self.workplace.find('.time');
        time.text(stamp);
        time.show();
    };       
    
    self.clearTime = function() {
        self.workplace.find('.message .time').hide();
        var inp = self.workplace.find('.message input');                
        if (self.onClearTime !== undefined) self.onClearTime();
    };
    
    self.clearFocus = function() {        
        self.message.attr("disabled", "disabled");
        self.message.blur();        
    };
        
    return self;
}