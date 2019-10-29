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