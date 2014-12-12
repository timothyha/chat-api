var pageManager = {
    history: [],    
    loadPage: function (s, params) {
        $(".app").load('pages/{0}.html'.format(s), function () {
            // TODO: call save state            
            pageManager.history.push(s);
            page.init(params);            
        });
    },
    back: function() {
        // TODO        
    },
    clear: function() {
        pageManager.history = [];
    }
};