var chatService = {
    ERROR_USER_NOT_FOUND: 'ERR_USER_NOT_FOUND',
    ERROR_INTERNAL: 'ERROR_INTERNAL',
    ERR_USER_NOT_CONNECTED: 'ERR_USER_NOT_CONNECTED',    
    onError: null,
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
    callService: function (funcName, params, onData) {
        $.ajax({
            type: "POST",
            url: 'https://jesuschrist.ru/chapi/{0}'.format(funcName),
            data: params,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (res) {
                try {
                    if ((res.err === undefined) || (res.err === "")) {
                        onData(res);
                    } else {
                        if (chatService.onError !== null)
                            chatService.onError(res.err);
                    }
                } catch (e) {
                    if (chatService.onError !== null)
                        chatService.onError(chatService.ERROR_INTERNAL);
                }
            }
        });
    },
    login: function (name, password, onData) {
        chatService.callService('login', {
            login: name,
            password: password
        }, function (res) {
            chatService.user = res;
            onData(res);
        });
    },
    logout: function (name, password, onData) {
        chatService.callService('logout', {}, onData);
    },
    getPublicMessages: function (onData) {
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
        });
    },
    getPrivateMessages: function (onData) {
        chatService.callService('private', {
            session : chatService.user.session,
            laststamp : chatService.lastPrivateStamp,
            limit : chatService.messageLimit
        }, function (res) {
            try {                                
                /*chatService.publicMessages = res;*/
                chatService.lastPrivateStamp = res[0].stamp;
                console.log(res);
                onData(res);
            } catch (e) {
                console.log(e);
            }
        });
    },
    getUserList: function (onData) {
        chatService.callService('users', {
            session: chatService.user.session
        }, function (res) {
            chatService.userList = res;
            onData(res);
        });
    },
    getUserInfo: function(userId, onData) {        
        chatService.callService('info', {
            session: chatService.user.session,
            userid: userId
        }, function (res) { 
            chatService.userDescription = res;
            console.log(res);
            onData(res);
        });
    },
    sendMessage: function (room, text, to, onData) {
        console.log(to);
        chatService.callService('send', {
            session: chatService.user.session,
            private: room,
            message: text,
            to: to
        }, function (res) {            
            onData(res);
        });
    }
};