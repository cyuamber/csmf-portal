import React from 'react';
import { Button, Table, Avatar } from 'antd';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';

import { axiosget } from 'utils/http';
import APIS from 'constant/apis';

import "./style.less"

class Ordermonitor extends React.Component {

    state = {
        currentUrl: '',
        dataSource: [],

    }
    componentDidMount() {
        axiosget(APIS.testapi).then(res => this.setState({ dataSource: res }))

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
        const { dataSource } = this.state
        return (
            <div>
                <p>Ordermonitor</p>
                <p>
                    <Link to='/dashboard'><Button type="primary">Jump to dashboard</Button></Link>
                </p>
                <div>
                    <Link to='/ordermonitor/detail'><Button type="primary" onClick={() => this.showDetail}>Jump to detail</Button></Link>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default Ordermonitor