export function MobileChk() {
    var mobileKeyWords = new Array('Android', 'iPhone', 'iPad', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson', 'Mobile');
    for (var info in mobileKeyWords) {
        
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            
            return true;
        }
    }
    return false;
}
