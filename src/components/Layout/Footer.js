import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class Appfooter extends React.Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center', background: "#fff" }}>CMCC ©2019 Created by China Mobile</Footer>
        );
    }
}

export default Appfooter
