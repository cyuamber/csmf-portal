export const testHeadmenu = (currentUrl, seperator = "/") => {
    let newarr = "";
    let test = currentUrl.split('').includes(seperator)
    if (test) {
        let num = currentUrl.indexOf(seperator);
        newarr = currentUrl.slice(0, num)
    } else {
        newarr = currentUrl
    }
    return newarr
}

export const getCurrentUser = () => {
    let user = window.localStorage.getItem("username");
    return user
}

export const getCurrentLng = () => {
    window.addEventListener("setItemEvent", function (e) {
        if (e.key === 'currentLng') {
            return e.newValue;
        }
    });
}

