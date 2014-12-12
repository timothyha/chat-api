var pageManager = {
    history: [],
    loadPage: function (s, params, complete) {
        try {
            page.saveState();
            page.stop();
        } catch (e) {
        }

        $(".app").load('pages/{0}.html'.format(s), function () {
            pageManager.history.push(s);
            page.init(params);
            if (complete !== undefined) complete();
        });
    },
    back: function () {
        pageManager.history.pop();
        if (pageManager.history.length > 0) {
            var prev = pageManager.history.pop();
            pageManager.loadPage(prev, function() {
                page.loadState();
            });            
        }
    },
    clear: function () {
        pageManager.history = [];
    }
};