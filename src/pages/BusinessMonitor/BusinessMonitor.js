import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import { Row, Col, Table, Avatar, DatePicker } from 'antd';

import { axiosget } from 'utils/http';
import APIS from 'constant/apis';

import { chartConfig, chartStyle, singleLineconfig } from './constants';
import StackLine from 'components/charts/stackLines';

import "./style.less"

class BusinessMonitor extends React.Component {
    state = {}

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { changeTable, tableLoading } = this.props;
        tableLoading(true);
        axiosget(APIS.testapi).then(res => {
            changeTable(res, false)
        })
    }
    showDetail() {
        console.log("===detail")
    }

    render() {
        const columns = [{
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
        const tableData = this.props.businessmonitor.get('table').toJS();
        return (
            <div className="businessmonitor">
                <DatePicker showTime />
                <Row type="flex" gutter={16} justify="space-around" className="businessmonitor_imagecontainer">
                    <Col span={8}>
                        <StackLine chartConfig={singleLineconfig} lineStyle={chartStyle} />
                    </Col>
                    <Col span={8}>
                        <StackLine chartConfig={chartConfig} lineStyle={chartStyle} />
                    </Col>
                    <Col span={8}>
                        <StackLine chartConfig={chartConfig} lineStyle={chartStyle} />
                    </Col>
                </Row>

                <Table
                    loading={tableData.loading}
                    rowKey={(record, index) => index}
                    dataSource={tableData.data}
                    columns={columns} />
            </div>
        );
    }
}
export default connect(
    state => ({ businessmonitor: state.businessmonitor }),
    actions
)(BusinessMonitor)