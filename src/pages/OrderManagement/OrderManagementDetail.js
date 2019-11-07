import React, { Component } from 'react'
import { Modal, Button, Table, Switch, Icon } from 'antd'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from './actions'
import { axiosput, axiosdelete } from '../../utils/http'
import APIS from '../../constant/apis'

import './OrderManagementDetail.less'

class OrderManagementDetail extends Component {

    static propTypes = {
        orderId: PropTypes.string.isRequired
    }

    state = { 
        loading: false
    }

    handleCancel = () => {
        console.log('cancel')
        this.props.showModal()
    }
    handleServiceEnd = () => {
        const { orderId, getOrderDetail } = this.props
        // axiosdelete(APIS.terminate(serviceId))
        axiosdelete(APIS.terminate).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                getOrderDetail(orderId)
            }    
        })
    }
    changeStatus = (serviceId, checked) => {
        this.setState({loading: true})
        const url = checked ? APIS.disable : APIS.enable
        const { orderId, getOrderDetail} = this.props
        // axiosput(url(serviceId))
        axiosput(url).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                setTimeout(() => {
                    this.setState({loading: false})
                    getOrderDetail(orderId)
                },2000)
            }    
        })
    }

    render() {
        const { t } = this.props
        const visible = this.props.ordermgt.get('showModal')
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
                    return <Switch defaultChecked={isChecked} size='small' onChange={(checked) => this.changeStatus(record.service_id, checked)} loading={this.state.loading}/>
                }
            },
            {
                title: '终止',
                dataIndex: 'end',
                render: (text,record) => {
                    let isDisable = record.service_status === 'normal'? true : false
                    return <Button icon='poweroff' shape='circle' disabled={isDisable} onClick={() => this.handleServiceEnd(record.service_id)}></Button>
                }
            }
        ]
        const tableData = this.props.ordermgt.get('orderDetail').toJS()
        return (
            <Modal
                title={t('Slicing Order Management')}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                centered
                width={1000}
                bodyStyle={{height: '400px'}}
                footer={null}
            >
                <Table 
                  columns={columns}
                  dataSource={tableData}
                  rowKey={(record, index) => index}
                  pagination={false}
                />
            </Modal>
        )
    }
}

export default withNamespaces()(connect(
    state => ({ordermgt: state.ordermgt}),
    actions
)(OrderManagementDetail))