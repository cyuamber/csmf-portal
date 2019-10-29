import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';

import { testHeadmenu } from 'utils/util';

const { Header } = Layout;

class Appheader extends React.Component {
    state = {
        currentMenu: ""
    }
    componentDidMount() {
        const { location } = this.props;
        const reg = location.pathname.slice(1);
        this.setState({ currentMenu: testHeadmenu(reg) })
    }

    shouldComponentUpdate(preProps, nextState) {
        const { currentMenu } = this.state;
        return currentMenu !== nextState.currentMenu
    }

    handleMenu(item) {
        // console.log(item, "==>item")
        if (item.key === "detail") {
            this.props.history.push('/ordermonitor/detail');
        } else {
            this.props.history.push("/");
            this.props.history.push(item.key);
        }
        this.setState({ currentMenu: item.key })
    }
    render() {
        const { currentMenu } = this.state;
        // console.log(currentMenu, "===render")
        return (
            <Header style={{ textAlign: 'center' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[currentMenu]}
                    onSelect={(item) => this.handleMenu(item)}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="dashboard" >Dashboard</Menu.Item>
                    <Menu.Item key="orderconfirm" >Order Confirm</Menu.Item>
                    <Menu.Item key="ordermanage">Order Manage</Menu.Item>
                    <Menu.Item key="ordermonitor">Order Monitor</Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(Appheader)