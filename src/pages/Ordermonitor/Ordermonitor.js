import React from 'react';
import { Button } from 'antd';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';

import { axiosget } from 'utils/http';

class Ordermonitor extends React.Component {
    state = {
        currentUrl: ''
    }
    componentDidMount() {
        axiosget('/api/getMeterSys').then(res => console.log(res))

    }
    showDetail() {
        console.log("===detail")
    }

    render() {
        return (
            <div>
                <p>Ordermonitor</p>
                <Link to='/dashboard'><Button type="primary">Jump to dashboard</Button></Link>
                <Link to='/ordermonitor/detail'><Button type="primary" onClick={() => this.showDetail}>Jump to detail</Button></Link>
            </div>
        );
    }
}

export default Ordermonitor