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
    traffic: resolvePath('/traffic'),
    // traffic(queryTimestamp){
    //     return resolvePath(`/api/usecaseui/csmf/5gSlicing/queryTimestamp/${queryTimestamp}/trafficData`)
    // },
    onlineUsers: resolvePath('/onlineUsers'),
    // onlineUsers(queryTimestamp, queryNumber) {
    //     return resolvePath(`/api/usecaseui/csmf/5gSlicing/queryTimestamp/${queryTimestamp}/queryNumber/${queryNumber}/onlineUsers`)
    // },
    bandwidth: resolvePath('/bandwidth'),
    // bandwidth (queryTimestamp, queryNumber) {
    //     return resolvePath(`/api/usecaseui/csmf/5gSlicing/queryTimestamp/${queryTimestamp}/queryNumber/${queryNumber}/bandwidth`)
    // },
    getProvinceApi: resolvePath('/province'),
    getAddressApi: resolvePath('/address'),
    getCityApi: resolvePath('/city'),
    getCountyApi: resolvePath('/county'),
    getStreetApi: resolvePath('/street'),
    createOrder: resolvePath(`/api/usecaseui/csmf/5gSlicing`),
    getOrdersApi: ({status, pageNo, pageSize}) => {
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/orders/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
    },
    getOrderDetailApi: (orderId) => {
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/orderId/${orderId}/services`)
    },
    getBusinessListApi: ({status, pageNo, pageSize}) => {
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/services/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
    },
    enableApi(serviceId) {
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}/enable`)
    },
    disableApi(serviceId){
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}/disable`)
    },
    terminateApi: (serviceId) => resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}`),
    
    // 模拟
    getOrders: resolvePath('/orders'),
    getOrderDetail: resolvePath('/detail'),
    enable: resolvePath('/enable'),
    disable: resolvePath('/disable'),
    terminate: resolvePath('/terminate'),
    getBusinessList: resolvePath('/business')
}

export default APIS