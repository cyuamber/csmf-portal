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
    getAddressApi: resolvePath('/address'),
    // getProvinceApi: resolvePath('/province'),
    // getCityApi: resolvePath('/city'),
    // getCountyApi: resolvePath('/county'),
    // getStreetApi: resolvePath('/street'),
    // 创建订单接口
    createOrderApi: resolvePath(`/api/usecaseui/csmf/5gSlicing`),
    // 获取订单管理列表
    getOrders: resolvePath('/orders'),
    getOrdersApi: ({status, pageNo, pageSize}) => {
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/orders/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
    },
    // 获取业务管理列表
    getOrderDetail: resolvePath('/detail'),
    getBusinessList: resolvePath('/business'),
    getOrderServiceApi: (params) => {
        if(typeof params === 'string') {
            return resolvePath(`/api/usecaseui/csmf/5gSlicing/orderId/${params}/services/status/pageNo/pageSize`)
        }else {
            const { status, pageNo, pageSize} = params
            return resolvePath(`/api/usecaseui/csmf/order/5gSlicing/services/status/${status}/pageNo/${pageNo}/pageSize/${pageSize}`)
        }
    },
    // 激活
    enable: resolvePath('/enable'),
    activateApi(serviceId) {
        return resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}/activate`)
    },
    // 去激活
    disable: resolvePath('/disable'),
    deactivateApi: (serviceId) => resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}/deactivate`),
    // 终止
    terminate: resolvePath('/terminate'),
    terminateApi: (serviceId) => resolvePath(`/api/usecaseui/csmf/5gSlicing/services/${serviceId}`),
    // 获取进度值
    getProgress: resolvePath('/progress'),
    getProgressApi: (serviceId) => resolvePath(`/api/usecaseui/csmf/5gSlicing/service/${serviceId}/progress`),
    
}

export default APIS