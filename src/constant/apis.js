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
    trafficApi (queryTimestamp){
        return resolvePath(`/usecaseui/csmf/5gSlicing/queryTimestamp/${queryTimestamp}/trafficData`)
    },
    onlineUsers: resolvePath('/onlineUsers'),
    onlineUsersApi(queryTimestamp) {
        return resolvePath(`/usecaseui/csmf/5gSlicing/queryTimestamp/${queryTimestamp}/onlineUsers`)
    },
    bandwidth: resolvePath('/bandwidth'),
    bandwidthApi (queryTimestamp) {
        return resolvePath(`/usecaseui/csmf/5gSlicing/queryTimestamp/${queryTimestamp}/bandwidth`)
    },
    getAddressApi: resolvePath('/address'),
    // getProvinceApi: resolvePath('/province'),
    // getCityApi: resolvePath('/city'),
    // getCountyApi: resolvePath('/county'),
    // getStreetApi: resolvePath('/street'),
    // 创建订单接口
    createOrderApi: resolvePath(`/usecaseui/csmf/5gSlicing`),
    // 获取订单管理列表
    getOrders: resolvePath('/orders'),
    getOrdersApi: ({status, pageNo, pageSize}) => {
        return resolvePath(`/usecaseui/csmf/5gSlicing/orders/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
    },
    // 获取业务管理列表
    getOrderDetail: resolvePath('/detail'),
    getBusinessList: resolvePath('/business'),
    getOrderServiceApi: (params) => {
        if(typeof params === 'string') {
            // return resolvePath(`/usecaseui/csmf/5gSlicing/order/${params}/services/status/pageNo/pageSize`)
            // 本地联调
            return resolvePath(`/usecaseui/csmf/5gSlicing/order/${params}/services/status/1/pageNo/1/pageSize/1`)
        }else {
            const { status, pageNo, pageSize} = params
            // return resolvePath(`/usecaseui/csmf/5gSlicing/services/order/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
            // 本地联调
            return resolvePath(`/usecaseui/csmf/5gSlicing/order/11/services/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
        }
    },
    // 激活
    enable: resolvePath('/enable'),
    activateApi(serviceId) {
        return resolvePath(`/usecaseui/csmf/5gSlicing/service/${serviceId}/activate`)
    },
    // 去激活
    disable: resolvePath('/disable'),
    deactivateApi: (serviceId) => resolvePath(`/usecaseui/csmf/5gSlicing/service/${serviceId}/deactivate`),
    // 终止
    terminate: resolvePath('/terminate'),
    terminateApi: (serviceId) => resolvePath(`/usecaseui/csmf/5gSlicing/service/${serviceId}`),
    // 获取进度值
    getProgress: resolvePath('/progress'),
    getProgressApi: (serviceId) => resolvePath(`/usecaseui/csmf/5gSlicing/service/${serviceId}/progress`),
    
}

export default APIS