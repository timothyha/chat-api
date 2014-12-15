function getTime(timestamp) {
    function formatInt(v) {
        if (v < 10) return "0"+v;
        return v;
    }
    
    var stamp = new Date(timestamp * 1000);
    var hour = formatInt(stamp.getHours());
    var min = formatInt(stamp.getMinutes());
    var sec = formatInt(stamp.getSeconds());
    var stampStr = '{0}:{1}:{2}'.format(hour, min, sec);
    return stampStr;
}

var global = {
    chatRoot: 'http://jesuschrist.ru'
};

