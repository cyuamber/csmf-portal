import React from 'react';
import { Layout } from 'antd';

import Appheader from './Header';
import Bread from './Bread';
// import Appfooter from './Footer';

import './style.less';

const { Content } = Layout;

class Layoutframe extends React.Component {
    render() {
        const isBread = window.location.href.indexOf('login') === -1 ? true : false;
        console.log(window.location.href, window.location.href.indexOf('login'))
        return (
            <Layout className="layout" style={{ background: "#fff" }}>
                <Appheader />
                <Content className="layout_content">
                    {
                        isBread ? <div className="layout_content__bread">
                            <Bread />
                        </div> : null
                    }
                    <div className="layout_content__body">{this.props.children}</div>
                </Content>
                {/* <Appfooter /> */}
            </Layout>
        );
    }
}

export default Layoutframe
