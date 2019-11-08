import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Select, Table, Modal } from 'antd';
import { connect } from 'react-redux'
import { actions } from './actions'
import BusinessMGTTable from '../../components/BusinessMGTTable/BusinessMGTTable'
import { SELECT_OPTIONS } from '../../constant/constants'

import './OrderManagement.less'

class OrderManagement extends React.Component {
    state = { 
        orderId: '',
        visible: false
    }
    
    selectStatus = (status) => {
        this.props.changeTableLoading(true)
        this.props.getTableData({status})
    }

    componentDidMount(){
        this.props.changeTableLoading(true)
        this.props.getTableData()
    }

    handleOpenDetail = (orderId,e) => {
        this.setState({visible: true})
        // this.props.getOrderDetail(orderId)
        this.setState ({orderId})
        e.preventDefault()
    }
    pageChange = (pageNum, pageSize) => {
        this.props.changeTableLoading(true)
        this.props.getTableData({pageNum, pageSize})
    }
    pageSizeChange = (pageNum, pageSize) => {
        this.props.changeTableLoading(true)
        this.props.getTableData({pageNum, pageSize})
    }

    // modal
    handleCancel = () => {
        this.setState({visible: false})
    }

    render() {
        const { t } = this.props;
        const tableData = this.props.ordermgt.get('tableData').toJS()
        const {visible} = this.state

        const columns = [
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
                title: '服务到期时间',
                dataIndex: 'service_expiration_time',
                key: 'service_expiration_time'
            },
            {
                title: '描述',
                dataIndex: 'order_description',
                key: 'order_description'
            },
            {
                title: '状态',
                dataIndex: 'order_status',
                key: 'order_status',
                render: (text) => text === 'normal'? '进行中': '已终止'
            },
            {
                title: '详情',
                dataIndex: 'detail',
                key: 'detail',
                render: (text, reacord) => (
                    <a href='##' className='ordermgt_detail' onClick={(e) => this.handleOpenDetail(reacord.order_id,e)}>查看详情</a>
                    
                )
            }
        ]
        const { orderId } = this.state
        return (
            <div className='ordermgt'>
                <h2 className='ordermgt_title'>
                    {t('Slicing Order Management')}
                </h2>
                <div className='ordermgt_content'>
                    <div className='ordermgt_query'>
                        <span className='orderStatus_select-label'>状态 ：</span>
                        <Select 
                          className='orderStatus_select' 
                          defaultValue='all' 
                          onChange={this.selectStatus}
                        >
                            {SELECT_OPTIONS.map(item => {
                                return <Select.Option key={item.key}>
                                            {item.name}
                                        </Select.Option>
                            })}
                        </Select>
                    </div>
                    <Table 
                      columns={columns} 
                      dataSource={tableData.data}
                      rowKey={(record, index) => index}
                      loading={tableData.loading}
                      pagination={{showSizeChanger: true, total: tableData.total, onChange: this.pageChange, onShowSizeChange: this.pageSizeChange}}
                    />
                </div>
                <Modal
                    title={t('Slicing Order Management')}
                    visible={visible}
                    onCancel={this.handleCancel}
                    centered
                    width={1000}
                    bodyStyle={{height: '400px'}}
                    footer={null}
                >
                    <BusinessMGTTable orderId={orderId} />
                </Modal>
            </div>
        );
    }
}

export default withNamespaces()(connect(
    state => ({ordermgt: state.ordermgt}),
    actions
)(OrderManagement))
