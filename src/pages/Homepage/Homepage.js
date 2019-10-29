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
                    <p>content</p>
                    <Button type="primary" onClick={this.jumpTodashboard}>Jump to dashboard</Button>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                </div>

            </div>
        );
    }
}

export default Homepage
