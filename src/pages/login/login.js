import React from 'react'
import { Form, Icon, Input, Button, Card, message } from 'antd';
import './login.scss'
import api from '../../api/index';

class login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            // loading: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {code, data, msg} = await api.post('/loginIn', values);
                if (code === 'success') {
                    message.success(msg);
                    let infoObject = {username: data.username, token: data.token};
                    sessionStorage.setItem('reactTest', JSON.stringify(infoObject));
                    sessionStorage.setItem('menuItmeKey', '0');
                    this.props.history.replace('/admin/home');
                } else {
                    message.error(msg);
                }
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-form'>
                <Card title="Welcome!" className="login-card" hoverable={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
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
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(login)

export default Login
