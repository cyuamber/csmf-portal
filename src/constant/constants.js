export const ORDER_CREATE_FORM = [{
        title: '切片业务名称',
        key: 'businessName'
    },
    {
        title: '连接规模数',
        key: 'connectCount',
        content: '取值范围： 1-100000'
    },
    {
        title: '用户下行带宽（Mbps）',
        key: 'downstream',
        content: '取值范围： 100-3000'
    },
    {
        title: '时延',
        key: 'delay',
        content: '取值范围： 10-200'
    },
    {
        title: '用户上行带宽（Mbps）',
        key: 'upstream',
        content: '取值范围： 100-3000'
    },
    {
        title: '共享等级',
        key: 'shareLevel'
    },
    {
        title: '游牧性',
        key: 'nomadic',
        options: ['不可游牧', '固定接入', '限定范围内可游牧', '自由游牧']
    },
    {
        title: '激活因子（%）',
        key: 'factor',
        content: '取值范围： 1-100'
    },
    {
        title: '使用期限（月）',
        key: 'timeLimit',
        content: '取值范围： ≥1'
    },
    {
        title: '区域',
        key: 'area'
    }
]

export const SELECT_OPTIONS = [
    {
        name: '全部',
        key: 'all'
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