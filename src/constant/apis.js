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
    },
    // getOrders(userId){
    //     return resolvePath(`/api/usecaseui/csmf/userId/${userId}/5gSlicing/orders`)
    // }
    // getOrderDetail(userId, orderId){
    //     return resolvePath(`/api/usecaseui/csmf/userId/${userId}/5gSlicing/orderId/${orderId}/services`)
    // },
    // enable(servceId) {
    //     return resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}/enable`)
    // },
    // disable(servceId){
    //     return resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}/disable`)
    // },
    // terminate = (servceId) => resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}`),
    // 模拟
    getOrders: resolvePath('/orders'),
    getOrderDetail: resolvePath('/detail'),
    enable: resolvePath('/enable'),
    disable: resolvePath('/disable'),
    terminate: resolvePath('/terminate'),
    getBusinessList: resolvePath('/business')
}

export default APIS