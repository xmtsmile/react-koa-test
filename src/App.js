import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from './router/index'
import Login from './pages/login/login'
class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={Login} />
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </BrowserRouter>
        );
    }
}

export default App;
