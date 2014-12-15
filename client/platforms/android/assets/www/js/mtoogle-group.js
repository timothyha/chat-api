function newToggleGroup(id) {
    var self = {};
    self.selectedIndex = 0;
    
    if (id !== undefined) {
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
        
        binder.tap(button, function() {
            var buts = buttons.find('.mgbutton');
            self.selectedIndex = button.index();            
            buts.removeClass('active');
            button.addClass('active');
            if (item.onTap !== undefined) item.onTap();
        });             
        
        var childs = buttons.children();
        if (childs.length > 1) {
            $(childs[0]).addClass("left");
            $(childs[0]).addClass("active");
            $(childs[childs.length - 1]).addClass("right");
        }                        
        
        return this;
    };
    
    self.select = function(index) {
        var buttons = self.workplace.find('.buttons');
        self.selectedIndex = index;
        buttons.find('.mgbutton').removeClass('active');        
        $(buttons.children()[index]).addClass("active");
    };
    
    self.setSticker = function(item) {
        var buttons = self.workplace.find('.buttons');
        var childs = buttons.children();
        var it = $(childs[item.index]);
        it.find('.sticker').remove();
        it.append($('<div class="sticker">{0}</div>'.format(item.text)));
        return this;
    };
    
    self.clearSticker = function(index) {
        var buttons = self.workplace.find('.buttons');
        var childs = buttons.children();
        var it = $(childs[index]);
        it.find('.sticker').remove();               
        return this;
    };
    
    return self;
}