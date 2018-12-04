import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Signup from './auth/Signup';
import ChangePassword from './auth/changePassword';
import RecoveryPassword from './auth/recoveryPassword';
import Signin from './auth/Signin';
import Users from './content/Users';
import Home from './home/Home';
import store from '../store';

const Root = () => (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);

export default Root;
