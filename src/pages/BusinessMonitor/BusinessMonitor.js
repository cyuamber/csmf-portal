import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Button, Table, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { axiosget } from 'utils/http';
import APIS from 'constant/apis';

import "./style.less"

const mapDispatchToProps = dispatch => ({
    changeTable: (data = {}, bool = true) => {
        dispatch(actions.changeTable(data, bool))
    },
    tableLoading: (bool = false) => {
        dispatch(actions.tableLoading(bool))
    }
})


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
        const tableData = this.props.ordermonitor.get('table')
        return (
            <div>
                <p>
                    <Link to='/businessorder'><Button type="primary">Jump to dashboard</Button></Link>
                    <Link to='/businessmonitor/detail' style={{ marginLeft: 10 }}><Button type="primary" onClick={() => this.showDetail}>Jump to detail</Button></Link>
                </p>
                <Table
                    loading={tableData.get('loading')}
                    rowKey={(record, index) => index}
                    dataSource={tableData.get('data').toJS ? tableData.get('data').toJS() : tableData.get('data')}
                    columns={columns} />
            </div>
        );
    }
}
export default connect(
    state => ({ ordermonitor: state.ordermonitor }),
    mapDispatchToProps
)(BusinessMonitor)