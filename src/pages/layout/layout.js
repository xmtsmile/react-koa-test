import React from 'react';
import {Route, Link} from 'react-router-dom';
import routes from '../../router/admin';
import {Layout, Menu, Icon, Avatar, Dropdown, Modal} from 'antd';
import './layout.scss';

const {Header, Sider, Content} = Layout;
const { confirm } = Modal;

class sideBar extends React.Component {
    constructor(props) {
        // es6继承必须用super调用父类的constructor
        super(props);
        this.state = {
            collapsed: false,
            username: ''
        }
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logOut = () => {
        var that = this;
        confirm({
            title: 'Do you want to go out?',
            content: 'When clicked the OK button, you will go login page',
            onOk() {
                that.props.history.push('/')
                sessionStorage.removeItem('reactTest')
            },
            onCancel() {

            },
        });
    };

    handleClickMenuItem = (item) => {
        sessionStorage.setItem('menuItmeKey', String(item.key))
    };

    componentDidMount() {
        this.setState({
            username: JSON.parse(sessionStorage.getItem('reactTest')).username
        })
    }

    menuItem = () => {
        return routes.filter(item => item.menu).map((item, index) => {
            return (
                <Menu.Item key={index} onClick={ item => this.handleClickMenuItem(item)}>
                    <Link to={item.path}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>)
        })
    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={this.logOut}>
                    <div>退出</div>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className='logo'/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={ [sessionStorage.getItem('menuItmeKey') || '0'] }>
                        {this.menuItem()}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className="right-center">
                            <Dropdown overlay={menu}>
                                <Avatar style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>{this.state.username}</Avatar>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}>
                        {routes.map((route, i) => (
                            <Route
                                key={i}
                                excat={route.excat}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default sideBar
