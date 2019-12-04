import React, { Component } from 'react';
import { createHashHistory } from 'history';

import { getCurrentUser } from 'utils/util';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './style.less';
import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis'

const history = createHashHistory();

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values
                window.localStorage.setItem("username", values.username);
                axiosget(APIS.loginApi(username, password)).then(res => {
                    const { result_header: { result_code, result_message } } = res
                    if (+result_code === 200) {
                        message.success('Successfully login', 3000);
                        console.log('登录成功');
                    } else {
                        message.error(result_message || 'Error occured when login', 3000);
                    }
                })
                history.goBack();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <h2>Welcome to 5G Slicing Market</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue: getCurrentUser(),
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'login' })(Login)