import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './actions'
import { Button, Table, Switch } from 'antd'
import { axiosput, axiosdelete } from '../../utils/http'
import APIS from '../../constant/apis'

class BusinessMGTTable extends Component {

    state = {
        loading: false
    }

    changeStatus = (serviceId, checked) => {
        this.setState({loading: true})
        const url = checked ? APIS.enable : APIS.disable 
        const { orderId, getTableData, status, businesmgtTable} = this.props
        // axiosput(url(serviceId))
        axiosput(url).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                setTimeout(() => {
                    this.setState({loading: false})
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

    componentDidMount(){
        const { getTableData, status, orderId, businesmgtTable, getChartsData } = this.props
        if (orderId) {
            getTableData(orderId)
        }else {
            const page_no = businesmgtTable.get('page_no')
            const page_size = businesmgtTable.get('page_size')
            if ( status ){
                getTableData({ status, page_no, page_size }) 
            }else {
                getTableData({ status: 'all', page_no, page_size })
            }
        }

    }

    componentWillReceiveProps(nextProps){
        const { getTableData, status, businesmgtTable, orderId } = this.props
        if(orderId !== nextProps.orderId){
            getTableData(nextProps.orderId)
        }else if(status && status !== nextProps.status){
            const page_no = businesmgtTable.get('page_no')
            const page_size = businesmgtTable.get('page_size')
            getTableData({status: nextProps.status, page_no, page_size})
        }
    }

    handleServiceEnd = (serviceId) => {
        const { businesmgtTable, getTableData, orderId, status } = this.props
        // axiosdelete(APIS.terminate(serviceId))
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

    render() {
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
                    let isChecked = record.service_status === 'normal'? true : false
                    return <Switch 
                            defaultChecked={isChecked} 
                            size='small' 
                            onChange={(checked) => this.changeStatus(record.service_id, checked)} loading={this.state.loading}
                           />
                }
            },
            {
                title: '终止',
                dataIndex: 'end',
                render: (text,record) => {
                    let isDisable = record.service_status === 'normal'? true : false
                    return <Button 
                            icon='poweroff' 
                            shape='circle' 
                            disabled={isDisable} 
                            onClick={() => this.handleServiceEnd(record.service_id)}
                           />
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
        const pagination = orderId ? false : {
            showSizeChanger: true, 
            total: tableData.total, 
            onChange: this.pageChange, 
            onShowSizeChange: this.pageSizeChange
        } 
        // const tableLoading = orderId ? false : tableData.loading
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