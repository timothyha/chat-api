var pageManager = {
    history: [],
    loadPage: function (s, params, complete) {
        if (window.page !== undefined) {
            window.page.saveState();
            window.page.stop();
        }

        $(".app").load('pages/{0}.html'.format(s), function () {
            pageManager.history.push(s);            
            if (window.page === undefined) {
                console.log("page not found");
            } else {
                window.page.init(params);
                if (complete !== undefined)
                    complete();                
            }
        });
    },
    back: function () {
        pageManager.history.pop();
        if (pageManager.history.length > 0) {
            var prev = pageManager.history.pop();
            pageManager.loadPage(prev, function () {
                window.page.loadState();
            });
        }
    },
    clear: function () {
        pageManager.history = [];
    }
};