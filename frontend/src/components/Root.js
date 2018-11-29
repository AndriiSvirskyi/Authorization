import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Content from './content/Content';
import Users from './content/Users';
import Signout from './Signout';
import Home from './home/Home';
import store from '../store';

const Root = () => (
    <Provider store={store}>
        <Router>
            <App>
                <Route path="/" exact component={Home} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Route path="/content" component={Content} />
                <Route path="/users" component={Users} />
                <Route path="/signout" component={Signout} />
                <Route path="/Home" component={Home} />
            </App>
        </Router>
    </Provider>
);

export default Root;
