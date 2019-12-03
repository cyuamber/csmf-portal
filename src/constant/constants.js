export const ORDER_CREATE_FORM = [{
    title: '切片业务名称',
    key: 'name',
    rules: [
        {
            max: 50,
            message: '切片业务名称不能超过50个字符'
        }
    ]
},
{
    title: '连接规模数',
    key: 'maxNumberofUEs',
    content: '取值范围： 1-100000'
},
{
    title: '用户下行带宽（Mbps）',
    key: 'expDataRateDL',
    content: '取值范围： 100-3000'
},
{
    title: '时延',
    key: 'latency',
    content: '取值范围： 10-200'
},
{
    title: '用户上行带宽（Mbps）',
    key: 'expDataRateUL',
    content: '取值范围： 100-3000'
},
{
    title: '共享等级',
    key: 'resourceSharingLevel'
},
{
    title: '游牧性',
    key: 'uEMobilityLevel',
    options: [
        {
            value: '不可游牧',
            key: 'stationary'
        },
        {
            value: '固定接入',
            key: 'nomadic'
        },
        {
            value: '限定范围内可游牧',
            key: 'spatially restricted mobility'
        },
        {
            value: '自由游牧',
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
    title: '使用期限（月）',
    key: 'useInterval',
    content: '取值范围： ≥1'
},
{
    title: '区域',
    key: 'coverageArea'
}
]

export const SELECT_OPTIONS = [
    {
        name: '全部',
        key: 'created'
    }, 
    {
        name: '进行中',
        key: 'carryOut'
    },
    {
        name: '已终止',
        key: 'Terminated'
    }
]

export const BUSINESS_SELECT_OPTIONS = [
    {
        name: '全部',
        key: 'created'
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
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: '订单编号',
        dataIndex: 'order_id',
        key: 'order_id'
    },
    {
        title: '订单创建时间',
        dataIndex: 'order_creation_time',
        key: 'order_creation_time'
    },
    {
        title: '使用期限（月）',
        dataIndex: 'service_expiration_time',
        key: 'service_expiration_time'
    },
    {
        title: '状态',
        dataIndex: 'order_status',
        key: 'order_status',
        render: (text) => text === 'terminated' ? '订单完成' : '订单受理中'
    }
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