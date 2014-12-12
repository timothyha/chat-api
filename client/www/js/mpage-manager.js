var pageManager = {
    history: [],    
    loadPage: function (s) {
        $(".app").load('pages/{0}.html'.format(s), function () {
            // TODO: call save state            
            pageManager.history.push(s);
            page.init();            
        });
    },
    back: function(s) {
        // TODO        
    },
    clear: function() {
        pageManager.history = [];
    }
};