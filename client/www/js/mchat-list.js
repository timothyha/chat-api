function newChatlist(id) {
    var self = {};
    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
    }
    
    self.onMessageTap = undefined;
    self.onTimeTap = undefined;

    self.workplace.addClass("mchatlist");    
    self.workplace.append($('<div class="title"></div><div class="messages"></div>'));    
    self.title = self.workplace.find(".title");
    self.messages = self.workplace.find(".messages");
        
    self.addItem = function (item) {        
        if (item.color === 'LOGIN') return;
        if (item.color === 'LOGOUT') return;
        var nick = item.to === "" ? item.from : item.from + " к " + item.to;                      
        var stampStr = moment(item.stamp * 1000).format("HH:mm:ss");
        
        var newItem = $('<div class="item" data-login="{5}">\
                              <table cellpadding="0" cellspacing="0">\
                                <tr>\
                                    <td class="photo onmessage">\
                                        <img class="circle64" src="{0}/chat/gallery/ok/{1}.jpg" />\
                                    </td>\
                                    <td class="data onmessage">\
                                        <div class="nick">{2}</div>\
                                        <div class="message">{3}</div>\
                                    </td>\
                                    <td class="ontime">\
                                        <div class="time">{4}</div>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td>\
                                    </td>\
                                    <td class="line">\
                                        <hr>\
                                    </td>\
                                </tr>\
                              </table>\
                              </div>'.format(global.chatRoot, item.fromid, nick, item.message, stampStr, item.from));
        
        binder.tap(newItem.find('.onmessage'), function() {
            if (self.onMessageTap) self.onMessageTap(newItem.attr("data-login"));
        });
        
        binder.tap(newItem.find('.ontime'), function() {
            if (self.onMessageTap) self.onMessageTap(newItem.attr("data-login"));
            if (self.onTimeTap) self.onTimeTap($(this).find('.time').text());
        });
        
        self.messages.prepend(newItem);
        newItem.fadeIn("slow");
    };

    self.addItems = function (items) {
        for (var i = 0; i < items.length; i++) {
            self.addItem(items[i]);
        }                
    };
    
    self.clearLast = function() {
        var childs = self.messages.children();
        if (childs.length > chatService.messageLimit) {
            var toRemove = childs.slice(-(childs.length - chatService.messageLimit));            
            for (var i = 0; i < toRemove.length; i++) {
                toRemove[i].remove();
            }            
        }
    };
    
    self.setTitle = function(text) {
        self.title.text(text);
    };
    
    self.hide = function () {
        self.workplace.hide();
    };

    return self;
}