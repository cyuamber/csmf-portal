import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './actions'
import { Button, Table, Switch, Popconfirm, Progress } from 'antd'
import { axiosput, axiosdelete, axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

import'./stype.less'

class BusinessMGTTable extends Component {
    changeStatus = (serviceId, checked) => {
        this.props.getStatusLoading(serviceId, true, 'activate')
        // const url = checked ? APIS.activateApi : APIS.deactivateApi 
        const url = checked ? APIS.enable : APIS.disable 
        // axiosput(url(serviceId))
        axiosput(url).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                this.count = 0
                this.getProgress(serviceId)
            }    
        })
    }

    getProgress = (serviceId) => {
        this.count ++
        const {getProgress, businesmgtTable, orderId, getTableData, status} = this.props
        let index = 0
        businesmgtTable.getIn(['tableData']).toJS().data.forEach((item, i) => {
            if(item.service_id === serviceId){
                index = i
            }
        });
        // APIS.getProgressApi(serviceId)
        axiosget (APIS.getProgress).then ( (res) => {
            let {result_header: {result_code}, result_body: {progress}} = res
            if(result_code === "200"){
                // 模拟
                if(this.count >= 2){
                    progress = 100
                }
                getProgress(index, progress)
                if(progress !== 100) {
                    setTimeout (() => {
                        this.getProgress(serviceId)
                    },5000)
                }else {
                    // 更新表格
                    setTimeout(() => {
                        if(!status){
                            getTableData(orderId)
                        }else {
                            const pageNo = businesmgtTable.get('page_no')
                            const pageSize = businesmgtTable.get('page_size')
                            getTableData({status, pageNo, pageSize})
                        }
                    },2000)
                }
            }
        })
    }

    pageChange = (pageNo, pageSize) => {
        let { status = 'all', getTableData, getChartsData } = this.props
        getTableData({status, pageNo, pageSize}, getChartsData)
    }

    pageSizeChange = (pageNo, pageSize) => {
        let { status = 'all', getTableData, getChartsData } = this.props
        getTableData({status, pageNo, pageSize}, getChartsData)
    }

    handleServiceEnd = (serviceId) => {
        this.props.getStatusLoading(serviceId, true, 'terminate')
        // axiosdelete(APIS.terminateApi(serviceId))
        axiosdelete(APIS.terminate).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                this.count = 0
                this.getProgress(serviceId)
            }    
        })
    }

    componentDidMount(){
        const { getTableData, status, orderId } = this.props
        if (orderId) {
            getTableData(orderId)
        }else {
            if ( status ){
                getTableData({ status, pageNo: 1, pageSize: 10 }) 
            }else {
                getTableData({ status: 'all', pageNo: 1, pageSize: 6 })
            }
        }
    }

    shouldComponentUpdate(nextProps){
        const { getTableData, status, businesmgtTable, orderId } = this.props
        if(orderId !== nextProps.orderId){
            getTableData(nextProps.orderId)
        }else if(status && status !== nextProps.status){
            getTableData({status: nextProps.status, pageNo: 1, pageSize: 10})
        }
        return true
    }

    render() {
        const btnText = 'Are you sure you want to terminate this task?'
        const switchText = 'Are you sure you want to perform this task?'
        const columns = [
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
                render: (text) => text === 'activated'? '已激活': '未激活'
            },
            {
                title: '激活',
                dataIndex: 'activation',
                align: 'center',
                render: (isActivate,record) => {
                    return (
                        <Popconfirm 
                          placement="top" 
                          title={switchText} 
                          onConfirm={() => this.changeStatus(record.service_id, !isActivate)} 
                          okText="Yes" cancelText="No">
                            <Switch 
                                defaultChecked={isActivate} 
                                checked={isActivate}
                                size='small' 
                                loading={record.loading}
                            />
                            {record.operation === 'activate' && record.progress !== 100 ? 
                              <Progress size="small" percent={record.progress} status={record.progress === 100 ? 'success' : 'active'}/> : false
                            }
                        </Popconfirm>
                    )
                }
            },
            {
                title: '终止',
                dataIndex: 'end',
                align: 'center',
                render: (text,record) => {
                    let isDisable = record.activation
                    return (
                        <Popconfirm 
                          placement="topLeft" 
                          title={btnText} 
                          onConfirm={() => this.handleServiceEnd(record.service_id)} 
                          okText="Yes" 
                          cancelText="No"
                          disabled={isDisable || record.loading}
                        >
                            <Button 
                                icon='poweroff' 
                                shape='circle' 
                                disabled={isDisable || record.loading} 
                            />
                            {record.operation === 'terminate' && record.progress !== 100 ?   
                              <Progress size="small"  percent={record.progress} status={record.progress === 100 ? 'success' : 'active'}/> : false
                            }
                        </Popconfirm>
                    )
                }
            }
        ]
        const { orderId, businesmgtTable, getChartsData } = this.props
        if(!orderId){
            columns.unshift({title: '序号', dataIndex: 'index'})
        }
        if(getChartsData){
            columns.pop()
            columns.pop()
        }
        const tableData = businesmgtTable.get('tableData').toJS()
        const pageNo = businesmgtTable.get('page_no')
        const pageSize = businesmgtTable.get('page_size')
        const { pageSizeOptions } = this.props
        const pagination = orderId ? false : {
            showSizeChanger: true, 
            total: tableData.total, 
            onChange: this.pageChange, 
            onShowSizeChange: this.pageSizeChange,
            pageSizeOptions: pageSizeOptions || ['10', '20', '30', '40'],
            current: pageNo,
            pageSize: pageSize
        } 
        return (
            <Table 
                loading={tableData.loading}
                columns={columns}
                dataSource={tableData.data}
                rowKey={record=> record.service_id}
                pagination={pagination}
            />
        )
    }
}
export default connect(
    state => ({businesmgtTable: state.businesmgtTable}),
    actions
)(BusinessMGTTable)