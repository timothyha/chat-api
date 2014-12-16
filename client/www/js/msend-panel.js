function newSendPanel(id) {
    var self = {};
    self.onSend = undefined;

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
            <td class="message"><input placeholder="Сообщение" /></td>\
            <td class="send"><div class="mbutton">Отпр.</div></td>\
        </tr>\
        </table>');

    self.message = self.workplace.find('.message input');
    self.button = self.workplace.find('.send .mbutton');
    binder.tap(self.button, function () {
        if (self.onSend) {
            self.onSend(self.message.val());
            self.message.val("");
        }
    });

    return self;
}