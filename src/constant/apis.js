const NODE_ENV = process.env.NODE_ENV;

function resolvePath(url) {
    let path = "";
    if (NODE_ENV === "development") {
        path = `/api${url}`
    }
    return path;
}
const APIS = {
    testapi: resolvePath('/home'),
    getProvinceApi: resolvePath('/province'),
    getCityApi: resolvePath('/city'),
    getCountyApi: resolvePath('/county'),
    createOrder(userId){
        return resolvePath(`/api/usecaseui/csmf/userId/${userId}/5gSlicing`)
    }
}

export default APIS