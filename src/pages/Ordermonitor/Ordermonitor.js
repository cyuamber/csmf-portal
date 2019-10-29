import React from 'react';
import { Button } from 'antd';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';

import { axiosget } from 'utils/http';
import APIS from 'constant/apis';

class Ordermonitor extends React.Component {
    state = {
        currentUrl: ''
    }
    componentDidMount() {
        axiosget(APIS.testapi).then(res => console.log(res))

    }
    showDetail() {
        console.log("===detail")
    }

    render() {
        return (
            <div>
                <p>Ordermonitor</p>
                <p>
                    <Link to='/dashboard'><Button type="primary">Jump to dashboard</Button></Link>
                </p>
                <div>
                    <Link to='/ordermonitor/detail'><Button type="primary" onClick={() => this.showDetail}>Jump to detail</Button></Link>
                </div>
            </div>
        );
    }
}

export default Ordermonitor