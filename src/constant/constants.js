export const ORDER_CREATE_FORM = [{
    title: 'Slicing Business Name',
    key: 'name'
},
{
    title: 'Max Number of UEs',
    key: 'maxNumberofUEs',
    content: 'Scope',
    scope: ": 1-100000"
},
{
    title: 'Data Rate Downlink',
    key: 'expDataRateDL',
    content: 'Scope',
    scope: ": 100-3000"
},
{
    title: 'Latency',
    key: 'latency',
    content: 'Scope',
    scope: '： 10-200',
},
{
    title: 'Data Rate Uplink',
    key: 'expDataRateUL',
    content: 'Scope',
    scope: '： 100-3000'
    
},
{
    title: 'Resource Sharing Level',
    key: 'resourceSharingLevel'
},
{
    title: 'Mobility',
    key: 'uEMobilityLevel',
    options: [
        {
            value: 'Stationary',
            key: 'stationary'
        },
        {
            value: 'Nomadic',
            key: 'nomadic'
        },
        {
            value: 'Spatially Restricted Mobility',
            key: 'spatially restricted mobility'
        },
        {
            value: 'Fully Mobility',
            key: 'fully mobility'
        }
    ]
},
// {
//     title: '激活因子（%）',
//     key: 'factor',
//     content: '取值范围： 1-100'
// },
{
    title: 'Use Interval',
    key: 'useInterval',
    content: 'Scope',
    scope: '： ≥1',
},
{
    title: 'Area',
    key: 'coverageArea'
}
]

export const SELECT_OPTIONS = [
    {
        name: 'All',
        key: 'all'
    },
    {
        name: 'Processing',
        key: 'processing'
    },
    {
        name: 'Created',
        key: 'created'
    }
]

export const BUSINESS_SELECT_OPTIONS = [
    {
        name: '全部',
        key: 'all'
    },
    {
        name: '未激活',
        key: 'deactivated',
    },
    {
        name: '已激活',
        key: 'activated'
    }
]

export const ADDRESS = {
    "result_header": {
        "result_code": 200,
        "result_message": "Successfully"
    },

    "result_body": {
        "province": [
            {
                "id": "1",
                "name": "北京",
                "city": [
                    {
                        "id": "101",
                        "name": "北京市",
                        "county": [
                            {
                                "id": "1001",
                                "name": "海淀区",
                                "street": [
                                    {
                                        "id": "100101",
                                        "name": "万寿路街道"
                                    },
                                    {
                                        "id": "100102",
                                        "name": "中关村街道"
                                    },
                                    {
                                        "id": "100103",
                                        "name": "海淀街道"
                                    },
                                    {
                                        "id": "100104",
                                        "name": "西三旗街道"
                                    }
                                ]
                            },
                            {
                                "id": "1002",
                                "name": "西城区",
                                "street": [
                                    {
                                        "id": "100201",
                                        "name": "广安门内街道"
                                    },
                                    {
                                        "id": "100202",
                                        "name": "广安门外街道"
                                    },
                                    {
                                        "id": "100203",
                                        "name": "西长安街街道"
                                    },
                                    {
                                        "id": "100204",
                                        "name": "金融街街道"
                                    }
                                ]
                            },
                            {
                                "id": "1003",
                                "name": "昌平区",
                                "street": [
                                    {
                                        "id": "100301",
                                        "name": "城北街道"
                                    },
                                    {
                                        "id": "100302",
                                        "name": "城南街道"
                                    },
                                    {
                                        "id": "100303",
                                        "name": "天通苑北街道"
                                    },
                                    {
                                        "id": "100304",
                                        "name": "天通苑南街道"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "name": "上海",
                "city": [{
                    "id": "201",
                    "name": "上海市",
                    "county": [{
                        "id": "2001",
                        "name": "浦东新区",
                        "street": [
                            {
                                "id": "200101",
                                "name": "陆家嘴街道"
                            },
                            {
                                "id": "200102",
                                "name": "周家渡街道"
                            },
                            {
                                "id": "200103",
                                "name": "塘桥街道"
                            },
                            {
                                "id": "200104",
                                "name": "南码头路街道"
                            }
                        ]
                    },
                    {
                        "id": "2002",
                        "name": "静安区",
                        "street": [
                            {
                                "id": "200201",
                                "name": "江宁路街道"
                            },
                            {
                                "id": "200202",
                                "name": "静安寺街道"
                            },
                            {
                                "id": "200203",
                                "name": "南京西路街道"
                            },
                            {
                                "id": "200204",
                                "name": "曹家渡街道"
                            }
                        ]
                    }
                    ]
                }]
            }
        ]
    }
}

export const ORDER_MGT_COLUMNS = [
    {
        title: 'No',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: 'Order Number',
        dataIndex: 'order_id',
        key: 'order_id'
    },
    {
        title: 'Created Time',
        dataIndex: 'order_creation_time',
        key: 'order_creation_time'
    },
    {
        title: 'Use Interval',
        dataIndex: 'service_expiration_time',
        key: 'service_expiration_time'
    },
]

export const BUSINESS_MGT_COLUMNS = [
    {
        title: '切片业务ID',
        dataIndex: 'service_id'
    },
    {
        title: '切片业务名称',
        dataIndex: 'service_name'
    },
    {
        title: '切片类型',
        dataIndex: 'service_type'
    },
    {
        title: 'S-NSSAI',
        dataIndex: 'service_snssai'
    },
    {
        title: '状态',
        dataIndex: 'service_status',
        render: text => text === 'activated' ? '已激活' : '未激活'
    }
]