function newToggleGroup(id) {
    var self = {};
    
    if (id != undefined) {
        self.workplace = $('#'+id);
    } else {
        self.workplace = $('<div></div>');
    }
    
    self.workplace.addClass("mtogglegroup");
    
    self.workplace.append('\
                          <table cellpadding="0" cellspacing="0">\
                            <tr class="buttons">\
                            </tr>\
                          </table>');
    
    self.addButton = function(item) {
        var button = $('<td class="mgbutton">{0}</td>'.format(item.text));
        var buttons = self.workplace.find('.buttons');
        
        buttons.append(button);
        
        button.bind('click', function() {            
            buttons.find('.mgbutton').removeClass('active');
            button.addClass('active');
            if (item.click != null) item.click();
        });        
        
        var childs = buttons.children();
        if (childs.length > 1) {
            $(childs[0]).addClass("left");
            $(childs[0]).addClass("active");
            $(childs[childs.length - 1]).addClass("right");
        }                        
        
        return this;
    };
    
    self.setSticker = function(item) {
        var buttons = self.workplace.find('.buttons');
        var childs = buttons.children();
        var it = $(childs[item.index]);
        it.remove('.sticker');
        it.append($('<div class="sticker">{0}</div>'.format(item.text)));
        return this;
    };
    
    return self;
}