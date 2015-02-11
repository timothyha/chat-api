function newSidePanel(id) {
    var self = {};
    self.onUserInfoTap = undefined;
    self.onUserSelect = undefined;
    self.onSettingsTap = undefined;
    self.infoHeight = undefined;
    self.infoCollapsed = true;

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
                                    <img class="circle64"></img>\
                                    <div class="buttons">\
                                        <div class="mbutton-icon icon-settings"></div>\
                                        <div class="mbutton-icon icon-edit"></div>\
                                    </div>\
                                    <ul class="data">\
                                        <li class="nick"></li>\
                                        <li class="sex"></li>\
                                        <li class="name"></li>\
                                        <li class="town"></li>\
                                        <li class="belief"></li>\
                                        <li class="about"></li>\
                                    </ul>\
                                    <div class="mbutton-icon icon-drop-down more"></div>\
                                </div>\
                                <div class="swiper-container swiper-users">\
                                    <div class="swiper-wrapper">\
                                        <div class="swiper-slide list">\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="overlay"></div>\
                            '));
    self.infoHeight = self.workplace.find(".info").height();

    self.swiper = $('.swiper-users').swiper({
        mode: 'vertical',
        scrollContainer: true,
        mousewheelControl: true
    });
    
    binder.tap(self.workplace.find(".icon-settings"), function () {
        if (self.onSettingsTap !== undefined) self.onSettingsTap();
    });
    
    var overlay = self.workplace.find(".overlay");
    binder.tap(overlay, function () {
        self.hide();        
    });

    binder.tap(self.workplace.find(".more"), function () {
        var info = self.workplace.find(".info");
        var more = self.workplace.find(".more");
        if (!self.infoCollapsed) {
            self.infoCollapsed = true;
            info.animate({height: self.infoHeight + "px"}, 500, function () {
                self.resize();
            });
            more.removeClass("icon-arrow-up").addClass("icon-drop-down");
        } else {
            var height = self.workplace.find(".circle64").height() + self.workplace.find(".data").height();
            info.animate({height: height + "px"}, 500, function () {
                self.resize();
            });
            self.infoCollapsed = false;
            more.removeClass("icon-drop-down").addClass("icon-arrow-up");
        }
    });

    self.setUserInfo = function (item) {
        var photo = self.workplace.find(".info img");
        var nick = self.workplace.find(".info .nick");
        var sex = self.workplace.find(".info .sex");
        var name = self.workplace.find(".info .name");
        var town = self.workplace.find(".info .town");
        var belief = self.workplace.find(".info .belief");
        var about = self.workplace.find(".info .about");
        photo.attr("src", "{0}{1}".format(global.chatRoot, item.photo));

        nick.text(item.login);
        sex.text(item.sex === "1" ? "мужской" : "женский");

        if (!isEmpty(item.name)) {
            name.text(item.name);
        } else {
            name.text("имя не указано");
        }

        if (!isEmpty(item.town)) {
            town.text(item.town);
        } else {
            town.text("город не указан");
        }

        if (!isEmpty(item.belief)) {
            belief.text(item.belief);
        } else {
            belief.text("вероисповедание не указано");
        }

        if (!isEmpty(item.about)) {
            about.text(item.about);
        } else {
            about.text("о себе не указано");
        }

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

            binder.tap(userInfo.find('.nick'), function (e) {                
                if (self.onUserSelect) {
                    self.onUserSelect($(e.target).attr('data-login'));
                    self.hide();
                }
            });

            binder.tap(userInfo.find('.command .mbutton-icon'), function (e) {
                if (self.onUserInfoTap !== undefined) {
                    var id = $(e.target).attr('data-id');
                    self.onUserInfoTap(id);
                }
            });
            userList.append(userInfo);
        }

        return this;
    };

    self.show = function () {       
        self.resize();
        var panel = self.workplace.find('.panel');
        //self.workplace.find('.panel').show("slide", { direction: "left" }, 300);
        self.workplace.find('.overlay').show();
        panel.show();
        panel.animate({"left": '0'}, 300);
        self.swiper.reInit();
        return this;
    };

    self.hide = function () {
        var panel = self.workplace.find('.panel');
        panel.animate({"left": -panel.width()}, 300, function () {
            var info = self.workplace.find(".info");
            info.css("height", self.infoHeight);
            panel.hide();
            self.workplace.find('.overlay').hide();
            self.infoCollapsed = true;            
            self.resize();
        });
        return this;
    };

    self.resize = function () {
        var panel = self.workplace.find('.panel');
        var list = self.workplace.find('.swiper-users');
        var info = self.workplace.find('.info');
        list.css("height", panel.height() - info.outerHeight(true) - 16);
    };
    
    self.resize();
    self.hide();
    return self;
}