function setDateLocale() {
    moment.locale('ru');
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

function isEmpty(s) {
    if ((s === undefined) || (s === null) || (s === "") || (s === "null")) return true;
    return false;        
}

var global = {
    chatRoot: 'https://jesuschrist.ru',
    recepient: "",
    messageTime: "",
    clearMessageTags: function () {
        global.recepient = "";
        global.messageTime = "";
    }
};

