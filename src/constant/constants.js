export const OrderCreateform = [
    {
        title: '切片业务名称',
        key: 'businessName'
    },
    {
        title: '连接规模数',
        key: 'connectCount',
        options: ['10000以下', '10000-50000', '50000-100000', '100000以上']
    },
    {
        title: '宽带',
        key: 'broadBand',
        options: ['5G', '10G', '50G']
    },
    {
        title: '时延',
        key: 'delay',
        options: ['20ms', '50ms', '100ms']
    },
    {
        title: '游牧性',
        key: 'nomadic',
        options: ['stationary', 'nomadic', 'restricted mobility', 'fully mobility']
    },
    {
        title: '区域',
        key: 'area'
    },
    {
        title: '使用期限',
        key: 'timeLimit',
        options: ['粒度6个月', '粒度12个月', '粒度24个月', '粒度36个月', '自定义月']
    },
    {
        title: '共享等级',
        key: 'shareLevel'
    },
    {
        title: '服务保障参数',
        key: 'serviceKey',
        options: ['钻石套餐', '黄金套餐', '白银套餐']
    },
]