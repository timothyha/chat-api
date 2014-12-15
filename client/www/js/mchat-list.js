function newChatlist(id) {
    var self = {};
    if (id !== undefined) {
        self.workplace = $('#' + id);
    } else {
        self.workplace = $('<div></div>');
    }

    self.workplace.addClass("mchatlist");

    self.title = $('<div class="title">07 декабря 2014</div>');
    self.workplace.append(self.title);

    self.addItem = function (item) {        
        if (item.color === 'LOGIN') return;
        if (item.color === 'LOGOUT') return;
        var nick = item.to === "" ? item.from : item.from + " к " + item.to;
        
        self.workplace.append('<div class="item">\
                              <table cellpadding="0" cellspacing="0">\
                                <tr>\
                                    <td class="photo">\
                                        <img class="circle64" src="./img/{0}.jpg" />\
                                    </td>\
                                    <td class="data">\
                                        <div class="nick">{1}</div>\
                                        <div class="message">{2}</div>\
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
                              </div>'.format('photo2', nick, item.message));
    };

    self.addItems = function (items) {
        for (var i = 0; i < items.length; i++) {
            self.addItem(items[i]);
        }
    };

  /*  self.addItem({
        nick: "Ata",
        message: "Привет. Как дела?",
        photo: "photo2"
    });
    self.addItem({
        nick: "Grabli66",
        message: "Отлично. Пишу чат. А ты иди готовь ужин.",
        photo: "photo",
        recepient: "Ata"
    });
    self.addItem({
        nick: "FreeBird",
        message: "Что Вы будете есть на ужин?",
        photo: "photo3"
    });
    self.addItem({
        nick: "Добродетельная",
        message: "Наверное макароны с катлетой.",
        photo: "photo4",
        recepient: "FreeBird"
    });
    self.addItem({
        nick: "Ata",
        message: "Сейчас сготовлю утку с аппельсинами. И картошку по деревенски.",
        photo: "photo2",
        recepient: "FreeBird"
    });
    self.addItem({
        nick: "FreeBird",
        message: "Тоже хочу такое.",
        photo: "photo3",
        recepient: "Ata"
    });
    self.addItem({
        nick: "Добродетельная",
        message: "А я хочу свинные отбивные с чесночным соусом, и макароны.",
        photo: "photo4"
    });
*/
    self.hide = function () {
        self.workplace.hide();
    };

    return self;
}