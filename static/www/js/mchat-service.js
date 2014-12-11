var chatService = {
    onError: null,
    callService: function (funcName, params, onData) {
        $.ajax({
            type: "POST",
            url: 'https://jesuschrist.ru/chapi/{0}'.format(funcName),
            data: params,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (d) {
                try {
                    var res = JSON.parse(d);
                    if (res.err == "") {
                        onData(res);
                    } else {
                        if (onError != null) onError(res.err);
                    }
                } catch (e) {
                    if (onError != null) onError(res.err);
                }
            }
        });
    },
    login: function (name, password, onData) {
        chatService.callService('login', {
            login: name,
            password: password
        }, onData);
    },
    logout: function (name, password, onData) {
        chatService.callService('logout', {}, onData);
    },
    getPublicMessages: function (lastid, onData) {},
    getPrivateMessages: function (lastid, onData) {},
    getUserList: function (onData) {},
    sendMessage: function (room, text, onData) {}
};