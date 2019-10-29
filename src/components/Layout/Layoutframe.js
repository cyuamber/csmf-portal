import React from 'react';
import { Layout } from 'antd';

import Appheader from './Header';
import Bread from './Bread';
import Appfooter from './Footer';

import './style.less';

const { Content } = Layout;

class Layoutframe extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Appheader />
                <Content className="layout_content">
                    <div className="layout_content__bread">
                        <Bread />
                    </div>
                    <div className="layout_content__body">{this.props.children}</div>
                </Content>
                <Appfooter />
            </Layout>
        );
    }
}

export default Layoutframe
