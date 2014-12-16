function newSidePanel(id) {
    var self = {};
    self.onUserInfoTap = undefined;
    self.onUserSelect = undefined;

    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
        $(document.body).append(self.workplace);
    }

    self.workplace.addClass("msidepanel");

    self.workplace.append($('\
                            <div class="panel">\
                                <div class="info">\
                                    <img class="circle64" src="./img/photo.jpg"></img>\
                                    <div class="buttons">\
                                        <div class="mbutton-icon icon-edit"></div>\
                                    </div>\
                                    <ul class="data">\
                                        <li class="nick">Grabli66</li>\
                                        <li class="email">grabli66@gmail.com</li>\
                                    </ul>\
                                    <div class="mbutton-icon icon-drop-down more"></div>\
                                </div>\
                                <div class="list"></div>\
                            </div>\
                            <div class="overlay"></div>\
                            '));

    var overlay = self.workplace.find(".overlay");
    binder.tap(overlay, function () {
        self.hide();
        return this;
    });

    self.setUserInfo = function (item) {
        var photo = self.workplace.find(".info .photo img");
        var email = self.workplace.find(".info .email");
        var nick = self.workplace.find(".info .nick");
        photo.attr("src", "./img/photo.jpg");
        email.text("grabli66@gmail.com");
        nick.text("Grabli66");
        return this;
    };

    self.setUsers = function (users) {
        var userList = self.workplace.find(".list");
        userList.empty();

        for (var i = 0; i < users.length; i++) {
            var usr = users[i];

            var userInfo = $('\
                         <table class="user" cellpadding="0" cellspacing="0">\
                            <tr>\
                                <td class="photo">\
                                    <img class="circle48" src="{0}/chat/gallery/ok/{2}.jpg" />\
                                </td>\
                                <td class="nick" data-login="{1}">\
                                    {1}\
                                </td>\
                                <td class="command">\
                                    <div class="mbutton-icon icon-search" data-id="{2}"></div>\
                                </td>\
                            </tr>\
                         </table>'.format(global.chatRoot, usr.login, usr.id));

            binder.tap(userInfo.find('.nick'), function () {
                if (self.onUserSelect) {
                    self.onUserSelect($(this).attr('data-login'));
                    self.hide();
                }
            });

            binder.tap(userInfo.find('.command .mbutton-icon'), function () {
                if (self.onUserInfoTap !== undefined) {
                    var id = $(this).attr('data-id');
                    self.onUserInfoTap(id);
                }
            });
            userList.append(userInfo);
        }
        return this;
    };

    self.show = function () {
        self.workplace.show();
        self.resize();
        self.workplace.find('.panel').animate({"left": '0'}, 300);
        return this;
    };

    self.hide = function () {
        var panel = self.workplace.find('.panel');
        panel.animate({"left": -panel.width()}, 300, function () {
            self.workplace.hide();
            self.resize();
        });
        return this;
    };

    self.resize = function () {
        var list = self.workplace.find('.list');
        var info = self.workplace.find('.info');
        list.css("height", self.workplace.height() - info.outerHeight(true) - 16);
    };

    self.hide();
    return self;
}