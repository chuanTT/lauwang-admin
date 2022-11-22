function setCookie(name,value,expiresIn) {
    var expires = "";
    if (expiresIn) {
        expires = "; expires=" + expiresIn;
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function convertDate (strotime) {
    let d = new Date (strotime);
    d = d.toUTCString();

    return d;
}

export {setCookie, getCookie, convertDate}