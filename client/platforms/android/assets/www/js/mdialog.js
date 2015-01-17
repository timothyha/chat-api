function newDialog() {
    var self = {};
    self.onOk = undefined;
    self.onCancel = undefined;
    
    self.workplace = $('<div class="mdialog">\
                            <div class="inner">\
                                <div class="title">Ошибка</div>\
                                <div class="text">Сервер не отвечает</div>\
                                <table cellpadding="0" cellspacing="0" class="buttons">\
                                    <tr>\
                                        <td>\
                                            <div class="cancel">ВЫЙТИ</div>\
                                        </td>\
                                        <td>\
                                            <div class="ok">ПОВТОРИТЬ</div>\
                                        </td>\
                                    </tr>\
                                </table>\
                            </div>\
                           <div class="overlay"></div>\
                        </div>\
                          ');
    $('.app').append(self.workplace);
    
    binder.tap(self.workplace.find('.cancel'), function() {
        if (self.onCancel !== undefined) self.onCancel();
        self.hide();
    });
    
    binder.tap(self.workplace.find('.ok'), function() {
        if (self.onOk !== undefined) self.onOk();
        self.hide();
    });
    
    self.inner = self.workplace.find('.inner');
    self.overlay = self.workplace.find('.overlay');
    
    self.show = function() {
        self.inner.show('scale');
        self.overlay.show();
    };
    
    self.hide = function() {
        self.inner.hide('scale');
        self.overlay.hide();
    };
    
    self.resize = function() {
        self.inner.css('top', ($(window).height() / 2) - self.inner.height() /2);
        self.inner.css('left', ($(window).width() / 2) - self.inner.width() /2);
    };
    
    self.resize();
    return self;
}