const NODE_ENV = process.env.NODE_ENV;

function resolvePath(url) {
    let path = "";
    if (NODE_ENV === "development") {
        path = `/api${url}`
    }
    return path;
}
const APIS = {
    testapi: resolvePath('/customer/info')
}

export default APIS