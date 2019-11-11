import React from 'react';
import { Avatar } from 'antd';

export const pieChartconfig = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: 'center',
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
            ]
        }
    ]
}

export const chartConfig = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            // saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
}

export const chartStyle = {
    width: '100%',
    height: '400px',
}

export const tableColumns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
}, {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    render: text => <Avatar alt="avatar" src={text} size="large" />,
}, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
},
{
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
},
]