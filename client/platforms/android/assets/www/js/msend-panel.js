function newSendPanel(id) {
    var self = {};
        
    if (id !== undefined) {
        self.workplace = $('#'+id);
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
    
    return self;
}