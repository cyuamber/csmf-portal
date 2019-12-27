import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { actions } from './actions';
import { Button, Table, Switch, Popconfirm, Progress, message } from 'antd';
import { axiosput, axiosdelete, axiosget } from '../../utils/http';
import APIS from '../../constant/apis';
import { BUSINESS_MGT_COLUMNS } from '../../constant/constants';

import './stype.less';

class BusinessMGTTable extends Component {
    changeStatus = (serviceId, checked) => {
        this.props.getStatusLoading(serviceId, true, 'activate');
        const url = checked ? APIS.activateApi : APIS.deactivateApi;
        axiosput(url(serviceId)).then(res => {
            const { result_header: { result_code, result_message } } = res;
            if (+result_code === 200) {
                this.getProgress(serviceId, 'activate');
            } else {
                message.error(result_message, 1);
                this.props.getStatusLoading(serviceId, false, 'activate');
            }
        }, ({ message: error }) => {
            message.error(error, 1);
            this.props.getStatusLoading(serviceId, false, 'activate');
        })
    }

    getProgress = (serviceId, operation) => {
        const { getProgress, businesmgtTable, orderId, getTableData, status, getTimerList } = this.props;
        let index = 0;
        businesmgtTable.getIn(['tableData']).toJS().data.forEach((item, i) => {
            if (item.service_id === serviceId) {
                index = i;
            }
        });
        axiosget(APIS.getProgressApi(serviceId)).then((res) => {
            const { result_header: { result_code, result_message }, result_body: { operation_progress } } = res;
            if (+result_code === 200) {
                getProgress(index, operation_progress);
                // 判断当请求成功响应，但progress值出现错误
                if (!operation_progress) {
                    if (operation_progress !== 0) {
                        return this.props.getStatusLoading(serviceId, false, operation);
                    }
                }
                if (operation_progress !== 100) {
                    const timer = setTimeout(() => {
                        this.getProgress(serviceId);
                    }, 5000)
                    this.timerList.push(timer);
                    getTimerList && getTimerList(this.timerList);
                } else {
                    // 更新表格
                    if (!status) {
                        getTableData(orderId);
                    } else {
                        const pageNo = businesmgtTable.get('page_no');
                        const pageSize = businesmgtTable.get('page_size');
                        getTableData({ status, pageNo, pageSize });
                    }
                }
            } else {
                this.props.getStatusLoading(serviceId, false, operation);
                message.error(result_message, 1);
            }
        }, ({ message: error }) => {
            message.error(error, 1);
            this.props.getStatusLoading(serviceId, false, operation);
        })
    }

    pageChange = (pageNo, pageSize) => {
        const { status = 'all', getTableData, getChartsData } = this.props;
        getTableData({ status, pageNo, pageSize }, getChartsData);
    }

    pageSizeChange = (pageNo, pageSize) => {
        const { status = 'all', getTableData, getChartsData } = this.props;
        getTableData({ status, pageNo, pageSize }, getChartsData);
    }

    handleServiceEnd = (serviceId) => {
        this.props.getStatusLoading(serviceId, true, 'delete');
        // axiosdelete(APIS.terminateApi(serviceId))
        // APIS.terminate
        axiosdelete(APIS.terminateApi(serviceId)).then(res => {
            const { result_header: { result_code, result_message } } = res;
            if (+result_code === 200) {
                console.log(serviceId, "===>serviceId")
                this.getProgress(serviceId, 'delete');
            } else {
                this.props.getStatusLoading(serviceId, false, 'delete');
                message.error(result_message, 1);
            }
        }, ({ message: error }) => {
            this.props.getStatusLoading(serviceId, false, 'delete');
            message.error(error, 1);
        })
    }

    componentDidMount() {
        const { getTableData, status, orderId, getChartsData } = this.props;
        if (orderId) {
            getTableData(orderId).then(res => {
                res.forEach(item => {
                    if (item.progress !== 100 && item.progress) {
                        this.getProgress(item.service_id, item.operation);
                    } else if (item.progress === 0) {
                        this.getProgress(item.service_id, item.operation);
                    }
                })
            })
        } else {
            if (status) {
                getTableData({ status, pageNo: 1, pageSize: 10 }).then(res => {
                    res.forEach(item => {
                        if (item.progress !== 100 && item.progress) {
                            this.getProgress(item.service_id, item.operation);
                        } else if (item.progress === 0) {
                            this.getProgress(item.service_id, item.operation);
                        }
                    })
                })
            } else {
                getTableData({ status: 'all', pageNo: 1, pageSize: 6 }, getChartsData);
            }
        }
        this.timerList = [];
    }
    shouldComponentUpdate(nextProps) {
        const { getTableData, status, orderId } = this.props;

        if (orderId !== nextProps.orderId) {
            getTableData(nextProps.orderId);
        } else if (status && status !== nextProps.status) {
            getTableData({ status: nextProps.status, pageNo: 1, pageSize: 10 });
        }
        return true;
    }
    componentWillUnmount() {
        this.timerList.forEach(item => {
            clearTimeout(item);
        })
    }
    ;
    render() {
        const { pageSizeOptions, t } = this.props;
        const btnText = 'Are you sure you want to terminate this task?';
        const switchText = 'Are you sure you want to perform this task?';
        BUSINESS_MGT_COLUMNS.map(item => {
            if (item.title !== 'S-NSSAI') {
                item.title = t(item.title)
            }
        })
        const statusColumn = [{
            title: t('Status'),
            dataIndex: 'service_status',
            render: text => text === 'activated' ? t('Activated') : t('Deactivated')
        }];
        const lastColumns = [
            {
                title: t('Activate'),
                dataIndex: 'activation',
                align: 'center',
                render: (isActivate, record) => {
                    return (
                        <Popconfirm
                            placement="top"
                            title={switchText}
                            onConfirm={() => this.changeStatus(record.service_id, !isActivate)}
                            okText="Yes" cancelText="No"
                            disabled={record.disabled}
                        >
                            <Switch
                                defaultChecked={isActivate}
                                checked={isActivate}
                                size='small'
                                loading={record.loading && (record.operation && record.operation.toLowerCase() !== 'delete')}
                                disabled={record.disabled}
                            />
                            {record.operation && record.operation.toLowerCase() !== 'delete' && record.progress !== 100 ?
                                <Progress size="small" percent={record.progress} status={record.progress === 100 ? 'success' : 'active'} /> : false
                            }
                        </Popconfirm>
                    )
                }
            },
            {
                title: t('Terminate'),
                dataIndex: 'end',
                align: 'center',
                render: (text, record) => {
                    // 当非actavtion且disable为false且loading为false  显示                  
                    const isDisable = !record.activation && !record.disabled && !record.loading;
                    return (
                        <Popconfirm
                            placement="topLeft"
                            title={btnText}
                            onConfirm={() => this.handleServiceEnd(record.service_id)}
                            okText="Yes"
                            cancelText="No"
                            disabled={!isDisable}
                        >
                            <Button
                                icon='poweroff'
                                shape='circle'
                                disabled={!isDisable}
                            />
                            {record.operation && record.operation.toLowerCase() === 'delete' && record.progress !== 100 ?
                                <Progress size="small" percent={record.progress} status={record.progress === 100 ? 'success' : 'active'} /> : false
                            }
                        </Popconfirm>
                    )
                }
            }
        ];
        const firstColumns = [{ title: t('No'), dataIndex: 'index', width: 100 }]
        let columns = [...BUSINESS_MGT_COLUMNS, ...statusColumn];
        const { orderId, businesmgtTable, getChartsData } = this.props;
        if (!orderId) {
            columns = [...firstColumns, ...columns];

        }
        if (!getChartsData) {
            columns = [...columns, ...lastColumns];
        }
        const tableData = businesmgtTable.get('tableData').toJS();
        const pageNo = businesmgtTable.get('page_no');
        const pageSize = businesmgtTable.get('page_size');

        const pagination = orderId ? false : {
            showSizeChanger: true,
            total: tableData.total,
            onChange: this.pageChange,
            onShowSizeChange: this.pageSizeChange,
            pageSizeOptions: pageSizeOptions || ['10', '20', '30', '40'],
            current: pageNo,
            pageSize: pageSize
        };
        return (
            <Table
                loading={tableData.loading}
                columns={columns}
                dataSource={tableData.data}
                rowKey={record => record.service_id}
                pagination={pagination}
            />
        )
    }
}
export default withNamespaces()(connect(
    state => ({ businesmgtTable: state.businesmgtTable }),
    actions
)(BusinessMGTTable));