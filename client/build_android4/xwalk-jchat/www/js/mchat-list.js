function newChatlist(id) {
    var self = {};
    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
    }

    self.onMessageTap = undefined;
    self.onTimeTap = undefined;    
    self.onDangerUrl = undefined;

    self.workplace.addClass("mchatlist");

    self.workplace.append($('\
                            <div class="title">\
                            </div>\
                            <img class="load" src="img/loader.gif" />\
                            <div class="messages">\
                            </div>'));
    self.title = self.workplace.find(".title");
    self.messages = self.workplace.find(".messages");
    self.loadIndicator = self.workplace.find('.load');
    
    self.smileExpr = /\(\(\d+\)\)/g;
    self.urlExpr = /(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))/;
    
    self.fixMessage = function(str) {
        var counter = 0;
        var repls = {};
        for (var y=0; y<str.length; y++) {
            var r1 = str.match(self.smileExpr);
            var r2 = str.match(self.urlExpr);

            if (!isEmpty(r1)) {
                var smile = r1[0];
                var num = smile.substring(2, smile.length - 2);
                repls[counter] = '<img src="{0}/chat/i/{1}.gif" />'.format(global.chatRoot, num);
                str = str.replace(smile, "{{" + counter + "}}");
                counter += 1;
            }
            if (!isEmpty(r2)) {
                var url = r2[0];                
                repls[counter] = '<a class="redir" href="javascript:void(0)">{0}</a>'.format(url);
                str = str.replace(url, "{{" + counter + "}}");
                counter += 1;
            }

            if (isEmpty(r1) && isEmpty(r2)) {
                break;
            }
        }                                
        for (var k = 0; k < counter; k++) {
            var ss = repls[k];
            str = str.replace("{{" + k + "}}", ss);
        }
        
        return str;
    };
    
    self.addItem = function (item) {
        if ((item.color === "LOGIN") || (item.color === "LOGOUT") || (item.fromid === null)) return;
        var msg = self.fixMessage(item.message);
        
        var nick = item.to === "" ? item.from : item.from + " к " + item.to;
        var stampStr = moment(item.stamp * 1000).format("HH:mm:ss");

        var newItem = $('<div class="item" data-login="{4}">\
                              <table cellpadding="0" cellspacing="0">\
                                <tr>\
                                    <td class="photo onmessage">\
                                        <img class="circle64" src="{0}/chat/gallery/ok/{1}.jpg" />\
                                    </td>\
                                    <td class="data onmessage">\
                                        <div class="nick">{2}</div>\
                                        <div class="message">{5}</div>\
                                    </td>\
                                    <td class="ontime">\
                                        <div class="time">{3}</div>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td>\
                                    </td>\
                                    <td class="line" colspan="3">\
                                        <hr>\
                                    </td>\
                                </tr>\
                              </table>\
                              </div>'.format(global.chatRoot, item.fromid, nick, stampStr, item.from, msg));
        
        var redirs = newItem.find('a.redir');
        if (redirs.length > 0) {            
            binder.tap(redirs, function(e) {                
                if (self.onDangerUrl !== undefined) self.onDangerUrl(e.target.innerText);
            });
        }
        
        binder.tap(newItem.find('.onmessage'), function () {
            if (self.onMessageTap)
                self.onMessageTap(newItem.attr("data-login"));
        });

        binder.tap(newItem.find('.ontime'), function (e) {
            if (self.onMessageTap)
                self.onMessageTap(newItem.attr("data-login"));
            if (self.onTimeTap)
                self.onTimeTap(newItem.find('.time').text());
        });

        self.messages.prepend(newItem);
        newItem.fadeIn("slow");
    };

    self.addItems = function (items) {
        for (var i = 0; i < items.length; i++) {
         self.addItem(items[i]);
         }
    };

    self.clearLast = function () {
        var childs = self.messages.children();
        if (childs.length > chatService.messageLimit) {
            for (var i = chatService.messageLimit; i < childs.length; i++) {                
                $(childs[i]).remove();
            }
        }
    };

    self.setTitle = function (text) {
        self.title.text(text);
    };

    self.hide = function () {
        self.workplace.hide();
    };

    self.showLoadIndicator = function () {
        self.loadIndicator.show();
    };

    self.hideLoadIndicator = function () {
        self.loadIndicator.hide();
    };   

    return self;
}