import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './actions'
import { Button, Table, Switch, Popconfirm } from 'antd'
import { axiosput, axiosdelete } from '../../utils/http'
import APIS from '../../constant/apis'

class BusinessMGTTable extends Component {

    changeStatus = (serviceId, checked) => {
        const url = checked ? APIS.enable : APIS.disable 
        const { orderId, getTableData, status, businesmgtTable, changeLoading} = this.props
        // getStatusLoading(serviceId, true)
        changeLoading(true)
        // axiosput(url(serviceId))
        axiosput(url).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                setTimeout(() => {
                    if(!status){
                        getTableData(orderId)
                    }else {
                        const page_no = businesmgtTable.get('page_no')
                        const page_size = businesmgtTable.get('page_size')
                        getTableData({status, page_no, page_size})
                    }
                },2000)
            }    
        })
    }

    pageChange = (page_no, page_size) => {
        let { status = 'all', getTableData, getChartsData } = this.props
        getTableData({status, page_no, page_size}, getChartsData)
    }

    pageSizeChange = (page_no, page_size) => {
        let { status = 'all', getTableData, getChartsData } = this.props
        getTableData({status, page_no, page_size}, getChartsData)
    }

    handleServiceEnd = (serviceId) => {
        const { businesmgtTable, getTableData, orderId, status, changeLoading } = this.props
        // axiosdelete(APIS.terminate(serviceId))
        changeLoading(true)
        axiosdelete(APIS.terminate).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                if(orderId){
                    getTableData(orderId)
                }else {
                    const page_no = businesmgtTable.get('page_no')
                    const page_size = businesmgtTable.get('page_size')
                    getTableData({status, page_no, page_size})
                }
            }    
        })
    }

    componentDidMount(){
        const { getTableData, status, orderId } = this.props
        if (orderId) {
            getTableData(orderId)
        }else {
            if ( status ){
                getTableData({ status, page_no: 1, page_size: 10 }) 
            }else {
                getTableData({ status: 'all', page_no: 1, page_size: 6 })
            }
        }
    }

    shouldComponentUpdate(nextProps){
        const { getTableData, status, businesmgtTable, orderId } = this.props
        if(orderId !== nextProps.orderId){
            getTableData(nextProps.orderId)
        }else if(status && status !== nextProps.status){
            const page_no = businesmgtTable.get('page_no')
            const page_size = businesmgtTable.get('page_size')
            getTableData({status: nextProps.status, page_no, page_size})
        }
        return true
    }

    render() {
        const btnText = 'Are you sure you want to terminate this task?'
        const switchText = 'Are you sure you want to perform this task?'
        const columns = [
            {
                title: '业务列表',
                dataIndex: 'service_id'
            },
            {
                title: '购买时间',
                dataIndex: 'service_creation_time'
            },
            {
                title: '激活时间',
                dataIndex: 'service_enable_time'
            },
            {
                title: '标签',
                dataIndex: 'service_description'
            },
            {
                title: '状态',
                dataIndex: 'service_status',
                render: (text) => text === 'normal'? '已激活': '未激活'
            },
            {
                title: '激活',
                dataIndex: 'activation',
                render: (text,record) => {
                    return (
                        <Popconfirm 
                          placement="top" 
                          title={switchText} 
                          onConfirm={() => this.changeStatus(record.service_id, !text)} 
                          okText="Yes" cancelText="No">
                            <Switch 
                                defaultChecked={text} 
                                checked={text}
                                size='small' 
                                loading={record.loading}
                            />
                        </Popconfirm>
                    )
                }
            },
            {
                title: '终止',
                dataIndex: 'end',
                render: (text,record) => {
                    let isDisable = record.service_status === 'normal'? true : false
                    return (
                        <Popconfirm placement="top" title={btnText} onConfirm={() => this.handleServiceEnd(record.service_id)} okText="Yes" cancelText="No">
                            <Button 
                                icon='poweroff' 
                                shape='circle' 
                                disabled={isDisable} 
                            />
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
        const { pageSizeOptions } = this.props
        const pagination = orderId ? false : {
            showSizeChanger: true, 
            total: tableData.total, 
            onChange: this.pageChange, 
            onShowSizeChange: this.pageSizeChange,
            pageSizeOptions: pageSizeOptions || ['10', '20', '30', '40'],
            defaultPageSize: pageSizeOptions ? 6 : 10
        } 
        return (
            <Table 
                loading={tableData.loading}
                columns={columns}
                dataSource={tableData.data}
                rowKey={(record, index) => index}
                pagination={pagination}
            />
        )
    }
}
export default connect(
    state => ({businesmgtTable: state.businesmgtTable}),
    actions
)(BusinessMGTTable)