function setDateLocale() {
    moment.locale('ru');
}


var global = {
    chatRoot: 'https://jesuschrist.ru',
    recepient : "",
    messageTime : "",
    clearMessageTags : function() {
        global.recepient = "";
        global.messageTime = "";
    }
};

