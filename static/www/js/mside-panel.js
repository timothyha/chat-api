function newSidePanel() {
    var self = {};

    self.workplace = $('<div></div>');
    self.workplace.addClass("msidepanel");

    self.workplace.append($('\
                            <table class="table" cellpadding="0" cellspacing="0">\
                                <tr>\
                                    <td class="panel">\
                                        <div class="info">\
                                            <table cellpadding="0" cellspacing="0">\
                                                <tr>\
                                                    <td class="photo">\
                                                        <img class="circle64" src="./img/photo.jpg"></img>\
                                                    </td>\
                                                    <td>\
                                                        <div class="nick">Grabli66</div>\
                                                    </td>\
                                                </tr>\
                                            </table>\
                                            <ul class="data">\
                                                <li class="email">grabli66@gmail.com</li>\
                                            </ul>\
                                        </div>\
                                        <div class="list"></div>\
                                    </td>\
                                    <td class="overlay">\
                                    </td>\
                                </tr>\
                            </table>\
                            '));

    $(document.body).append(self.workplace);
    
    var panel = self.workplace.find(".panel");
    var overlay = self.workplace.find(".overlay");
    var userList = self.workplace.find(".list");

    overlay.bind("click", function () {
        self.workplace.hide();
        return this;
    });

    self.setUserInfo = function (item) {
        /*var photo = self.workplace.find(".info .photo img");
        var email = self.workplace.find(".info .email");
        var nick = self.workplace.find(".info .nick");        
        photo.attr("src", "./img/photo.jpg");
        email.text("grabli66@gmail.com");
        nick.text("Grabli66");*/
        return this;
    };

    self.setUsers = function (users) {
        userList.empty();

        for (var i = 0; i < users.length; i++) {
            var usr = users[i];            
            var userInfo = $('\
                         <table class="user" cellpadding="0" cellspacing="0">\
                            <tr>\
                                <td class="photo">\
                                    <img class="circle48" src="{0}" />\
                                </td>\
                                <td class="nick">\
                                    {1}\
                                </td>\
                                <td class="command">\
                                </td>\
                            </tr>\
                         </table>'.format(usr.photo, usr.nick));            
            userList.append(userInfo);
        }
        return this;
    };

    self.show = function () {        
        self.workplace.show();
        return this;
    };    

    return self;
}