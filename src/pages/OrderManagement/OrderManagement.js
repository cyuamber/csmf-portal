import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Select, Table, Modal } from 'antd';
import { connect } from 'react-redux';
import { actions } from './actions';
import BusinessMGTTable from '../../components/BusinessMGTTable/BusinessMGTTable';
import { SELECT_OPTIONS, ORDER_MGT_COLUMNS } from '../../constant/constants';

import './OrderManagement.less';

class OrderManagement extends React.Component {
    state = {
        orderId: '',
        visible: false
    };

    selectStatus = (status) => {
        this.props.changeTableLoading(true);
        this.props.getTableData({ status });
    }

    handleOpenDetail = (orderId, e) => {
        this.setState({ visible: true, orderId });
        e.preventDefault();
    }
    pageChange = (pageNo, pageSize) => {
        this.props.changeTableLoading(true);
        this.props.getTableData({ pageNo, pageSize });
    }
    pageSizeChange = (pageNo, pageSize) => {
        this.props.changeTableLoading(true);
        this.props.getTableData({ pageNo, pageSize });
    }

    // modal
    handleCancel = () => {
        this.setState({ visible: false });
        // 清除定时器
        this.timerList.forEach(item => {
            clearTimeout(item);
        })
    }

    getTimerList = timerList => {
        this.timerList = timerList;
    }

    componentDidMount() {
        this.props.getTableData();
        this.timerList = [];
    }
    render() {
        const { t } = this.props;
        const tableData = this.props.ordermgt.get('tableData').toJS();
        const { visible } = this.state;
        ORDER_MGT_COLUMNS.map(item => {
            item.title = t(item.title)
        })
        const statusColumn = [{
            title: t('Status'),
            dataIndex: 'order_status',
            key: 'order_status',
            render: (text) => text === 'created' ? t('Order completed') : t('Order processing')
        }];
        const lastColumns = [{
            title: t('Detail'),
            dataIndex: 'detail',
            key: 'detail',
            render: (text, record) => (
                record.order_status === 'created' ?
                    <a href='##' className='ordermgt_detail' onClick={(e) => this.handleOpenDetail(record.order_id, e)}>{t('View Detail')}</a> :
                    <span className='ordermgt_detail_disabled'> {t('View Detail')}</span>
            )
        }]
        const columns = [...ORDER_MGT_COLUMNS, ...statusColumn, ...lastColumns]
        const { orderId } = this.state;
        const pageNo = this.props.ordermgt.get('pageNo');
        const pageSize = this.props.ordermgt.get('pageSize');
        const pagination = {
            showSizeChanger: true,
            total: tableData.total,
            current: pageNo,
            pageSize,
            onChange: this.pageChange,
            onShowSizeChange: this.pageSizeChange
        };
        return (
            <div className='ordermgt'>
                <h2 className='ordermgt_title'>
                    {t('Slicing Order Management')}
                </h2>
                <div className='ordermgt_content'>
                    <div className='ordermgt_query'>
                        <span className='orderStatus_select-label'>{t('Status')}：</span>
                        <Select
                            className='orderStatus_select'
                            defaultValue='all'
                            onChange={this.selectStatus}
                        >
                            {SELECT_OPTIONS.map(item => {
                                return <Select.Option key={item.key}>
                                    {t(item.name)}
                                </Select.Option>
                            })}
                        </Select>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={tableData.data}
                        rowKey={(record, index) => index}
                        loading={tableData.loading}
                        pagination={pagination}
                    />
                </div>
                <Modal
                    title={t('Slicing Order Detail')}
                    visible={visible}
                    onCancel={this.handleCancel}
                    centered
                    width={1000}
                    bodyStyle={{ height: '400px' }}
                    footer={null}
                >
                    <BusinessMGTTable orderId={orderId} getTimerList={this.getTimerList} />
                </Modal>
            </div>
        );
    }
}

export default withNamespaces()(connect(
    state => ({ ordermgt: state.ordermgt }),
    actions
)(OrderManagement));
