import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './style.less'

class Login extends React.Component {
    handleLogin() {
        console.log("=======handle login======")
    }
    render() {
        return (
            <div className="login">
                <Link to='/home'><Button type="primary" onClick={() => this.handleLogin}>Log in</Button></Link>
            </div>
        );
    }
}

export default Login