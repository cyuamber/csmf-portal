import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import { testHeadmenu } from 'utils/util';

const { Header } = Layout;

class Appheader extends React.Component {
    state = {
        currentMenu: "",
        currentLanguage: "中文"
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
        const { currentMenu, currentLanguage } = this.state;
        // console.log(currentMenu, "===render")
        return (
            <Header className="layout_header">
                <div className="layout_header__logo" >5G网络切片商城</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[currentMenu]}
                    onSelect={(item) => this.handleMenu(item)}
                    className="layout_header__menu"
                >
                    <Menu.Item key="home" >Home</Menu.Item>
                    <Menu.Item key="dashboard" >Dashboard</Menu.Item>
                    <Menu.Item key="orderconfirm" >Order Confirm</Menu.Item>
                    <Menu.Item key="ordermanage">Order Manage</Menu.Item>
                    <Menu.Item key="ordermonitor">Order Monitor</Menu.Item>
                </Menu>
                <div className="layout_header__operation" >
                    <span><Icon type="user" style={{ marginRight: 5 }} />Admin</span>
                    <Icon type="logout" style={{ marginLeft: 25 }} />
                    <Button size="small" style={{ marginLeft: 25 }} >{currentLanguage}</Button>
                </div>

            </Header>
        );
    }
}

export default withRouter(Appheader)