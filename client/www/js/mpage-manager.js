var pageManager = {
    registerRoutes : function() {
        Finch.route('', function() {
            pageManager.loadPage('login');
        });
        Finch.route('login', function() {
            pageManager.loadPage('login');
        });
        Finch.route('chat', function() {
            pageManager.loadPage('chat');
        });
        Finch.route('user-info/:id', function(bindings) {
            pageManager.loadPage('user-info', bindings.id);
        }); 
        Finch.listen();
    },
    navigate : function(url) {
        Finch.navigate(url);
    },
    loadPage: function (s, params, complete) {
        if (window.page !== undefined) {
            window.page.stop();
        }

        $(".app").load('pages/{0}.html'.format(s), function () {            
            if (window.page === undefined) {
                console.log("page not found");
            } else {
                window.page.init(params);
                if (complete !== undefined)
                    complete();
            }
        });
    },
    clear : function() {
        window.location.replace('');
    },
    back : function () {
        window.history.back();
    }
};