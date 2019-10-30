import React from 'react';
import { createHashHistory } from 'history';
import { Button } from 'antd';
import './style.less';

const history = createHashHistory();

class Homepage extends React.Component {
    jumpTodashboard() {
        history.push('/dashboard');
    }
    render() {
        return (
            <div className="homepage">
                <div>
                    <p>Homepage</p>
                    <p>Homepage</p>
                    <Button type="primary" onClick={this.jumpTodashboard}>Jump to dashboard</Button>
                    <p>Homepage</p>
                </div>
            </div>
        );
    }
}

export default Homepage
