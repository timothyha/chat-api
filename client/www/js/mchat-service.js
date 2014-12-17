var chatService = {
    ERROR_USER_NOT_FOUND: 'ERR_USER_NOT_FOUND',
    ERROR_INTERNAL: 'ERROR_INTERNAL',
    ERR_USER_NOT_CONNECTED: 'ERR_USER_NOT_CONNECTED',    
    ERR_MESSAGES_EMPTY: 'ERR_MESSAGES_EMPTY',    
    onError: undefined,
    requests: [],
    messageLimit : 30,
    user: undefined,
    userDescription: undefined,
    userList: undefined,
    lastPublicStamp: 0,
    lastPrivateStamp: 0,
    publicMessages: [],    
    getErrorDescription: function (err) {
        if (err === chatService.ERROR_USER_NOT_FOUND) {
            return 'Неправильный логин или пароль';
        } else if (err === chatService.ERROR_INTERNAL) {
            return  'Внутренняя ошибка. Обратитесь к разработчику.';
        } else if (err === chatService.ERR_USER_NOT_CONNECTED) {
            return  'Сессии не существует или она истекла.';
        }

        return 'Неизвестная ошибка';
    },
    callService: function (funcName, params, onData, onError) {
        var request = $.ajax({
            type: "POST",
            url: 'https://jesuschrist.ru/chapi/{0}'.format(funcName),
            data: params,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (res) {                
                var ind = chatService.requests.indexOf(request);
                delete chatService.requests[ind];
                
                try {
                    if ((res.err === undefined) || (res.err === "")) {
                        onData(res);
                    } else {
                        if (onError !== undefined) {
                            onError(res.err);
                        } else {
                            if (chatService.onError !== undefined) {
                                chatService.onError(res.err);
                            }
                        }
                    }
                } catch (e) {
                    if (chatService.onError !== null)
                        chatService.onError(chatService.ERROR_INTERNAL);
                }
            }
        });        
        chatService.requests.push(request);
    },
    abortAll: function() {
        for (var i = 0; i < chatService.requests.length; i++) {
            var req = chatService.requests[i];
            if (req !== undefined) {
                chatService.requests[i].abort();
            }
        }
        chatService.requests = [];
    },
    login: function (name, password, onData, onError) {
        chatService.callService('login', {
            login: name,
            password: password
        }, function (res) {
            chatService.user = res;
            onData(res);
        },onError);
    },
    logout: function (onData, onError) {
        chatService.callService('logout', {
            session : chatService.user.session
        }, function (res) {            
            onData(res);
        },onError);
    },
    getPublicMessages: function (onData, onError) {
        chatService.callService('public', {
            session : chatService.user.session,
            laststamp : chatService.lastPublicStamp,
            limit : chatService.messageLimit
        }, function (res) {
            try {                                
                /*chatService.publicMessages = res;*/
                chatService.lastPublicStamp = res[0].stamp;                
                onData(res);
            } catch (e) {
                console.log(e);
            }
        }, onError);
    },
    getPrivateMessages: function (onData, onError) {
        chatService.callService('private', {
            session : chatService.user.session,
            laststamp : chatService.lastPrivateStamp,
            limit : chatService.messageLimit
        }, function (res) {
            try {                                
                /*chatService.publicMessages = res;*/
                chatService.lastPrivateStamp = res[0].stamp;                
                onData(res);
            } catch (e) {
                console.log(e);
            }
        },onError);
    },
    getUserList: function (onData, onError) {
        chatService.callService('users', {
            session: chatService.user.session
        }, function (res) {
            chatService.userList = res;
            onData(res);
        },onError);
    },
    getSelfInfo: function(onData, onError) {
        chatService.getUserInfo(chatService.user.id, function(res) {
            chatService.userDescription = res;
        },onError);
    },
    getUserInfo: function(userId, onData, onError) {        
        chatService.callService('info', {
            session: chatService.user.session,
            userid: userId
        }, function (res) {
            onData(res[0]);
        },onError);
    },
    sendMessage: function (room, text, to, onData, onError) {
        chatService.callService('send', {
            session: chatService.user.session,
            private: room,
            message: text,
            to: to
        }, function (res) {            
            onData(res);
        },onError);
    }
};