import React from 'react';
import { Layout, Menu, Icon, Button, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import { testHeadmenu, getCurrentUser } from 'utils/util';

const { Header } = Layout;

class Appheader extends React.Component {

    state = {
        currentMenu: "",
        currentLanguage: this.props.i18n.languages[0] === 'ch' ? "en" : "ch"
    }
    componentDidMount() {
        const { location } = this.props;
        const reg = location.pathname.slice(1);
        this.setState({ currentMenu: testHeadmenu(reg) })
    }

    handleLanguage() {
        const { currentLanguage } = this.state;
        this.setState({
            currentLanguage: currentLanguage === 'ch' ? 'en' : 'ch'
        })
        window.localStorage.setItem("currentLng", currentLanguage);
        this.props.i18n.changeLanguage(currentLanguage);
        this.props.history.go(0);
    }
    handleMenu(item) {
        if (item.key === "detail") {
            this.props.history.push('/ordermonitor/detail');
        } else {
            this.props.history.push("/");
            this.props.history.push(item.key);
        }
        this.setState({ currentMenu: item.key })
    }
    handleLogout() {
        window.localStorage.removeItem("username");
        this.props.history.push('/login');
    }
    render() {
        const { t } = this.props;
        const login = window.localStorage.getItem("username");
        const { currentMenu, currentLanguage } = this.state;
        const menu =
            <Menu>
                <Menu.Item>
                    <span onClick={() => this.handleLogout()}>
                        {
                            !login ?
                                <span><Icon type="login" style={{ marginRight: 5 }} />{t('Log in')}</span> :
                                <span><Icon type="logout" style={{ marginRight: 5 }} />{t('Log out')}</span>
                        }
                    </span>
                </Menu.Item>
            </Menu>
        return (
            <Header className="layout_header">
                <div className="layout_header__logo">{t('Project Title')}</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[currentMenu]}
                    onSelect={(item) => this.handleMenu(item)}
                    className="layout_header__menu"
                >
                    <Menu.Item key="home">{t('Home')}</Menu.Item>
                    <Menu.Item key="businessorder" >{t('Slicing Business Order')}</Menu.Item>
                    <Menu.Item key="ordermgt" >{t('Slicing Order Management')}</Menu.Item>
                    <Menu.Item key="businessmgt">{t('Slicing Business Management')}</Menu.Item>
                    <Menu.Item key="businessmonitor">{t('Slicing Business Monitor')}</Menu.Item>
                </Menu>
                <div className="layout_header__operation" >
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <span style={{ cursor: 'pointer' }}>
                            {!login ?
                                <span>{t('Not Login')}</span> :
                                <span>
                                    <Icon type="user" style={{ marginRight: 5 }} />
                                    <span>{getCurrentUser()}</span>
                                </span>
                            }

                        </span>
                    </Dropdown>
                    <Button size="small" ghost style={{ marginLeft: 25 }} onClick={() => this.handleLanguage()}>{currentLanguage === 'ch' ? "中文" : "English"}</Button>
                </div>
            </Header>
        );
    }
}

export default withNamespaces()(withRouter(Appheader))